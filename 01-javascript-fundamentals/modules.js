/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Node.js Modules (CommonJS)
  ==============================================================================

  1. WHAT ARE MODULES?
     A module is a single JavaScript file. By default, variables defined inside
     a file are completely private to that file.
     To share variables, classes, or functions, you must explicitly EXPORT them.

  2. REAL-LIFE ANALOGY:
     A Restaurant Kitchen.
     The kitchen has private recipes, secret spices, and knives (private variables).
     The only things that leave the kitchen to the dining room are the prepared
     meals placed on the pickup counter (`module.exports`).

  3. JARGON BUSTER:
     - CommonJS (CJS): The module system historically built into Node.js (`module.exports` and `require`).
     - ES Modules (ESM): The modern browser/JS standard (`export` and `import`).
     - Encapsulation: Keeping sensitive data private inside a file while exposing
       only safe public helper methods.
*/

// =============================================================================
// STEP 1: PRIVATE INTERNALS (NOT EXPORTED)
// =============================================================================
// These variables CANNOT be seen, read, or modified by outside files!

const SECRET_API_SALT = "x_super_secret_salt_99";

function logPrivateDiagnostic(message) {
  console.log(`[DIAGNOSTIC]: ${message}`);
}

// =============================================================================
// STEP 2: PUBLIC INTERFACES (VALUES INTENDED FOR EXPORT)
// =============================================================================

const APP_VERSION = "2.1.0";
const MAX_RETRY_COUNT = 3;

function sanitizeInput(str) {
  if (typeof str !== "string") return "";
  return str.trim();
}

function calculateDiscountPrice(originalPrice, discountPercent) {
  return originalPrice - originalPrice * (discountPercent / 100);
}

class SimpleLogger {
  log(message) {
    console.log(`[APP LOG]: ${message}`);
  }
}

// =============================================================================
// STEP 3: EXPORTING VIA MODULE.EXPORTS (COMMONJS)
// =============================================================================
// Assigning an object to module.exports bundles everything we want to make public:

module.exports = {
  APP_VERSION,
  MAX_RETRY_COUNT,
  sanitizeInput,
  calculateDiscountPrice,
  SimpleLogger,
};

// =============================================================================
// REFERENCE: ES MODULES (ESM) EQUIVALENT
// =============================================================================
/*
  If your project uses "type": "module" in package.json, the syntax looks like:

  export { APP_VERSION, sanitizeInput, calculateDiscountPrice, SimpleLogger };
  export default SimpleLogger;
*/