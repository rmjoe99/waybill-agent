import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import { MODEL_ID } from '@/lib/claude';
import { Scanner } from './Scanner';
import { MetricCard, SectionCard } from '@/components/waybill/cards';
import {
  SeverityBadge,
  VarianceTypeBadge,
  AttributionBadge,
  StatusBadge,
} from '@/components/waybill/badges';
import { ArrowLeftIcon } from '@/components/waybill/icons';
import type { Severity, VarianceType } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Variance = {
  id: string;
  bin_code: string;
  expected: { item_code?: string; item_name?: string; expected_qty?: number } | null;
  observed: { item_code: string | null; observed_qty: number | null } | null;
  variance_type: VarianceType;
  severity: Severity;
  created_at: string;
};

export default async function AuditPage({ params }: { params: { id: string } }) {
  const sb = supabaseAdmin();
  const { data: audit } = await sb
    .from('audits')
    .select('id, warehouse_name, status, started_at')
    .eq('id', params.id)
    .maybeSingle();

  if (!audit) notFound();

  const { data: variances } = await sb
    .from('variances')
    .select('id, bin_code, expected, observed, variance_type, severity, created_at')
    .eq('audit_id', params.id)
    .order('created_at', { ascending: false });

  const counts = (variances ?? []).reduce(
    (acc, v) => {
      acc[v.severity as Severity] = (acc[v.severity as Severity] ?? 0) + 1;
      return acc;
    },
    { ok: 0, warn: 0, critical: 0 } as Record<Severity, number>,
  );

  return (
    <main className="mx-auto max-w-2xl px-4 pb-24 pt-6 sm:px-6 sm:pt-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-600 transition hover:text-zinc-900"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <header className="mt-5 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="font-mono text-xs font-semibold text-zinc-500">
              AUD-{audit.id.slice(0, 8).toUpperCase()}
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900">
              {audit.warehouse_name}
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Started {new Date(audit.started_at).toLocaleString('en-GB', { hour12: false })}
            </p>
          </div>
          <StatusBadge status={audit.status} />
        </div>
        <div className="mt-4 flex items-center gap-2">
          <AttributionBadge model={MODEL_ID} />
        </div>
      </header>

      <div className="mt-5 grid grid-cols-3 gap-3 sm:gap-4">
        <MetricCard label="Match" value={counts.ok} />
        <MetricCard label="Warn" value={counts.warn} />
        <MetricCard label="Critical" value={counts.critical} />
      </div>

      <Scanner auditId={audit.id} />

      <div className="mt-8">
        <SectionCard
          title="Recent scans"
          description={`${variances?.length ?? 0} bin${(variances?.length ?? 0) === 1 ? '' : 's'} reconciled`}
        >
          {variances && variances.length > 0 ? (
            <ul className="-mx-1 space-y-3">
              {variances.map((v) => (
                <VarianceRow key={v.id} v={v as Variance} />
              ))}
            </ul>
          ) : (
            <div className="rounded-xl border border-dashed border-zinc-300 px-4 py-10 text-center text-sm text-zinc-500">
              No scans yet. Tap the camera above to read a bin label.
            </div>
          )}
        </SectionCard>
      </div>
    </main>
  );
}

function VarianceRow({ v }: { v: Variance }) {
  const accent =
    v.severity === 'ok'
      ? 'border-l-emerald-500'
      : v.severity === 'warn'
        ? 'border-l-amber-500'
        : 'border-l-rose-500';
  const delta =
    v.expected?.expected_qty != null && v.observed?.observed_qty != null
      ? v.observed.observed_qty - v.expected.expected_qty
      : null;
  return (
    <li className={`rounded-xl border border-zinc-200 border-l-4 ${accent} bg-white px-4 py-3 shadow-sm`}>
      <div className="flex items-center justify-between gap-2">
        <div className="font-mono text-sm font-semibold text-zinc-900">{v.bin_code}</div>
        <div className="flex items-center gap-2">
          <VarianceTypeBadge type={v.variance_type} binMatched={v.expected != null} />
          <SeverityBadge severity={v.severity} />
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Expected</div>
          <div className="mt-0.5 font-mono text-zinc-900">{v.expected?.item_code ?? '—'}</div>
          {v.expected?.expected_qty != null && (
            <div className="text-[11px] text-zinc-500">×{v.expected.expected_qty}</div>
          )}
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Observed</div>
          <div className="mt-0.5 font-mono text-zinc-900">{v.observed?.item_code ?? '—'}</div>
          {v.observed?.observed_qty != null && (
            <div className="text-[11px] text-zinc-500">×{v.observed.observed_qty}</div>
          )}
        </div>
      </div>
      {delta != null && delta !== 0 && (
        <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-2 text-[11px]">
          <span className="text-zinc-500">Quantity delta</span>
          <span className={`font-mono font-semibold ${delta < 0 ? 'text-rose-700' : 'text-amber-700'}`}>
            {delta > 0 ? '+' : ''}{delta}
          </span>
        </div>
      )}
      <div className="mt-2 text-[10px] text-zinc-400">
        {new Date(v.created_at).toLocaleString('en-GB', { hour12: false })}
      </div>
    </li>
  );
}
