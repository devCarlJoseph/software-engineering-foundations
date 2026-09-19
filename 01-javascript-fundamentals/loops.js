// =============================================================================
// FILE: 01-javascript-fundamentals/loops.js
// TOPIC: Loops and Iteration (for, while, do...while, for...of, for...in, break, continue)
// =============================================================================

// -----------------------------------------------------------------------------
// 1. CLASSIC FOR LOOP (INDEXED ITERATION)
// -----------------------------------------------------------------------------
// Syntax: for (initialization; condition; increment/decrement)

console.log("--- 1. Forward For Loop ---");
for (let i = 1; i <= 5; i++) {
  console.log("Iteration count:", i);
}

console.log("--- 2. Reverse For Loop ---");
for (let i = 5; i >= 1; i--) {
  console.log("Countdown:", i);
}

// -----------------------------------------------------------------------------
// 2. WHILE LOOP
// -----------------------------------------------------------------------------
// Runs as long as the condition evaluates to true. Checked BEFORE each iteration.

console.log("--- 3. While Loop ---");
let batteryLevel = 20;

while (batteryLevel < 35) {
  console.log(`Charging... Battery level: ${batteryLevel}%`);
  batteryLevel += 5;
}
console.log("Charged to target level:", batteryLevel);

// -----------------------------------------------------------------------------
// 3. DO...WHILE LOOP
// -----------------------------------------------------------------------------
// Runs the code block AT LEAST ONCE before checking the condition.

console.log("--- 4. Do...While Loop ---");
let attempts = 5;

do {
  console.log("This executes at least once! Current attempt:", attempts);
  attempts++;
} while (attempts < 3); // Condition is false, so loop terminates immediately

// -----------------------------------------------------------------------------
// 4. FOR...OF LOOP (ITERATING OVER VALUES OF ARRAYS & STRINGS)
// -----------------------------------------------------------------------------
// The cleanest way to iterate over values in an iterable collection.

console.log("--- 5. For...Of Loop over Array ---");
const languages = ["JavaScript", "TypeScript", "SQL"];

for (const language of languages) {
  console.log("Language item:", language);
}

console.log("--- 6. For...Of Loop over String ---");
const word = "CODE";
for (const character of word) {
  console.log("Character:", character);
}

// -----------------------------------------------------------------------------
// 5. FOR...IN LOOP (ENUMERATING PROPERTY KEYS OF AN OBJECT)
// -----------------------------------------------------------------------------
// Iterates over keys/property names of an object.

console.log("--- 7. For...In Loop over Object ---");
const serverStatus = {
  host: "localhost",
  port: 3000,
  isOnline: true,
};

for (const propertyKey in serverStatus) {
  console.log(`Key: ${propertyKey} | Value: ${serverStatus[propertyKey]}`);
}

// -----------------------------------------------------------------------------
// 6. LOOP CONTROL: BREAK AND CONTINUE
// -----------------------------------------------------------------------------

console.log("--- 8. Continue Statement ---");
// continue skips the current iteration and jumps to the next one
for (let num = 1; num <= 6; num++) {
  if (num % 2 === 0) {
    continue; // Skip even numbers
  }
  console.log("Odd number printed:", num); // Prints 1, 3, 5
}

console.log("--- 9. Break Statement ---");
// break terminates the entire loop immediately
for (let num = 1; num <= 10; num++) {
  if (num === 4) {
    console.log("Stopping loop early at:", num);
    break;
  }
  console.log("Processing number:", num); // Prints 1, 2, 3
}