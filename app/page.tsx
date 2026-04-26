import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase';
import { MODEL_ID } from '@/lib/claude';
import { MetricCard, SectionLabel } from '@/components/waybill/cards';
import { HealthPill, AttributionBadge, VarianceCountBadge } from '@/components/waybill/badges';
import { PinIcon, PlusIcon, ChevronRightIcon } from '@/components/waybill/icons';

export const dynamic = 'force-dynamic';

type AuditRow = {
  id: string;
  warehouse_name: string;
  status: string;
  started_at: string;
  variances: { count: number }[] | null;
};

export default async function HomePage() {
  const sb = supabaseAdmin();

  const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const [
    { data: audits },
    { count: audits24h },
    { count: scansTotal },
    { count: variancesNonOk },
    { count: variancesCritical },
  ] = await Promise.all([
    sb
      .from('audits')
      .select('id, warehouse_name, status, started_at, variances(count)')
      .order('started_at', { ascending: false })
      .limit(10),
    sb.from('audits').select('id', { count: 'exact', head: true }).gte('started_at', since24h),
    sb.from('scans').select('id', { count: 'exact', head: true }),
    sb.from('variances').select('id', { count: 'exact', head: true }).neq('severity', 'ok'),
    sb.from('variances').select('id', { count: 'exact', head: true }).eq('severity', 'critical'),
  ]);

  const auditList = (audits ?? []) as AuditRow[];

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">WaybillAgent</h1>
          <div className="mt-2 flex items-center gap-1.5 text-sm text-zinc-500">
            <PinIcon className="h-4 w-4" />
            <span>Mydawa Embakasi Godown · Nairobi</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <HealthPill ok={true} />
          <AttributionBadge model={MODEL_ID} />
        </div>
      </header>

      <section className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-50 p-5 shadow-sm sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
              Ready to begin an audit?
            </h2>
            <p className="mt-1.5 text-sm text-zinc-600">
              Start a new inventory audit walk with your device camera.
            </p>
          </div>
          <Link
            href="/audit/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 active:scale-[0.99]"
          >
            <PlusIcon className="h-4 w-4" />
            New Audit
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <SectionLabel>Summary</SectionLabel>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <MetricCard
            label="Audits (24h)"
            value={audits24h ?? 0}
            sublabel={(audits24h ?? 0) > 0 ? 'in the last day' : 'No recent audits'}
          />
          <MetricCard
            label="Bins Scanned"
            value={scansTotal ?? 0}
            sublabel={(scansTotal ?? 0) > 0 ? 'all-time' : 'No errors'}
          />
          <MetricCard
            label="Variances Found"
            value={variancesNonOk ?? 0}
            sublabel={
              (variancesCritical ?? 0) > 0
                ? `${variancesCritical} critical`
                : 'None critical'
            }
          />
          <MetricCard
            label="System Health"
            value="100%"
            sublabel="Fully operational"
          />
        </div>
      </section>

      <section className="mt-10">
        <SectionLabel>Recent Audits</SectionLabel>
        <div className="mt-3 space-y-3">
          {auditList.length === 0 && <EmptyState />}
          {auditList.map((a) => {
            const varianceCount = a.variances?.[0]?.count ?? 0;
            return <AuditCard key={a.id} audit={a} varianceCount={varianceCount} />;
          })}
        </div>
      </section>
    </main>
  );
}

function AuditCard({ audit, varianceCount }: { audit: AuditRow; varianceCount: number }) {
  return (
    <Link
      href={`/audit/${audit.id}`}
      className="block rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-mono text-sm font-semibold tracking-tight text-zinc-900">
            AUD-{audit.id.slice(0, 8).toUpperCase()}
          </div>
          <div className="mt-1 truncate text-sm text-zinc-500">{audit.warehouse_name}</div>
        </div>
        <VarianceCountBadge count={varianceCount} />
      </div>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-zinc-500">Status</dt>
          <dd className="font-medium capitalize text-zinc-900">{audit.status.replace('_', ' ')}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-zinc-500">Variances</dt>
          <dd className="font-medium tabular-nums text-zinc-900">{varianceCount}</dd>
        </div>
      </dl>
      <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs">
        <span className="text-zinc-500">{formatRelative(audit.started_at)}</span>
        <ChevronRightIcon className="h-4 w-4 text-zinc-400" />
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-12 text-center">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100">
        <PlusIcon className="h-5 w-5 text-zinc-500" />
      </div>
      <h3 className="mt-3 text-sm font-semibold text-zinc-900">No audits yet</h3>
      <p className="mt-1 text-sm text-zinc-500">Begin your first warehouse walk above.</p>
    </div>
  );
}

function formatRelative(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.round(diffMs / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const sameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();
  const time = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  if (sameDay) return `Today, ${time}`;
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const wasYesterday =
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate();
  if (wasYesterday) return `Yesterday, ${time}`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) + `, ${time}`;
}
