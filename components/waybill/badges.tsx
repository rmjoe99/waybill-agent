import type { Severity, VarianceType } from '@/lib/types';
import { CheckCircleIcon, TriangleAlertIcon } from './icons';

export function SeverityBadge({ severity }: { severity: Severity }) {
  const cfg =
    severity === 'ok'
      ? { label: 'Match', cls: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' }
      : severity === 'warn'
        ? { label: 'Warn', cls: 'bg-amber-50 text-amber-700 ring-amber-600/20' }
        : { label: 'Critical', cls: 'bg-rose-50 text-rose-700 ring-rose-600/20' };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
}

export function VarianceTypeBadge({
  type,
  binMatched = false,
}: {
  type: VarianceType;
  binMatched?: boolean;
}) {
  const label =
    type === 'match'
      ? 'Match'
      : type === 'wrong_item'
        ? 'Wrong item'
        : type === 'qty_diff'
          ? 'Qty mismatch'
          : binMatched
            ? 'Item not read'
            : 'Unknown bin';
  return (
    <span className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700 ring-1 ring-inset ring-zinc-200">
      {label}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const isLive = status === 'in_progress';
  const isDone = status === 'complete' || status === 'completed';
  const cls = isLive
    ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
    : isDone
      ? 'bg-zinc-100 text-zinc-700 ring-zinc-200'
      : 'bg-zinc-100 text-zinc-700 ring-zinc-200';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${cls}`}>
      {isLive && (
        <span className="relative inline-flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </span>
      )}
      <span className="capitalize">{status.replace('_', ' ')}</span>
    </span>
  );
}

export function HealthPill({ ok }: { ok: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
      ok ? 'bg-zinc-900 text-white' : 'bg-rose-600 text-white'
    }`}>
      <CheckCircleIcon className="h-3.5 w-3.5" />
      {ok ? 'Healthy' : 'System down'}
    </span>
  );
}

export function AttributionBadge({ model }: { model: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 font-mono text-xs text-zinc-700 shadow-sm">
      {model}
    </span>
  );
}

export function ConfidencePill({ value }: { value: 'high' | 'medium' | 'low' }) {
  const cls =
    value === 'high'
      ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
      : value === 'medium'
        ? 'bg-amber-50 text-amber-700 ring-amber-600/20'
        : 'bg-rose-50 text-rose-700 ring-rose-600/20';
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider ring-1 ring-inset ${cls}`}>
      {value} conf
    </span>
  );
}

export function VarianceCountBadge({ count }: { count: number }) {
  if (count === 0) {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
        <CheckCircleIcon className="h-3 w-3" />
        Clean
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-rose-600 px-2 py-1 text-xs font-semibold text-white">
      <TriangleAlertIcon className="h-3 w-3" />
      {count}
    </span>
  );
}
