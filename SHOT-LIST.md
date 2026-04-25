# Mydawa Shoot — Saturday April 25, 2026

**Time:** 9:00 AM – 12:00 PM EAT
**Location:** Mydawa pharmacy godown, Nairobi
**Device:** iPhone 15 Pro Max — 4K at 30fps, landscape orientation always
**Backup:** 15-bin mock rack in home office with real products, shot list preserved
**Written permission:** ✅ (WhatsApp screenshot saved)

---

## Before You Leave Home (7:00–8:30 AM)

### Kit

- [ ] iPhone 15 Pro Max — 100% charged
- [ ] Backup battery pack — fully charged
- [ ] AirPods or wired earbuds (for cleaner voiceover capture later)
- [ ] Lens wiper cloth — the iPhone lens picks up every smudge, and dusty godowns are unforgiving
- [ ] Laptop (MacBook / whatever you dev on) — fully charged + charger
- [ ] Borrowed Zebra or Honeywell handheld scanner if possible (for the comparison shot)
- [ ] Printed copy of this shot list (your phone will be filming, you can't scroll)
- [ ] A small notebook + pen for any audible ambient audio notes

### Technical Pre-Flight

- [ ] Open `waybill-agent.vercel.app` on iPhone Safari — verify it loads
- [ ] Test camera fires when you tap upload — on the deployed URL, not localhost
- [ ] Test one successful scan end-to-end — variance appears in DB
- [ ] Verify `OPUS-4-7-READY` in a local terminal run — no API key issues
- [ ] Seed one fresh audit row in Supabase — `warehouse_name: "Mydawa Embakasi Godown"`
- [ ] Save the audit ID — you'll need it at the warehouse

### People

- [ ] Text Mydawa contact: "On my way, arriving around 9. See you in 30."
- [ ] Tell a family member you'll be back by 1 PM

---

## Arrive at Mydawa (9:00 AM)

1. **Don't start filming immediately.** Walk with the Mydawa contact for 5 minutes. Pick the cleanest, best-lit aisle. Cold warehouses with natural skylights film better than fluorescent-only.
2. **Explain the shoot in 30 seconds:** "I'll walk this aisle with my phone, scan maybe 10 bins, capture a laptop screen updating. No product close-ups unless you say so. About 2 hours total."
3. **Ask permission to move one damaged box** to a bin for the hero shot. If they say no, find a naturally damaged label instead.
4. **Hand them the printed shot list.** Nothing breaks trust faster than a visitor who looks suspicious about what they're filming. Show them.

---

## Shot Priority Framework

Shots are tagged:

- ⭐⭐⭐ = **MUST GET.** If weather/access/time fails, you still have a submission with these.
- ⭐⭐ = **STRONG BOOST.** Dramatically improves the video if you get them.
- ⭐ = **NICE TO HAVE.** Fills gaps and adds polish.

---

## The Shot List (in filming order)

### 1. ⭐⭐⭐ Wide Establishing Shot — the godown at scale

**What it shows:** The warehouse exists. It's real. It's in Nairobi. This is not a dorm room demo.

**How to shoot:**
- Stand at one end of a long aisle
- Landscape, iPhone held horizontally, chest-height
- Slowly pan from left to right across the aisle, 8 seconds
- Keep the phone steady — no shaky hand movement
- Capture natural ambient sound (forklift hum, distant voices)

**Takes:** 2 minimum. If one is shaky, the second one saves you.

**Usage in video:** The very first 3 seconds of the cold open.

---

### 2. ⭐⭐⭐ The Hero Shot — scanning a torn/damaged label

**What it shows:** The single moment that wins the hackathon. A label that's torn, faded, scratched, or smudged — something a human can barely read — and Opus 4.7 reads it cleanly.

**How to shoot:**
- Find the most visibly damaged barcode label in the godown. Corners torn off, faded, crumpled — the worse, the better.
- If nothing is damaged enough, ask permission to dent/crease a spare label.
- Phone in one hand, approach the label naturally.
- Frame: label in center, your finger tapping "Scan" visible in corner.
- Shoot the approach, the tap, the result appearing — **all in one continuous take**, no cuts.
- 12–15 seconds of footage.

**Takes:** 4 minimum. This is the most important shot of the entire weekend.

**Audio:** Silent is fine — the result on screen does the talking.

**Usage in video:** Roughly 0:45–1:00 mark. The moment the judge leans forward.

---

### 3. ⭐⭐⭐ The Comparison Shot — Zebra handheld fails on the same label

**What it shows:** The same torn label that Opus just read. A $2K industrial scanner. An error beep or blank screen. The contrast is the story.

**How to shoot:**
- If you have a Zebra/Honeywell handheld with you, use it.
- If not, borrow Mydawa's. If they don't have one, contact Krystal East Africa or similar for a loaner Friday afternoon — tell them it's for a public demo and you'll credit them.
- If no handheld is available at all, use a regular consumer-grade barcode scanning app on a different phone and show the "no barcode detected" error. Less ideal, still usable.
- Close-up on the scanner screen.
- Point at the torn label. Pull the trigger. The scanner fails (error beep, blank screen, or just silence).
- 8 seconds of footage.

**Takes:** 3 minimum.

**Usage in video:** Roughly 0:30–0:45. Sets up the hero shot.

---

### 4. ⭐⭐⭐ The Walk — you in motion down the aisle

**What it shows:** Normal human movement. This isn't a tripod-locked studio demo. It's real work in a real place.

**How to shoot:**
- Ask someone (the Mydawa contact?) to walk slowly ahead of you, holding the phone back toward you at shoulder height.
- You walk down the aisle at a natural pace, holding your own phone, tapping to scan bins along the way.
- 20–30 seconds of continuous footage.
- Capture your face once — a brief moment of focus as you scan.

**Takes:** 2 minimum.

**Usage in video:** Backbone of the 0:45–1:45 section. Cut between this and the screen captures.

---

### 5. ⭐⭐ Laptop Live Update — the variance log populates

**What it shows:** The system is working in real-time. Not post-processed. Live.

**How to shoot:**
- Laptop on a pallet or shelf in the aisle, screen facing camera
- Open `waybill-agent.vercel.app` in a browser, on the audit detail page for the seeded audit
- As you scan bins on the phone (someone else holds phone and scans), new variance rows appear on the laptop screen
- 10–15 seconds of footage
- Zoom in on the moment a new variance row appears

**Takes:** 3 minimum (network/latency varies).

**Usage in video:** 1:15–1:30. Transition from "phone scanning" to "system responding."

---

### 6. ⭐⭐ The Confirmation Moment

**What it shows:** Human-in-the-loop. The agent found something suspicious and asked for confirmation. You tap. Walk resumes.

**How to shoot:**
- Staged: scan a pre-selected bin where the expected item code differs from what the label shows
- The app shows: "Wrong item detected. Continue?"
- You pause, look at the bin, tap Confirm
- 10 seconds of footage
- Keep your face mostly out of frame; the judge wants to see the interaction, not you

**Takes:** 3 minimum.

**Usage in video:** 1:30–1:40. Shows sophistication. Manages scope — the agent doesn't auto-decide on ambiguity.

---

### 7. ⭐⭐ The End State — report arrives

**What it shows:** The outcome. A PDF. A Slack-style notification. Done.

**How to shoot:**
- Last bin scanned, you stop at the end of the aisle
- Phone screen shows: "Audit complete. 3 discrepancies. Report generated."
- Tap to open → PDF loads → scroll through the citation chain
- 10–15 seconds

**Takes:** 2 minimum.

**Usage in video:** 1:50–2:10. The payoff.

---

### 8. ⭐ B-Roll — your hands, close-ups, texture

**What it shows:** Cinematic grammar. Makes the video feel polished.

**Shots to grab (30 seconds each, no need for retakes unless disastrous):**
- Close-up on your hands holding the phone
- Close-up on a bin label (clean and torn)
- Close-up on the phone screen mid-scan
- Wide shot of the laptop on the pallet
- The Mydawa signage from outside (if allowed — ask first)
- A pan across the aisle ceiling lighting

**Takes:** 1 each.

**Usage in video:** Sprinkled throughout to transition between main shots.

---

### 9. ⭐ Ambient Audio — 30 seconds of godown sound

**What it shows:** Authenticity. Silent demos feel staged.

**How to record:**
- Phone's built-in mic, held still
- No talking from anyone in the scene
- Capture: forklift beeps, distant voices, shelf rattles, footsteps
- 30 seconds of clean ambient

**Usage in video:** Underlay through the whole video at very low volume. Makes the whole thing feel alive.

---

## During the Shoot — Discipline Rules

1. **Do not review footage in the warehouse.** Shoot the whole list, then review in the car. Reviewing during shoot eats 50% of your time to save 10% of reshoots.
2. **Shoot landscape. Always. Every shot.** Portrait footage is amateur hour on YouTube.
3. **4K at 30fps, not 60fps.** Smaller files, more room to color-grade later.
4. **Lock exposure before each take.** Tap and hold on the iPhone screen until "AE/AF LOCK" appears. Prevents the auto-brightness from bouncing around.
5. **No talking during the takes that need silent ambient audio.** You can add voiceover in post.
6. **Thank Mydawa staff who help.** Get a contact name for the credits screen of the video — it's a 1-second card that scores unexpected goodwill points with judges.
7. **Shoot the torn-label hero shot TWICE in two different lighting conditions** if possible. You cannot have too many takes of the one shot that wins the hackathon.

---

## Wrap (12:00 PM)

1. [ ] Review the shot list — confirm every ⭐⭐⭐ is captured
2. [ ] Back up the footage: AirDrop or iCloud sync to laptop while you're driving home
3. [ ] Thank the Mydawa contact, send a WhatsApp follow-up when home
4. [ ] Take one final establishing shot of the exterior godown — you may need it for the closing frame

---

## If Something Goes Wrong

| Problem | Recovery |
|---|---|
| Camera won't fire in Safari | Fallback to native camera app → upload via `<input>` later, shoot both Mydawa and app separately |
| No torn labels exist | Create one: ask for a spare label, crease/tear it, put it on a bin |
| No Zebra handheld available | Use consumer barcode app and show its failure |
| Mydawa asks you to leave early | Wrap whatever shots you have. You have the fallback mock rack at home for anything missing. |
| Phone battery dies | Backup battery. If backup also dies, laptop charger into phone for 10 min restart. |
| Network is down in godown | The API calls don't need live network if you cache the image locally and upload later. Test this Friday night. |

---

## Video Edit Plan (Saturday Afternoon, 2:00–7:00 PM)

Target runtime: **2:20–2:30** (under 3:00 max)

### Structure:

**0:00–0:15 — Cold open**
- Shot 1 (wide establishing) with ambient audio coming up
- Your voiceover: *"An asset audit in a Nairobi warehouse today takes three people, two weeks, and a $2,000 scanner."*
- Cut to you holding the phone
- *"This does it in forty minutes."*

**0:15–0:45 — The problem**
- Shot 3 (Zebra failing on torn label)
- Your voiceover: *"Industrial scanners read barcodes. They don't read damaged barcodes. They don't reconcile against the ERP. And they don't ship a report an auditor will sign."*

**0:45–1:45 — The demo (the meat)**
- Shot 2 (hero: Opus reads the torn label)
- Silent for 4 seconds — let the screen speak
- Shot 4 (you walking the aisle)
- Shot 5 (laptop updating)
- Shot 6 (confirmation moment)
- Voiceover: concise, captions the action, doesn't repeat what's on screen

**1:45–2:05 — What Opus 4.7 did**
- Screen recording montage: `xhigh` reasoning, Managed Agents session log, `/ultrareview` pass
- Voiceover: *"Opus 4.7's 3× vision reads torn labels the handhelds fail on. A Managed Agent runs the forty-minute walk as one stateful session. `/ultrareview` audits the final report before it ships."*

**2:05–2:20 — Close**
- Shot 7 (report arrives)
- Hold on PDF with citation chain
- Voiceover: *"A health research institute in Kampala has 20,000 assets to audit. This is the one-person version. Built in two days in Nairobi with Claude Opus 4.7. Repo's open."*
- End card: `waybill-agent.vercel.app` + `github.com/rmjoe99/waybill-agent`

### Technical edit notes:

- **Tools:** CapCut (free, fast) or DaVinci Resolve (free, advanced) or Descript (AI-assisted, fastest)
- **Captions:** Baked in. Judges watch muted on first pass.
- **Music:** Optional and subtle. Ambient godown audio is often enough. If you add music, royalty-free only (Epidemic Sound, YouTube Audio Library).
- **Color grade:** Slight warm LUT. Godown light is often green-cast — neutralize it.
- **Aspect ratio:** 16:9, 1920×1080.
- **Export:** H.264 MP4, ~15 Mbps target, under 200 MB ideally.
- **Subtitles file:** Generate `.srt` separately in Descript, upload to YouTube as captions.

---

## Submission Uploads

- [ ] Upload final MP4 to YouTube, **unlisted**, title: *"WaybillAgent — Built with Opus 4.7 Hackathon"*
- [ ] Upload backup to Loom
- [ ] Generate shareable links for both
- [ ] Include both in submission (YouTube as primary, Loom mentioned in description)
- [ ] Test the YouTube link incognito on iPhone and laptop — verify it plays

---

## One Final Rule

**If by Saturday 11 PM the video isn't edited, stop trying to edit more. Submit what you have.**

A finished 2:00 video beats a "perfect" 2:30 video that doesn't get submitted. Every hackathon loses entries this way. Don't be one of them.

**You've got this.** 🎬
