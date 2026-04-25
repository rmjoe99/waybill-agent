# WaybillAgent — Winning Plan

**Print this. Tape it next to your laptop. Refer back whenever you're tempted to scope-creep.**

---

## The Scoreboard

Total judging weight: **100%**

| Criterion | Weight | How WaybillAgent scores |
|---|---|---|
| **Impact** | 30% | Real problem + real customer ($20.5K IDI Kampala pipeline) + emerging-markets story |
| **Demo** | 25% | Real warehouse footage + live deployed URL + torn-label hero moment |
| **Opus 4.7 Use** | 25% | Vision + Managed Agents + xhigh + task budgets + self-verification |
| **Depth & Execution** | 20% | Clean repo, 4 skills, citation chain, commit history |

Side prizes (pick up even if not top 3):
- **Best use of Managed Agents ($5K)** — central architecture, not bolted on
- **Keep Thinking Prize ($5K)** — Nairobi warehouse is a problem nobody pointed Claude at before

Last cohort: 1st place = $100K. This cohort: 1st = $50K, 2nd = $30K, 3rd = $10K + side prizes. **Stack them.**

---

## Timeline (Nairobi time)

| When | Block | Output | Deadline |
|---|---|---|---|
| **Fri 8:00 AM** | Verify setup | `OPUS-4-7-READY` prints | Hard |
| **Fri 8:30 AM** | Build core vision endpoint | `/api/scan` works on 1 torn label | Hard |
| **Fri 10:30 AM** | Test on real label | Screenshot for tweet #2 | Hard |
| **Fri 11:30 AM** | Minimal UI + Vercel deploy | `waybill-agent.vercel.app` loads on iPhone Safari | Hard |
| **Fri 1:00 PM** | Lunch / Origami work | Step away, clear head | — |
| **Fri 7:00 PM** | Mike Brown live session (Discord) | Attend. Take notes. | Hard |
| **Fri 8:30 PM** | Add reconciliation + variance logic | Variances saved to DB | Soft |
| **Fri 11:00 PM** | Tweet #2, commit, sleep | | Hard |
| **Sat 7:00 AM** | Pre-shoot prep | Phone charged, laptop bag, shot list | Hard |
| **Sat 9:00 AM** | ARRIVE AT MYDAWA | Written permission confirmed | Hard |
| **Sat 9:00 AM – 12:00 PM** | **THE SHOOT** | All shots captured (see SHOT-LIST.md) | Hard |
| **Sat 1:00 PM** | Wrap Managed Agents integration | Session-based scan flow | Soft |
| **Sat 2:00 PM** | PDF report + citation chain | `/report/[id]` renders a PDF | Soft |
| **Sat 4:00 PM** | Video edit round 1 | Rough cut, 2:30 | Hard |
| **Sat 7:00 PM** | Video edit round 2 | Final cut + captions | Hard |
| **Sat 10:00 PM** | Submit video + repo URL locked | All content exists | Hard |
| **Sat 11:00 PM** | Sleep | | Hard |
| **Sun 10:00 AM** | README polish + `/ultrareview` | Repo is submission-ready | Soft |
| **Sun 12:00 PM** | Michal Nedoszytko session (Discord) | Past winner insights | Optional |
| **Sun 2:00 PM** | Write 100-200 word submission summary | Final copy ready | Hard |
| **Sun 4:00 PM** | Practice submission (don't submit) | Verify CV platform works | Hard |
| **Sun 8:00 PM EAT / 1:00 PM EST** | **SUBMIT** | 7-hour buffer before deadline | Hard |

---

## Success Criteria (check each one before moving to the next phase)

### Friday End-State

- [ ] `/api/scan` takes a photo, calls Opus 4.7 vision, saves to Supabase, returns structured JSON
- [ ] Reading a torn/damaged label in Opus 4.7 produces better output than a plain OCR library
- [ ] `waybill-agent.vercel.app` is live and loads on iPhone Safari
- [ ] The camera fires when you tap the upload button on iPhone Safari
- [ ] 10+ commits pushed to main
- [ ] Tweet #2 posted with torn-label screenshot
- [ ] You slept by midnight

**If any of these fail, Friday is not complete. Push through or accept that Saturday will be harder.**

### Saturday End-State

- [ ] All 7 hero shots from SHOT-LIST.md are filmed
- [ ] Video is edited, 2:20–2:30, 1080p, captions baked in, uploaded to YouTube (unlisted) + Loom (backup)
- [ ] PDF variance report renders with citation chain
- [ ] Managed Agents session wraps the scan flow (or is gracefully abstracted)
- [ ] All 4 SKILL.md files have real content (not placeholders)
- [ ] Tweet #3 posted with 8-second clip from the shoot
- [ ] You slept by 11 PM

### Sunday End-State

- [ ] README is polished, matches the video
- [ ] 100–200 word submission summary finalized
- [ ] Repo MIT license visible, no secrets in history
- [ ] `/api/health` returns `{"status":"healthy"}`
- [ ] Cerebral Valley submission made with 7-hour buffer

---

## Decision Rules When You're Stuck

### "Should I build feature X?"

Run this filter in order. Stop at the first No:

1. Is it in the "Must Have" list below? → If no, skip.
2. Does it score on Impact / Demo / Opus 4.7 Use / Depth? → If no, skip.
3. Can you ship it in under 2 hours? → If no, defer or cut.
4. Does it risk breaking something that already works? → If yes, wait until Sunday polish.

If all four answers are Yes, build it. Otherwise, don't.

### "Should I re-film / re-record?"

- **Re-film a shot if:** it's out of focus, audio is unusable, or the hero moment isn't captured.
- **Don't re-film if:** the shot is "just okay." Good enough beats perfect and late.

### "Should I add polish X to the code?"

- Is it Sunday morning? → Yes.
- Is it before Saturday 10 PM? → No, ship the demo first.

### "Should I respond to this Discord message?"

- Is it a direct question to you, or a question you uniquely can answer? → Yes, within reason.
- Is it general chatter? → Ignore. You're building.
- Is it a judge speaking? → Acknowledge briefly, don't pitch.

---

## Must-Have vs Nice-to-Have

### MUST HAVE (if any fail, you're not competitive)

1. Deployed `waybill-agent.vercel.app` that loads on iPhone Safari
2. `/api/scan` endpoint that uses Opus 4.7 vision correctly
3. At least one damaged/torn label demo that reads successfully
4. Mydawa footage of you walking an aisle with the phone
5. 3-minute demo video uploaded and linked in submission
6. Public GitHub repo with MIT license and 20+ commits
7. 100–200 word written summary

### SHOULD HAVE (each adds a differentiator)

8. Managed Agents session orchestrating the scan flow
9. Variance report PDF with citation chain
10. 4 SKILL.md files with real domain content
11. Side-by-side "handheld vs phone" shot in the video
12. `xhigh` effort visibly used for variance classification
13. Daily tweet thread with build updates

### NICE TO HAVE (only if Sunday morning has time)

14. Real-time variance updates via Supabase subscriptions
15. Slack webhook integration (can be mocked)
16. Multiple aisles in the demo (vs just one)
17. A "severity heatmap" visualization
18. Native Share Sheet to save PDF from iPhone

**Do not start anything in "Nice to Have" until every "Must Have" is green.**

---

## Cost & Credits Budget

You have $500 in API credits. Burn rate at `xhigh` with vision is **not trivial**.

| Phase | Estimated calls | Estimated cost |
|---|---|---|
| Dev & testing (Fri) | ~50 vision calls, ~100 text calls | $15–25 |
| Mydawa shoot (Sat) | ~30 real-time vision calls | $8–12 |
| Managed Agents session (Sat) | 3–5 sessions × 40 min each | $20–40 |
| Demo rehearsal + video render | ~30 calls | $5–10 |
| Submission polish (Sun) | ~20 calls | $3–5 |
| **Total projected** | | **$50–100** |

You have 5× budget headroom. Don't worry about cost this week. **Do worry about rate limits** — if you hit one, check the Anthropic console.

**Use Sonnet 4.5 for non-critical text calls** (e.g., parsing utility outputs, unit test generation). Opus 4.7 for anything vision-related or variance-classification. Be deliberate.

---

## Discord & Twitter Cadence

### Twitter (maximum 5 posts, spread across 3 days)

1. ✅ Thursday night: repo live, hackathon announcement
2. Friday night: torn-label screenshot (Opus 4.7 wins over Zebra handheld)
3. Saturday evening: 8-second clip from Mydawa
4. Sunday on submission: video link + repo link
5. (Reserved for winning announcement, only if top 3)

Always tag `@claudeai`. Never tag judges directly.

### Discord

- Attend Mike Brown session Friday 7 PM Nairobi. Take notes.
- Attend Michal Nedoszytko session Sunday 7 PM Nairobi. Optional.
- Answer 2–3 beginner questions in `#questions` during the week. Low effort, high goodwill.
- Ask 1 thoughtful question about Managed Agents long-running sessions in `#office-hours` if you can catch Friday's.
- Do NOT DM judges. Do NOT shill in off-topic channels.
- Do NOT react to the AutoMod warning from earlier — it's forgotten, move on.

---

## Risk Register

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| iPhone Safari camera doesn't fire in PWA | Medium | Critical | Fallback to `<input capture="environment">`. Test on deployed URL by Friday 12 PM. |
| Mydawa cancels filming permission | Low | Critical | Fallback: 15-bin mock rack in Joseph's office with real products. Written permission confirmed Thursday. |
| Managed Agents beta breaks Saturday | Low | High | Wrapped on top of working `messages.create()` code. Can demo the core flow without it. |
| Vercel deploy fails during critical hour | Low | High | Keep local `npm run dev` working as fallback. Have ngrok installed. |
| API rate limits hit during Mydawa shoot | Medium | Medium | Request Tier 2 upgrade now. Pre-stage 3 photos with known results. |
| Joseph too tired Saturday to film well | Medium | Critical | Sleep by midnight Friday. No exceptions. No late-night debugging. |
| Video over 3 minutes at upload | Low | Critical | Target 2:20–2:30 in edit. Cut liberally. |
| Scope creep eats Saturday build time | High | Critical | Re-read this document twice per day. The "NICE TO HAVE" list is a trap. |

---

## The Founder's Mental Model

You've built enterprise software before. You have real customers. You know what judges like Boris Cherny, Cat Wu, and Thariq Shihipar care about — they want to see a tool that could actually ship, not a cute demo.

Your three-sentence answer to any judge's question:

1. *"What does this do?"* → "It replaces a $2K warehouse handheld scanner with a phone running Opus 4.7 vision."
2. *"Why does this need 4.7?"* → "The 3× vision resolution reads torn labels the handhelds fail on. The Managed Agents session runs the 40-minute walk as one stateful conversation. The self-verification pass ensures the report is auditor-grade before it ships."
3. *"Who uses this?"* → "I have a live $20,500 proposal with a Ugandan health research institute for exactly this problem. This hackathon is me compressing six months of roadmap into six days."

Practice those three answers until they're muscle memory.

---

## The Closing Rule

**No feature, no polish, no tweet, no Discord post is worth a bad Saturday morning at Mydawa.**

Everything you do between now and Saturday 9 AM is in service of that shoot. If an activity doesn't make the shoot better or more likely to happen, it's a distraction.

The warehouse footage IS the demo. The demo IS the submission. Protect the shoot above all else.

Go build. 🛠️
