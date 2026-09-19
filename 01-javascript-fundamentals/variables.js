// =============================================================================
// FILE: 01-javascript-fundamentals/variables.js
// TOPIC: Variables (var, let, const, Reassignment, and Block Scoping)
// =============================================================================

// -----------------------------------------------------------------------------
// 1. DECLARATION VS INITIALIZATION
// -----------------------------------------------------------------------------
// Declaration: Registering the variable name in scope.
// Initialization: Assigning its first value in memory.

let userAge; // Declared, but uninitialized (defaults to undefined)
console.log("Uninitialized let:", userAge); // undefined

userAge = 25; // Initialized / assigned
console.log("Initialized let:", userAge);   // 25

// -----------------------------------------------------------------------------
// 2. CONST (CONSTANT BINDING)
// -----------------------------------------------------------------------------
// - Must be initialized at the moment of declaration.
// - Cannot be reassigned to a new value or reference.
// - Block-scoped.

const MAX_LOGIN_ATTEMPTS = 5;
const BASE_URL = "https://api.example.com";

// MAX_LOGIN_ATTEMPTS = 10; 
// -> ERROR: TypeError: Assignment to constant variable.

// const uninitializedConst; 
// -> ERROR: SyntaxError: Missing initializer in const declaration.

// IMPORTANT NUANCE: const protects the variable binding, not the contents!
const userSettings = { theme: "dark" };
userSettings.theme = "light"; // This works because the object reference didn't change!
console.log("Mutated const object:", userSettings.theme); // "light"

// -----------------------------------------------------------------------------
// 3. LET (MUTABLE BINDING)
// -----------------------------------------------------------------------------
// - Can be declared without immediate initialization.
// - Can be reassigned to any value or data type at any time.
// - Block-scoped.

let currentSession = "SESSION_001";
currentSession = "SESSION_002"; // Valid reassignment
console.log("Reassigned let:", currentSession);

// -----------------------------------------------------------------------------
// 4. BLOCK SCOPING (LET & CONST)
// -----------------------------------------------------------------------------
// A block is created by any pair of curly braces { ... }.
// Variables declared with let and const cannot escape the block they are in.

{
  let insideBlockLet = "Visible only inside this block";
  const insideBlockConst = "Also visible only inside this block";
  console.log("Inside block:", insideBlockLet);
}

// console.log(insideBlockLet);
// -> ERROR: ReferenceError: insideBlockLet is not defined

// -----------------------------------------------------------------------------
// 5. VAR (LEGACY - FUNCTION / GLOBALLY SCOPED)
// -----------------------------------------------------------------------------
// - Ignores standard blocks { ... } and leaks into the outer scope.
// - Can be redeclared and reassigned without error (leads to subtle bugs).

{
  var leakedVar = "I escaped the block!";
}
console.log("Leaked var:", leakedVar); // "I escaped the block!"

// Accidental redeclaration danger with var:
var score = 100;
var score = 999; // Silently overwrites previous variable without warning!
console.log("Overwritten var score:", score); // 999

// -----------------------------------------------------------------------------
// 6. TEMPORAL DEAD ZONE (TDZ)
// -----------------------------------------------------------------------------
// Variables declared with 'var' can be read before their declaration line (hoisted as undefined).
console.log("var before declaration:", hoistedVar); // undefined
var hoistedVar = "Now assigned";

// Variables declared with 'let' and 'const' CANNOT be accessed before their line:
// console.log(tdzVar); // -> ERROR: ReferenceError: Cannot access 'tdzVar' before initialization
let tdzVar = "Out of TDZ";
console.log("tdzVar value:", tdzVar);