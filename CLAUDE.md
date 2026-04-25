# WaybillAgent — Project Memory for Claude Code

This file is loaded at the start of every Claude Code session. It contains the project's immutable rules, architecture, and constraints. Treat these as supreme over ad-hoc instructions.

---

## Project Identity

**WaybillAgent** — an agentic warehouse inspector. A field worker walks a warehouse aisle with a phone. The agent reads bin labels (including torn/damaged ones), reconciles against Microsoft Business Central master data, and generates an auditor-grade variance report with a citation chain.

Built for **Built with Opus 4.7: a Claude Code Hackathon** (April 21–26, 2026).

**The pitch, in one line:** *Walk the warehouse, Claude does the audit.*

**Target prize:** 1st place ($50K credits). Side-prize target: Best Use of Claude Managed Agents ($5K).

---

## Non-Negotiable Rules

1. **Model ID is `claude-opus-4-7`.** Never use `claude-opus-4-20250514`, `claude-3-5-sonnet`, or any other Opus variant. If you see a model string, verify it. A wrong model ID costs 25% of the judging score.

2. **Managed Agents beta header is `managed-agents-2026-04-01`.** Configure it in the Anthropic SDK client initialization, not in env vars. Every API call must include it when using Managed Agents.

3. **Repo must be 100% new work.** Do not copy code from AssetZen, POS Pro, FarmTrace, or any other Origami Tech repo. Do not reference proprietary business logic from these codebases. You may reference patterns from memory (not code) since the founder has operator experience.

4. **Open source, MIT licensed.** Every dependency, every asset. No copyrighted images, no commercial APIs that would block redistribution, no closed-source SDKs.

5. **Commits are narrative, not noise.** Use conventional commit format: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`. Minimum commit rhythm: 2 commits per work block. Maximum: one commit per logical unit of change. Never squash or force-push — judges read `git log --reverse`.

6. **Secrets never hit the repo.** `.env.local` is the only place for API keys. Before every `git push`, Claude Code must verify `.gitignore` catches `.env*` and `*.key`. If in doubt, stop and ask.

7. **Ship functional over polished.** If a feature is 90% done and blocking another feature, ship the 90% and move on. Polish on Sunday morning, not Friday night.

---

## Architecture

```
iPhone 15 Pro Max (Safari PWA)
  ↓ camera capture + upload
Next.js 14 App Router on Vercel
  ↓ app/api/scan/route.ts
Supabase Storage (audit-photos bucket)
  ↓ signed URL
Claude Opus 4.7 vision (messages.create, xhigh effort)
  ↓ structured JSON output
Reconciliation logic (TypeScript)
  ↓ compares against Business Central master data in Supabase
Variance records (with citation chain)
  ↓
PDF report (react-pdf) + Slack-style notification

SATURDAY: wrap the messages.create() calls inside a Claude Managed Agent session
```

## Tech Stack (locked — do not change without explicit approval)

- **Framework:** Next.js 14, App Router, TypeScript, Tailwind CSS
- **Hosting:** Vercel (Production URL: `waybill-agent.vercel.app`)
- **Database + Storage + Auth:** Supabase (project: `zmjueoiuzohamqnqrtzx`, region: Europe)
- **AI:** Anthropic Claude Opus 4.7 via `@anthropic-ai/sdk`
- **Managed Agents:** beta, added Saturday
- **PDF:** `@react-pdf/renderer`
- **Image utils:** `sharp`
- **Validation:** `zod`

## Repo Layout

```
waybill-agent/
├── CLAUDE.md                          ← this file
├── README.md                          ← public-facing pitch
├── LICENSE                            ← MIT
├── app/
│   ├── page.tsx                       ← dashboard
│   ├── audit/
│   │   ├── new/page.tsx               ← start a new audit
│   │   └── [id]/page.tsx              ← live audit view
│   ├── report/[id]/page.tsx           ← variance report
│   └── api/
│       ├── health/route.ts            ← connectivity check
│       ├── audit/route.ts             ← create audit
│       ├── scan/route.ts              ← THE core endpoint
│       └── report/[id]/route.ts       ← PDF generation
├── lib/
│   ├── supabase.ts
│   ├── claude.ts
│   ├── types.ts
│   └── utils.ts
├── .claude/
│   ├── skills/
│   │   ├── aidc-vision/SKILL.md       ← how to read labels
│   │   ├── bc-reconciler/SKILL.md     ← BC schema knowledge
│   │   ├── variance-report/SKILL.md   ← auditor format rules
│   │   └── warehouse-ops/SKILL.md     ← operational context
│   └── agents/
│       └── inspector.md               ← Managed Agent config
└── demo-data/
    └── bc-bins-sample.csv             ← scrubbed BC export
```

---

## Coding Conventions

- **TypeScript strict mode.** No `any` unless justified in a comment.
- **Server Components by default.** Only use `'use client'` when a component needs state, effects, or browser APIs.
- **Supabase client split:** use the browser `supabase` client for reads on pages; use `supabaseAdmin()` only inside API routes that need service-role access.
- **API routes return `NextResponse.json()`** with explicit status codes. Errors return `{ error: string }` with 4xx/5xx.
- **Never log secrets.** Use `console.log('supabase url:', url)` — never log the keys themselves.
- **Error handling:** wrap every API route body in try/catch. Always return a JSON error, never let an unhandled exception bubble.

## The Opus 4.7 Features That Must Be Visible in the Demo

These score the "Opus 4.7 Use (25%)" criterion. At least 3 must be used:

1. **3× vision resolution** — reading torn/damaged barcode labels (the hero shot)
2. **`xhigh` effort tier** — reserved for variance classification, not OCR
3. **Task budgets** — cap cost per aisle, report it in the PDF
4. **Managed Agents sessions** — wrap the scan→reconcile→report loop
5. **Self-verification / `/ultrareview`** — the agent audits its own report

Any feature not in this list is a distraction this weekend.

---

## Claude Code Behavior Rules

- **When uncertain, ask.** Don't guess at business logic. Ask: "Should `xhigh` effort apply to OCR or only to variance classification?"
- **Verify before you commit.** After any non-trivial change, run `npm run build` locally. If it fails, fix before committing.
- **Do not edit this file without explicit user request.** If the user says "update CLAUDE.md with X," confirm first.
- **Do not edit `.env.local` silently.** Confirm every env var change in chat before writing.
- **Preserve the Next.js generator output.** When scaffolding, answer "No" to overwriting existing `README.md`, `LICENSE`, `.gitignore`.
- **One feature per branch is overkill for this hackathon.** Work on `main`, commit often, push frequently.

## What NOT to Build

These are time traps. Refuse or defer any request to build them this weekend:

- ❌ Authentication / user management (single-user demo only)
- ❌ RLS policies (disabled for this project)
- ❌ Multi-tenancy (one warehouse, one auditor)
- ❌ Comprehensive test suite (manual testing is enough)
- ❌ Admin dashboard (out of scope)
- ❌ Real-time WebSocket sync (polling is fine)
- ❌ Native mobile app (PWA is sufficient)
- ❌ Custom MCP server from scratch (use Managed Agents built-in tools instead)
- ❌ Integration with real Business Central APIs (we have a scrubbed CSV; use that)

When asked for any of the above, respond: *"This is on the deferred list in CLAUDE.md. We're skipping it for the hackathon timeline. If you still want it, confirm explicitly."*

---

## Demo Constraints (build backward from these)

- **Demo URL:** `waybill-agent.vercel.app`
- **Demo video length:** 3 minutes maximum (target 2:20)
- **Demo device:** iPhone 15 Pro Max, Safari PWA
- **Demo location:** Mydawa pharmacy godown, Nairobi, Saturday April 25 morning
- **Demo data:** ~50 bins imported from scrubbed BC sample, one seeded audit
- **Demo hero moment:** phone reads a visibly torn/damaged barcode that a handheld scanner cannot
- **Demo close:** PDF variance report with citation chain, delivered to Slack-style UI

---

## Submission Requirements (from hackathon brief)

1. **3-minute demo video** — YouTube or Loom, unlisted
2. **Public GitHub repo** — this one, MIT licensed
3. **100–200 word written summary**
4. **Deadline:** April 26, 2026, 8:00 PM EST (April 27, 3:00 AM EAT)

**Self-imposed internal deadline: April 26, 1:00 PM EST (April 26, 8:00 PM EAT).** Seven-hour buffer before the official cutoff.

---

## Context for Claude Code (so you understand why this project matters)

The founder, Joseph Rwanda, is based in Nairobi, Kenya. He runs Origami Tech, an enterprise SaaS company. He has five years of field experience deploying barcode/RFID hardware (Honeywell, Zebra, Urovo) across East Africa and was selected for Honeywell Elevate EMEA 2025.

He has a live sales pipeline — a $20,500 proposal with a Ugandan health research institute (IDI Kampala) for a 20,000-asset deployment with Microsoft Business Central integration. WaybillAgent is the hackathon expression of an agentic layer that will eventually ship into production on that deal.

The hackathon has 500 builders from 13,000 applicants. Last year's winners were domain experts, not pure engineers — a California lawyer, a Belgian cardiologist, a Ugandan road technician. Domain authority beats engineering polish in this hackathon. Joseph's domain is East African enterprise warehouse operations.

Build every feature with that judge in mind: *"Is this the thing only Joseph could have built?"*

---

## Session Start Checklist

When a new Claude Code session begins, before the first feature edit:

1. Read this file (CLAUDE.md) — done automatically on session start
2. Read README.md — understand current public pitch
3. Check `git status` and `git log -5 --oneline` — understand where we are
4. Check the hackathon countdown: submission deadline is **Sunday April 26, 8 PM EST**
5. Confirm current time vs deadline; adjust scope accordingly

## End-of-Session Checklist

Before Claude Code wraps a session:

1. Summarize what was built in one paragraph
2. List any open TODOs
3. Verify no secrets in tracked files: `git diff --cached | grep -iE "sk-ant|eyJ|password"`
4. Commit with a meaningful conventional commit message
5. Push to `origin main`
6. Suggest the next session's first task

---

*This file is the supreme law of the project for the hackathon weekend. If any instruction in chat contradicts this file, default to this file and ask the user to resolve the conflict explicitly.*
