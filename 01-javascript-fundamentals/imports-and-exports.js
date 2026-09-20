/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Consuming Modules (require and import)
  ==============================================================================

  1. WHAT IS IMPORTING?
     "Importing" is bringing exported functionality from another file or third-party
     npm package into your current file so you can use it.

  2. REAL-LIFE ANALOGY:
     Shopping at an IKEA warehouse.
     Instead of manufacturing furniture from trees inside your living room, you
     go to the warehouse, pick up the packaged desk (`require("./desk")`), bring it
     home, and assemble it.

  3. JARGON BUSTER:
     - require(): The built-in CommonJS function used in Node.js to load files.
     - Destructured Import: Extracting only the specific functions you need directly.
     - Namespace Import: Loading all exports into a single grouped parent object.
     - Default Import: Loading the primary single export of a file.
*/

// =============================================================================
// STEP 1: IMPORTING VIA COMMONJS require()
// =============================================================================

// Method A: Destructuring only the specific tools we need (Recommended)
const {
  APP_VERSION,
  MAX_RETRY_COUNT,
  sanitizeInput,
  calculateDiscountPrice,
  SimpleLogger,
} = require("./modules");

// Method B: Importing everything under a single namespace object
const ModuleLibrary = require("./modules");

// =============================================================================
// STEP 2: USING THE IMPORTED TOOLS
// =============================================================================

console.log("Imported Version Constant:", APP_VERSION);
console.log("Imported Max Retry Constant:", MAX_RETRY_COUNT);

// Testing the imported sanitization utility:
const dirtyInput = "   carl_developer   ";
const cleanInput = sanitizeInput(dirtyInput);
console.log(`Sanitized Input: '${cleanInput}'`);

// Testing the imported math calculation utility:
const finalPrice = calculateDiscountPrice(200, 20); // 20% off $200
console.log("Calculated Discount Price: $" + finalPrice);

// Testing the imported Logger class:
const logger = new SimpleLogger();
logger.log("Modules connected and working properly!");

// Accessing via the full namespace object (Method B):
console.log("From namespace object:", ModuleLibrary.APP_VERSION);

// =============================================================================
// STEP 3: ES MODULES (ESM) SYNTAX REFERENCE
// =============================================================================
/*
  In modern frontend frameworks (React, Vue) or TypeScript:

  // Named import:
  import { sanitizeInput, APP_VERSION } from "./modules.js";

  // Renaming an import:
  import { sanitizeInput as cleanText } from "./modules.js";

  // Default import:
  import SimpleLogger from "./modules.js";

  // Namespace import:
  import * as MyLib from "./modules.js";
*/

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Imported Version Constant: 2.1.0
  Imported Max Retry Constant: 3
  Sanitized Input: 'carl_developer'
  Calculated Discount Price: $160
  [APP LOG]: Modules connected and working properly!
  From namespace object: 2.1.0
*/