'use client';

import { useState, useTransition } from 'react';
import { createAudit } from './actions';
import { ErrorBanner } from '@/components/waybill/error-banner';

const AISLES = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12'];

export function NewAuditForm() {
  const [aisle, setAisle] = useState('');
  const [auditor, setAuditor] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const canSubmit = aisle && auditor.trim().length > 0 && !pending;

  function onSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        await createAudit(formData);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Could not start audit');
      }
    });
  }

  return (
    <form action={onSubmit} className="space-y-6">
      {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}

      <Field label="Aisle" htmlFor="aisle" required>
        <select
          id="aisle"
          name="aisle"
          value={aisle}
          onChange={(e) => setAisle(e.target.value)}
          required
          className="block w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 shadow-sm transition focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 disabled:opacity-60"
          disabled={pending}
        >
          <option value="" disabled>Select aisle (A1–A12)</option>
          {AISLES.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </Field>

      <Field label="Auditor Name" htmlFor="auditor" required>
        <input
          id="auditor"
          name="auditor"
          type="text"
          value={auditor}
          onChange={(e) => setAuditor(e.target.value)}
          placeholder="Your name"
          required
          autoComplete="name"
          className="block w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm transition focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 disabled:opacity-60"
          disabled={pending}
        />
      </Field>

      <Field label="Notes (Optional)" htmlFor="notes">
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Any additional notes about this audit…"
          className="block w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm transition focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 disabled:opacity-60"
          disabled={pending}
        />
      </Field>

      <button
        type="submit"
        disabled={!canSubmit}
        className="inline-flex w-full items-center justify-center rounded-xl bg-zinc-900 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-zinc-300"
      >
        {pending ? 'Starting…' : 'Begin Walk'}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-zinc-900">
        {label}{required && <span className="ml-0.5 text-zinc-400">*</span>}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
