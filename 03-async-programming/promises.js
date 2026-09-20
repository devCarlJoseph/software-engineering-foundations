/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: JavaScript Promises
  ==============================================================================

  1. WHAT IS A PROMISE?
     A "Promise" is an object representing the eventual completion (or failure)
     of an asynchronous operation and its resulting value.

  2. REAL-LIFE ANALOGY:
     An Online Delivery Order Receipt.
     When you buy shoes on Amazon:
     1. State = "Pending": The package is in transit (waiting for outcome).
     2. State = "Fulfilled": The courier delivers the shoes to your door.
     3. State = "Rejected": The warehouse burned down, delivery canceled.

  3. JARGON BUSTER:
     - Pending: Initial state; neither fulfilled nor rejected.
     - Fulfilled / Resolved: The async operation completed successfully (`resolve()`).
     - Rejected: The async operation failed (`reject()`).
     - .then(): Runs when the Promise is fulfilled.
     - .catch(): Runs when the Promise is rejected.
     - .finally(): Runs regardless of whether it was fulfilled or rejected.
*/

// =============================================================================
// STEP 1: CREATING A PROMISE
// =============================================================================
// Syntax: new Promise((resolve, reject) => { ... })

function verifyUserCredentials(username, password) {
  return new Promise((resolve, reject) => {
    console.log("Starting security verification in background...");

    setTimeout(() => {
      if (username === "carl" && password === "secret123") {
        resolve({ userId: "USR_101", token: "jwt_token_valid_998" }); // Fulfilled!
      } else {
        reject(new Error("Authentication Failed: Invalid username or password.")); // Rejected!
      }
    }, 800);
  });
}

// =============================================================================
// STEP 2: CONSUMING A PROMISE (.THEN, .CATCH, .FINALLY)
// =============================================================================

console.log("1. Application sending login request...");

verifyUserCredentials("carl", "secret123")
  .then((authResult) => {
    // Runs ONLY if resolve() was called:
    console.log("2. [FULFILLED] Login Successful! Token:", authResult.token);
  })
  .catch((error) => {
    // Runs ONLY if reject() was called:
    console.error("2. [REJECTED] Login Failed:", error.message);
  })
  .finally(() => {
    // ALWAYS runs when the Promise settles:
    console.log("3. [SETTLED] Authentication attempt completed. Cleanup finished.");
  });

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  1. Application sending login request...
  Starting security verification in background...
  2. [FULFILLED] Login Successful! Token: jwt_token_valid_998
  3. [SETTLED] Authentication attempt completed. Cleanup finished.
*/