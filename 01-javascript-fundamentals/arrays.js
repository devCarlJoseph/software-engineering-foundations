// =============================================================================
// FILE: 01-javascript-fundamentals/arrays.js
// TOPIC: Arrays (Creation, Indexing, Mutating Methods, and Iterator Methods)
// =============================================================================

// -----------------------------------------------------------------------------
// 1. ARRAY BASICS AND ZERO-INDEXING
// -----------------------------------------------------------------------------
const fruits = ["Apple", "Banana", "Cherry", "Mango"];

console.log("First element (index 0):", fruits[0]); // "Apple"
console.log("Third element (index 2):", fruits[2]); // "Cherry"
console.log("Array length:", fruits.length);         // 4
console.log("Last element:", fruits[fruits.length - 1]); // "Mango"
console.log("Modern last element with .at(-1):", fruits.at(-1)); // "Mango"

// -----------------------------------------------------------------------------
// 2. BASIC MUTATING METHODS (MODIFY THE ORIGINAL ARRAY)
// -----------------------------------------------------------------------------
const tasks = ["Task 1", "Task 2"];

tasks.push("Task 3"); // Adds to the END of array
console.log("After push:", tasks); // ["Task 1", "Task 2", "Task 3"]

const poppedItem = tasks.pop(); // Removes from the END of array and returns it
console.log("Popped item:", poppedItem); // "Task 3"

tasks.unshift("Task 0"); // Adds to the BEGINNING of array
console.log("After unshift:", tasks); // ["Task 0", "Task 1", "Task 2"]

const shiftedItem = tasks.shift(); // Removes from the BEGINNING of array and returns it
console.log("Shifted item:", shiftedItem); // "Task 0"

// -----------------------------------------------------------------------------
// 3. MAP (TRANSFORMS EACH ELEMENT -> RETURNS A NEW ARRAY)
// -----------------------------------------------------------------------------
const numbers = [1, 2, 3, 4, 5];

const doubledNumbers = numbers.map((num) => num * 2);
console.log("Original numbers:", numbers);         // [1, 2, 3, 4, 5] (untouched!)
console.log("Doubled with .map():", doubledNumbers); // [2, 4, 6, 8, 10]

// -----------------------------------------------------------------------------
// 4. FILTER (SELECTS MATCHING ELEMENTS -> RETURNS A NEW ARRAY)
// -----------------------------------------------------------------------------
const scores = [45, 82, 90, 63, 77, 95];

const passingScores = scores.filter((score) => score >= 75);
console.log("Passing scores with .filter():", passingScores); // [82, 90, 77, 95]

// -----------------------------------------------------------------------------
// 5. REDUCE (ACCUMULATES ALL ELEMENTS INTO ONE FINAL VALUE)
// -----------------------------------------------------------------------------
// Syntax: array.reduce((accumulator, currentItem) => ..., initialValue)

const expenses = [50, 120, 30, 200];

const totalExpense = expenses.reduce((accumulator, current) => {
  return accumulator + current;
}, 0); // 0 is the starting accumulator

console.log("Total sum with .reduce():", totalExpense); // 400

// -----------------------------------------------------------------------------
// 6. SEARCHING IN ARRAYS (FIND, INCLUDES, SOME, EVERY)
// -----------------------------------------------------------------------------
const userRoles = ["viewer", "editor", "moderator"];

// includes: returns true/false
console.log("Includes editor?:", userRoles.includes("editor")); // true
console.log("Includes admin?:", userRoles.includes("admin"));   // false

// find: returns the first matching item, or undefined
const numbersList = [10, 25, 40, 55, 70];
const firstOverFifty = numbersList.find((num) => num > 50);
console.log("First number > 50 with .find():", firstOverFifty); // 55

// some: returns true if AT LEAST ONE item matches condition
const hasSmallNumber = numbersList.some((num) => num < 15);
console.log("Has number < 15?:", hasSmallNumber); // true

// every: returns true only if ALL items match condition
const allArePositive = numbersList.every((num) => num > 0);
console.log("All numbers are positive?:", allArePositive); // true