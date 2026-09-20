/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: TypeScript Enums
  ==============================================================================

  1. WHAT IS AN ENUM?
     An "Enum" (short for "Enumeration") is a way to define a collection of named
     constants. It prevents "magic numbers" and "magic strings" in your code.

  2. REAL-LIFE ANALOGY:
     A fixed drop-down menu on a website:
     Instead of letting the user type any text for Country, you give them a fixed
     drop-down list where they can ONLY pick from approved options.

  3. JARGON BUSTER:
     - Magic Strings/Numbers: Hardcoded values (like `if (status === 2)`) where
       nobody knows what `2` actually means. Enums replace this with `HttpStatus.NotFound`.
     - Numeric Enum: Enums where values automatically count up (0, 1, 2, 3...).
     - String Enum: Enums where each member has an explicit text value ("ADMIN", "USER").
     - Reverse Mapping: Looking up the name of an enum member from its number.
     - Const Enum: An enum that disappears completely during compilation, replacing
       its usage with the raw value directly for maximum performance.
*/

// =============================================================================
// STEP 1: NUMERIC ENUMS (AUTO-INCREMENTING)
// =============================================================================
// By default, members start at 0 and count up by 1:

enum SupportPriority {
  Low,      // 0
  Medium,   // 1
  High,     // 2
  Critical, // 3
}

const currentTicketPriority: SupportPriority = SupportPriority.Critical;
console.log("Numeric Value of Critical:", currentTicketPriority); // 3

// Custom starting numbers (Common for HTTP Status Codes):
enum HttpStatusCode {
  Ok = 200,
  Created = 201,
  BadRequest = 400,
  NotFound = 404,
}

console.log("HTTP Code for OK:", HttpStatusCode.Ok); // 200

// =============================================================================
// STEP 2: REVERSE MAPPING (NUMERIC ENUMS ONLY)
// =============================================================================
// You can pass the number to the enum to get its string name back!

const receivedCode = 404;
const codeName: string = HttpStatusCode[receivedCode];
console.log("Reverse mapped name of 404:", codeName); // "NotFound"

// =============================================================================
// STEP 3: STRING ENUMS (RECOMMENDED FOR CLARITY)
// =============================================================================
// String enums do NOT auto-increment. They are much easier to read in logs.

enum UserRole {
  Admin = "ADMIN",
  Editor = "EDITOR",
  Viewer = "VIEWER",
}

const activeUserRole: UserRole = UserRole.Admin;
console.log("Active Role string:", activeUserRole); // "ADMIN"

// =============================================================================
// STEP 4: CONST ENUM (ZERO RUNTIME COST)
// =============================================================================
// When compiled to JavaScript, regular enums create a real JavaScript object.
// A `const enum` is erased, and its value is pasted directly where it was used!

const enum LogLevel {
  Debug = "DEBUG",
  Info = "INFO",
  Error = "ERROR",
}

// In compiled JS, this line becomes directly: console.log("Level:", "INFO");
const currentLogLevel: LogLevel = LogLevel.Info;
console.log("Current Log Level:", currentLogLevel);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Numeric Value of Critical: 3
  HTTP Code for OK: 200
  Reverse mapped name of 404: NotFound
  Active Role string: ADMIN
  Current Log Level: INFO
*/

// =============================================================================
// TRY IT YOURSELF: DISASTER PREVENTED
// =============================================================================
// Using a string enum prevents anyone from inventing fake roles:
// const badRole: UserRole = "SUPER_HERO";
// -> TS Error: Type '"SUPER_HERO"' is not assignable to type 'UserRole'.