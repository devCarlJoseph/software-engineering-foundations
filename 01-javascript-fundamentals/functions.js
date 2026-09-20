/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: JavaScript Functions & Closures
  ==============================================================================

  1. WHAT IS A FUNCTION?
     A reusable block of code designed to perform a specific task.
     Functions take inputs (parameters), perform logic, and return outputs.

  2. REAL-LIFE ANALOGY:
     A coffee vending machine.
     - Input: Coffee beans and sugar settings (parameters).
     - Internal Logic: Boiling water, brewing, mixing.
     - Output: A hot cup of coffee (return value).

  3. JARGON BUSTER:
     - Function Declaration: Standard `function name() {}` (Hoisted to top of scope).
     - Function Expression: Storing an anonymous function in a variable `const fn = function() {}`.
     - Arrow Function (`=>`): Modern concise syntax that lexically binds `this`.
     - Higher-Order Function (HOF): A function that accepts another function as an
       argument, or returns a function.
     - Closure: An inner function that remembers and accesses variables from its
       outer function scope even AFTER the outer function has finished executing.
*/

// =============================================================================
// STEP 1: FUNCTION DECLARATION (HOISTED)
// =============================================================================
// Can be called BEFORE its declaration line in the file:

console.log("Hoisted call:", calculateTax(100)); // Works! Returns 10

function calculateTax(amount, taxRate = 0.10) { // Default parameter = 0.10
  return amount * taxRate;
}

// =============================================================================
// STEP 2: FUNCTION EXPRESSION & ARROW FUNCTIONS
// =============================================================================

// Standard Arrow Function with explicit return:
const calculateDiscount = (price, discountPercent) => {
  return price - price * (discountPercent / 100);
};
console.log("Discounted price:", calculateDiscount(200, 15)); // 170

// One-line Arrow Function with IMPLICIT return (no curly braces, no 'return' keyword):
const square = (num) => num * num;
console.log("Square of 8:", square(8)); // 64

// Returning an object literal with implicit return (must wrap in parentheses):
const buildUser = (id, username) => ({ id: id, username: username });
console.log("User Object:", buildUser(1, "carl_dev"));

// =============================================================================
// STEP 3: HIGHER-ORDER FUNCTIONS (CALLBACKS)
// =============================================================================
// Functions are "First-Class Citizens" in JavaScript—they can be passed around like values!

function executeOperation(val1, val2, operationFn) {
  return operationFn(val1, val2);
}

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

console.log("Sum via callback:", executeOperation(20, 5, add));       // 25
console.log("Product via callback:", executeOperation(20, 5, multiply)); // 100

// =============================================================================
// STEP 4: CLOSURES (PRIVATE STATE ENCAPSULATION)
// =============================================================================
// The returned function retains access to `count` in its private memory!

function createBankVault(initialDeposit) {
  let balance = initialDeposit; // Private variable! Inaccessible from the outside.

  return {
    deposit(amount) {
      balance += amount;
      return `Deposited $${amount}. New balance: $${balance}`;
    },
    getBalance() {
      return `Current secure balance: $${balance}`;
    },
  };
}

const myVault = createBankVault(500);
console.log(myVault.deposit(250)); // Deposited $250. New balance: $750
console.log(myVault.getBalance()); // Current secure balance: $750
// console.log(myVault.balance);   // undefined! (Protected by closure)

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Hoisted call: 10
  Discounted price: 170
  Square of 8: 64
  User Object: { id: 1, username: 'carl_dev' }
  Sum via callback: 25
  Product via callback: 100
  Deposited $250. New balance: $750
  Current secure balance: $750
*/