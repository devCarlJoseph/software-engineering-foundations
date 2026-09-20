/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Asynchronous Callbacks
  ==============================================================================

  1. WHAT IS A CALLBACK?
     A "Callback" is simply a function passed as an argument into another function,
     intended to be called later once a task (like reading a file or waiting for a timer) finishes.

  2. REAL-LIFE ANALOGY:
     A Restaurant Buzzer / Pager.
     When you order food, you don't stand at the counter frozen for 20 minutes blocking
     other customers. The cashier gives you a pager (a callback). You sit down and chat.
     When the food is ready, the pager buzzes (executes the callback).

  3. JARGON BUSTER:
     - Synchronous / Blocking: Tasks run one after another in order. If task 1 takes
       10 seconds, the entire program freezes for 10 seconds.
     - Asynchronous / Non-Blocking: JavaScript delegates slow operations (network, disk)
       to the background and keeps executing the rest of your code immediately.
     - Callback Hell ("Pyramid of Doom"): Deeply nested callbacks inside callbacks
       that make code hard to read and maintain.
     - Node Error-First Convention: The standard pattern `(err, data) => {}` where
       the first parameter is reserved for checking errors.
*/

// =============================================================================
// STEP 1: SYNCHRONOUS VS ASYNCHRONOUS EXECUTION
// =============================================================================

console.log("1. Customer places coffee order at counter.");

// setTimeout simulates a non-blocking background task (e.g. brewing coffee):
setTimeout(function () {
  console.log("3. [BACKGROUND TASK FINISHED] Coffee is brewed and ready!");
}, 1000); // 1000ms = 1 second

console.log("2. Cashier immediately takes the next customer's order (Non-blocking).");

// =============================================================================
// STEP 2: NODE.JS ERROR-FIRST CALLBACK PATTERN
// =============================================================================
// The historical standard for handling async operations before Promises existed:

function fetchUserDatabaseRecord(userId, callback) {
  setTimeout(() => {
    if (userId <= 0) {
      // Rule: If an error happens, pass error as argument 1, and null as argument 2
      callback(new Error("Invalid User ID: ID must be a positive number"), null);
      return;
    }

    // Success: Pass null as argument 1 (no error), and the data as argument 2
    const mockUser = { id: userId, username: "carl_dev", plan: "Pro" };
    callback(null, mockUser);
  }, 500);
}

// Consuming the error-first callback:
fetchUserDatabaseRecord(101, (err, user) => {
  if (err) {
    console.error("Database Error:", err.message);
    return;
  }
  console.log("4. User Retrieved Successfully:", user.username);
});

// =============================================================================
// STEP 3: THE PROBLEM: CALLBACK HELL (PYRAMID OF DOOM)
// =============================================================================
/*
  Why we needed Promises: Look at how messy nested callbacks become!

  loginUser(creds, (err, user) => {
    getUserSettings(user.id, (err, settings) => {
      fetchUserDashboard(settings.theme, (err, dashboard) => {
        renderScreen(dashboard, (err) => {
          // Hard to read, hard to catch errors, deeply nested indentation!
        });
      });
    });
  });
*/

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  1. Customer places coffee order at counter.
  2. Cashier immediately takes the next customer's order (Non-blocking).
  4. User Retrieved Successfully: carl_dev
  3. [BACKGROUND TASK FINISHED] Coffee is brewed and ready!
*/