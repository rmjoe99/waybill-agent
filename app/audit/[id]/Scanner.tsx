'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

type ScanResult = {
  scan_id: string;
  extracted: {
    bin_code: string | null;
    item_code: string | null;
    item_name: string | null;
    observed_qty: number | null;
    confidence: 'high' | 'medium' | 'low';
    notes?: string;
  };
  expected: {
    item_code: string;
    item_name: string;
    expected_qty: number;
  } | null;
  variance_type: 'match' | 'wrong_item' | 'qty_diff' | 'unknown_bin';
  severity: 'ok' | 'warn' | 'critical';
};

export function Scanner({ auditId }: { auditId: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const fd = new FormData();
      fd.append('image', file);
      fd.append('audit_id', auditId);
      const res = await fetch('/api/scan', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? 'scan failed');
      } else {
        setResult(json);
        router.refresh();
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'network error');
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  const sevTint =
    result?.severity === 'ok'
      ? 'border-emerald-700/60 bg-emerald-900/20'
      : result?.severity === 'warn'
        ? 'border-amber-700/60 bg-amber-900/20'
        : result?.severity === 'critical'
          ? 'border-rose-700/60 bg-rose-900/20'
          : 'border-neutral-800';

  return (
    <div className="mt-6">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="w-full rounded-lg bg-emerald-600 px-4 py-4 text-base font-semibold text-white shadow-lg active:bg-emerald-700 disabled:opacity-60"
      >
        {busy ? 'Reading label…' : '📷 Scan a bin label'}
      </button>

      {error && (
        <div className="mt-3 rounded-md border border-rose-700/60 bg-rose-900/20 px-3 py-2 text-sm text-rose-200">
          {error}
        </div>
      )}

      {result && (
        <div className={`mt-3 rounded-md border px-3 py-3 text-sm ${sevTint}`}>
          <div className="flex items-center justify-between">
            <div className="font-mono text-base">{result.extracted.bin_code ?? '?'}</div>
            <div className="text-xs uppercase tracking-wider opacity-80">
              {result.variance_type.replace('_', ' ')}
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="opacity-60">Expected</div>
              <div className="text-neutral-100">
                {result.expected?.item_code ?? '—'}{' '}
                <span className="opacity-60">×{result.expected?.expected_qty ?? '—'}</span>
              </div>
            </div>
            <div>
              <div className="opacity-60">Observed</div>
              <div className="text-neutral-100">
                {result.extracted.item_code ?? '—'}{' '}
                <span className="opacity-60">×{result.extracted.observed_qty ?? '—'}</span>
              </div>
            </div>
          </div>
          <div className="mt-2 text-[11px] opacity-60">
            confidence: {result.extracted.confidence}
            {result.extracted.notes ? ` · ${result.extracted.notes}` : ''}
          </div>
        </div>
      )}
    </div>
  );
}
