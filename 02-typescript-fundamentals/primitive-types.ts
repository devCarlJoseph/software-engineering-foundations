/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Primitive and Special Types
  ==============================================================================

  1. WHAT IS IT?
     "Primitives" are the most basic, foundational building blocks of data.
     They are stored directly by their value (not by reference) and are immutable.
     TypeScript adds powerful special types like `void`, `unknown`, and `never`.

  2. REAL-LIFE ANALOGY:
     Standard measurement units: You measure distance in kilometers and time in seconds.
     You cannot say "my car traveled 10 seconds of distance".
     Primitives guarantee you don't confuse incompatible types of data.

  3. JARGON BUSTER:
     - Primitive: Basic data value (not an object; has no internal methods of its own).
     - Void: "Nothing is returned here" (used when a function just does a job).
     - Unknown: "I don't know what this data is yet, so I will force you to check it
       safely before using it" (the safe alternative to `any`).
     - Never: "This code path is impossible or will never finish" (like an error throw).
     - Immutable: Cannot be changed or modified in place.
*/

// =============================================================================
// STEP 1: THE STANDARD PRIMITIVES
// =============================================================================

const userEmail: string = "carl@enterprise.com";
const userAge: number = 26;
const isAccountActive: boolean = true;
const massiveDatabaseId: bigint = 9007199254740992n; // Numbers larger than 2^53 - 1
const uniqueApiKey: symbol = Symbol("unique_token");
const profileBiography: null = null; // Explicitly empty
let pendingActivation: undefined = undefined; // Not yet assigned

console.log("Email:", userEmail);
console.log("Age:", userAge);
console.log("Account Active?:", isAccountActive);

// =============================================================================
// STEP 2: VOID TYPE (FUNCTIONS THAT RETURN NOTHING)
// =============================================================================
// When a function sends an email or logs an alert, it doesn't calculate an answer.
// Its return type is `void`.

function displayWelcomeBanner(username: string): void {
  console.log("=========================================");
  console.log("  WELCOME TO THE PLATFORM, " + username.toUpperCase());
  console.log("=========================================");
  // No return statement here!
}

displayWelcomeBanner("Carl");

// =============================================================================
// STEP 3: UNKNOWN TYPE (THE SAFE "ANY")
// =============================================================================
// In real apps, third-party APIs return random JSON.
// Using `any` is dangerous because it turns off type safety.
// `unknown` forces you to inspect the data first.

let incomingApiResponse: unknown = "User upgraded to Premium Plan";

// incomingApiResponse.toUpperCase(); // ERROR: TypeScript blocks this because it's unknown!

// How to handle unknown safely:
if (typeof incomingApiResponse === "string") {
  // TypeScript now KNOWS it is safely a string inside this block!
  console.log("Verified API Message:", incomingApiResponse.toUpperCase());
}

// =============================================================================
// STEP 4: NEVER TYPE (VALUES THAT NEVER OCCUR)
// =============================================================================
// A function that throws an error halts execution and never returns a value.

function raiseCriticalSecurityAlarm(reason: string): never {
  throw new Error("SECURITY LOCKDOWN: " + reason);
}

// raiseCriticalSecurityAlarm("Unauthorized database breach"); // Halts program

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Email: carl@enterprise.com
  Age: 26
  Account Active?: true
  =========================================
    WELCOME TO THE PLATFORM, CARL
  =========================================
  Verified API Message: USER UPGRADED TO PREMIUM PLAN
*/

// =============================================================================
// TRY IT YOURSELF: DISASTER PREVENTED
// =============================================================================
// In JavaScript, calling .toUpperCase() on a number crashes your server:
// let id = 123; id.toUpperCase(); // TypeError: id.toUpperCase is not a function

// In TypeScript, this is prevented:
// const testNum: number = 42;
// testNum.toUpperCase(); 
// -> TS Error: Property 'toUpperCase' does not exist on type 'number'.