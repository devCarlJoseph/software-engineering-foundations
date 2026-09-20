/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Loops & Iteration
  ==============================================================================

  1. WHAT ARE LOOPS?
     Loops execute a block of code repeatedly as long as a condition remains true.
     They eliminate repetitive code when processing arrays, database records,
     or counting steps.

  2. REAL-LIFE ANALOGY:
     A factory quality-control line:
     For every product on the conveyor belt, inspect it. If defective, skip it (`continue`).
     If the emergency alarm sounds, shut down the entire line immediately (`break`).

  3. JARGON BUSTER:
     - Iteration: A single cycle or pass through a loop.
     - for...of: Iterates over the VALUES of an iterable (Arrays, Strings, Maps).
     - for...in: Iterates over the KEYS / property names of an Object.
     - break: Instantly aborts and exits the loop entirely.
     - continue: Skips the rest of the current iteration and jumps to the next one.
*/

// =============================================================================
// STEP 1: CLASSIC FOR LOOP (INDEXED CONTROL)
// =============================================================================
// Use when you need the exact index position, step sizes, or reverse counting.

console.log("--- 1. Reverse For Loop ---");
for (let i = 3; i >= 1; i--) {
  console.log("Countdown:", i);
}

// =============================================================================
// STEP 2: FOR...OF LOOP (THE MODERN WAY TO LOOP OVER ARRAYS)
// =============================================================================
// Clean, readable, and directly gives you the item value.

console.log("\n--- 2. For...Of Loop (Array Values) ---");
const cloudDatabases = ["PostgreSQL", "MongoDB", "Redis"];

for (const dbName of cloudDatabases) {
  console.log("Connecting to:", dbName);
}

// =============================================================================
// STEP 3: FOR...IN LOOP (LOOPING OVER OBJECT KEYS)
// =============================================================================

console.log("\n--- 3. For...In Loop (Object Properties) ---");
const serverStatus = { host: "127.0.0.1", port: 5432, isOnline: true };

for (const key in serverStatus) {
  console.log(`${key} => ${serverStatus[key]}`);
}

// =============================================================================
// STEP 4: WHILE & DO...WHILE LOOPS
// =============================================================================

console.log("\n--- 4. While Loop (Connection Retries) ---");
let retryAttempts = 0;
const MAX_RETRIES = 3;

while (retryAttempts < MAX_RETRIES) {
  retryAttempts++;
  console.log(`Connection attempt #${retryAttempts}`);
}

console.log("\n--- 5. Do...While Loop (Guaranteed At Least Once) ---");
let count = 0;
do {
  console.log("Runs at least once even if condition is false! Count:", count);
  count++;
} while (count < 0); // Condition is false from the start!

// =============================================================================
// STEP 5: BREAK AND CONTINUE
// =============================================================================

console.log("\n--- 6. Continue & Break in Action ---");
const numbers = [1, 2, 3, 4, 5, 6];

for (const num of numbers) {
  if (num === 2) {
    continue; // Skip number 2 and jump to next iteration
  }
  if (num === 5) {
    break; // Terminate the entire loop when reaching 5
  }
  console.log("Processed Number:", num); // Prints 1, 3, 4
}

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  --- 1. Reverse For Loop ---
  Countdown: 3
  Countdown: 2
  Countdown: 1

  --- 2. For...Of Loop (Array Values) ---
  Connecting to: PostgreSQL
  Connecting to: MongoDB
  Connecting to: Redis

  --- 3. For...In Loop (Object Properties) ---
  host => 127.0.0.1
  port => 5432
  isOnline => true

  --- 4. While Loop (Connection Retries) ---
  Connection attempt #1
  Connection attempt #2
  Connection attempt #3

  --- 5. Do...While Loop (Guaranteed At Least Once) ---
  Runs at least once even if condition is false! Count: 0

  --- 6. Continue & Break in Action ---
  Processed Number: 1
  Processed Number: 3
  Processed Number: 4
*/