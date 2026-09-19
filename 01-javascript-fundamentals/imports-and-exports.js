// =============================================================================
// FILE: 01-javascript-fundamentals/imports-and-exports.js
// TOPIC: Consuming Modules (CommonJS require and ES Module import Syntax)
// =============================================================================

// -----------------------------------------------------------------------------
// 1. COMMONJS: IMPORTING USING require()
// -----------------------------------------------------------------------------

// Method A: Destructuring specific exports from the target module
const {
  APP_TITLE,
  API_VERSION,
  formatGreeting,
  calculateDiscount,
} = require("./modules");

// Method B: Importing the entire exported object under a namespace
const FullModule = require("./modules");

// -----------------------------------------------------------------------------
// 2. USING THE IMPORTED CONSTANTS AND FUNCTIONS
// -----------------------------------------------------------------------------

console.log("Imported Constant APP_TITLE:", APP_TITLE);
console.log("Imported Constant API_VERSION:", API_VERSION);

// Calling imported functions:
const greetingMessage = formatGreeting("Carl");
console.log("Greeting:", greetingMessage);

const discountedPrice = calculateDiscount(100, 15);
console.log("Discounted Price:", discountedPrice); // 85

// Using the full namespace object (Method B):
console.log("From namespace APP_TITLE:", FullModule.APP_TITLE);

// -----------------------------------------------------------------------------
// 3. ES MODULE (ESM) IMPORT SYNTAX REFERENCE
// -----------------------------------------------------------------------------
/*
// When using ECMAScript Modules (ESM) in modern projects or TypeScript:

// 1. Named Imports (Must match the exported names):
import { APP_TITLE, formatGreeting } from "./modules.js";

// 2. Named Imports with Renaming / Aliasing:
import { formatGreeting as sayHello } from "./modules.js";

// 3. Namespace Import (Imports everything as properties of an object):
import * as MyModule from "./modules.js";

// 4. Default Import:
import defaultItem from "./modules.js";
*/