// ══════════════════════════════════════════════════════
// Level Up — Round 1: Fix the Bug
//
// Copilot wrote this function. It looks right. It has
// a bug. Ask Copilot Chat to review it and fix it.
//
// Once fixed, prove it works:
//   console.log(calculateMonthlyPayment(1000, 5, 1));
// then run this file with:  node challenge.js
// ══════════════════════════════════════════════════════

function calculateMonthlyPayment(principal, annualRate, years) {
  const monthlyRate = annualRate / 12;
  const months = years * 12;
  const payment = principal * monthlyRate
    * Math.pow(1 + monthlyRate, months)
    / (Math.pow(1 + monthlyRate, months) - 1);
  return payment.toFixed(2);
}

// Rounds 2 and 3 add more functions below this line —
// same file, same method: comment, Tab, save, test.
