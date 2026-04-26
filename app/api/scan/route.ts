import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { supabaseAdmin } from '@/lib/supabase';
import { claude, MODEL_ID } from '@/lib/claude';
import {
  VisionExtractionSchema,
  type VisionExtraction,
  type Bin,
  type VarianceType,
  type Severity,
} from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const SYSTEM_PROMPT = `You are a warehouse inspector reading a bin label photo from a Mydawa pharmacy godown in Nairobi.

The label may be torn, faded, smudged, creased, or partially obscured. Extract what you can see, even from damaged labels. Use your high-resolution vision to read text others would miss.

Return ONLY a JSON object matching this exact shape (no markdown fences, no commentary):

{
  "bin_code": "A-01" or null,
  "item_code": "MED-PCM500" or null,
  "item_name": "Paracetamol 500mg Tabs" or null,
  "observed_qty": 240 or null,
  "confidence": "high" | "medium" | "low",
  "notes": "optional one-line observation about damage or ambiguity"
}

Rules:
- bin_code format: single uppercase letter, dash, two digits (e.g. A-01, B-12).
- item_code format: MED-XXXXX (uppercase letters and digits, dash-separated).
- observed_qty: integer unit count visible on the label or shelf. null if not determinable.
- confidence: "high" if all fields read cleanly; "medium" if one field is inferred from partial text; "low" if multiple fields are guessed.
- Set fields to null when you genuinely cannot read them. Do not hallucinate plausible values.`;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('image');
    const auditId = formData.get('audit_id');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'image file is required' }, { status: 400 });
    }
    if (typeof auditId !== 'string' || !auditId) {
      return NextResponse.json({ error: 'audit_id is required' }, { status: 400 });
    }

    const inputBuf = Buffer.from(await file.arrayBuffer());
    const resized = await sharp(inputBuf)
      .rotate()
      .resize({ width: 2048, height: 2048, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 90 })
      .toBuffer();

    const sb = supabaseAdmin();

    const photoPath = `${auditId}/${Date.now()}.jpg`;
    const { error: upErr } = await sb.storage
      .from('audit-photos')
      .upload(photoPath, resized, { contentType: 'image/jpeg', upsert: false });
    if (upErr) {
      return NextResponse.json({ error: `upload failed: ${upErr.message}` }, { status: 500 });
    }

    const c = claude();
    const message = await c.messages.create({
      model: MODEL_ID,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: resized.toString('base64'),
              },
            },
            { type: 'text', text: 'Read this bin label. Return only the JSON object.' },
          ],
        },
      ],
    });

    const rawText = message.content
      .map((b) => (b.type === 'text' ? b.text : ''))
      .join('')
      .trim();

    let extracted: VisionExtraction;
    try {
      const parsed = JSON.parse(stripFences(rawText));
      extracted = VisionExtractionSchema.parse(parsed);
    } catch {
      return NextResponse.json(
        { error: 'vision returned unparseable output', raw: rawText },
        { status: 502 },
      );
    }

    const inferredBinCode = inferBinCode(extracted);
    if (inferredBinCode && !extracted.bin_code) {
      extracted = {
        ...extracted,
        bin_code: inferredBinCode,
        notes: extracted.notes
          ? `${extracted.notes} Normalized bin code: ${inferredBinCode}.`
          : `Normalized bin code: ${inferredBinCode}.`,
      };
    }

    let expected: Bin | null = null;
    if (extracted.bin_code) {
      const { data } = await sb
        .from('bins')
        .select('*')
        .eq('bin_code', extracted.bin_code)
        .maybeSingle();
      expected = (data as Bin | null) ?? null;
    }

    const { variance_type, severity } = classify(extracted, expected);

    const { data: scanRow, error: scanErr } = await sb
      .from('scans')
      .insert({
        audit_id: auditId,
        photo_path: photoPath,
        extracted,
        model_id: MODEL_ID,
      })
      .select('id')
      .single();
    if (scanErr || !scanRow) {
      return NextResponse.json(
        { error: `scan insert failed: ${scanErr?.message ?? 'no row returned'}` },
        { status: 500 },
      );
    }

    const { error: varErr } = await sb.from('variances').insert({
      audit_id: auditId,
      scan_id: scanRow.id,
      bin_code: extracted.bin_code ?? 'UNKNOWN',
      expected: expected
        ? {
            item_code: expected.item_code,
            item_name: expected.item_name,
            expected_qty: expected.expected_qty,
          }
        : null,
      observed: {
        item_code: extracted.item_code,
        item_name: extracted.item_name,
        observed_qty: extracted.observed_qty,
      },
      variance_type,
      severity,
    });
    if (varErr) {
      return NextResponse.json(
        { error: `variance insert failed: ${varErr.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json({
      scan_id: scanRow.id,
      extracted,
      expected,
      variance_type,
      severity,
      model_id: MODEL_ID,
      captured_at: new Date().toISOString(),
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

function stripFences(s: string): string {
  return s
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();
}

function inferBinCode(extracted: VisionExtraction): string | null {
  const fromCode = normalizeBinCode(extracted.bin_code);
  if (fromCode) return fromCode;

  const fromNotes = normalizeBinCode(extracted.notes);
  if (fromNotes) return fromNotes;

  return null;
}

function normalizeBinCode(input: string | null | undefined): string | null {
  if (!input) return null;
  const text = input.trim().toUpperCase();
  if (!text) return null;

  const direct = text.match(/^([A-Z])-(\d{2})$/);
  if (direct) return `${direct[1]}-${direct[2]}`;

  const compact = text.match(/^([A-Z])(\d{2})$/);
  if (compact) return `${compact[1]}-${compact[2]}`;

  const prefixed = text.match(/^(?:FL[-_ ]*)?([A-Z])0?(\d{2})(?:[A-Z]\d{2})?$/);
  if (prefixed) return `${prefixed[1]}-${prefixed[2].padStart(2, '0')}`;

  const embedded = text.match(/(?:^|[^A-Z0-9])(?:FL[-_ ]*)?([A-Z])0?(\d{2})(?:[A-Z]\d{2})?(?:[^A-Z0-9]|$)/);
  if (embedded) return `${embedded[1]}-${embedded[2].padStart(2, '0')}`;

  return null;
}

function classify(
  extracted: VisionExtraction,
  expected: Bin | null,
): { variance_type: VarianceType; severity: Severity } {
  if (!expected) return { variance_type: 'unknown_bin', severity: 'critical' };
  if (!extracted.item_code) return { variance_type: 'unknown_bin', severity: 'warn' };
  if (extracted.item_code !== expected.item_code) {
    return { variance_type: 'wrong_item', severity: 'critical' };
  }
  if (extracted.observed_qty != null && extracted.observed_qty !== expected.expected_qty) {
    const diff = Math.abs(extracted.observed_qty - expected.expected_qty);
    const pct = diff / expected.expected_qty;
    return { variance_type: 'qty_diff', severity: pct > 0.1 ? 'critical' : 'warn' };
  }
  return { variance_type: 'match', severity: 'ok' };
}
