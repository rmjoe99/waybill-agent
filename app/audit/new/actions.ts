'use server';

import { supabaseAdmin } from '@/lib/supabase';

export type CreateAuditResult =
  | { ok: true; auditId: string }
  | { ok: false; message: string };

export async function createAudit(formData: FormData): Promise<CreateAuditResult> {
  const aisle = String(formData.get('aisle') ?? '').trim();
  const auditor = String(formData.get('auditor') ?? '').trim();
  const notes = String(formData.get('notes') ?? '').trim();

  if (!aisle) return { ok: false, message: 'Aisle is required' };
  if (!auditor) return { ok: false, message: 'Auditor name is required' };

  const warehouseName = `Mydawa Embakasi Godown · Aisle ${aisle}`;
  const startedAt = new Date().toISOString();

  try {
    const sb = supabaseAdmin();
    const payloads: Array<Record<string, string>> = [
      {
        warehouse_name: warehouseName,
        status: 'in_progress',
        started_at: startedAt,
        auditor,
        notes,
      },
      {
        warehouse_name: warehouseName,
        status: 'in_progress',
        started_at: startedAt,
      },
      {
        warehouse_name: warehouseName,
        started_at: startedAt,
      },
    ];

    let lastErrorMessage = 'unknown error';
    for (const payload of payloads) {
      const { data, error } = await sb.from('audits').insert(payload).select('id').single();
      if (data?.id) return { ok: true, auditId: data.id };
      if (error?.message) lastErrorMessage = error.message;
    }

    return { ok: false, message: `Could not create audit: ${lastErrorMessage}` };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'unknown error';
    console.error('createAudit failed:', message);
    return { ok: false, message: 'Could not start audit right now. Please try again.' };
  }
}
