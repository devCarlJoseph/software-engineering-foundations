/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Readability
  ==============================================================================

  1. WHAT IS READABILITY?
     Code is read FAR more often than it is written. Readable code communicates
     its intent instantly — any developer (including "future you") can understand
     WHAT it does and WHY, without deciphering clever tricks or cryptic syntax.

  2. REAL-LIFE ANALOGY:
     A Well-Written Recipe Book vs. a Scientist's Lab Notebook:
     - Lab Notebook: "Add 2.5ml NaCl solution + 0.3g C12H22O11 at 373K."
       Technically correct, but a home cook has NO idea what's happening.
     - Recipe Book: "Add ½ teaspoon of salt and a pinch of sugar to boiling water."
       Same result, but ANYONE can follow it.

  3. JARGON BUSTER:
     - Cognitive Load: The mental effort required to understand a piece of code.
       Lower cognitive load = more readable code.
     - Self-Documenting Code: Code where names, structure, and flow are so clear
       that comments become mostly unnecessary.
     - Consistent Style: Using the same naming conventions, indentation, and
       formatting throughout the entire project (e.g., camelCase everywhere,
       not mixing camelCase and snake_case randomly).
     - Ternary Abuse: Overusing the `? :` operator in deeply nested chains
       that become impossible to read.
*/

// =============================================================================
// TECHNIQUE 1: AVOID CLEVER ONE-LINERS — PREFER CLARITY
// =============================================================================

type Product = {
  name: string;
  price: number;
  isOnSale: boolean;
  discountPercent: number;
};

// ── BAD: Clever, compressed, hard to read ────────────────────────────────────
/*
  const getFinalPrice = (p: Product) =>
    p.isOnSale ? p.price * (1 - p.discountPercent / 100) : p.price > 50 ? p.price * 0.95 : p.price;
*/

// ── GOOD: Clear, step-by-step, easy to debug ────────────────────────────────
function calculateFinalPrice(product: Product): number {
  // Step 1: If on sale, apply the sale discount
  if (product.isOnSale) {
    const discountMultiplier = 1 - product.discountPercent / 100;
    return product.price * discountMultiplier;
  }

  // Step 2: If price is over $50, apply a small 5% loyalty discount
  const LOYALTY_DISCOUNT_THRESHOLD = 50;
  const LOYALTY_DISCOUNT_RATE = 0.05;

  if (product.price > LOYALTY_DISCOUNT_THRESHOLD) {
    return product.price * (1 - LOYALTY_DISCOUNT_RATE);
  }

  // Step 3: Otherwise, return original price
  return product.price;
}

const laptop: Product = { name: "Laptop Stand", price: 75.0, isOnSale: false, discountPercent: 0 };
const sticker: Product = { name: "Dev Sticker", price: 3.5, isOnSale: true, discountPercent: 20 };

console.log(`${laptop.name}: $${calculateFinalPrice(laptop).toFixed(2)}`);
console.log(`${sticker.name}: $${calculateFinalPrice(sticker).toFixed(2)}`);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Laptop Stand: $71.25
  Dev Sticker: $2.80
*/

// =============================================================================
// TECHNIQUE 2: USE MEANINGFUL BOOLEAN EXPRESSIONS
// =============================================================================

type Subscription = {
  plan: "free" | "pro" | "enterprise";
  isTrialActive: boolean;
  daysRemaining: number;
};

// ── BAD: Raw condition that forces the reader to decode intent ────────────────
/*
  if (sub.plan !== "free" && !sub.isTrialActive && sub.daysRemaining > 0) {
    // What does this combination even mean?
  }
*/

// ── GOOD: Extract the boolean expression into a named variable ───────────────
function describeSubscriptionStatus(sub: Subscription): string {
  const isPaidPlan = sub.plan !== "free";
  const hasFinishedTrial = !sub.isTrialActive;
  const hasTimeRemaining = sub.daysRemaining > 0;

  // Now the condition reads like English:
  const isActiveSubscriber = isPaidPlan && hasFinishedTrial && hasTimeRemaining;

  if (isActiveSubscriber) {
    return `Active ${sub.plan.toUpperCase()} subscriber — ${sub.daysRemaining} days left.`;
  }

  return `Inactive or free-tier user.`;
}

console.log("\n" + describeSubscriptionStatus({ plan: "pro", isTrialActive: false, daysRemaining: 45 }));
console.log(describeSubscriptionStatus({ plan: "free", isTrialActive: false, daysRemaining: 0 }));

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Active PRO subscriber — 45 days left.
  Inactive or free-tier user.
*/

// =============================================================================
// TECHNIQUE 3: CONSISTENT FORMATTING & VERTICAL SPACING
// =============================================================================

// ── BAD: Inconsistent naming, no spacing, mixed styles ───────────────────────
/*
  const user_name="Carl";let AGE=22
  function greet(n:string,a:number){return "Hi "+n+" age "+a}
*/

// ── GOOD: Consistent camelCase, clear spacing, logical grouping ──────────────

// --- Data Layer ---
type TeamMember = {
  fullName: string;
  role: string;
  yearsOfExperience: number;
};

// --- Formatting Layer ---
function formatTeamMemberBio(member: TeamMember): string {
  const seniorityLabel = member.yearsOfExperience >= 5 ? "Senior" : "Junior";

  return `${seniorityLabel} ${member.role}: ${member.fullName} (${member.yearsOfExperience} yrs exp.)`;
}

// --- Output Layer ---
const teamMembers: TeamMember[] = [
  { fullName: "Carl Joseph", role: "Backend Developer", yearsOfExperience: 3 },
  { fullName: "Ana Santos", role: "Frontend Developer", yearsOfExperience: 7 },
];

console.log("\n--- Team Roster ---");
teamMembers.forEach((member) => {
  console.log(`  ${formatTeamMemberBio(member)}`);
});

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  --- Team Roster ---
    Junior Backend Developer: Carl Joseph (3 yrs exp.)
    Senior Frontend Developer: Ana Santos (7 yrs exp.)
*/

// =============================================================================
// TECHNIQUE 4: COMMENTS SHOULD EXPLAIN "WHY", NOT "WHAT"
// =============================================================================

// ── BAD: Comments that just restate the code ─────────────────────────────────
/*
  // Set age to 22
  const age = 22;

  // Check if age is greater than 18
  if (age > 18) {
    // Log "adult"
    console.log("adult");
  }
*/

// ── GOOD: Comments explain WHY a decision was made ───────────────────────────
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

// Business rule: Philippine banking regulation requires automatic logout
// after 30 minutes of inactivity to prevent unauthorized access.
function hasSessionExpired(lastActivityTimestamp: number): boolean {
  const elapsed = Date.now() - lastActivityTimestamp;
  return elapsed > SESSION_TIMEOUT_MS;
}

const lastActivity = Date.now() - 35 * 60 * 1000; // Simulating 35 minutes ago
console.log("\nSession expired?", hasSessionExpired(lastActivity));

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Session expired? true
*/

// =============================================================================
// BEHIND THE SCENES: READABILITY CHEAT SHEET
// =============================================================================
/*
  ┌──────────────────────────────────┬──────────────────────────────────────┐
  │ Unreadable Pattern               │ Readable Fix                         │
  ├──────────────────────────────────┼──────────────────────────────────────┤
  │ Nested ternary chains            │ if-else blocks with named variables  │
  │ `a ? (b ? c : d) : e`           │                                      │
  ├──────────────────────────────────┼──────────────────────────────────────┤
  │ Complex boolean: `!a && b || c`  │ Extract into named booleans:         │
  │                                  │ `const isEligible = ...`             │
  ├──────────────────────────────────┼──────────────────────────────────────┤
  │ Comments saying "what":          │ Comments saying "why":               │
  │ `// increment counter`           │ `// retry needed due to API flakiness│
  ├──────────────────────────────────┼──────────────────────────────────────┤
  │ Mixed naming: snake_case +       │ Pick ONE convention (camelCase) and  │
  │ camelCase + PascalCase           │ use it consistently everywhere       │
  ├──────────────────────────────────┼──────────────────────────────────────┤
  │ Giant 200-line function          │ Break into 5-10 small functions      │
  │                                  │ that compose together                │
  └──────────────────────────────────┴──────────────────────────────────────┘

  MARTIN FOWLER'S QUOTE:
  "Any fool can write code that a computer can understand.
   Good programmers write code that HUMANS can understand."
*/