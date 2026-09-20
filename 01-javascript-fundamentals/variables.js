/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: JavaScript Variables (const, let, and var)
  ==============================================================================

  1. WHAT IS A VARIABLE?
     A variable is a named storage container in computer memory that holds data.
     Modern JavaScript gives us 3 declaration keywords: `const`, `let`, and `var`.

  2. REAL-LIFE ANALOGY:
     - const: A metal plaque engraved with a serial number. It can never be swapped.
     - let: A digital price tag on a supermarket shelf. You can change the number anytime.
     - var: An old whiteboard in a public hallway. Anyone can walk by and overwrite it.

  3. JARGON BUSTER:
     - Declaration: Registering the variable name into memory (`let age;`).
     - Initialization: Giving a variable its very first value (`age = 25;`).
     - Reassignment: Overwriting the value with a new one (`age = 26;`).
     - Mutation: Changing internal properties of an object/array without changing
       its memory address.
     - Block Scope: Any area between curly braces `{ ... }` (like inside `if` or `for`).
     - Temporal Dead Zone (TDZ): The zone between the start of a block and the line
       where `let` or `const` is declared. Accessing it here throws a ReferenceError.
*/

// =============================================================================
// STEP 1: CONST (CONSTANT BINDING - THE MODERN DEFAULT)
// =============================================================================
// Rule: Use 'const' by default unless you KNOW the value needs to be reassigned.

const APP_NAME = "Foundations Core";
const MAX_LOGIN_ATTEMPTS = 5;

// MAX_LOGIN_ATTEMPTS = 6; // TypeError: Assignment to constant variable.

// MUTABILITY NUANCE:
// 'const' prevents reassignment of the variable identifier, NOT internal object mutation!
const serverConfig = { port: 3000, environment: "development" };
serverConfig.port = 8080; // Perfectly valid: The object address didn't change!
console.log("Updated Port:", serverConfig.port);

// =============================================================================
// STEP 2: LET (REASSIGNABLE - BLOCK SCOPED)
// =============================================================================
// Rule: Use 'let' for counters, accumulators, or state flags that change over time.

let activeUserCount = 100;
activeUserCount += 15; // Reassignment
console.log("Active Users:", activeUserCount);

// Block Scope Demonstration:
{
  let insideBlockOnly = "I cannot escape these curly braces!";
  console.log("Inside block:", insideBlockOnly);
}
// console.log(insideBlockOnly); // ReferenceError: insideBlockOnly is not defined

// =============================================================================
// STEP 3: VAR (LEGACY - AVOID IN MODERN CODE)
// =============================================================================
// 'var' is function-scoped and completely ignores `{ ... }` block boundaries.

{
  var leakedVariable = "I leaked out into the outer scope!";
}
console.log("Leaked var:", leakedVariable); // Works! (This causes accidental bugs)

// Dangerous duplicate declarations allowed by var:
var userRole = "guest";
var userRole = "admin"; // Silently overwrites without any warning or error!
console.log("Overwritten Role:", userRole);

// =============================================================================
// STEP 4: HOISTING & THE TEMPORAL DEAD ZONE (TDZ)
// =============================================================================
// 'var' is hoisted and initialized to 'undefined':
console.log("var before its line:", hoistedVar); // Output: undefined
var hoistedVar = "Now assigned";

// 'let' and 'const' are hoisted, but remain UNINITIALIZED in the TDZ:
// console.log(tdzItem); // ReferenceError: Cannot access 'tdzItem' before initialization
let tdzItem = "Safely out of the TDZ";
console.log("TDZ Item:", tdzItem);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Updated Port: 8080
  Active Users: 115
  Inside block: I cannot escape these curly braces!
  Leaked var: I leaked out into the outer scope!
  Overwritten Role: admin
  var before its line: undefined
  TDZ Item: Safely out of the TDZ
*/

// =============================================================================
// BEHIND THE SCENES: WHAT THE V8 ENGINE DOES
// =============================================================================
/*
  1. Creation Phase (Memory Allocation):
     - Scans code for all declarations.
     - Sets aside memory for `var` and pre-fills it with `undefined`.
     - Sets aside memory for `let` and `const`, but marks them "uninitialized" (TDZ).
  2. Execution Phase:
     - Runs code line-by-line.
     - When reaching `let tdzItem = ...`, it transitions from TDZ to ready state.
*/