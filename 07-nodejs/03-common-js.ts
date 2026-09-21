/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: CommonJS (CJS)
  ==============================================================================

  1. WHAT IS COMMONJS?
     CommonJS is the original module system built into Node.js from day one.
     It uses `require()` to load modules synchronously and `module.exports`
     (or `exports`) to expose functionality.

  2. REAL-LIFE ANALOGY:
     A Vending Machine:
     - You press the button (`require("./snack")`).
     - The machine stops and immediately drops the snack in your hand right then and there.
     - CommonJS loads synchronously on the local disk.

  3. JARGON BUSTER:
     - `require()`: Synchronous built-in function to load modules.
     - `module.exports`: The actual object returned by a `require()` call.
     - `exports`: A shorthand reference alias pointing to `module.exports`.
     - Module Cache: Node.js caches loaded modules; requiring the same file twice
       runs it only ONCE.
*/

// =============================================================================
// BAD PRACTICE: OVERWRITING EXPORTS ACCIDENTALLY
// =============================================================================
/*
  // DANGER: `exports` is just a pointer to `module.exports`.
  // If you reassign `exports = ...`, you break the reference link!

  exports = function wrongWay() { }; // FAILS! Node.js exports an empty object!

  // Correct ways:
  // module.exports = function rightWay() { };
  // exports.myFunction = function rightWay() { };
*/

// =============================================================================
// GOOD PRACTICE: COMMONJS EXPORT AND CACHING PATTERNS
// =============================================================================

// Pattern 1: Named Exports on module.exports
const MathService = {
  add(a: number, b: number): number {
    return a + b;
  },
  multiply(a: number, b: number): number {
    return a * b;
  },
};

// Pattern 2: Exporting a Class / Constructor
class LoggerService {
  constructor(private prefix: string) {}

  public log(msg: string): void {
    console.log(`[${this.prefix}] ${msg}`);
  }
}

// Simulating how Node.js handles require & exports:
const simulatedModule = {
  exports: {} as Record<string, unknown>,
};

// Exporting:
simulatedModule.exports = {
  MathService,
  LoggerService,
};

// Importing (consuming):
const { MathService: importedMath, LoggerService: ImportedLogger } = simulatedModule.exports as {
  MathService: typeof MathService;
  LoggerService: typeof LoggerService;
};

const calcResult = importedMath.add(15, 35);
const logger = new ImportedLogger("CommonJS-Demo");
logger.log(`Addition result: ${calcResult}`);

// Demonstrating CJS Module Caching:
console.log("\n=== CommonJS Module Caching ===");
console.log("First require() executes the module file.");
console.log("Subsequent require() calls return the cached object from memory!");

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  [CommonJS-Demo] Addition result: 50

  === CommonJS Module Caching ===
  First require() executes the module file.
  Subsequent require() calls return the cached object from memory!
*/

// =============================================================================
// BEHIND THE SCENES: COMMONJS CHEATSHEET
// =============================================================================
/*
  CommonJS Syntax Overview:

  // Export single item:
  module.exports = calculateTax;

  // Export multiple items:
  module.exports = { add, subtract };
  // or:
  exports.add = add;
  exports.subtract = subtract;

  // Import:
  const tax = require("./tax");
  const { add, subtract } = require("./math");

  NOTE: CommonJS is synchronous. It works well on local file systems where reading
  a file from disk takes microseconds.
*/