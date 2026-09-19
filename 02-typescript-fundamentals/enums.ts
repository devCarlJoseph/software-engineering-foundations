// =============================================================================
// FILE: 02-typescript-fundamentals/enums.ts
// TOPIC: Enums (Numeric, String, Heterogeneous, and Const Enums)
// =============================================================================

// Enums allow us to declare a set of named constants.

// -----------------------------------------------------------------------------
// 1. NUMERIC ENUMS (AUTO-INCREMENTING)
// -----------------------------------------------------------------------------
// Default behavior: First member starts at 0, each subsequent member increments by 1.

enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right, // 3
}

const currentDirection: Direction = Direction.Up;
console.log("Numeric enum value (Up):", currentDirection); // 0

// Custom starting index:
enum HttpStatus {
  Ok = 200,
  Created,     // 201 (automatically increments)
  BadRequest = 400,
  NotFound,    // 401
  InternalServerError = 500,
}

console.log("HttpStatus.Created:", HttpStatus.Created); // 201

// -----------------------------------------------------------------------------
// 2. REVERSE MAPPING (NUMERIC ENUMS ONLY)
// -----------------------------------------------------------------------------
// Numeric enums support reverse mapping from the number back to the name string.

const statusCode: HttpStatus = HttpStatus.Ok;
const statusName: string = HttpStatus[statusCode]; // Looks up 200 -> "Ok"
console.log("Reverse mapped name:", statusName); // "Ok"

// -----------------------------------------------------------------------------
// 3. STRING ENUMS (RECOMMENDED FOR CODE READABILITY)
// -----------------------------------------------------------------------------
// Each member is initialized with an explicit string literal.
// String enums do NOT auto-increment and do NOT have reverse mapping.

enum UserRole {
  Admin = "ADMIN",
  Editor = "EDITOR",
  Viewer = "VIEWER",
}

const activeRole: UserRole = UserRole.Admin;
console.log("String enum value:", activeRole); // "ADMIN"

// Type safety:
// const invalidRole: UserRole = "ADMIN"; // Error: Type '"ADMIN"' is not assignable to type 'UserRole'. Must use UserRole.Admin.

// -----------------------------------------------------------------------------
// 4. CONST ENUMS (ZERO RUNTIME OVERHEAD)
// -----------------------------------------------------------------------------
// Regular enums generate real JavaScript objects in the compiled output.
// 'const enum' is completely erased during compilation—its values are inlined directly.

const enum LogLevel {
  Debug = "DEBUG",
  Info = "INFO",
  Warn = "WARN",
  Error = "ERROR",
}

// In compiled JS, this becomes directly: const currentLevel = "INFO";
const currentLevel: LogLevel = LogLevel.Info;
console.log("Const enum inlined value:", currentLevel);