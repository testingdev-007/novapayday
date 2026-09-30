# NovaPay Copilot Workshop — Full Briefing

A full-day, in-person workshop teaching UK students (Y9–Y13, ages 13–18) how to use GitHub Copilot by debugging and extending a fake banking app called **NovaPay**. You're running it solo as facilitator. Everything lives in a set of ~46 linked HTML/JS/MD files, all in `/mnt/user-data/outputs/`.

---

## 1. The big idea

Students spend the morning fixing planted bugs in a broken banking dashboard, then the afternoon building their own small banking feature from scratch — both using GitHub Copilot as their assistant. A custom AI persona called **Nova** (just Copilot Chat with custom instructions layered on) acts as their in-editor mentor: restrictive (hints only, no answers) during the bug hunt, generative (builds with them) during the feature-creation phase.

The pitch to students: *"Today you'll go from a bug-ridden page to a working feature you designed yourself — using the same AI-assisted workflow real developers use."*

---

## 2. Logistics & setup model

- **Personal GitHub accounts**, not organisation/Business accounts — Business self-serve signup was paused when this was built, so personal accounts is the deliberate, current path.
- Each student uses **"Use this template"** to create their own personal repo, then opens it in a **GitHub Codespace** (cloud dev environment, works on any device including school machines/iPads).
- **VS Code Live Server extension** renders the HTML; the correct extension ID is `ritwickdey.LiveServer` (an earlier wrong ID was caught and fixed everywhere).
- Nova is just GitHub Copilot Chat with a custom `.github/copilot-instructions.md` file in each student's repo — phase-aware (restrictive during bugs, generative during build), with an explicit hard rule for Agent mode: make **one** real fix then stop and explain, never refuse outright.

### The two-repo / file split
- **Student's personal repo** contains only what they need: `bank-dashboard.html` (the buggy app), `starter-template.html` (optional reference), `challenge.js` (pre-loaded with a buggy function for the Level Up bug-fix round), the devcontainer config, and Nova's instructions file.
- **Hub/reference pages** (tutorials, screens, facilitator materials) are browsed separately — never uploaded into student repos. These aren't hosted anywhere yet (GitHub Pages hosting is a known, non-blocking gap) — open them locally on your machine/projector.

---

## 3. The day, start to finish (9:30am start, ~5 hours, ends 2:30pm)

| Time | Segment | Length |
|---|---|---|
| 9:30 | **Welcome** — intros, Codespace setup, ice breaker | 15 min |
| 9:45 | Copilot demo — inline completions + Chat, live | 15 min |
| 10:00 | **Bug tutorial** — everyone follows a worked *fake* example together | 10 min |
| 10:10 | **Independent bug hunt** — the real 10 planted bugs | 20 min |
| 10:30 | Share out | 5 min |
| 10:35 | **Level Up ⚡** — the reveal, GitHub/Codespaces concepts, 3 challenge rounds (Fix the Bug → Comment Race → Best Prompt), golden rules | 30 min |
| 11:05 | ☕ **Comfort break** | 15 min |
| 11:20 | **Feature tutorial** — everyone builds a Savings Tracker together, from a blank file | 20 min |
| 11:40 | Brainstorm — their own idea (not the tracker) | 15 min |
| 11:55 | Plan on paper — 4 questions, no keyboards | 10 min |
| 12:05pm | 🍽️ **Lunch** — accessibility activities happen during this window | 30 min |
| 12:35pm | ♿ **Accessibility discussion** — quick group chat incorporating what came up at lunch, right before building starts | 5 min |
| 12:40pm | **Feature creation** — one continuous block: structure → logic → styling → testing, all folded in | 85 min |
| 2:05pm | Show & tell — 2 min demos each | 15 min |
| 2:20pm | Feedback — quick round, close | 10 min |
| **2:30pm** | **Session ends** | |

**Design notes worth remembering:**
- All times in every document are *elapsed from session start*, not clock time — there's a parallel clock-time version of the main agenda for zero mental math on the day.
- Lunch sits **before any feature creation starts** (deliberately) — groups have a plan sketched but nothing built yet, so nobody's mid-flow when they break for lunch.
- There's no separate checkpoint or testing slot in the afternoon — testing is folded into the single 85-minute creation block; you just have to pace it yourself as you circulate (rough internal guide: structure done ~25 min in, styled/working ~1hr in, testing near the end).
- The feature tutorial (guided, from-scratch Savings Tracker build) happens *before* the brainstorm on purpose — so nobody free-associates on a totally blank page with zero technique yet.

---

## 4. The architecture behind Nova

- Nova is **restrictive** during the bug hunt (hints only, e.g. "are there any bugs in this code?" prompts) and **generative** during feature creation.
- Verifying Nova actually loaded: check the **References list** on a Copilot Chat response — click it to confirm the instructions file was used. This is more reliable than judging by "personality."
- **Agent mode** (distinct from Ask/Chat) is action-biased and needed an explicit hard rule: make one real fix, then stop and explain — the first version of this rule caused Nova to refuse fixes entirely, which had to be corrected.
- `challenge.js` is **pre-loaded** with a buggy function as a repo asset (not created fresh in-session) — this was a late but important fix, because asking Copilot Chat to review a cold-pasted loan-calculation snippet sometimes triggered a false "SQL injection" refusal. Pre-loading it as a real file avoids that entirely.

---

## 5. The 10 planted bugs (bank-dashboard.html)

| # | Difficulty | Bug |
|---|---|---|
| 1 | Easy | Missing closing `</div>` tag |
| 2 | Easy | Balance text colour matches background (invisible) |
| 3 | Easy | Coffee purchase shows as credit instead of debit |
| 4 | Medium | Input type is `text` instead of `number` |
| 5 | Medium | Button typo: `onlick` instead of `onclick` |
| 6 | Medium | Wrong operator: adds instead of subtracts on withdrawal |
| 7 | Medium–Hard | Element ID typo (`balence-display` vs `balance-display`) |
| 8 | Hard | `NaN` shown on empty input — missing `isNaN()` check |
| 9 | Hard | Wrong interest formula — missing `/100` |
| 10 | Hard | No overdraft check |

Bugs 3, 8, 9, 10 are logic/data errors rather than syntax errors — if a group asks Copilot to "fix everything at once," it will likely miss these. That's flagged as a deliberate live teaching moment if it happens.

---

## 6. Known technical gotchas (from your own testing)

- **Codespace staleness**: creating a Codespace *before* adding a file to the repo means it won't see that file until rebuilt or recreated (`Ctrl+Shift+P` → Rebuild Container).
- **Save vs push**: `Ctrl+S` only saves to the Codespace's own disk — it does **not** push to GitHub. Only commit + push updates the repo. A new Codespace always pulls from GitHub's last-pushed state, so an unpushed fix is lost if that Codespace gets deleted. This was the root cause behind a repeated "fresh Codespaces still ignore Nova" issue.
- **If `git push` hangs**: bypass the Codespace entirely — paste the file content into github.com's own web editor and commit there instead, since it uses the browser's connection rather than whatever's blocking the Codespace's git path.
- **If Nova is too restrictive for one student**: only affects that student (each has their own repo) — rename their `.github/copilot-instructions.md` on github.com, rebuild their Codespace, and Copilot reverts to normal for them only.

---

## 7. Full file map (all in `/mnt/user-data/outputs/`)

**Start here / hub pages:** `index.html` (3-door landing), `admin-setup.html` (setup hub), `run-the-session.html` (your facilitator hub — train yourself → hold-all-day scripts → day-of toolkit → screens), `student-index.html`.

**Your authoritative timing documents** (fully rebuilt and cross-checked against each other — all show the identical 15-segment, 5-hour schedule above):
- `session-plan.html` — the master reference with full rationale for every segment
- `printable-master-script.html` — the "stick to like glue" facilitator script, say-this lines included
- `printable-timed-agenda.html` / `printable-timed-agenda-clock.html` — one-page versions, elapsed and real clock time
- `student-day-agenda.html` — student-facing version
- `printable-session-day.html` — a shorter alternate script (also fully current)
- `copilot-bootcamp.html` — the detailed Level Up facilitator script and timeline

**One file that's genuinely out of step:** `build-phase-guide.html` describes the build phase with its own internal Demo→Brainstorm→Plan→Sprint→Checkpoint→Sprint structure and its own offset-based timing. That shape no longer matches the day (brainstorm/plan now happen before lunch, there's no checkpoint, creation is one block) and would need restructuring, not just relabelling, to fix properly. Since the master script and session plan already cover this ground correctly, you may not need it at all.

**Setup guides:** `setup-guide-v2.html` / `printable-setup-guide-v2.html` (the current personal-accounts path), `facilitator-setup-guide.html`, `launch-timeline.html`.

**Exercise files (student-facing):** `bank-dashboard.html`, `starter-template.html`, `example-feature.html`, `challenge.js`.

**Nova:** `copilot-instructions.md`.

**Student tutorials:** `how-to-find-fix-bugs.html` (bug method walkthrough), `how-to-build-your-feature.html` (from-scratch Savings Tracker build, 10 steps).

**Level Up:** `level-up-screen.html` (13-slide deck), `copilot-bootcamp.html` (script).

**Facilitator training & reference:** `facilitator-training.html`, `nova-vs-copilot.html`, `printable-facilitator-training.html` (paper twin with full bug answers, screen-free), `facilitator-reference.html`, `bug-answer-key.html`.

**Printables:** `printable-roster.html`, `printable-preflight-checklist.html`, `printable-progress-tracker.html`, `printable-prompts-cheatsheet.html`, `printable-when-it-breaks.html`, `printable-troubleshooting-card.html`, `bug-test-plan.html` / `printable-bug-test-plan.html`, `feature-test-plan.html` / `printable-feature-test-plan.html`, `printable-bug-cheatsheet.html`.

**Screens (projector):** `bug-hunt-screen.html`, `brainstorm-screen.html`, `milestone-screen.html`.

**Student materials:** `participant-guide.html`.

---

## 8. Before you run this again

1. Check the two Copilot billing/limits items in the review above (50 chat-messages/month cap on personal Free accounts is the one that could actually break the day).
2. Do one fresh click-through of the real Copilot Chat / Agent interface in VS Code — the UI has changed since this was built, even if the underlying mechanics haven't.
3. Re-verify: upload the current `copilot-instructions.md` + `challenge.js` to a test repo, confirm the References list shows the instructions file, confirm Agent mode makes one fix then stops.
4. Print or open: Master Script, Timed Agenda (clock version), Troubleshooting Card, Roster, Preflight Checklist.
5. Decide what to do with `build-phase-guide.html` — fix, retire, or ignore.
