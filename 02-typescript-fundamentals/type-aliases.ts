/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Type Aliases
  ==============================================================================

  1. WHAT IS A TYPE ALIAS?
     A "Type Alias" allows you to create a custom, meaningful nickname for ANY type.
     Syntax: `type CustomName = TypeDefinition;`

  2. REAL-LIFE ANALOGY:
     In basketball, instead of saying "the person who controls the ball and calls plays",
     we create an alias: "Point Guard".
     In banking code, instead of generic `string`, we create an alias: `type AccountNumber = string;`

  3. JARGON BUSTER:
     - Alias: A nickname or alternate name for an existing thing.
     - Domain Modeling: Using terms from real-world business (like `InvoiceId`, `TaxRate`)
       instead of raw computer terms (`string`, `number`).
     - Literal Type: A type that represents one exact specific value (e.g., only `"PAID"`).
     - Interface vs Type Alias:
       * Interfaces can ONLY describe object shapes and can be merged.
       * Type Aliases can describe objects, primitives, unions, and tuples, but CANNOT be merged.
*/

// =============================================================================
// STEP 1: PRIMITIVE DOMAIN ALIASES (Self-Documenting Code)
// =============================================================================
type BankAccountNumber = string;
type DollarAmount = number;

const myCheckingAccount: BankAccountNumber = "ACCT-9928172";
const myCurrentBalance: DollarAmount = 2450.50;

console.log("Account Number:", myCheckingAccount);
console.log("Current Balance: $" + myCurrentBalance);

// =============================================================================
// STEP 2: OBJECT TYPE ALIAS
// =============================================================================

type SupportTicket = {
  readonly ticketId: string;
  customerName: string;
  issueDescription: string;
  isResolved: boolean;
};

const urgentIssue: SupportTicket = {
  ticketId: "TCK_404",
  customerName: "Alice Miller",
  issueDescription: "Cannot access database dashboard",
  isResolved: false,
};

console.log("Ticket [" + urgentIssue.ticketId + "] for: " + urgentIssue.customerName);

// =============================================================================
// STEP 3: FUNCTION TYPE ALIAS (Blueprint for Functions)
// =============================================================================
// Defines what arguments a function must take and what it must return:

type CurrencyFormatter = (amount: number, currencyCode: string) => string;

const formatMyCurrency: CurrencyFormatter = (amount, currencyCode) => {
  return currencyCode + " " + amount.toFixed(2);
};

console.log("Formatted:", formatMyCurrency(1250, "USD")); // "USD 1250.00"

// =============================================================================
// STEP 4: LITERAL UNION ALIAS (Exclusive Choices)
// =============================================================================
// Limits the variable to only these exact strings:

type TransactionStatus = "PENDING" | "APPROVED" | "DECLINED";

let currentTransaction: TransactionStatus = "PENDING";
currentTransaction = "APPROVED"; // Valid

console.log("Transaction Status:", currentTransaction);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Account Number: ACCT-9928172
  Current Balance: $2450.5
  Ticket [TCK_404] for: Alice Miller
  Formatted: USD 1250.00
  Transaction Status: APPROVED
*/

// =============================================================================
// TRY IT YOURSELF: DISASTER PREVENTED
// =============================================================================
// 1. Typos in status strings are caught immediately:
// currentTransaction = "APPROVD"; // Notice the spelling mistake!
// -> TS Error: Type '"APPROVD"' is not assignable to type 'TransactionStatus'.

// 2. Type Aliases CANNOT be declared twice (Unlike Interfaces):
// type SupportTicket = { priority: number };
// -> TS Error: Duplicate identifier 'SupportTicket'.