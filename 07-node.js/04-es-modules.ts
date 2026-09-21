/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: ES Modules (ESM)
  ==============================================================================

  1. WHAT ARE ES MODULES (ESM)?
     ES Modules (`import` and `export`) are the official ECMAScript standard
     module specification across both modern browsers and Node.js.
     Unlike CommonJS, ES Modules are static and can be analyzed and optimized
     before execution (enabling tree-shaking).

  2. REAL-LIFE ANALOGY:
     An Online Catalog Order:
     - In CommonJS, you open a surprise grab-bag at the register.
     - In ESM, the manifest is printed and verified *before* shipping.
       The warehouse packages only the exact items you requested, leaving
       unused items behind (Tree Shaking).

  3. JARGON BUSTER:
     - Static Analysis: The compiler checks imports/exports before running any code.
     - Tree-Shaking: Dead-code elimination where tools remove un-imported functions.
     - Top-Level Await: Using `await` directly outside any async function (supported in ESM).
     - Named Export: Exporting specific variables with `{ export const foo = 1; }`.
     - Default Export: The primary fallback item exported via `export default`.
*/

// =============================================================================
// BAD PRACTICE: MIXING COMMONJS AND ESM SYNTAX IN UNEXPECTED WAYS
// =============================================================================
/*
  // You cannot use `require()` inside pure ES Modules by default without createRequire!
  // And you cannot conditionally import with static syntax:
  if (condition) {
    import { something } from "./module"; // SYNTAX ERROR! Static imports must be at top!
  }
*/

// =============================================================================
// GOOD PRACTICE: ES MODULES EXPORT & IMPORT PATTERNS
// =============================================================================

// 1. Named Exports
export interface UserToken {
  userId: string;
  role: "admin" | "member";
}

export const TOKEN_EXPIRATION_HOURS = 24;

export function verifyUserRole(token: UserToken, requiredRole: "admin" | "member"): boolean {
  if (token.role === "admin") return true; // Admins have full access
  return token.role === requiredRole;
}

// 2. Default Export Simulation
class AuthService {
  public generateSessionToken(userId: string): string {
    return `session_${userId}_${Date.now()}`;
  }
}
export default AuthService;

// 3. Simulating ESM Consumption & Dynamic Import:
console.log("=== ES Modules Pattern Demo ===");

const testUser: UserToken = { userId: "usr_99", role: "member" };
console.log("Is Admin?:", verifyUserRole(testUser, "admin"));
console.log("Is Member?:", verifyUserRole(testUser, "member"));

// Dynamic import demonstration (asynchronous, condition-based):
async function loadAnalyticsConditionally(enableTracking: boolean): Promise<void> {
  if (enableTracking) {
    console.log("\n[Dynamic Import]: Feature flag enabled. Module would load asynchronously!");
    // In real ESM: const analytics = await import("./analytics.js");
  } else {
    console.log("\n[Dynamic Import]: Feature flag disabled. Module never loaded, saving memory.");
  }
}

loadAnalyticsConditionally(true);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === ES Modules Pattern Demo ===
  Is Admin?: false
  Is Member?: true

  [Dynamic Import]: Feature flag enabled. Module would load asynchronously!
*/

// =============================================================================
// BEHIND THE SCENES: COMMONJS VS. ES MODULES COMPARISON
// =============================================================================
/*
  ┌──────────────────────┬──────────────────────────┬────────────────────────┐
  │ Feature              │ CommonJS (CJS)           │ ES Modules (ESM)       │
  ├──────────────────────┼──────────────────────────┼────────────────────────┤
  │ Import Syntax        │ const x = require("x")   │ import x from "x"      │
  │ Export Syntax        │ module.exports = ...     │ export / export default│
  │ Loading Style        │ Synchronous (Runtime)    │ Asynchronous (Parsed)  │
  │ Tree-Shaking         │ Hard / Impossible        │ Native support         │
  │ Node.js Activation   │ Default (.js / .cjs)     │ "type": "module" in    │
  │                      │                          │ package.json or .mjs   │
  │ Top-Level Await      │ No                       │ Yes                    │
  └──────────────────────┴──────────────────────────┴────────────────────────┘
*/