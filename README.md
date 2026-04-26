# WaybillAgent

**Walk the warehouse, Claude does the audit.**

Live demo: https://waybill-agent.vercel.app
Built for: *Built with Opus 4.7* hackathon (Apr 21-26, 2026)
License: MIT

WaybillAgent replaces a $2,000 handheld barcode scanner with an iPhone running
Claude Opus 4.7 vision. A field worker walks an aisle, points the phone at
each shelf, and the agent reads both the bin location label *and* the product
packaging, including labels that are torn, faded, or shadow-occluded. It
reconciles against Microsoft Business Central master data and returns a
variance report with a per-scan citation chain.

Filmed on location at a working Mydawa pharmacy godown in Nairobi.

## What's shipped

- `/api/scan` - Opus 4.7 vision endpoint, structured JSON output (zod-validated)
- Bin-code normalization for messy real-world inputs (`FL-A01A01` -> `A-01`)
- Reconciliation against the `bins` table with severity classification
- Citation chain UI for each variance (scan ID, model ID, photo, timestamp)
- Audit creation flow with iPhone-friendly photo capture
- `/api/health` connectivity probe

## Stack

Next.js 14 (App Router) - TypeScript - Tailwind - Supabase (Postgres + Storage)
- `@anthropic-ai/sdk` against `claude-opus-4-7` - Vercel

## Author

Joseph Rwanda - [Origami Tech](https://origami.tech), Nairobi.
Five years deploying Honeywell, Zebra, and Urovo barcode hardware across East
Africa. Honeywell Elevate EMEA 2025. Live $20.5K Microsoft Business Central
pharma proposal in pipeline. WaybillAgent is the agentic layer planned for that
deployment.
