import { z } from 'zod';

export const VisionExtractionSchema = z.object({
  bin_code: z.string().nullable(),
  item_code: z.string().nullable(),
  item_name: z.string().nullable(),
  observed_qty: z.number().int().nullable(),
  confidence: z.enum(['high', 'medium', 'low']),
  notes: z.string().optional(),
});
export type VisionExtraction = z.infer<typeof VisionExtractionSchema>;

export type Bin = {
  id: string;
  bin_code: string;
  item_code: string;
  item_name: string;
  expected_qty: number;
  warehouse: string;
};

export type VarianceType = 'match' | 'wrong_item' | 'qty_diff' | 'unknown_bin';
export type Severity = 'ok' | 'warn' | 'critical';

export type Audit = {
  id: string;
  warehouse_name: string;
  status: 'in_progress' | 'complete';
  started_at: string;
  completed_at: string | null;
};
