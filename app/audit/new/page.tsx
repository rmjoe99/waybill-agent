import Link from 'next/link';
import { ArrowLeftIcon } from '@/components/waybill/icons';
import { NewAuditForm } from './NewAuditForm';

export const dynamic = 'force-dynamic';

export default function NewAuditPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-600 transition hover:text-zinc-900"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <section className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <header className="border-b border-zinc-200 px-6 py-5 sm:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Begin New Audit</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Configure the audit parameters and start walking your warehouse.
          </p>
        </header>
        <div className="px-6 py-6 sm:px-8 sm:py-8">
          <NewAuditForm />
        </div>
      </section>
    </main>
  );
}
