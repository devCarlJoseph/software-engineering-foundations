/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Maintainability
  ==============================================================================

  1. WHAT IS MAINTAINABILITY?
     Writing code that is easy to understand, modify, debug, and extend
     MONTHS or YEARS after it was originally written — even by developers
     who have never seen the codebase before.

  2. REAL-LIFE ANALOGY:
     A Car with a Service Manual:
     - Unmaintainable car: Engine parts welded together, no labels, no manual.
       Even the mechanic who built it can't fix it 6 months later.
     - Maintainable car: Every part is labeled, wires are color-coded, and a
       clear manual explains how to replace any component independently.

  3. JARGON BUSTER:
     - Technical Debt: Shortcuts taken today (messy code, skipped tests) that
       you'll "pay back" later with extra effort to fix, understand, or extend.
     - Configuration over Hardcoding: Storing values (URLs, limits, messages) in
       a config file instead of burying them deep inside logic.
     - Loose Coupling: Modules that don't depend on each other's internals.
       You can swap, update, or remove one without breaking the other.
     - Defensive Programming: Anticipating what COULD go wrong and handling
       those edge cases explicitly (null checks, type validation, defaults).
*/

// =============================================================================
// BAD PRACTICE: HARDCODED, TIGHTLY COUPLED, "WRITE-ONCE" CODE
// =============================================================================
/*
  function sendEmail(userId: number) {
    // Hardcoded SMTP config buried in logic:
    const host = "smtp.gmail.com";
    const port = 587;
    const maxRetries = 3;

    // Hardcoded message template mixed with logic:
    const body = "Dear user, your order #" + userId + " is confirmed.";

    // If the email provider changes, you must search the ENTIRE codebase
    // for every place "smtp.gmail.com" appears. Good luck finding them all.
  }
*/

// =============================================================================
// GOOD PRACTICE 1: EXTERNALIZED CONFIGURATION
// =============================================================================

// ── Config: All tunable values live in ONE place ─────────────────────────────
const AppConfig = {
  email: {
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    maxRetries: 3,
  },
  api: {
    baseUrl: "https://api.taskflow.dev",
    timeoutMs: 5000,
  },
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100,
  },
} as const;

// Now changing the SMTP provider = editing ONE object, not hunting through files.
console.log("[Config] SMTP Host:", AppConfig.email.smtpHost);
console.log("[Config] API Timeout:", AppConfig.api.timeoutMs, "ms");

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  [Config] SMTP Host: smtp.gmail.com
  [Config] API Timeout: 5000 ms
*/

// =============================================================================
// GOOD PRACTICE 2: DEFENSIVE PROGRAMMING (ANTICIPATE FAILURE)
// =============================================================================

type UserProfile = {
  id: string;
  displayName: string;
  email: string | null; // Email might be missing!
};

// Without defensive checks: crashes if email is null
// With defensive checks: handles edge cases gracefully

function generateWelcomeMessage(user: UserProfile | null): string {
  // Defense 1: Null user check
  if (!user) {
    return "[Warning] Cannot generate message: User data is missing.";
  }

  // Defense 2: Missing email fallback
  const contactEmail = user.email ?? "no-reply@taskflow.dev";

  // Defense 3: Empty name fallback
  const greeting = user.displayName.trim() || "Valued Customer";

  return `Welcome, ${greeting}! A confirmation has been sent to ${contactEmail}.`;
}

console.log("\n" + generateWelcomeMessage({ id: "usr_1", displayName: "Carl Joseph", email: "carl@dev.com" }));
console.log(generateWelcomeMessage({ id: "usr_2", displayName: "", email: null }));
console.log(generateWelcomeMessage(null));

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Welcome, Carl Joseph! A confirmation has been sent to carl@dev.com.
  Welcome, Valued Customer! A confirmation has been sent to no-reply@taskflow.dev.
  [Warning] Cannot generate message: User data is missing.
*/

// =============================================================================
// GOOD PRACTICE 3: LOOSE COUPLING VIA DEPENDENCY INJECTION
// =============================================================================

// ── Define an interface (contract) for any logger ────────────────────────────
interface Logger {
  info(message: string): void;
  error(message: string): void;
}

// ── Implementation 1: Console Logger (for development) ───────────────────────
class ConsoleLogger implements Logger {
  info(message: string): void {
    console.log(`[INFO] ${message}`);
  }
  error(message: string): void {
    console.log(`[ERROR] ${message}`);
  }
}

// ── Implementation 2: File Logger (for production) — simulated ───────────────
class FileLogger implements Logger {
  info(message: string): void {
    console.log(`[FILE-INFO] Would write to log file: ${message}`);
  }
  error(message: string): void {
    console.log(`[FILE-ERROR] Would write to log file: ${message}`);
  }
}

// ── Service that DEPENDS on Logger, but doesn't know WHICH logger ────────────
class PaymentProcessor {
  // The processor doesn't create its own logger — it RECEIVES one
  constructor(private logger: Logger) {}

  public processPayment(amount: number): void {
    this.logger.info(`Processing payment of $${amount.toFixed(2)}...`);

    if (amount <= 0) {
      this.logger.error("Payment amount must be positive!");
      return;
    }

    this.logger.info(`Payment of $${amount.toFixed(2)} completed successfully.`);
  }
}

// In DEVELOPMENT: inject ConsoleLogger
console.log("\n--- Development Mode ---");
const devProcessor = new PaymentProcessor(new ConsoleLogger());
devProcessor.processPayment(99.99);

// In PRODUCTION: swap to FileLogger — NO changes to PaymentProcessor!
console.log("\n--- Production Mode ---");
const prodProcessor = new PaymentProcessor(new FileLogger());
prodProcessor.processPayment(250.0);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  --- Development Mode ---
  [INFO] Processing payment of $99.99...
  [INFO] Payment of $99.99 completed successfully.

  --- Production Mode ---
  [FILE-INFO] Would write to log file: Processing payment of $250.00...
  [FILE-INFO] Would write to log file: Payment of $250.00 completed successfully.
*/

// =============================================================================
// BEHIND THE SCENES: MAINTAINABILITY CHECKLIST
// =============================================================================
/*
  Ask these questions about your code:

  ┌──────────────────────────────────────────────────────────────────────────┐
  │ Question                                    │ If NO → Fix It           │
  ├──────────────────────────────────────────────┼──────────────────────────┤
  │ Can a new developer understand this in       │ Add comments, rename     │
  │ under 5 minutes?                             │ variables, simplify      │
  ├──────────────────────────────────────────────┼──────────────────────────┤
  │ Can I change the database without rewriting  │ Add a Repository layer   │
  │ the business logic?                          │ (Separation of Concerns) │
  ├──────────────────────────────────────────────┼──────────────────────────┤
  │ Are config values (URLs, limits) in ONE      │ Externalize into a       │
  │ central place?                               │ config file/object       │
  ├──────────────────────────────────────────────┼──────────────────────────┤
  │ Does null/undefined input crash the app?     │ Add defensive checks     │
  │                                              │ with fallback values     │
  ├──────────────────────────────────────────────┼──────────────────────────┤
  │ Can I swap a dependency (logger, mailer)     │ Use Dependency Injection │
  │ without changing the class that uses it?     │ with interfaces          │
  └──────────────────────────────────────────────┴──────────────────────────┘

  TECHNICAL DEBT = SHORTCUTS TODAY → PAIN TOMORROW
  ─────────────────────────────────────────────────
  Writing messy, coupled, hardcoded code is like borrowing money.
  You ship faster today, but you pay "interest" every time you need to:
  - Debug a production issue at 2 AM
  - Add a new feature that touches messy old code
  - Onboard a new teammate who can't understand the codebase
*/