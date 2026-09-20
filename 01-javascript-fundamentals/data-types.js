/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: JavaScript Data Types & Memory Model
  ==============================================================================

  1. WHAT ARE DATA TYPES?
     Every piece of data processed by a computer has a specific type telling the
     engine how much memory to allocate and what operations are valid.
     JavaScript has 7 Primitive Types and 1 Reference Type (Objects).

  2. REAL-LIFE ANALOGY:
     - Primitives (Stack): Single cash dollar bills. If you give someone \$10,
       they have their own copy. If they draw on it, your \$10 is untouched.
     - Reference Types (Heap): A shared Google Doc URL. If you give someone the link,
       both of you edit the EXACT same document in the cloud.

  3. JARGON BUSTER:
     - Primitive: Basic value copied directly by value; stored on the memory stack.
     - Reference Type: Complex object/array stored in the memory heap; variables
       hold only the pointer address.
     - Coercion: JavaScript automatically converting one type to another (e.g. `"5" + 2 = "52"`).
     - NaN: "Not a Number" — a special numeric value produced by invalid math (e.g. `0 / 0`).
*/

// =============================================================================
// STEP 1: THE 7 PRIMITIVE TYPES
// =============================================================================

const userFirstName = "Carl";              // 1. String
const accountBalance = 1500.75;            // 2. Number (handles floats and integers)
const isEmailVerified = true;              // 3. Boolean (true or false)
const bigDatabaseId = 9007199254740995n;   // 4. BigInt (integers > 2^53 - 1)
const uniqueApiKeys = Symbol("session_key");// 5. Symbol (guaranteed unique token)
const emptyAvatar = null;                  // 6. Null (intentional empty value)
let unassignedToken;                       // 7. Undefined (declared, but no value yet)

console.log("String:", userFirstName);
console.log("Number:", accountBalance);
console.log("Boolean:", isEmailVerified);
console.log("BigInt:", bigDatabaseId);
console.log("Null:", emptyAvatar);
console.log("Undefined:", unassignedToken);

// =============================================================================
// STEP 2: REFERENCE TYPES (OBJECTS AND ARRAYS)
// =============================================================================

const userProfile = { id: 1, name: "Carl" };
const tagsList = ["javascript", "backend"];

// =============================================================================
// STEP 3: VALUE VS REFERENCE BEHAVIOR (CRITICAL INTERVIEW TOPIC)
// =============================================================================

// Primitives: Copied by VALUE (Independent copies)
let originalPrice = 100;
let copyOfPrice = originalPrice;
copyOfPrice = 150;
console.log("Original Price untouched:", originalPrice); // 100

// Reference Types: Copied by REFERENCE POINTER (Shared memory)
const originalUser = { role: "viewer" };
const sharedUserRef = originalUser; // Copies the pointer address, not the object!
sharedUserRef.role = "admin";       // Mutates the shared object on the heap!
console.log("Original User mutated via pointer:", originalUser.role); // "admin"

// =============================================================================
// STEP 4: TYPE INSPECTION WITH typeof & ESSENTIAL GOTCHAS
// =============================================================================

console.log("typeof string:", typeof userFirstName);   // "string"
console.log("typeof number:", typeof accountBalance); // "number"
console.log("typeof boolean:", typeof isEmailVerified); // "boolean"

// GOTCHA 1: typeof null returns "object" (Historic 1995 JavaScript engine bug)
console.log("typeof null quirk:", typeof null); // "object"
console.log("Correct way to check null:", emptyAvatar === null); // true

// GOTCHA 2: typeof array returns "object"
console.log("typeof array quirk:", typeof tagsList); // "object"
console.log("Correct way to check array:", Array.isArray(tagsList)); // true

// GOTCHA 3: typeof NaN returns "number"
console.log("typeof NaN quirk:", typeof NaN); // "number"
console.log("Correct way to check NaN:", Number.isNaN(0 / 0)); // true

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  String: Carl
  Number: 1500.75
  Boolean: true
  BigInt: 9007199254740995n
  Null: null
  Undefined: undefined
  Original Price untouched: 100
  Original User mutated via pointer: admin
  typeof string: string
  typeof number: number
  typeof boolean: boolean
  typeof null quirk: object
  Correct way to check null: true
  typeof array quirk: object
  Correct way to check array: true
  typeof NaN quirk: number
  Correct way to check NaN: true
*/