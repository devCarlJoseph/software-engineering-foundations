/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Conditionals and Guard Clauses
  ==============================================================================

  1. WHAT ARE CONDITIONALS?
     Conditionals control decision-making and branching in code. They evaluate
     whether an expression is truthy or falsy and direct execution accordingly.

  2. REAL-LIFE ANALOGY:
     An ATM withdrawal check:
     - Is your PIN correct? No -> Eject card immediately (Early Return).
     - Does the account have enough money? No -> Display "Insufficient Funds" and stop.
     - Both passed? Dispense cash.

  3. JARGON BUSTER:
     - Branching: Splitting execution down different paths based on a condition.
     - Fall-through: In a `switch`, forgetting `break` causes execution to accidentally
       bleed into the next case below it.
     - Guard Clause (Early Return): Testing for errors/failures FIRST at the top
       of a function, returning immediately to avoid messy, deeply nested `if/else` trees.
     - Truthy / Falsy: Values that evaluate to boolean `true` or `false` when cast in an `if`.
*/

// =============================================================================
// STEP 1: IF / ELSE IF / ELSE STATEMENTS
// =============================================================================
const httpStatusCode = 404;

if (httpStatusCode === 200) {
  console.log("Result: Success (OK)");
} else if (httpStatusCode === 400) {
  console.log("Result: Bad Request from client");
} else if (httpStatusCode === 404) {
  console.log("Result: Resource Not Found");
} else {
  console.log("Result: Unhandled HTTP Status");
}

// =============================================================================
// STEP 2: SWITCH STATEMENTS (DISCRETE VALUE MATCHING)
// =============================================================================
// Best used when testing a single variable against many known constant values.
// 'break' is essential to stop fall-through!

const userRole = "editor";
let accessLevel;

switch (userRole) {
  case "admin":
    accessLevel = "Full administrative access";
    break;
  case "editor":
    accessLevel = "Content editing and publishing access";
    break;
  case "viewer":
    accessLevel = "Read-only access";
    break;
  default:
    accessLevel = "No access";
    break;
}

console.log("Assigned Access Level:", accessLevel);

// Multiple cases sharing the same logic (Intentional Fall-through):
const dayCode = 6;
let dayCategory;

switch (dayCode) {
  case 1:
  case 2:
  case 3:
  case 4:
  case 5:
    dayCategory = "Weekday";
    break;
  case 6:
  case 7:
    dayCategory = "Weekend";
    break;
  default:
    dayCategory = "Invalid day";
    break;
}
console.log("Day Category:", dayCategory);

// =============================================================================
// STEP 3: GUARD CLAUSES (CLEAN CODE INDUSTRY BEST PRACTICE)
// =============================================================================
// Bad Practice: Deeply nested if/else statements (Pyramid of Doom).
// Good Practice: Handle invalid cases at the start, leaving the happy path clean!

function processWithdrawal(accountBalance, withdrawalAmount) {
  // Guard 1: Validate positive amount
  if (withdrawalAmount <= 0) {
    return "Error: Withdrawal amount must be greater than zero.";
  }

  // Guard 2: Validate sufficient balance
  if (withdrawalAmount > accountBalance) {
    return "Error: Insufficient account balance.";
  }

  // Happy Path: Reached without any nested else blocks!
  const remainingBalance = accountBalance - withdrawalAmount;
  return `Success! Dispensed $${withdrawalAmount}. New balance: $${remainingBalance}.`;
}

console.log(processWithdrawal(500, -10));  // Error: must be greater than zero
console.log(processWithdrawal(500, 1000)); // Error: Insufficient balance
console.log(processWithdrawal(500, 150));  // Success!

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Result: Resource Not Found
  Assigned Access Level: Content editing and publishing access
  Day Category: Weekend
  Error: Withdrawal amount must be greater than zero.
  Error: Insufficient account balance.
  Success! Dispensed $150. New balance: $350.
*/