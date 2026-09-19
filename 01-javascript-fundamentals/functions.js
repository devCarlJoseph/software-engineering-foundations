// =============================================================================
// FILE: 01-javascript-fundamentals/functions.js
// TOPIC: Functions (Declarations, Expressions, Arrow Syntax, Parameters, and Closures)
// =============================================================================

// -----------------------------------------------------------------------------
// 1. FUNCTION DECLARATION (HOISTED)
// -----------------------------------------------------------------------------
// Function declarations can be called before they are declared in the file.

console.log("Calling before declaration:", addNumbers(10, 20)); // Works! (30)

function addNumbers(a, b) {
  return a + b;
}

// -----------------------------------------------------------------------------
// 2. FUNCTION EXPRESSION (NOT HOISTED)
// -----------------------------------------------------------------------------
// Storing an anonymous function inside a variable. Must be declared before calling.

const multiplyNumbers = function (a, b) {
  return a * b;
};

console.log("Calling function expression:", multiplyNumbers(4, 5)); // 20

// -----------------------------------------------------------------------------
// 3. ARROW FUNCTIONS (ES6 CONCISE SYNTAX)
// -----------------------------------------------------------------------------

// Standard arrow function with multiple lines and explicit return:
const calculateTax = (amount, rate) => {
  const tax = amount * rate;
  return tax;
};
console.log("Tax calculated:", calculateTax(100, 0.12)); // 12

// Single-line arrow function with IMPLICIT return (no curly braces, no 'return' keyword):
const square = (num) => num * num;
console.log("Square calculated:", square(6)); // 36

// Single parameter does not require parentheses:
const double = x => x * 2;
console.log("Double calculated:", double(9)); // 18

// Returning an object literal with implicit return (must wrap object in parentheses):
const makeUserObject = (id, name) => ({ id: id, name: name });
console.log("Object returned:", makeUserObject(1, "Carl"));

// -----------------------------------------------------------------------------
// 4. DEFAULT PARAMETERS
// -----------------------------------------------------------------------------
// Default values apply if the argument is undefined or omitted.

function greetUser(name = "Guest", greeting = "Hello") {
  return `${greeting}, ${name}!`;
}

console.log(greetUser());                   // "Hello, Guest!"
console.log(greetUser("Carl"));             // "Hello, Carl!"
console.log(greetUser("Carl", "Welcome"));  // "Welcome, Carl!"

// -----------------------------------------------------------------------------
// 5. FIRST-CLASS FUNCTIONS (PASSING FUNCTIONS AS ARGUMENTS)
// -----------------------------------------------------------------------------
// In JavaScript, functions are values. You can pass them to other functions.

function operateOnTwo(val1, val2, operationFunction) {
  return operationFunction(val1, val2);
}

const sumResult = operateOnTwo(50, 25, addNumbers);
const prodResult = operateOnTwo(50, 25, multiplyNumbers);

console.log("Sum via callback:", sumResult);   // 75
console.log("Prod via callback:", prodResult); // 1250

// -----------------------------------------------------------------------------
// 6. CLOSURES (STATE ENCAPSULATION)
// -----------------------------------------------------------------------------
// A function remembers the variables from the outer scope in which it was created.

function makeCounter(startingNumber = 0) {
  let count = startingNumber; // This variable is private to the returned function

  return function () {
    count++;
    return count;
  };
}

const counterA = makeCounter(0);
console.log("Counter A first tick:", counterA());  // 1
console.log("Counter A second tick:", counterA()); // 2

const counterB = makeCounter(100);
console.log("Counter B first tick:", counterB());  // 101
console.log("Counter A preserved:", counterA());   // 3 (Counter A kept its own independent state!)