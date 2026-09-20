/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: JavaScript Operators & Coercion
  ==============================================================================

  1. WHAT ARE OPERATORS?
     Symbols that perform mathematical calculations, string manipulations,
     comparisons, and logical decisions on data values (operands).

  2. REAL-LIFE ANALOGY:
     - Strict Equality (`===`): A passport officer checking BOTH your photo AND fingerprint.
     - Loose Equality (`==`): An inattentive guard who lets anyone in with a vague resemblance.
     - Nullish Coalescing (`??`): A gas tank indicator. If it reads `0`, it means "0 gallons left",
       NOT "missing data".

  3. JARGON BUSTER:
     - Strict Equality (`===`): Compares value AND type without converting them.
     - Loose Equality (`==`): Automatically converts types before comparing (Dangerous!).
     - Short-Circuiting: Halting evaluation the exact instant the final outcome is decided.
     - Falsy Values (The only 6): `false`, `0`, `""` (empty string), `null`, `undefined`, `NaN`.
     - Nullish Values (The only 2): `null` and `undefined`.
*/

// =============================================================================
// STEP 1: ARITHMETIC OPERATORS
// =============================================================================
const subtotal = 100;
const shippingFee = 15;

console.log("Addition (+):", subtotal + shippingFee);       // 115
console.log("Subtraction (-):", subtotal - 20);             // 80
console.log("Multiplication (*):", subtotal * 2);           // 200
console.log("Division (/):", subtotal / 4);                 // 25
console.log("Remainder / Modulo (%):", 14 % 3);             // 2 (14 divided by 3 leaves 2)
console.log("Exponentiation (**):", 2 ** 4);                // 16 (2 to the power of 4)

// =============================================================================
// STEP 2: STRICT (===) VS LOOSE (==) EQUALITY
// =============================================================================
// Loose Equality (==) forces implicit type conversion (Avoid this!):
console.log("Loose: 50 == '50':", 50 == "50");     // true (Coerces string to number)
console.log("Loose: 0 == false:", 0 == false);     // true (Coerces false to 0)
console.log("Loose: '' == false:", "" == false);   // true (Coerces empty string to 0)

// Strict Equality (===) checks value AND type (Modern Best Practice):
console.log("Strict: 50 === '50':", 50 === "50");   // false (number vs string)
console.log("Strict: 0 === false:", 0 === false);   // false (number vs boolean)
console.log("Strict: '' === false:", "" === false); // false (string vs boolean)

// =============================================================================
// STEP 3: LOGICAL SHORT-CIRCUITING (&& and ||)
// =============================================================================
// Logical AND (&&): Returns the first falsy operand, or the last truthy operand.
const hasAccount = true;
const hasSubscription = true;
const canWatchMovie = hasAccount && hasSubscription;
console.log("Can watch movie?:", canWatchMovie); // true

// Logical OR (||): Returns the first truthy operand.
const userCustomTheme = "";
const activeTheme = userCustomTheme || "default-dark";
console.log("Active Theme with ||:", activeTheme); // "default-dark"

// =============================================================================
// STEP 4: NULLISH COALESCING (??) VS LOGICAL OR (||)
// =============================================================================
// Problem with ||: It treats 0 as falsy!
// If a customer orders 0 items, || would accidentally override it with default 1!

const itemsInCart = 0; // 0 is a completely valid choice!

const quantityWithOr = itemsInCart || 1;     // 1 (Bug! 0 was treated as missing data)
const quantityWithNullish = itemsInCart ?? 1; // 0 (Correct! 0 is preserved)

console.log("Quantity with || (Buggy):", quantityWithOr);
console.log("Quantity with ?? (Correct):", quantityWithNullish);

// =============================================================================
// STEP 5: TERNARY OPERATOR (INLINE IF/ELSE)
// =============================================================================
// Syntax: condition ? valueIfTrue : valueIfFalse
const userAges = 20;
const entryStatus = userAge >= 18 ? "Eligible" : "Underage";
console.log("Entry Status:", entryStatus); // "Eligible"

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Addition (+): 115
  Subtraction (-): 80
  Multiplication (*): 200
  Division (/): 25
  Remainder / Modulo (%): 2
  Exponentiation (**): 16
  Loose: 50 == '50': true
  Loose: 0 == false: true
  Loose: '' == false: true
  Strict: 50 === '50': false
  Strict: 0 === false: false
  Strict: '' === false: false
  Can watch movie?: true
  Active Theme with ||: default-dark
  Quantity with || (Buggy): 1
  Quantity with ?? (Correct): 0
  Entry Status: Eligible
*/