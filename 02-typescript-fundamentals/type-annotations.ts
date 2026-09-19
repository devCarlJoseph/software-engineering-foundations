// =============================================================================
// FILE: 02-typescript-fundamentals/type-annotations.ts
// TOPIC: Type Annotations and Type Inference
// =============================================================================

// -----------------------------------------------------------------------------
// 1. EXPLICIT VARIABLE TYPE ANNOTATIONS
// -----------------------------------------------------------------------------
// Syntax: let/const variableName: Type = value;

const appName: string = "Foundations App";
const maxRetryLimit: number = 5;
const isProduction: boolean = false;

// Attempting to assign an incompatible type causes a compile-time error:
// const invalidAssignment: number = "ten"; // Error: Type 'string' is not assignable to type 'number'.

// -----------------------------------------------------------------------------
// 2. TYPE INFERENCE (WHEN TO OMIT ANNOTATIONS)
// -----------------------------------------------------------------------------
// TypeScript automatically infers the type from the initialized value.
// Best Practice: Let TypeScript infer simple primitive types to avoid clutter.

let inferredString = "TypeScript automatically knows this is a string";
let inferredNumber = 42; // Inferred as number
let inferredBoolean = true; // Inferred as boolean

// inferredNumber = "text"; // Error: Type 'string' is not assignable to type 'number'.

// -----------------------------------------------------------------------------
// 3. FUNCTION PARAMETER & RETURN TYPE ANNOTATIONS
// -----------------------------------------------------------------------------
// Function parameters should ALWAYS have explicit annotations.
// Return types are placed after the parameter parentheses: (params): ReturnType

function calculateTax(amount: number, taxRate: number): number {
  return amount * taxRate;
}

const taxTotal: number = calculateTax(100, 0.08); // 8

// Arrow function with explicit annotations:
const multiply = (x: number, y: number): number => x * y;
const productResult: number = multiply(6, 7);

// -----------------------------------------------------------------------------
// 4. ANNOTATIONS ON DELAYED INITIALIZATION
// -----------------------------------------------------------------------------
// If you declare a variable without an immediate value, ALWAYS annotate it.
// Without an annotation, TypeScript will infer it as 'any' (losing all type safety).

let targetUserId: string; // Explicitly declared before assignment

targetUserId = "usr_10203";
// targetUserId = 12345; // Error: Type 'number' is not assignable to type 'string'.

// -----------------------------------------------------------------------------
// 5. THE 'ANY' TYPE VS EXPLICIT ANNOTATIONS
// -----------------------------------------------------------------------------
// 'any' completely turns off type checking for that variable (avoid using this).

let unconstrainedValue: any = "Hello";
unconstrainedValue = 123;   // Allowed, but dangerous
unconstrainedValue = false; // Allowed, but disables TypeScript's protection