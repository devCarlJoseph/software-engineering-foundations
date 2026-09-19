// =============================================================================
// FILE: 02-typescript-fundamentals/type-aliases.ts
// TOPIC: Type Aliases (Custom Named Types)
// =============================================================================

// A Type Alias gives a new, reusable name to any shape of type
// (primitives, objects, unions, tuples, or functions).
// Syntax: type AliasName = TypeDefinition;

// -----------------------------------------------------------------------------
// 1. PRIMITIVE ALIASES (MEANINGFUL DOMAIN TYPES)
// -----------------------------------------------------------------------------
// Makes signatures more descriptive than generic 'string' or 'number'.

type UserId = string;
type Timestamp = number;
type EmailAddress = string;

const currentUserId: UserId = "usr_99214";
const accountCreatedAt: Timestamp = 1700000000;

// -----------------------------------------------------------------------------
// 2. OBJECT TYPE ALIASES
// -----------------------------------------------------------------------------
type TaskItem = {
  readonly id: number;
  title: string;
  isCompleted: boolean;
  notes?: string; // Optional field
};

const dailyTask: TaskItem = {
  id: 1,
  title: "Review Pull Requests",
  isCompleted: true,
};

// -----------------------------------------------------------------------------
// 3. FUNCTION TYPE ALIASES
// -----------------------------------------------------------------------------
// Defines the exact signature (parameters and return type) of a function.

type MathOperation = (firstNumber: number, secondNumber: number) => number;

const addOperation: MathOperation = (a, b) => a + b;
const subtractOperation: MathOperation = (a, b) => a - b;

console.log("Add:", addOperation(10, 5));        // 15
console.log("Subtract:", subtractOperation(10, 5)); // 5

// -----------------------------------------------------------------------------
// 4. UNION AND TUPLE TYPE ALIASES
// -----------------------------------------------------------------------------
// Type aliases can represent unions and tuples directly (which interfaces cannot do alone).

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"; // Literal union alias
const requestMethod: HttpMethod = "POST";
// const invalidMethod: HttpMethod = "OPTIONS"; // Error: Type '"OPTIONS"' is not assignable to type 'HttpMethod'.

type Coordinate2D = [x: number, y: number]; // Tuple alias
const point: Coordinate2D = [100, 250];

// -----------------------------------------------------------------------------
// 5. TYPE ALIASES CANNOT BE RE-OPENED (NO DECLARATION MERGING)
// -----------------------------------------------------------------------------
type SystemRole = {
  name: string;
};

// Uncommenting the duplicate declaration below causes an error:
// type SystemRole = { permissions: string[] }; 
// -> Error: Duplicate identifier 'SystemRole'.