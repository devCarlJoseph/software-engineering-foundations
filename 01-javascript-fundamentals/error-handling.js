/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Error Handling (try, catch, finally, throw)
  ==============================================================================

  1. WHAT IS ERROR HANDLING?
     A structured defense mechanism to catch and manage runtime failures without
     crashing your entire server or application.

  2. REAL-LIFE ANALOGY:
     A car's braking and airbag system.
     - `try`: Driving along the highway.
     - `throw`: Spotting an unavoidable collision and triggering safety mechanisms.
     - `catch`: The airbag deploying to absorb the impact so passengers survive.
     - `finally`: The emergency flashers turning on afterwards, no matter what happened.

  3. JARGON BUSTER:
     - try block: Code that could potentially throw an exception.
     - catch block: Code that handles and logs the error if one occurs.
     - finally block: Code that is GUARANTEED to run regardless of success or failure.
     - throw: Intentionally creating and signaling an error condition.
     - Custom Error: Extending the native `Error` class to attach HTTP status codes.
*/

// =============================================================================
// STEP 1: BASIC TRY...CATCH
// =============================================================================

console.log("--- 1. Basic try...catch ---");
try {
  // Simulating an intentional ReferenceError:
  const result = nonExistentVariable + 10;
  console.log("This will never run:", result);
} catch (error) {
  console.log("Caught Error Successfully!");
  console.log("Error Name:", error.name);       // "ReferenceError"
  console.log("Error Message:", error.message); // "nonExistentVariable is not defined"
}

// =============================================================================
// STEP 2: THROWING CUSTOM VALIDATION ERRORS
// =============================================================================

function divideBudget(totalBudget, numberOfTeams) {
  if (numberOfTeams === 0) {
    throw new Error("Division by zero: Cannot divide budget by 0 teams.");
  }
  if (totalBudget < 0) {
    throw new Error("Invalid budget: Cannot have negative budget.");
  }
  return totalBudget / numberOfTeams;
}

try {
  console.log("Valid budget division:", divideBudget(1000, 4)); // $250
  divideBudget(500, 0); // Throws!
} catch (error) {
  console.error("Budget Error Caught:", error.message);
}

// =============================================================================
// STEP 3: TRY...CATCH...FINALLY (GUARANTEED CLEANUP)
// =============================================================================
// 'finally' is essential for closing database connections, file handles, or network locks!

console.log("\n--- 2. try...catch...finally ---");
let isDatabaseConnectionOpen = false;

try {
  isDatabaseConnectionOpen = true;
  console.log("Database connection opened.");

  // Simulating a failed query:
  throw new Error("SQL Query Timeout: Record not found.");
} catch (err) {
  console.warn("Handled query failure:", err.message);
} finally {
  // This block ALWAYS executes!
  isDatabaseConnectionOpen = false;
  console.log("Cleanup: Database connection closed safely (status:", isDatabaseConnectionOpen, ")");
}

// =============================================================================
// STEP 4: CUSTOM DOMAIN ERROR CLASS (BACKEND STANDARD)
// =============================================================================
// Attaching HTTP status codes to distinguish client errors from internal server crashes:

class ValidationError extends Error {
  constructor(message, fieldName) {
    super(message);
    this.name = "ValidationError";
    this.fieldName = fieldName;
    this.statusCode = 400; // Bad Request
  }
}

function registerUserAccount(email) {
  if (!email || !email.includes("@")) {
    throw new ValidationError("Invalid email address format.", "email");
  }
  return { success: true, email: email };
}

try {
  registerUserAccount("invalid-email-string");
} catch (err) {
  if (err instanceof ValidationError) {
    console.error(`[HTTP ${err.statusCode}] Field '${err.fieldName}': ${err.message}`);
  } else {
    console.error("[HTTP 500] Unexpected Internal Server Error:", err);
  }
}

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  --- 1. Basic try...catch ---
  Caught Error Successfully!
  Error Name: ReferenceError
  Error Message: nonExistentVariable is not defined
  Valid budget division: 250
  Budget Error Caught: Division by zero: Cannot divide budget by 0 teams.

  --- 2. try...catch...finally ---
  Database connection opened.
  Handled query failure: SQL Query Timeout: Record not found.
  Cleanup: Database connection closed safely (status: false )
  [HTTP 400] Field 'email': Invalid email address format.
*/