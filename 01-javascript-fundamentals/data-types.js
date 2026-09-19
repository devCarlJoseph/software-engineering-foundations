// =============================================================================
// FILE: 01-javascript-fundamentals/data-types.js
// TOPIC: JavaScript Data Types (7 Primitives, Reference Types, and Type Checking)
// =============================================================================

// =============================================================================
// 1. THE 7 PRIMITIVE TYPES (Stored directly by value, immutable)
// =============================================================================

// 1. String
const courseName = "Software Engineering Foundations";
const initial = 'S';
const interpolated = `Course: ${courseName}`;

// 2. Number (All numbers: integers, decimals, floats, and special values)
const integerCount = 100;
const decimalPrice = 19.99;
const negativeNumber = -50;
const notANumber = NaN;       // Result of invalid arithmetic (e.g., "abc" / 2)
const infinityVal = Infinity; // Result of dividing positive numbers by 0 (e.g., 10 / 0)

// 3. BigInt (For whole numbers larger than 2^53 - 1)
const bigIntLiteral = 9007199254740991n; // Appending 'n' makes it a BigInt
const maxSafeNumber = Number.MAX_SAFE_INTEGER; // 9007199254740991

// 4. Boolean (Only two possible values: true or false)
const isCompleted = false;
const hasAccess = true;

// 5. Undefined (A variable that has been declared but not given a value)
let pendingData;
console.log("Undefined example:", pendingData); // undefined

// 6. Null (Explicit intentional absence of any value or object)
const emptySelection = null;
console.log("Null example:", emptySelection); // null

// 7. Symbol (Guaranteed unique and immutable identifier)
const symbolA = Symbol("apiKey");
const symbolB = Symbol("apiKey");
console.log("Symbols are never equal:", symbolA === symbolB); // false

// =============================================================================
// 2. REFERENCE TYPES (Stored in memory heap, accessed via reference pointer)
// =============================================================================

// Object
const user = { id: 1, username: "carl_dev" };

// Array (Specialized list-like object)
const tools = ["Git", "Node.js", "Docker"];

// =============================================================================
// 3. PRIMITIVE VALUE VS REFERENCE POINTER BEHAVIOR
// =============================================================================

// Primitives copy the exact value:
let x = 10;
let y = x; // y gets a brand new copy of value 10
y = 20;    // changing y does not affect x
console.log("Primitive independence: x =", x, "y =", y); // x = 10, y = 20

// Reference types copy the memory pointer address:
const originalObject = { score: 50 };
const referenceCopy = originalObject; // copies the pointer, not the object!
referenceCopy.score = 99;             // modifying through referenceCopy affects originalObject!
console.log("Mutated original via pointer:", originalObject.score); // 99

// =============================================================================
// 4. TYPE INSPECTION USING typeof
// =============================================================================
console.log("typeof string:", typeof courseName);       // "string"
console.log("typeof number:", typeof decimalPrice);     // "number"
console.log("typeof bigint:", typeof bigIntLiteral);   // "bigint"
console.log("typeof boolean:", typeof isCompleted);     // "boolean"
console.log("typeof undefined:", typeof pendingData);   // "undefined"
console.log("typeof symbol:", typeof symbolA);          // "symbol"
console.log("typeof object:", typeof user);             // "object"

// =============================================================================
// 5. ESSENTIAL TYPE CHECKING GOTCHAS
// =============================================================================

// Gotcha 1: typeof null returns "object" (historic JavaScript engine bug)
console.log("typeof null bug:", typeof null); // "object"
console.log("Correct way to check null:", emptySelection === null); // true

// Gotcha 2: typeof array returns "object"
console.log("typeof array:", typeof tools); // "object"
console.log("Correct way to check array:", Array.isArray(tools)); // true

// Gotcha 3: typeof NaN returns "number"
console.log("typeof NaN:", typeof NaN); // "number"
console.log("Correct way to check NaN:", Number.isNaN(notANumber)); // true