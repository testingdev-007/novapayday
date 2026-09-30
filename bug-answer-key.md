# Bug Answer Key — NovaPay Dashboard
### Facilitator reference — do not share with participants

---

## Difficulty ladder

| Level | Bugs | How found |
|-------|------|-----------|
| Easy | 1–3 | Visible just by opening the page |
| Medium | 4–6 | Found by using the page |
| Harder | 7–9 | Need to read code or open the console |
| Stretch | 10 | Logical — need to think about edge cases |

---

## The 10 Bugs

---

### Bug 1 — Missing closing tag
**Type:** HTML structural  
**Difficulty:** Easy  

**Where:** In the HTML, inside the `balance-hero` div — the closing `</div>` is missing after the `balance-footer` section.

**What goes wrong:** The page layout collapses. The stats row and cards below appear to be nested inside the hero card, causing broken spacing and visual weirdness.

**Find it:** Open the page preview — the layout looks wrong immediately. Or search the HTML for `balance-hero` and count the opening and closing divs.

**The fix:**
```html
<!-- Before (missing the closing tag) -->
      <div class="balance-footer">
        <div class="account-name">Alex Chen · Current Account</div>
        <div class="account-pill">•••• 4821</div>
      </div>
                                     ← closing </div> missing here

    <div class="stats-row">

<!-- After -->
      <div class="balance-footer">
        <div class="account-name">Alex Chen · Current Account</div>
        <div class="account-pill">•••• 4821</div>
      </div>
    </div>   ← added

    <div class="stats-row">
```

---

### Bug 2 — Invisible balance
**Type:** CSS colour  
**Difficulty:** Easy  

**Where:** The `.balance-amount` CSS rule sets `color: #0F1340` — the same dark navy as the hero card background.

**What goes wrong:** The balance figure is there in the HTML but completely invisible — dark text on a dark background.

**Find it:** The balance section is blank on the card. Inspect the element in the browser, or search the CSS for `.balance-amount` and look at the `color` value.

**The fix:**
```css
/* Before */
.balance-amount {
  color: #0F1340;   ← same as the card background
}

/* After */
.balance-amount {
  color: #FFFFFF;   ← white, visible on dark card
}
```

---

### Bug 3 — Coffee shop shown as money in
**Type:** HTML / data error  
**Difficulty:** Easy  

**Where:** The Costa Coffee transaction in the Recent Transactions section has class `credit` and shows `+£3.80`.

**What goes wrong:** A purchase (money out) is shown as income (money in). It appears in green with a plus sign — the opposite of what it should be.

**Find it:** Look at the transactions list. Buying a coffee shouldn't add money to your account.

**The fix:**
```html
<!-- Before -->
<div class="tx-amount credit">+£3.80</div>

<!-- After -->
<div class="tx-amount debit">−£3.80</div>
```

---

### Bug 4 — Wrong input type
**Type:** HTML attribute  
**Difficulty:** Medium  

**Where:** The withdrawal amount input has `type="text"` instead of `type="number"`.

**What goes wrong:** The field accepts any text, including letters and symbols. Typing "hello" and clicking Withdraw will corrupt the balance display with `NaN`.

**Find it:** Try typing a letter into the withdrawal field — it accepts it. Or look at the HTML for the input element.

**The fix:**
```html
<!-- Before -->
<input type="text" id="withdraw-amount" placeholder="0.00">

<!-- After -->
<input type="number" id="withdraw-amount" placeholder="0.00">
```

---

### Bug 5 — Withdraw button does nothing
**Type:** HTML typo (event handler)  
**Difficulty:** Medium  

**Where:** The Withdraw button has `onlick` instead of `onclick`.

**What goes wrong:** The button appears and looks normal but clicking it does absolutely nothing. No error — it just silently fails.

**Find it:** Click the Withdraw button — nothing happens. Look at the button's HTML attribute carefully.

**The fix:**
```html
<!-- Before -->
<button class="btn" onlick="makeWithdrawal()">Withdraw</button>

<!-- After -->
<button class="btn" onclick="makeWithdrawal()">Withdraw</button>
```

---

### Bug 6 — Withdrawal adds money instead of removing it
**Type:** JavaScript logic (wrong operator)  
**Difficulty:** Medium  

**Where:** Inside the `makeWithdrawal()` function in the `<script>` block.

**What goes wrong:** The balance increases when you withdraw. `balance + amount` adds the withdrawal to the balance instead of deducting it.

**Find it:** Enter an amount and click Withdraw (after fixing bug 5) — the balance goes up. Read the `makeWithdrawal` function.

**The fix:**
```javascript
// Before
balance = balance + amount;

// After
balance = balance - amount;
```

---

### Bug 7 — Typo in element ID crashes the update
**Type:** JavaScript typo  
**Difficulty:** Harder  

**Where:** Inside `makeWithdrawal()`, the `getElementById` call references `"balence-display"` instead of `"balance-display"`.

**What goes wrong:** The function tries to find an element that doesn't exist. JavaScript throws a `TypeError: Cannot set properties of null` in the browser console. The balance on the card never updates.

**Find it:** Open the browser's developer console (F12 → Console) and trigger a withdrawal. A red error appears. Or read the JS carefully and compare `"balence-display"` to the actual id `"balance-display"` in the HTML.

**The fix:**
```javascript
// Before
document.getElementById("balence-display").textContent = ...

// After
document.getElementById("balance-display").textContent = ...
```

---

### Bug 8 — Empty input breaks the balance display
**Type:** JavaScript (missing validation)  
**Difficulty:** Harder  

**Where:** The `makeWithdrawal()` function has no check for empty or invalid input.

**What goes wrong:** If you click Withdraw without entering an amount, `parseFloat("")` returns `NaN`. The balance then displays as `£NaN` and the success message reads `Withdrawn £NaN`.

**Find it:** Click Withdraw without entering an amount. Or read the function — there's no `if` check before the calculation.

**The fix:**
```javascript
// Add this before the balance calculation
const amount = parseFloat(document.getElementById("withdraw-amount").value);

if (isNaN(amount) || amount <= 0) {
  errorEl.style.display = "block";
  errorEl.textContent = "Please enter a valid amount.";
  return;
}
```

---

### Bug 9 — Interest rate not converted to a decimal
**Type:** JavaScript logic (wrong formula)  
**Difficulty:** Harder  

**Where:** Inside `calculateInterest()`, the formula uses `rate` directly instead of `rate / 100`.

**What goes wrong:** A 5% interest rate is passed as `5`, but the formula treats it as `5` not `0.05`. A £1,000 deposit at 5% should earn £50 in a year — the buggy formula returns £600 (12× too high).

**Find it:** Enter a principal and rate and check the result against a calculator. Then read the formula in the JS.

**The fix:**
```javascript
// Before
const interest = principal * rate * 12;

// After
const interest = principal * (rate / 100) * 12;
```

---

### Bug 10 — No overdraft protection *(stretch)*
**Type:** JavaScript (missing logic)  
**Difficulty:** Stretch  

**Where:** The `makeWithdrawal()` function has no check to prevent withdrawing more than the balance.

**What goes wrong:** You can withdraw £5,000 from a £1,250 account. The balance goes negative. No real bank allows this without an agreed overdraft.

**Find it:** Withdraw more than £1,250 and observe that the balance goes negative. Read the function — there's no `if (amount > balance)` check.

**The fix:**
```javascript
// Add this after the NaN check (bug 8 fix) and before the calculation
if (amount > balance) {
  errorEl.style.display = "block";
  errorEl.textContent = "Insufficient funds. Your balance is £" + balance.toFixed(2);
  return;
}
```

---

## What a fully fixed `makeWithdrawal()` looks like

```javascript
function makeWithdrawal() {
  const successEl = document.getElementById("wd-success");
  const errorEl   = document.getElementById("wd-error");

  successEl.style.display = "none";
  errorEl.style.display   = "none";

  const amount = parseFloat(document.getElementById("withdraw-amount").value);

  // Bug 8 fix: validate input
  if (isNaN(amount) || amount <= 0) {
    errorEl.style.display = "block";
    errorEl.textContent = "Please enter a valid amount.";
    return;
  }

  // Bug 10 fix: overdraft check
  if (amount > balance) {
    errorEl.style.display = "block";
    errorEl.textContent = "Insufficient funds. Your balance is £" + balance.toFixed(2);
    return;
  }

  // Bug 6 fix: subtract, not add
  balance = balance - amount;

  // Bug 7 fix: correct element ID
  document.getElementById("balance-display").textContent =
    "£" + balance.toFixed(2);

  successEl.style.display = "block";
  successEl.textContent =
    "Withdrawn £" + amount.toFixed(2) + ". New balance: £" + balance.toFixed(2);
}
```

---

*Facilitator answer key — NovaPay Workshop*
