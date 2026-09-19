// =============================================================================
// FILE: 02-typescript-fundamentals/arrays-and-objects.ts
// TOPIC: Arrays, Tuples, Readonly Arrays, and Inline Object Types
// =============================================================================

// -----------------------------------------------------------------------------
// 1. TYPED ARRAYS
// -----------------------------------------------------------------------------

// Syntax 1: type[] (Most common syntax)
const taskIds: number[] = [101, 102, 103];

// Syntax 2: Array<type> (Generic syntax)
const programmingLanguages: Array<string> = ["TypeScript", "JavaScript", "Python"];

// Type safety in arrays:
// taskIds.push("one hundred four"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.

// -----------------------------------------------------------------------------
// 2. READONLY ARRAYS
// -----------------------------------------------------------------------------
// Prevents any mutating operations (push, pop, splice, or index assignment).

const immutablePorts: readonly number[] = [3000, 8080, 5432];
// immutablePorts.push(9000); // Error: Property 'push' does not exist on type 'readonly number[]'.
// immutablePorts[0] = 3001;  // Error: Index signature in type 'readonly number[]' only permits reading.

// Alternative syntax with ReadonlyArray:
const readonlyTags: ReadonlyArray<string> = ["core", "backend"];

// -----------------------------------------------------------------------------
// 3. TUPLES (FIXED-LENGTH, FIXED-TYPE ORDER ARRAYS)
// -----------------------------------------------------------------------------
// A tuple enforces the exact number of elements and the specific type at each position.

// [string, number] -> exactly 2 elements: first must be string, second must be number
let httpStatusTuple: [number, string] = [200, "OK"];

httpStatusTuple = [404, "Not Found"]; // Valid
// httpStatusTuple = ["Not Found", 404]; // Error: Type 'string' is not assignable to type 'number'.
// httpStatusTuple = [200, "OK", "Extra"]; // Error: Source has 3 elements but target allows only 2.

// Named Tuples (for code clarity):
type GeoCoordinate = [latitude: number, longitude: number];
const manilaCoords: GeoCoordinate = [14.5995, 120.9842];

// Readonly Tuple:
const fixedPair: readonly [string, number] = ["Version", 1];
// fixedPair[0] = "NewVersion"; // Error: Cannot assign to '0' because it is a read-only property.

// -----------------------------------------------------------------------------
// 4. INLINE OBJECT TYPE ANNOTATIONS
// -----------------------------------------------------------------------------
// Enforces property names, value types, and allows optional/readonly flags.

const userAccount: {
  readonly id: number;      // Cannot be modified after initialization
  username: string;
  email: string;
  avatarUrl?: string;       // Optional property (string or undefined)
} = {
  id: 1,
  username: "carl_dev",
  email: "carl@example.com",
  // avatarUrl is optional, so omitting it is valid
};

// userAccount.id = 2; // Error: Cannot assign to 'id' because it is a read-only property.
userAccount.username = "carl_engineer"; // Valid reassignment