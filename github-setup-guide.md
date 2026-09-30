# Getting to GitHub Codespaces — Step by Step
### From zero to live bug-fixing session

---

## What you're building

By the end of this guide you'll have:
- A GitHub repo containing the NovaPay dashboard
- A template participants can use to get their own copy in one click
- A Codespace that opens with Live Server and Copilot pre-installed
- A shareable URL you read out on the day

Total prep time: **about 20 minutes**.

---

## Files you need in your repo

```
novapay-workshop/
├── bank-dashboard.html       ← the buggy dashboard
└── .devcontainer/
    └── devcontainer.json     ← sets up Live Server + Copilot automatically
```

Both files are in your download pack.

---

## Part 1 — Your prep (do this before the session)

### Step 1 — Create a GitHub account (skip if you already have one)

Go to **github.com** → click **Sign up** → follow the steps.
Free account is all you need.

---

### Step 2 — Create a new repository

1. Once logged in, click the **+** icon (top right) → **New repository**
2. Fill in:
   - **Repository name:** `novapay-workshop`
   - **Description:** *(optional)* GitHub Copilot workshop — bank dashboard
   - **Public** ✅ (participants need to be able to see it)
   - **Add a README file** ✅ (tick this — makes the next steps easier)
3. Click **Create repository**

---

### Step 3 — Upload your files

You need to upload two things: the HTML file and the devcontainer config.

**Upload the HTML file:**
1. On your repo page, click **Add file** → **Upload files**
2. Drag in `bank-dashboard.html`
3. Scroll down, click **Commit changes**

**Upload the devcontainer config:**

The `.devcontainer` folder needs to be created with a file inside it. GitHub's upload UI can't create folders directly, so do this instead:

1. Click **Add file** → **Create new file**
2. In the filename box, type: `.devcontainer/devcontainer.json`
   (typing the `/` automatically creates the folder)
3. Paste in the contents of your `devcontainer.json` file:

```json
{
  "name": "NovaPay Workshop",
  "customizations": {
    "vscode": {
      "extensions": [
        "ritwickdey.LiveServer",
        "GitHub.copilot",
        "GitHub.copilot-chat"
      ],
      "settings": {
        "liveServer.settings.port": 5500,
        "liveServer.settings.donotShowInfoMsg": true
      }
    }
  },
  "forwardPorts": [5500]
}
```

4. Click **Commit new file**

Your repo should now look like this:

```
novapay-workshop/
├── README.md
├── bank-dashboard.html
└── .devcontainer/
    └── devcontainer.json
```

---

### Step 4 — Make it a Template repository

This is the key step. It lets participants create their own copy in one click — no forking, no confusion.

1. On your repo page, click **Settings** (tab near the top)
2. Scroll down to the **General** section
3. Tick **Template repository**
4. That's it — no save button needed, it saves automatically

Your repo page will now show a **"Use this template"** button. That's what participants will click on the day.

---

### Step 5 — Test it yourself

Before the session, do a full run-through as if you were a participant:

1. Open your repo page
2. Click **Use this template** → **Create a new repository**
3. Give it any name (e.g. `test-novapay`), leave it Public, click **Create repository**
4. On your new repo, click the green **Code** button → **Codespaces** tab → **Create codespace on main**
5. Wait for the Codespace to load (first load takes 1–2 minutes while it installs extensions)
6. When it opens, you'll see VS Code in the browser with `bank-dashboard.html` in the file list on the left
7. Right-click `bank-dashboard.html` → **Open with Live Server**
8. A browser tab opens showing the NovaPay dashboard
9. Check that the Copilot icon is visible in the left sidebar (looks like the GitHub Copilot logo)
10. Click it and type a question — confirm Chat works

If everything loads, you're good. Delete the test repo afterwards (Settings → scroll to bottom → Delete this repository).

---

### Step 6 — Get your shareable URL

Your repo URL will be something like:

```
https://github.com/YOUR-USERNAME/novapay-workshop
```

Write this down or put it in a slide. This is the URL you give participants on the day.

---

## Part 2 — On the day (participants do this)

### What participants need

- A laptop or Chromebook with a modern browser (Chrome or Edge recommended)
- A GitHub account — **they need to create one before or at the start of the session**

> ⚠️ **Age note:** GitHub's minimum age is 13. If you have 12-year-olds, they'll need to use a workaround — see the Troubleshooting section at the bottom.

---

### Participant steps (put these on screen one at a time)

**Step 1 — Create a GitHub account**

Go to **github.com** → Sign up → verify email.

This takes 3–5 minutes. Do it before you start the session if possible — have them do it as they arrive.

---

**Step 2 — Go to the workshop repo**

Go to: `github.com/YOUR-USERNAME/novapay-workshop`

*(Put the actual URL on screen — don't make them type from memory)*

---

**Step 3 — Create your own copy**

1. Click the green **Use this template** button
2. Click **Create a new repository**
3. Name it anything — e.g. `my-novapay`
4. Leave it on **Public**
5. Click **Create repository**

They now have their own copy of the code to break and fix freely.

---

**Step 4 — Open a Codespace**

1. On their new repo, click the green **Code** button
2. Click the **Codespaces** tab
3. Click **Create codespace on main**
4. Wait — it'll take about 1–2 minutes to load

When it opens they'll see VS Code in the browser. The file panel on the left shows `bank-dashboard.html`.

---

**Step 5 — Preview the dashboard**

1. Right-click `bank-dashboard.html` in the file panel
2. Click **Open with Live Server**
3. A new browser tab opens with the NovaPay dashboard

> If they don't see "Open with Live Server": the extensions are still installing. Wait 30 seconds and try again.

---

**Step 6 — Start the bug hunt**

They're live. Put the bug-hunt instructions on screen:

> *"Something's wrong with this banking dashboard. Find and fix as many bugs as you can.*
> *Use Copilot Chat — try asking: "Are there any bugs in this code?" or point it at a specific section.*
> *When you fix something, note down: what was wrong, how you found it, what you changed."*

---

## Part 3 — Using Copilot in the Codespace

Once the Codespace is open, Copilot works in two ways:

**Inline suggestions**
Start typing code or a comment and Copilot will suggest a completion. Press **Tab** to accept it.

```javascript
// check if the withdrawal amount is valid before processing
```
→ Copilot will suggest the validation code.

**Copilot Chat**
Click the Copilot icon in the left sidebar (or press `Ctrl+Shift+I` / `Cmd+Shift+I`).

Good prompts to show participants:
```
Are there any bugs in this file?
Why isn't the balance showing on the card?
What does this function do?
The withdraw button doesn't work — can you help?
```

> **Note on Copilot access:** GitHub provides a free tier (2,000 completions + 50 chat messages per month) to anyone with a free account. For a 3–4 hour session this is more than enough. Participants do NOT need to pay for anything.

---

## Part 4 — Troubleshooting

| Problem | Fix |
|---------|-----|
| "Use this template" button isn't showing | Make sure you ticked Template repository in Settings. Reload the page. |
| Codespace takes forever to load | Normal on first load — can take up to 3 min. Tell them to wait. |
| "Open with Live Server" not showing | Extensions still installing. Wait 30 seconds, right-click again. |
| Copilot icon missing / greyed out | They need to be signed into GitHub in the Codespace. Click the accounts icon bottom-left and sign in. |
| Copilot Chat won't respond | Free tier limit hit (unlikely in one session). As a fallback, they can still read and edit the code manually. |
| Participant is under 13 | GitHub won't let them sign up. Solutions: (1) pair them with an older participant who has an account, (2) create a spare GitHub account in advance that they can log into, (3) they work on your shared screen. |
| Someone accidentally breaks the Codespace | They delete it (go to github.com/codespaces → delete) and create a new one from their repo. Their code edits in the file are saved separately. |
| Changes not saving | Codespaces auto-saves. But to be sure, `Ctrl+S` manually. |

---

## Quick Reference — On the Day

**Your URL to share:** `github.com/YOUR-USERNAME/novapay-workshop`

**Participant flow:**
1. Create GitHub account (free)
2. Go to the repo URL
3. Use this template → Create a new repository
4. Code → Codespaces → Create codespace on main
5. Right-click `bank-dashboard.html` → Open with Live Server
6. Start finding bugs using Copilot Chat

**If it all goes wrong:** Open your own Codespace, share your screen, and run the bug hunt as a whole-group activity. Still works fine.

---

*Setup guide for NovaPay Workshop — GitHub Copilot bug-fixing session.*
