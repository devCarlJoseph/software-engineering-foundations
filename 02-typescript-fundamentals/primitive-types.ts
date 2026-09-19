// =============================================================================
// FILE: 02-typescript-fundamentals/primitive-types.ts
// TOPIC: TypeScript Primitive and Special Types
// =============================================================================

// -----------------------------------------------------------------------------
// 1. STANDARD PRIMITIVE TYPES
// -----------------------------------------------------------------------------

// string: Textual data
const developerName: string = "Carl";

// number: All numeric values (integers, floats, NaN, Infinity)
const age: number = 25;
const pi: number = 3.14159;

// boolean: true or false
const hasCompletedTask: boolean = true;

// bigint: Large integers exceeding 2^53 - 1
const massiveNumber: bigint = 9007199254740991n;

// symbol: Unique identifier
const uniqueApiKey: symbol = Symbol("apiKey");

// null: Explicit absence of value
const emptyRecord: null = null;

// undefined: Uninitialized state
const uninitializedState: undefined = undefined;

// -----------------------------------------------------------------------------
// 2. VOID TYPE
// -----------------------------------------------------------------------------
// Represents the absence of any returned value (commonly used as function return type).

function logSystemAlert(message: string): void {
  console.log(`[ALERT]: ${message}`);
  // return "something"; // Error: Type 'string' is not assignable to type 'void'.
}

// -----------------------------------------------------------------------------
// 3. UNKNOWN TYPE (SAFE ALTERNATIVE TO ANY)
// -----------------------------------------------------------------------------
// 'unknown' accepts any value, but you CANNOT perform operations on it until you
// verify its type (type narrowing).

let rawApiData: unknown = "Some external string";

// rawApiData.toUpperCase(); // Error: 'rawApiData' is of type 'unknown'.

// Must narrow the type before using:
if (typeof rawApiData === "string") {
  console.log("Safely normalized:", rawApiData.toUpperCase());
}

// -----------------------------------------------------------------------------
// 4. NEVER TYPE
// -----------------------------------------------------------------------------
// Represents values that NEVER occur:
// - A function that always throws an error
// - A function that runs an infinite loop

function throwFatalError(errorMessage: string): never {
  throw new Error(`Fatal: ${errorMessage}`);
  // Function cannot reach its end point
}

function runInfiniteProcess(): never {
  while (true) {
    // Process keeps running indefinitely
  }
}