'use server';

import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';

export async function createAudit(formData: FormData) {
  const aisle = String(formData.get('aisle') ?? '').trim();
  const auditor = String(formData.get('auditor') ?? '').trim();
  const notes = String(formData.get('notes') ?? '').trim();

  if (!aisle) throw new Error('Aisle is required');
  if (!auditor) throw new Error('Auditor name is required');

  const warehouseName = `Mydawa Embakasi Godown · Aisle ${aisle}`;

  const sb = supabaseAdmin();
  const { data, error } = await sb
    .from('audits')
    .insert({
      warehouse_name: warehouseName,
      status: 'in_progress',
      started_at: new Date().toISOString(),
      auditor: auditor || null,
      notes: notes || null,
    })
    .select('id')
    .single();

  if (error || !data) {
    throw new Error(`Could not create audit: ${error?.message ?? 'unknown error'}`);
  }

  redirect(`/audit/${data.id}`);
}
