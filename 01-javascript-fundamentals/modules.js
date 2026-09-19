// =============================================================================
// FILE: 01-javascript-fundamentals/modules.js
// TOPIC: Modules (Defining and Exporting Data and Utilities)
// =============================================================================

// Modules encapsulate code by keeping internal variables private and
// explicitly choosing what to expose to other files.

// -----------------------------------------------------------------------------
// 1. PRIVATE VARIABLES AND HELPERS (NOT EXPORTED)
// -----------------------------------------------------------------------------
// These variables cannot be accessed or modified by files that import this module.

const INTERNAL_MODULE_ID = "MOD_101";
const SECRET_TOKEN = "xyz_secret_token";

// -----------------------------------------------------------------------------
// 2. VALUES INTENDED FOR EXPORT
// -----------------------------------------------------------------------------

const APP_TITLE = "Foundations Application";
const API_VERSION = 1;

function formatGreeting(name) {
  return `Hello, ${name}! Welcome to ${APP_TITLE}.`;
}

function calculateDiscount(price, percentage) {
  return price - price * (percentage / 100);
}

// -----------------------------------------------------------------------------
// 3. COMMONJS EXPORT SYNTAX (Standard Node.js default)
// -----------------------------------------------------------------------------
// Assigning an object to module.exports bundles everything we want to make public.

module.exports = {
  APP_TITLE,
  API_VERSION,
  formatGreeting,
  calculateDiscount,
};

// -----------------------------------------------------------------------------
// 4. ES MODULE (ESM) SYNTAX REFERENCE (Equivalent modern syntax)
// -----------------------------------------------------------------------------
/*
// If your package.json contains "type": "module" or when using TypeScript:

// Named exports:
export { APP_TITLE, API_VERSION, formatGreeting, calculateDiscount };

// Direct inline export:
export const PI = 3.14159;

// Default export:
export default formatGreeting;
*/