'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SeverityBadge, VarianceTypeBadge, ConfidencePill } from '@/components/waybill/badges';
import { CitationChain } from '@/components/waybill/evidence';
import { ErrorBanner } from '@/components/waybill/error-banner';
import { CameraIcon, RefreshIcon } from '@/components/waybill/icons';

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
  model_id: string;
  captured_at: string;
};

export function Scanner({ auditId }: { auditId: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastFile, setLastFile] = useState<File | null>(null);

  async function handleFile(file: File) {
    setBusy(true);
    setError(null);
    setResult(null);
    setLastFile(file);
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

  const tint =
    result?.severity === 'ok'
      ? 'border-emerald-200 bg-emerald-50/50'
      : result?.severity === 'warn'
        ? 'border-amber-200 bg-amber-50/50'
        : result?.severity === 'critical'
          ? 'border-rose-200 bg-rose-50/50'
          : 'border-zinc-200';

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

      <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-zinc-300 bg-white shadow-sm">
        <div className="pointer-events-none absolute left-4 top-4 h-7 w-7 border-l-2 border-t-2 border-zinc-900/70" />
        <div className="pointer-events-none absolute right-4 top-4 h-7 w-7 border-r-2 border-t-2 border-zinc-900/70" />
        <div className="pointer-events-none absolute bottom-4 left-4 h-7 w-7 border-b-2 border-l-2 border-zinc-900/70" />
        <div className="pointer-events-none absolute bottom-4 right-4 h-7 w-7 border-b-2 border-r-2 border-zinc-900/70" />
        {busy && (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px animate-pulse bg-zinc-900/70" />
        )}

        <button
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="flex w-full flex-col items-center justify-center gap-3 px-4 py-12 text-center transition active:bg-zinc-50 disabled:opacity-60"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white">
            <CameraIcon className="h-5 w-5" />
          </span>
          <span className="text-base font-semibold text-zinc-900">
            {busy ? 'Reading label…' : 'Tap to scan a bin label'}
          </span>
          <span className="text-[11px] uppercase tracking-wider text-zinc-500">
            {busy ? 'vision · claude opus 4.7' : 'camera or photo upload'}
          </span>
        </button>
      </div>

      {error && (
        <div className="mt-3">
          <ErrorBanner
            message={error}
            onDismiss={() => setError(null)}
            onRetry={lastFile ? () => handleFile(lastFile) : undefined}
          />
        </div>
      )}

      {result && (
        <div className={`mt-4 overflow-hidden rounded-2xl border shadow-sm ${tint}`}>
          <div className="flex items-center justify-between gap-2 border-b border-black/5 bg-white/60 px-4 py-3">
            <div className="font-mono text-base font-semibold text-zinc-900">
              {result.extracted.bin_code ?? 'UNKNOWN'}
            </div>
            <div className="flex items-center gap-2">
              <ConfidencePill value={result.extracted.confidence} />
              <SeverityBadge severity={result.severity} />
            </div>
          </div>

          <div className="px-4 py-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Expected</div>
                <div className="mt-0.5 font-mono text-zinc-900">
                  {result.expected?.item_code ?? '—'}
                </div>
                <div className="text-xs text-zinc-500">
                  {result.expected?.item_name ?? '—'}
                  {result.expected?.expected_qty != null && (
                    <span> · ×{result.expected.expected_qty}</span>
                  )}
                </div>
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Observed</div>
                <div className="mt-0.5 font-mono text-zinc-900">
                  {result.extracted.item_code ?? '—'}
                </div>
                <div className="text-xs text-zinc-500">
                  {result.extracted.item_name ?? '—'}
                  {result.extracted.observed_qty != null && (
                    <span> · ×{result.extracted.observed_qty}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl bg-white/80 px-3 py-2 ring-1 ring-inset ring-black/5">
              <VarianceTypeBadge type={result.variance_type} />
              {result.expected && result.extracted.observed_qty != null && (
                <div className="font-mono text-xs text-zinc-700">
                  Δ {result.extracted.observed_qty - result.expected.expected_qty}
                </div>
              )}
            </div>

            <CitationChain
              scanId={result.scan_id}
              modelId={result.model_id}
              binCode={result.extracted.bin_code}
              notes={result.extracted.notes}
              timestamp={result.captured_at}
            />

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => lastFile && handleFile(lastFile)}
                disabled={busy || !lastFile}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-zinc-50 disabled:opacity-60"
              >
                <RefreshIcon className="h-4 w-4" />
                Re-scan
              </button>
              <button
                type="button"
                onClick={() => {
                  setResult(null);
                  inputRef.current?.click();
                }}
                disabled={busy}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 active:scale-[0.99] disabled:opacity-60"
              >
                <CameraIcon className="h-4 w-4" />
                Next bin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
