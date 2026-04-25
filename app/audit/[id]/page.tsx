import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import { Scanner } from './Scanner';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Variance = {
  id: string;
  bin_code: string;
  expected: { item_code?: string; item_name?: string; expected_qty?: number } | null;
  observed: { item_code: string | null; observed_qty: number | null } | null;
  variance_type: 'match' | 'wrong_item' | 'qty_diff' | 'unknown_bin';
  severity: 'ok' | 'warn' | 'critical';
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
      acc[v.severity] = (acc[v.severity] ?? 0) + 1;
      return acc;
    },
    { ok: 0, warn: 0, critical: 0 } as Record<string, number>,
  );

  return (
    <main className="mx-auto max-w-2xl px-4 py-6">
      <Link href="/" className="text-xs text-neutral-500 hover:text-neutral-300">
        ← all audits
      </Link>
      <h1 className="mt-2 text-2xl font-semibold">{audit.warehouse_name}</h1>
      <div className="mt-1 flex items-center gap-3 text-xs text-neutral-500">
        <span>started {new Date(audit.started_at).toLocaleString()}</span>
        <span className="rounded-full border border-neutral-700 px-2 py-0.5 text-neutral-300">
          {audit.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
        <Stat label="Match" value={counts.ok} tone="ok" />
        <Stat label="Warn" value={counts.warn} tone="warn" />
        <Stat label="Critical" value={counts.critical} tone="critical" />
      </div>

      <Scanner auditId={audit.id} />

      <h2 className="mt-8 text-sm font-medium uppercase tracking-wide text-neutral-400">
        Recent scans
      </h2>
      <ul className="mt-3 space-y-2">
        {(variances ?? []).map((v) => (
          <VarianceCard key={v.id} v={v as Variance} />
        ))}
        {(!variances || variances.length === 0) && (
          <li className="rounded-lg border border-dashed border-neutral-800 px-4 py-6 text-center text-sm text-neutral-500">
            No scans yet. Tap the camera above.
          </li>
        )}
      </ul>
    </main>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: 'ok' | 'warn' | 'critical' }) {
  const color =
    tone === 'ok'
      ? 'border-emerald-700/50 bg-emerald-900/20 text-emerald-300'
      : tone === 'warn'
        ? 'border-amber-700/50 bg-amber-900/20 text-amber-300'
        : 'border-rose-700/50 bg-rose-900/20 text-rose-300';
  return (
    <div className={`rounded-lg border px-3 py-2 ${color}`}>
      <div className="text-lg font-semibold">{value}</div>
      <div className="text-[10px] uppercase tracking-wider opacity-70">{label}</div>
    </div>
  );
}

function VarianceCard({ v }: { v: Variance }) {
  const sevColor =
    v.severity === 'ok'
      ? 'border-l-emerald-500'
      : v.severity === 'warn'
        ? 'border-l-amber-500'
        : 'border-l-rose-500';
  const label =
    v.variance_type === 'match'
      ? 'Match'
      : v.variance_type === 'wrong_item'
        ? 'Wrong item'
        : v.variance_type === 'qty_diff'
          ? 'Qty mismatch'
          : 'Unknown bin';
  return (
    <li className={`rounded-md border border-neutral-800 border-l-4 ${sevColor} bg-neutral-900/40 px-3 py-2`}>
      <div className="flex items-center justify-between">
        <div className="font-mono text-sm">{v.bin_code}</div>
        <div className="text-xs text-neutral-400">{label}</div>
      </div>
      <div className="mt-1 grid grid-cols-2 gap-2 text-xs">
        <div>
          <div className="text-neutral-500">Expected</div>
          <div className="text-neutral-300">
            {v.expected?.item_code ?? '—'} <span className="text-neutral-500">×{v.expected?.expected_qty ?? '—'}</span>
          </div>
        </div>
        <div>
          <div className="text-neutral-500">Observed</div>
          <div className="text-neutral-300">
            {v.observed?.item_code ?? '—'} <span className="text-neutral-500">×{v.observed?.observed_qty ?? '—'}</span>
          </div>
        </div>
      </div>
    </li>
  );
}
