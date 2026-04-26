import type { ReactNode } from 'react';

export function MetricCard({
  label,
  value,
  sublabel,
}: {
  label: string;
  value: string | number;
  sublabel?: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="text-sm font-medium text-zinc-500">{label}</div>
      <div className="mt-3 text-3xl font-semibold tracking-tight tabular-nums text-zinc-900">{value}</div>
      {sublabel && <div className="mt-1 text-xs text-zinc-500">{sublabel}</div>}
    </div>
  );
}

export function SectionCard({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <header className="flex items-start justify-between gap-3 border-b border-zinc-200 px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-zinc-900">{title}</h2>
          {description && <p className="mt-0.5 text-sm text-zinc-500">{description}</p>}
        </div>
        {action}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{children}</div>
  );
}
