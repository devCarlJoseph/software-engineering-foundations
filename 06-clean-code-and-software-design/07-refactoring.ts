/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Refactoring
  ==============================================================================

  1. WHAT IS REFACTORING?
     Restructuring existing code WITHOUT changing its external behavior.
     The program does the same thing before and after — but the code becomes
     cleaner, more readable, and easier to extend.

  2. REAL-LIFE ANALOGY:
     Renovating a House While Living in It:
     You don't demolish the house and rebuild. You repaint walls, rewire
     electricity, and fix plumbing — room by room — while still sleeping
     there every night. The house looks and works better, but it's still YOUR house.

  3. JARGON BUSTER:
     - Code Smell: A surface-level sign that something in the code MIGHT be wrong.
       Not a bug — the code works — but it hints at a deeper design problem.
       Examples: duplicated logic, overly long functions, nested if-else chains.
     - Extract Method: Taking a chunk of code from inside a long function and
       moving it into its own small, named function.
     - Rename Variable: Changing a cryptic name (like "d" or "tmp") to a
       self-explanatory one (like "deliveryDate" or "temporaryBuffer").
     - Guard Clause: Handling edge cases at the TOP of a function with early returns,
       so the main logic isn't buried inside nested if-else blocks.
*/

// =============================================================================
// REFACTORING TECHNIQUE 1: EXTRACT METHOD
// =============================================================================

// ── BEFORE REFACTORING: One giant function doing everything ──────────────────
/*
  function processOrder(order: any) {
    // 20 lines calculating discount...
    let discount = 0;
    if (order.customerType === "premium") {
      discount = order.total * 0.15;
    } else if (order.customerType === "regular" && order.total > 100) {
      discount = order.total * 0.05;
    }
    const discountedTotal = order.total - discount;

    // 10 lines formatting the invoice...
    const invoice = `Invoice #${order.id}\nTotal: $${discountedTotal.toFixed(2)}\nDiscount: $${discount.toFixed(2)}`;

    console.log(invoice);
    return discountedTotal;
  }
*/

// ── AFTER REFACTORING: Extracted into small, focused functions ───────────────
type CustomerType = "premium" | "regular" | "guest";

type Order = {
  id: string;
  customerType: CustomerType;
  total: number;
};

// Extracted Method 1: Discount calculation is now isolated and testable
function calculateDiscount(customerType: CustomerType, orderTotal: number): number {
  if (customerType === "premium") {
    return orderTotal * 0.15; // 15% for premium customers
  }

  if (customerType === "regular" && orderTotal > 100) {
    return orderTotal * 0.05; // 5% for regular customers spending over $100
  }

  return 0; // No discount for guests or small orders
}

// Extracted Method 2: Invoice formatting is now its own responsibility
function formatInvoice(orderId: string, total: number, discount: number): string {
  return [
    `┌─── Invoice #${orderId} ───┐`,
    `│ Original Total: $${(total).toFixed(2)}`,
    `│ Discount:      -$${discount.toFixed(2)}`,
    `│ Final Total:    $${(total - discount).toFixed(2)}`,
    `└─────────────────────────┘`,
  ].join("\n");
}

// Clean orchestrator: reads like plain English
function processOrder(order: Order): number {
  const discount = calculateDiscount(order.customerType, order.total);
  const finalTotal = order.total - discount;

  console.log(formatInvoice(order.id, order.total, discount));
  return finalTotal;
}

const sampleOrder: Order = { id: "ORD-5521", customerType: "premium", total: 200.0 };
processOrder(sampleOrder);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  ┌─── Invoice #ORD-5521 ───┐
  │ Original Total: $200.00
  │ Discount:      -$30.00
  │ Final Total:    $170.00
  └─────────────────────────┘
*/

// =============================================================================
// REFACTORING TECHNIQUE 2: REPLACE NESTED IF-ELSE WITH GUARD CLAUSES
// =============================================================================

type Applicant = {
  name: string;
  age: number;
  hasValidId: boolean;
  hasCriminalRecord: boolean;
};

// ── BEFORE REFACTORING: Deeply nested "arrow" code ───────────────────────────
/*
  function evaluateApplicant(applicant: any): string {
    if (applicant) {
      if (applicant.age >= 18) {
        if (applicant.hasValidId) {
          if (!applicant.hasCriminalRecord) {
            return "APPROVED";
          } else {
            return "REJECTED: Criminal record found.";
          }
        } else {
          return "REJECTED: No valid ID.";
        }
      } else {
        return "REJECTED: Must be 18 or older.";
      }
    } else {
      return "REJECTED: No applicant data.";
    }
  }
*/

// ── AFTER REFACTORING: Guard Clauses (flat, readable, sequential) ────────────
function evaluateApplicant(applicant: Applicant | null): string {
  // Guard 1: Reject null/undefined early
  if (!applicant) {
    return "REJECTED: No applicant data.";
  }

  // Guard 2: Age requirement
  if (applicant.age < 18) {
    return `REJECTED: ${applicant.name} must be 18 or older.`;
  }

  // Guard 3: ID requirement
  if (!applicant.hasValidId) {
    return `REJECTED: ${applicant.name} has no valid ID.`;
  }

  // Guard 4: Background check
  if (applicant.hasCriminalRecord) {
    return `REJECTED: ${applicant.name} has a criminal record.`;
  }

  // Happy path: All checks passed!
  return `APPROVED: Welcome aboard, ${applicant.name}!`;
}

const candidate: Applicant = {
  name: "Carl Joseph",
  age: 22,
  hasValidId: true,
  hasCriminalRecord: false,
};

console.log("\n" + evaluateApplicant(candidate));
console.log(evaluateApplicant({ name: "Minor User", age: 16, hasValidId: true, hasCriminalRecord: false }));

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  APPROVED: Welcome aboard, Carl Joseph!
  REJECTED: Minor User must be 18 or older.
*/

// =============================================================================
// REFACTORING TECHNIQUE 3: RENAME FOR CLARITY
// =============================================================================

// ── BEFORE: Cryptic names ────────────────────────────────────────────────────
/*
  function calc(a: number, b: number, t: string) {
    if (t === "a") return a + b;
    if (t === "s") return a - b;
    return 0;
  }
*/

// ── AFTER: Self-documenting names ────────────────────────────────────────────
type ArithmeticOperation = "add" | "subtract";

function performArithmetic(
  firstOperand: number,
  secondOperand: number,
  operation: ArithmeticOperation
): number {
  if (operation === "add") return firstOperand + secondOperand;
  if (operation === "subtract") return firstOperand - secondOperand;

  return 0;
}

console.log("\nAddition Result:", performArithmetic(50, 30, "add"));
console.log("Subtraction Result:", performArithmetic(50, 30, "subtract"));

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Addition Result: 80
  Subtraction Result: 20
*/

// =============================================================================
// BEHIND THE SCENES: WHEN TO REFACTOR?
// =============================================================================
/*
  THE "RULE OF THREE" (Martin Fowler):
  1. First time — Just do it (write working code).
  2. Second time — Notice the duplication, but let it slide.
  3. Third time — REFACTOR! Extract, rename, simplify.

  CODE SMELL CHEAT SHEET:
  ┌──────────────────────────────┬──────────────────────────────────┐
  │ Code Smell                   │ Refactoring Fix                  │
  ├──────────────────────────────┼──────────────────────────────────┤
  │ Long Function (50+ lines)    │ Extract Method                   │
  │ Deeply Nested if-else        │ Guard Clauses / Early Returns    │
  │ Cryptic Variable Names       │ Rename Variable                  │
  │ Duplicated Logic             │ Extract into Shared Utility      │
  │ God Class (does everything)  │ Split into Focused Classes       │
  │ Magic Numbers (e.g., 86400) │ Replace with Named Constants     │
  └──────────────────────────────┴──────────────────────────────────┘

  GOLDEN RULE: Refactoring should NEVER change what the code does.
  If the tests passed before, they must still pass after.
*/