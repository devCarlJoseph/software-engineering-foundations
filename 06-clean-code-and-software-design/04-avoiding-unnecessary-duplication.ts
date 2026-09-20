/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Avoiding Duplication (The DRY Principle)
  ==============================================================================

  1. WHAT IS DRY?
     "Don't Repeat Yourself" (DRY). Every piece of business logic, algorithm,
     or calculation should exist in ONE single authoritative place in your codebase.

  2. REAL-LIFE ANALOGY:
     Updating your phone number:
     If you give your phone number to 50 individual friends on separate post-it notes,
     when you change numbers, you must update 50 people.
     If you update your number on your profile once, everyone sees the change instantly.

  3. JARGON BUSTER:
     - WET (Write Everything Twice / We Enjoy Typing): The opposite of DRY.
     - Single Source of Truth (SSOT): Having exactly one place where a specific rule is defined.
*/

// =============================================================================
// BAD PRACTICE (WET): DUPLICATING DATE AND CURRENCY LOGIC IN MULTIPLE PLACES
// =============================================================================
/*
  // In userProfile.ts:
  const fee1 = "$" + (rawFee * 1.12).toFixed(2);

  // In checkoutScreen.ts:
  const fee2 = "$" + (rawFee * 1.12).toFixed(2);
*/

// =============================================================================
// GOOD PRACTICE (DRY): CENTRALIZED REUSABLE FORMATTERS
// =============================================================================

class FormatUtils {
  private static readonly DEFAULT_CURRENCY = "USD";

  public static formatCurrency(amount: number, currency = this.DEFAULT_CURRENCY): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  }

  public static formatDateToIso(date: Date): string {
    return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
  }
}

// Reusable across all files in your project:
const userBalance = 1450.5;
const transactionDate = new Date("2026-09-20T14:00:00Z");

console.log("Formatted Balance:", FormatUtils.formatCurrency(userBalance));
console.log("ISO Transaction Date:", FormatUtils.formatDateToIso(transactionDate));

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Formatted Balance: $1,450.50
  ISO Transaction Date: 2026-09-20
*/