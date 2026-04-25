import { NextResponse } from 'next/server';
import { MODEL_ID } from '@/lib/claude';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    model: MODEL_ID,
    time: new Date().toISOString(),
  });
}
