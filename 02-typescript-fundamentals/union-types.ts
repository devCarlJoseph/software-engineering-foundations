// =============================================================================
// FILE: 02-typescript-fundamentals/union-types.ts
// TOPIC: Union Types (Value can be one of several types using |)
// =============================================================================

// -----------------------------------------------------------------------------
// 1. BASIC PRIMITIVE UNION TYPES
// -----------------------------------------------------------------------------
// Syntax: TypeA | TypeB

let identifier: string | number;

identifier = "UUID-908123"; // Valid: string
identifier = 10045;         // Valid: number
// identifier = true;       // Error: Type 'boolean' is not assignable to type 'string | number'.

// Union in function parameters:
function formatInput(input: string | number): string {
  return `Formatted: ${input}`;
}
console.log(formatInput("Hello")); // "Formatted: Hello"
console.log(formatInput(42));      // "Formatted: 42"

// -----------------------------------------------------------------------------
// 2. LITERAL VALUE UNIONS
// -----------------------------------------------------------------------------
// Restricts a variable to specific exact values rather than any string or number.

type TaskStatus = "pending" | "in_progress" | "completed" | "archived";

let currentTaskStatus: TaskStatus = "pending";
currentTaskStatus = "in_progress"; // Valid
// currentTaskStatus = "deleted";  // Error: Type '"deleted"' is not assignable to type 'TaskStatus'.

type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
const roll: DiceRoll = 4;

// -----------------------------------------------------------------------------
// 3. UNIONS WITH NULL AND UNDEFINED (NULLABLE TYPES)
// -----------------------------------------------------------------------------
// Crucial for dealing with data that may not yet exist (e.g. database results).

type UserBio = string | null;

let bio: UserBio = "Full-stack developer";
bio = null; // Valid (explicitly cleared)

// -----------------------------------------------------------------------------
// 4. UNIONS OF OBJECT TYPES & COMMON PROPERTY ACCESS
// -----------------------------------------------------------------------------
// When a variable is a union of multiple object types, TypeScript ONLY allows
// direct access to properties that exist on ALL members of the union.

type EmailNotification = {
  id: string;
  recipientEmail: string;
  sentAt: Date;
};

type SmsNotification = {
  id: string;
  phoneNumber: string;
  sentAt: Date;
};

type NotificationPayload = EmailNotification | SmsNotification;

const activeNotice: NotificationPayload = {
  id: "notif_001",
  recipientEmail: "user@example.com",
  sentAt: new Date(),
};

// 'id' and 'sentAt' exist on BOTH types, so direct access is completely safe:
console.log("Notice ID:", activeNotice.id);
console.log("Sent At:", activeNotice.sentAt);

// Accessing properties unique to only one member is prohibited without narrowing:
// console.log(activeNotice.recipientEmail);
// -> Error: Property 'recipientEmail' does not exist on type 'NotificationPayload'.