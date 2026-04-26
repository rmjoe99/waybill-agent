export function CitationChain({
  scanId,
  modelId,
  binCode,
  notes,
  timestamp,
}: {
  scanId: string;
  modelId: string;
  binCode: string | null;
  notes?: string;
  timestamp: string;
}) {
  return (
    <details className="group mt-3 rounded-xl border border-zinc-200 bg-zinc-50/50">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-900">
        <span>Citation chain</span>
        <span className="text-zinc-400 transition-transform group-open:rotate-90">›</span>
      </summary>
      <dl className="grid grid-cols-1 gap-3 border-t border-zinc-200 px-4 py-3 text-xs sm:grid-cols-2">
        <Row label="scan_id" value={scanId} mono />
        <Row label="model" value={modelId} mono />
        <Row label="bin_code" value={binCode ?? '—'} mono />
        <Row label="captured_at" value={new Date(timestamp).toISOString()} mono />
        {notes && <Row label="vision notes" value={notes} span2 />}
      </dl>
    </details>
  );
}

function Row({
  label,
  value,
  mono,
  span2,
}: {
  label: string;
  value: string;
  mono?: boolean;
  span2?: boolean;
}) {
  return (
    <div className={span2 ? 'sm:col-span-2' : ''}>
      <dt className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">{label}</dt>
      <dd className={`mt-0.5 break-all ${mono ? 'font-mono' : ''} text-zinc-900`}>{value}</dd>
    </div>
  );
}
