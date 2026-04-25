import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const sb = supabaseAdmin();
  const { data: audits } = await sb
    .from('audits')
    .select('id, warehouse_name, status, started_at')
    .order('started_at', { ascending: false })
    .limit(10);

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-semibold">WaybillAgent</h1>
      <p className="mt-2 text-neutral-400">Walk the warehouse, Claude does the audit.</p>

      <h2 className="mt-10 text-lg font-medium">Audits</h2>
      <ul className="mt-3 divide-y divide-neutral-800 rounded-lg border border-neutral-800">
        {(audits ?? []).map((a) => (
          <li key={a.id}>
            <Link
              href={`/audit/${a.id}`}
              className="flex items-center justify-between px-4 py-3 hover:bg-neutral-900"
            >
              <div>
                <div className="font-medium">{a.warehouse_name}</div>
                <div className="text-xs text-neutral-500">
                  {new Date(a.started_at).toLocaleString()}
                </div>
              </div>
              <span className="rounded-full border border-neutral-700 px-2 py-0.5 text-xs text-neutral-300">
                {a.status}
              </span>
            </Link>
          </li>
        ))}
        {(!audits || audits.length === 0) && (
          <li className="px-4 py-6 text-sm text-neutral-500">No audits yet.</li>
        )}
      </ul>
    </main>
  );
}
