// =============================================================================
// FILE: 02-typescript-fundamentals/generics.ts
// TOPIC: Generics (Reusable, Type-Safe Components using Type Variables <T>)
// =============================================================================

// Generics allow you to write flexible, reusable code that works with
// ANY type while maintaining full compile-time type safety.

// -----------------------------------------------------------------------------
// 1. GENERIC FUNCTIONS
// -----------------------------------------------------------------------------
// The type parameter <T> captures the type passed in and preserves it for the return value.

function identity<T>(arg: T): T {
  return arg;
}

// Explicit type passing:
const stringOutput: string = identity<string>("myString");

// Inferred type passing (TypeScript automatically infers T from the argument):
const numberOutput: number = identity(42);

// Generic function with an Array:
function getFirstElement<T>(items: T[]): T | undefined {
  return items[0];
}

const firstNumber = getFirstElement([10, 20, 30]);      // Inferred as number | undefined
const firstString = getFirstElement(["A", "B", "C"]);  // Inferred as string | undefined

// -----------------------------------------------------------------------------
// 2. MULTIPLE TYPE PARAMETERS
// -----------------------------------------------------------------------------

function createKeyValuePair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

const pair = createKeyValuePair<string, number>("userId", 101);
console.log("Pair:", pair); // ["userId", 101]

// -----------------------------------------------------------------------------
// 3. GENERIC INTERFACES AND TYPE ALIASES
// -----------------------------------------------------------------------------

// Standard API response wrapper:
interface ApiResponse<TData> {
  statusCode: number;
  message: string;
  data: TData; // Type of data is determined when using the interface
}

type UserPayload = {
  id: number;
  name: string;
};

// Reusing ApiResponse for user data:
const userResponse: ApiResponse<UserPayload> = {
  statusCode: 200,
  message: "Success",
  data: {
    id: 1,
    name: "Carl",
  },
};

// Reusing ApiResponse for a list of strings:
const tagsResponse: ApiResponse<string[]> = {
  statusCode: 200,
  message: "Success",
  data: ["backend", "typescript", "architecture"],
};

// -----------------------------------------------------------------------------
// 4. GENERIC CONSTRAINTS (USING 'EXTENDS')
// -----------------------------------------------------------------------------
// Limits the allowed types to those that satisfy a specific shape.

interface HasLength {
  length: number;
}

// T must have at least a 'length' property:
function logLength<T extends HasLength>(item: T): number {
  return item.length;
}

console.log("String length:", logLength("Hello World")); // Works: strings have .length
console.log("Array length:", logLength([1, 2, 3, 4]));   // Works: arrays have .length
// logLength(12345); // Error: Argument of type 'number' is not assignable to parameter of type 'HasLength'.