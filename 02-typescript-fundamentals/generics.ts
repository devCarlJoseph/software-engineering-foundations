/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: TypeScript Generics
  ==============================================================================

  1. WHAT ARE GENERICS?
     "Generics" allow you to write reusable code that works with ANY data type
     while preserving complete type safety.
     Think of `<T>` as a variable, but for TYPES instead of values.

  2. REAL-LIFE ANALOGY:
     An Amazon Cardboard Delivery Box.
     The box doesn't care whether you pack shoes, books, or a phone inside it.
     It safely holds whatever item you put in, and when you open the box, you get
     back that EXACT item with all its original features intact.

  3. JARGON BUSTER:
     - Generic (`<T>`): A placeholder type parameter (T stands for "Type").
     - Type Preservation: Unlike `any` (which loses all type info), a generic
       remembers what went in and ensures that same type comes out.
     - Generic Constraint (`extends`): Saying "T can be any type, BUT it must have
       at least this specific property (like `.length` or `.id`)."
*/

// =============================================================================
// STEP 1: THE IDENTITY FUNCTION (WHY 'ANY' FAILS BUT 'T' SUCCEEDS)
// =============================================================================

// The Generic Solution:
// <T> captures the incoming type and returns the EXACT same type.
function echoItem<T>(item: T): T {
  return item;
}

const echoedString = echoItem<string>("Hello Foundations"); // echoedString is 'string'
const echoedNumber = echoItem(42);                          // Type inference: echoedNumber is 'number'

console.log("Echoed String:", echoedString.toUpperCase());
console.log("Echoed Number:", echoedNumber.toFixed(2));

// =============================================================================
// STEP 2: GENERIC ARRAYS (FIRST ELEMENT EXTRACTOR)
// =============================================================================

function extractFirstItem<T>(list: T[]): T | undefined {
  return list[0];
}

const firstScore = extractFirstItem([98, 85, 91]);     // Inferred as number | undefined
const firstCity = extractFirstItem(["Tokyo", "Paris"]); // Inferred as string | undefined

console.log("First Score:", firstScore);
console.log("First City:", firstCity);

// =============================================================================
// STEP 3: GENERIC INTERFACES (THE API RESPONSE ENVELOPE)
// =============================================================================
// In backend engineering, all API endpoints return a standard envelope:
// { statusCode, success, data }.
// Instead of writing UserResponse, ProductResponse, OrderResponse, we use Generics!

interface ApiResponse<TData> {
  statusCode: number;
  isSuccess: boolean;
  data: TData; // TData will adapt to whatever data this endpoint returns!
}

type UserAccount = {
  id: number;
  username: string;
};

// An API response returning a single user:
const userResponse: ApiResponse<UserAccount> = {
  statusCode: 200,
  isSuccess: true,
  data: {
    id: 1,
    username: "carl_engineer",
  },
};

// An API response returning a list of strings:
const permissionsResponse: ApiResponse<string[]> = {
  statusCode: 200,
  isSuccess: true,
  data: ["CREATE_POST", "EDIT_POST"],
};

console.log("Fetched User:", userResponse.data.username);
console.log("Fetched Permissions Count:", permissionsResponse.data.length);

// =============================================================================
// STEP 4: GENERIC CONSTRAINTS (USING 'EXTENDS')
// =============================================================================
// Sometimes you want a generic function, but you need to guarantee that the item
// has a specific property (e.g. it MUST have an `.id` property).

interface HasIdProperty {
  id: string | number;
}

// <T extends HasIdProperty> guarantees that 'entity' ALWAYS has an 'id':
function printDatabaseId<T extends HasIdProperty>(entity: T): void {
  console.log("Entity ID:", entity.id);
}

printDatabaseId({ id: "item_999", title: "Desk Lamp" }); // Valid!
printDatabaseId({ id: 404, error: "Not Found" });        // Valid!

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Echoed String: HELLO FOUNDATIONS
  Echoed Number: 42.00
  First Score: 98
  First City: Tokyo
  Fetched User: carl_engineer
  Fetched Permissions Count: 2
  Entity ID: item_999
  Entity ID: 404
*/

// =============================================================================
// TRY IT YOURSELF: DISASTER PREVENTED
// =============================================================================
// Passing an object that violates the constraint:
// printDatabaseId({ title: "No ID provided" });
// -> TS Error: Property 'id' is missing in type '{ title: string; }' but required in 'HasIdProperty'.