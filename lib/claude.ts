import Anthropic from '@anthropic-ai/sdk';

export const MODEL_ID = 'claude-opus-4-7' as const;

export function claude(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set');
  return new Anthropic({ apiKey });
}
