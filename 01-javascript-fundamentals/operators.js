// =============================================================================
// FILE: 01-javascript-fundamentals/operators.js
// TOPIC: Operators (Arithmetic, Assignment, Comparison, Logical, and Nullish)
// =============================================================================

// -----------------------------------------------------------------------------
// 1. ARITHMETIC OPERATORS
// -----------------------------------------------------------------------------
const a = 15;
const b = 4;

console.log("Addition (+):", a + b);        // 19
console.log("Subtraction (-):", a - b);     // 11
console.log("Multiplication (*):", a * b);  // 60
console.log("Division (/):", a / b);        // 3.75
console.log("Modulo / Remainder (%):", a % b); // 3 (15 divided by 4 leaves remainder 3)
console.log("Exponentiation (**):", a ** 2);   // 225 (15 to the power of 2)

// -----------------------------------------------------------------------------
// 2. COMPOUND ASSIGNMENT OPERATORS
// -----------------------------------------------------------------------------
let count = 20;

count += 5; // equivalent to: count = count + 5 (25)
count -= 3; // equivalent to: count = count - 3 (22)
count *= 2; // equivalent to: count = count * 2 (44)
count /= 4; // equivalent to: count = count / 4 (11)
count %= 3; // equivalent to: count = count % 3 (2)
console.log("Final compound count:", count); // 2

// -----------------------------------------------------------------------------
// 3. COMPARISON OPERATORS (STRICT VS LOOSE)
// -----------------------------------------------------------------------------
// Loose Equality (==) attempts type conversion before comparing (AvoiD):
console.log("Loose 10 == '10':", 10 == "10"); // true (coerces string to number)
console.log("Loose 0 == false:", 0 == false); // true (coerces false to 0)
console.log("Loose null == undefined:", null == undefined); // true

// Strict Equality (===) compares both VALUE and DATA TYPE (ALWAYS USE THIS):
console.log("Strict 10 === '10':", 10 === "10"); // false (number vs string)
console.log("Strict 0 === false:", 0 === false); // false (number vs boolean)
console.log("Strict null === undefined:", null === undefined); // false

// Relational comparisons:
console.log("Greater than (>):", 15 > 10);   // true
console.log("Less than or equal (<=):", 10 <= 10); // true

// -----------------------------------------------------------------------------
// 4. LOGICAL OPERATORS & SHORT-CIRCUITING
// -----------------------------------------------------------------------------

// Logical NOT (!): Inverts boolean truthiness
console.log("NOT true:", !true);   // false
console.log("NOT false:", !false); // true
console.log("Double NOT (convert to boolean):", !!"Hello"); // true

// Logical AND (&&):
// Evaluates left to right. Returns the first FALSY operand, or the last operand if all are truthy.
console.log("AND with falsy first:", false && "admin"); // false
console.log("AND with truthy both:", true && "admin");  // "admin"

// Logical OR (||):
// Evaluates left to right. Returns the first TRUTHY operand, or the last operand if all are falsy.
console.log("OR fallback:", "" || "Default Value"); // "Default Value"
console.log("OR first truthy:", "Real Value" || "Default Value"); // "Real Value"

// -----------------------------------------------------------------------------
// 5. NULLISH COALESCING OPERATOR (??)
// -----------------------------------------------------------------------------
// '||' checks for ANY falsy value: (false, 0, "", null, undefined, NaN)
// '??' checks ONLY for nullish values: (null or undefined)

const itemsCount = 0; // 0 is a valid number, NOT missing data!

const fallbackWithOr = itemsCount || 10;     // 10 (treats 0 as falsy - BUG!)
const fallbackWithNullish = itemsCount ?? 10; // 0 (recognizes 0 as valid!)

console.log("Fallback with ||:", fallbackWithOr);           // 10
console.log("Fallback with ?? (correct):", fallbackWithNullish); // 0

// -----------------------------------------------------------------------------
// 6. TERNARY (CONDITIONAL) OPERATOR
// -----------------------------------------------------------------------------
// Syntax: condition ? expressionIfTrue : expressionIfFalse
const score = 85;
const passingStatus = score >= 75 ? "Passed" : "Failed";
console.log("Ternary result:", passingStatus); // "Passed"