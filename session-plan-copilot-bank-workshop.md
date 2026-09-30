# GitHub Copilot Workshop – Bank Feature Build
### 4-Hour Session Plan | Ages 12–18 | Solo Facilitator

---

## Quick Reference: Session at a Glance

| Time | Block | What's happening |
|------|-------|-----------------|
| 0:00–0:10 | Welcome | Intros, get into Codespaces, ice breaker |
| 0:10–0:25 | Copilot demo | Live demo: what Copilot does and doesn't do |
| 0:25–0:55 | Bug fixing | Find and fix bugs in a pre-built bank page |
| 0:55–1:00 | Share out | 2–3 people share what they found |
| 1:00–1:20 | Brainstorm | What would make a bank app better for young people? |
| 1:20–1:35 | Plan | Pick a feature, sketch it, define inputs/outputs |
| 1:35–3:15 | Build | Groups build with Copilot |
| 3:15–3:40 | Demo prep | Prepare a 2-min walkthrough |
| 3:40–4:00 | Demos + wrap | Show and tell, celebrate, close |

---

## HOUR 1 — Intro + Bug Fixing

### 0:00–0:10 | Welcome & Setup (10 min)

**Your opening:**
> "Today you're going to build a real feature for a banking app — from idea to working demo — in about three hours. We'll start by doing what every developer does before writing new code: fix what's broken."

**Actions:**
- Share the Codespaces link (have it on screen, in the chat, or on a sticky)
- While people get set up: ice breaker question out loud or on a shared doc
  - *"What's one thing that annoys you about your bank app or a payment app you use?"*
- Pair people up — **mix ages where possible**. Older participants naturally mentor younger ones, and Copilot levels the playing field significantly.

---

### 0:10–0:25 | What is GitHub Copilot? (15 min)

**Goal:** Show them the two main interaction modes before they need to use them.

**Live demo — do this yourself, talk through it:**

1. **Inline suggestions** — Type a comment like:
   ```javascript
   // calculate the interest on a savings account balance
   ```
   Pause. Watch Copilot suggest. Press Tab to accept. Point out: *"It read my comment and wrote the code."*

2. **Copilot Chat** — Open the chat panel. Ask:
   > *"What does this function do?"* (paste something in)
   
   Then ask: *"Can you rewrite this so a 12-year-old could understand it?"*

3. **Key message to land:**
   > "Copilot is like a very fast autocomplete that has read most of the internet. It is not always right. Your job is to be the one who understands the problem — Copilot helps you write it faster."

**Keep this to 15 minutes.** Don't over-explain — they'll learn by doing.

---

### 0:25–0:55 | Bug Fixing Exercise (30 min)

**What you need:** A Codespace with the buggy starter file below.

**Setup tip:** Create a GitHub repo before the session, add the file, and share the Codespaces URL. Everyone opens it in their browser — no installs needed.

---

#### 📁 starter file: `bank-dashboard.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MyBank Dashboard</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f5f5f5;
      padding: 20px;
    }

    .balance-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    /* BUG 2: This makes the balance amount invisible */
    .balance-amount {
      font-size: 2em;
      color: #f5f5f5;
    }

    .transaction {
      background: white;
      padding: 10px;
      margin: 5px 0;
      border-radius: 4px;
      display: flex;
      justify-content: space-between;
    }

    button {
      background: #0066cc;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
    }
  </style>
</head>
<body>

  <h1>Welcome back, Alex</h1>

  <!-- BUG 1: Missing closing </div> tag -->
  <div class="balance-card">
    <h2>Current Balance</h2>
    <p class="balance-amount" id="balance-display">£1,250.00</p>

  <h2>Recent Transactions</h2>
  <div class="transaction">
    <span>Coffee shop</span>
    <span>-£3.50</span>
  </div>
  <div class="transaction">
    <span>Salary</span>
    <span>+£1,200.00</span>
  </div>

  <h2>Make a Withdrawal</h2>
  <input type="number" id="withdraw-amount" placeholder="Enter amount">
  <button onclick="makeWithdrawal()">Withdraw</button>
  <p id="result-message"></p>

  <script>
    let balance = 1250;

    function makeWithdrawal() {
      // BUG 3: This adds to the balance instead of subtracting
      const amount = parseFloat(document.getElementById("withdraw-amount").value);
      balance = balance + amount;

      // BUG 4: Typo in element ID ("balence" vs "balance")
      document.getElementById("balence-display").textContent = "£" + balance.toFixed(2);
      document.getElementById("result-message").textContent = "Withdrawal successful!";
    }
  </script>

</body>
</html>
```

---

#### The 5 bugs (for your reference)

| # | Type | Location | What's wrong |
|---|------|----------|-------------|
| 1 | HTML | Line ~27 | Missing `</div>` after the balance card — breaks the page layout |
| 2 | CSS | `.balance-amount` | `color: #f5f5f5` — same as background, balance is invisible |
| 3 | JS | `makeWithdrawal()` | `balance + amount` instead of `balance - amount` — withdrawing adds money |
| 4 | JS | `getElementById` | `"balence-display"` — typo, should be `"balance-display"` |
| 5 | Logical | Overall | No check for withdrawing more than the balance (stretch for 17–18s) |

---

#### Instructions to put on screen / in the shared doc:

> **Your mission:** Something's wrong with this banking dashboard. Find and fix as many bugs as you can.
>
> **Tools you can use:**
> - Read the code and think it through
> - Open the page in the browser preview and look at what's broken
> - Use Copilot Chat — try asking: *"Are there any bugs in this code?"* or *"Why isn't the balance showing?"*
>
> **When you fix a bug, note down:**
> - What was wrong
> - How you found it
> - What you changed

**Age handling:**
- 12–13s: likely find bugs 1–4 with Copilot Chat helping them
- 17–18s: push for bug 5 and ask them to write a fix without Copilot first, then compare what Copilot suggests

---

### 0:55–1:00 | Share Out (5 min)

Ask 2–3 people (or pairs):
- "What did you find?"
- "How did Copilot help you spot it — or did you find it yourself first?"

Land this message before moving on:
> *"That's the debugging loop — notice something's wrong, investigate, fix, test. Copilot speeds up the middle part, but you're still the one running the loop."*

---

## HOURS 2–4 — Build a Bank Feature

### 1:00–1:20 | Brainstorm (20 min)

**Prompt the group with:**
> *"You've just seen a pretty basic bank dashboard. You've all used or heard of banking apps. What would actually be useful — especially for someone your age?"*

**Run it as a quick open shout-out or use a shared Google Doc / Jamboard** (post the link on screen). Give them 5 minutes to add ideas, then group them.

**Categories to seed if it's quiet:**
- Things to help you *save* money
- Things to help you *understand* where your money goes
- Things to help you *plan* ahead

**Back-pocket feature ideas (use if the group is stuck):**

| Feature | Difficulty | Good for |
|---------|-----------|----------|
| Savings Goal Tracker | ⭐⭐ | Any age — visual, tangible |
| Spending Category Cards | ⭐⭐ | Any age — mostly HTML/CSS |
| Currency Converter | ⭐⭐ | Any age — clean JS logic |
| Budget Planner | ⭐⭐⭐ | Mixed — income minus expenses |
| Round-Up Savings Calculator | ⭐⭐⭐ | Good for showing compounding |
| Loan Repayment Calculator | ⭐⭐⭐⭐ | Better for 17–18s |
| Fraud Alert Simulator | ⭐⭐⭐ | 17–18s — logic heavy |

**Recommended default if you need to pick one quickly:** Savings Goal Tracker. It's visual, has clear inputs and outputs, works at any skill level, and scales well.

---

### 1:20–1:35 | Plan (15 min)

**Each group sketches on paper (or shared doc):**

1. **What does it do?** One sentence.
2. **What does the user see?** (boxes on paper — don't code yet)
3. **What are the inputs?** (e.g. goal name, target amount, current savings)
4. **What does it output?** (e.g. progress bar, percentage, time to reach goal)

**You model this first** — spend 2 minutes doing it out loud for the Savings Goal Tracker as an example, then let groups do their own.

> *"I want to build a savings goal tracker. The user types in: what they're saving for, how much they need, how much they've saved so far. It shows a progress bar and tells them how much is left. That's it — no login, no database, just a page that works."*

---

### 1:35–3:15 | Build (100 min)

Groups stay in Codespaces. Introduce a **milestone structure** — put this on screen and update it as time passes.

| Milestone | Target time | What it means |
|-----------|------------|---------------|
| 🏗️ HTML structure done | 2:15 | Page has the right sections, inputs, headings — even if unstyled |
| 🎨 Styled + basic JS working | 2:55 | It looks reasonable and does something when you interact with it |
| ✨ Polish / stretch feature | 3:15 | Add one extra thing: validation, animation, a second feature |

**Copilot prompting tips — share these on screen or in the doc:**

```
Good Copilot prompts:
✅ "Write a function that takes a goalAmount and savedAmount 
    and returns the percentage complete"
✅ "Add a progress bar that fills based on the percentage variable"
✅ "Validate the input so users can't enter a negative number"

Less useful prompts:
❌ "Make a savings tracker"  (too vague)
❌ "Fix my code"  (no context)
```

**Stretch goals for 17–18s who finish early:**
- Save the goal to `localStorage` so it persists on refresh
- Add multiple goals
- Add a date field and calculate how much to save per week
- Add a simple "simulate a transfer" button that updates the saved amount

**Your role while they build:**
- Circulate, don't hover
- Key question to ask groups: *"What problem are you trying to solve right now?"*
- If someone is stuck and asking Copilot the wrong way, show them how to reframe the prompt
- If a group is flying ahead, push them to a stretch goal

---

### 3:15–3:40 | Demo Prep (25 min)

Each group prepares a **2-minute walkthrough**. Tell them to answer these three questions:

1. **What does it do?** (show it working)
2. **How did Copilot help you?** (one specific example)
3. **What would you add if you had another hour?**

They don't need slides. Browser + voice is fine.

---

### 3:40–4:00 | Demos + Wrap-Up (20 min)

Each group demos (2 min each). After each one, ask the room:
- *"What did you like about that?"*
- *"What would you add?"*

**Your closing (2–3 minutes):**

> "Today you went from a bug-ridden page to a working feature — starting from nothing except an idea. The way you worked today is genuinely how it's done in real development: pick a problem, sketch a solution, build incrementally, demo, get feedback.
>
> Copilot didn't build it for you. You told it what you needed, you checked whether it was right, and you made the decisions. That skill — knowing what to ask and whether to trust the answer — is exactly what makes a good developer."

---

## Facilitator Notes

### Running solo

- **Have group instructions visible at all times** — on screen, in a shared doc, or both. You can't be everywhere at once.
- **Use the milestone board** (whiteboard or shared doc) to keep groups on track without you narrating constantly.
- **Build in one "check in" moment** at around 2:15 — ask each group to say one sentence about where they are. Helps you spot who's struggling before it becomes a crisis.

### Handling mixed ages

- Pair 12–13s with 17–18s where possible. Older students who explain something to a younger one learn it better themselves.
- Same feature, different depth. Both ages can build a savings tracker — the 13-year-old makes it work, the 18-year-old adds validation and localStorage.
- Copilot Chat is a great leveller — younger students can ask it to explain code in plain English.

### If things go wrong

| Problem | Solution |
|---------|---------|
| Codespaces won't load | Have the starter file as a GitHub Gist as backup. Open in any online editor (e.g. CodePen). |
| Group can't think of a feature | Pull from the back-pocket list. Savings Goal Tracker almost always lands well. |
| Group finishes too fast | Push to stretch goals. Or ask: "Can you break it? Try entering -100. What happens?" |
| Group is way behind | Narrow the scope. "Just get the input and the progress bar working. Forget the rest." |
| Copilot gives wrong/broken code | Use it as a teaching moment: "This is why you test. What did Copilot get wrong?" |

---

*Session plan prepared for a 4-hour GitHub Copilot workshop. Browser-based (GitHub Codespaces). Mixed age group 12–18.*
