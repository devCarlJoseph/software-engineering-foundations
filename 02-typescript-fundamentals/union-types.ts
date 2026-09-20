/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Union Types (The "OR" Operator)
  ==============================================================================

  1. WHAT IS A UNION TYPE?
     A "Union Type" allows a variable to hold values of two or more different types.
     We use the vertical pipe symbol `|` (which means "OR").
     Syntax: `let data: string | number;`

  2. REAL-LIFE ANALOGY:
     Payment at a coffee shop: You can pay with Cash OR Credit Card OR Mobile App.
     Any of those three is accepted, but you cannot pay with a button from your coat.

  3. JARGON BUSTER:
     - Union: Combining multiple types with `|`.
     - Pipe Operator (`|`): The symbol representing "OR" in type definitions.
     - Common Property Rule: When an object can be TypeA OR TypeB, TypeScript only
       allows you to access properties that exist on BOTH types (until you check which one it is).
*/

// =============================================================================
// STEP 1: PRIMITIVE UNIONS
// =============================================================================
// In databases, an ID is sometimes an integer (101) and sometimes a UUID string ("uuid-abc-123"):

let orderTrackerId: string | number;

orderTrackerId = "TRK-9812-XYZ"; // Valid: it's a string!
console.log("Order Tracking ID (String):", orderTrackerId);

orderTrackerId = 405912;         // Valid: it's a number!
console.log("Order Tracking ID (Number):", orderTrackerId);

// =============================================================================
// STEP 2: LITERAL UNIONS (PREVENTING TYPOS)
// =============================================================================
// Instead of allowing any string, we lock down the exact valid options:

type OrderDeliveryStatus = "ORDER_PLACED" | "SHIPPED" | "DELIVERED" | "CANCELLED";

let currentStatus: OrderDeliveryStatus = "ORDER_PLACED";
currentStatus = "SHIPPED"; // Valid transition

console.log("Current Delivery Status:", currentStatus);

// =============================================================================
// STEP 3: NULLABLE UNIONS (HANDLING EMPTY DATA SAFELY)
// =============================================================================
// In APIs, a user's address might not be entered yet:

let userAddress: string | null = null; // Currently empty
console.log("Address initially:", userAddress);

userAddress = "123 Main St, New York"; // Populated after user fills form
console.log("Address updated:", userAddress);

// =============================================================================
// STEP 4: OBJECT UNIONS & THE COMMON PROPERTY RULE
// =============================================================================

type EmailAlert = {
  notificationId: string; // Common to both
  sentAt: Date;           // Common to both
  recipientEmail: string; // ONLY in EmailAlert
};

type SmsAlert = {
  notificationId: string; // Common to both
  sentAt: Date;           // Common to both
  phoneNumber: string;    // ONLY in SmsAlert
};

type OutgoingAlert = EmailAlert | SmsAlert;

const welcomeNotice: OutgoingAlert = {
  notificationId: "NOTIF_01",
  sentAt: new Date(),
  recipientEmail: "carl@example.com",
};

// Safe: 'notificationId' exists on both EmailAlert AND SmsAlert
console.log("Alert ID:", welcomeNotice.notificationId);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Order Tracking ID (String): TRK-9812-XYZ
  Order Tracking ID (Number): 405912
  Current Delivery Status: SHIPPED
  Address initially: null
  Address updated: 123 Main St, New York
  Alert ID: NOTIF_01
*/

// =============================================================================
// TRY IT YOURSELF: DISASTER PREVENTED
// =============================================================================
// 1. Assigning an invalid type to a union:
// orderTrackerId = true; 
// -> TS Error: Type 'boolean' is not assignable to type 'string | number'.

// 2. Breaking the Common Property Rule:
// console.log(welcomeNotice.recipientEmail);
// -> TS Error: Property 'recipientEmail' does not exist on type 'OutgoingAlert'.
// (Why? Because if welcomeNotice was an SmsAlert, recipientEmail would crash with undefined!)