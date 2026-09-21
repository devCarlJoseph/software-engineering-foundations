/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Node.js Module System Concept
  ==============================================================================

  1. WHAT IS A MODULE?
     A module is an isolated, self-contained file containing functions, classes,
     or constants that can be shared across multiple parts of an application.
     In Node.js, every file is treated as a separate module with its own scope.

  2. REAL-LIFE ANALOGY:
     Lego Bricks:
     - Without modules: The entire toy is glued together in one giant plastic lump.
       If you want to swap a wheel, you have to melt the whole toy.
     - With modules: Each brick is independent. You can plug in an engine module,
       swap the wheels module, and keep each part testable and clean.

  3. JARGON BUSTER:
     - Module Scope: Variables declared in a file are PRIVATE to that file by default.
     - Module Wrapper Function: The hidden function Node.js wraps around every file
       under the hood before executing it.
     - Module Exports: What a file makes public for other files to consume.
*/

// =============================================================================
// BAD PRACTICE: GLOBAL POLLUTION (NO MODULE ENCAPSULATION)
// =============================================================================
/*
  // In old browser scripts without modules, variables leaked to window/global:
  global.taxRate = 0.12;
  global.calculateTotal = function(subtotal) { ... };
  // Anyone anywhere can accidentally overwrite `taxRate` and break everything!
*/

// =============================================================================
// HOW NODE.JS WRAPS MODULES UNDER THE HOOD
// =============================================================================

/*
  Behind the scenes, before executing ANY file, Node.js wraps your code in:

  (function (exports, require, module, __filename, __dirname) {
      // YOUR CODE ACTUALLY RUNS INSIDE HERE!
  });
*/

// Let's inspect the module metadata provided by this wrapper:
console.log("=== Module Scope Inspection ===");

// 1. Current file path:
console.log("File Name:   ", typeof __filename !== "undefined" ? __filename : "N/A in raw ESM");

// 2. Current directory path:
console.log("Directory:   ", typeof __dirname !== "undefined" ? __dirname : "N/A in raw ESM");

// 3. Module object:
console.log("Module ID:   ", typeof module !== "undefined" ? module.id : "ESM Context");

// 4. Encapsulation Demo:
interface UserCartItem {
  id: string;
  name: string;
  price: number;
}

// Private to this module (not accessible to other files unless exported)
const TAX_RATE = 0.08;

function calculateCartTotal(items: UserCartItem[]): number {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  return subtotal + subtotal * TAX_RATE;
}

const sampleCart: UserCartItem[] = [
  { id: "item_1", name: "Keyboard", price: 75.0 },
  { id: "item_2", name: "Mouse", price: 25.0 },
];

console.log("\n=== Encapsulated Calculation ===");
console.log("Total with tax:", `$${calculateCartTotal(sampleCart).toFixed(2)}`);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === Module Scope Inspection ===
  File Name:    d:\Carl Files\software-engineer-foundations\07-nodejs\02-module.ts
  Directory:    d:\Carl Files\software-engineer-foundations\07-nodejs
  Module ID:    .

  === Encapsulated Calculation ===
  Total with tax: $108.00
*/

// =============================================================================
// BEHIND THE SCENES
// =============================================================================
/*
  WHY MODULE ENCAPSULATION MATTERS:
  1. Name Collisions Prevented: Two files can both have `const taxRate = ...`
     without interfering with each other.
  2. Clear Contracts: You decide exactly what enters (`import`/`require`)
     and what leaves (`export`/`module.exports`).
  3. Lazy Loading: Modules are only compiled when loaded.
*/