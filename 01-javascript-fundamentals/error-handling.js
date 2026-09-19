// =============================================================================
// FILE: 01-javascript-fundamentals/error-handling.js
// TOPIC: Error Handling (try, catch, finally, throw, and Error Objects)
// =============================================================================

// -----------------------------------------------------------------------------
// 1. BASIC TRY...CATCH BLOCK
// -----------------------------------------------------------------------------
// Code that might fail is placed in the 'try' block.
// If an error occurs, execution halts in 'try' and jumps immediately to 'catch'.

console.log("--- 1. Basic try...catch ---");
try {
  // Simulating an error by referencing an undefined variable:
  const result = nonExistentVariable + 10;
  console.log("This line will never be reached:", result);
} catch (error) {
  console.log("Caught an error successfully!");
  console.log("Error name:", error.name);       // "ReferenceError"
  console.log("Error message:", error.message); // "nonExistentVariable is not defined"
}

// -----------------------------------------------------------------------------
// 2. THE THROW STATEMENT AND BUILT-IN ERROR OBJECT
// -----------------------------------------------------------------------------
// Use 'throw' to create your own error conditions when inputs are invalid.

console.log("\n--- 2. Throwing Custom Errors ---");

function divideNumbers(numerator, denominator) {
  if (denominator === 0) {
    // Throwing an instance of the standard Error object:
    throw new Error("Division by zero is not allowed");
  }
  return numerator / denominator;
}

try {
  const answer = divideNumbers(10, 0);
  console.log("Answer:", answer);
} catch (error) {
  console.log("Caught thrown error:", error.message); // "Division by zero is not allowed"
}

// -----------------------------------------------------------------------------
// 3. THE FINALLY BLOCK (ALWAYS EXECUTES)
// -----------------------------------------------------------------------------
// The 'finally' block runs regardless of whether an error was thrown or not.
// Essential for resource cleanup (closing database connections, closing files).

console.log("\n--- 3. try...catch...finally ---");
let isFileOpen = false;

try {
  isFileOpen = true;
  console.log("File opened successfully.");

  // Simulating an unexpected failure:
  throw new Error("Failed while reading file data");
} catch (error) {
  console.log("Handled file error:", error.message);
} finally {
  // This ALWAYS runs, ensuring the file is not left open:
  isFileOpen = false;
  console.log("Finally executed: File is closed (isFileOpen =", isFileOpen, ")");
}

// -----------------------------------------------------------------------------
// 4. CUSTOM ERROR TYPES (EXTENDING THE ERROR CLASS)
// -----------------------------------------------------------------------------
// Useful in backend applications to distinguish between different kinds of failures.

console.log("\n--- 4. Custom Error Hierarchy ---");

class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

function validateEmail(email) {
  if (!email) {
    throw new ValidationError("Email cannot be empty", "email");
  }
  if (!email.includes("@")) {
    throw new ValidationError("Email must contain '@'", "email");
  }
  return "Email is valid";
}

try {
  validateEmail("invalid-email-string");
} catch (error) {
  // Using instanceof to identify the specific error type:
  if (error instanceof ValidationError) {
    console.log(`Validation Error on field '${error.field}': ${error.message}`);
  } else {
    console.log("Unexpected general error:", error.message);
  }
}