/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Arrays, Tuples, and Object Types
  ==============================================================================

  1. WHAT IS IT?
     - A Typed Array is a list where every single item must follow the exact same type.
     - A Tuple is a fixed-size list where each specific position has its own type.
     - An Object Type defines the expected keys and value types inside an object.

  2. REAL-LIFE ANALOGY:
     - Typed Array: An egg carton. Every slot must hold an egg; you can't put a battery in it.
     - Tuple: A GPS Coordinate card: [Latitude, Longitude]. Slot 0 must be Latitude,
       Slot 1 must be Longitude. You cannot swap them or add a 3rd item randomly.
     - Object Type: An ID Card template. Must have Name, Age, and optional BloodType.

  3. JARGON BUSTER:
     - Tuple: An array with a fixed number of items where the type of each position is known.
     - Readonly: A lock on a property or array that prevents changing its contents.
     - Optional Property (?): A field in an object that is not required to exist.
     - Mutation: Modifying existing data in place (like .push() or changing a property).
*/

// =============================================================================
// STEP 1: TYPED ARRAYS
// =============================================================================
// Syntax: type[] or Array<type>

const studentScores: number[] = [95, 88, 92, 79];
const studentNames: Array<string> = ["Alice", "Bob", "Carl"];

studentScores.push(100); // Valid: 100 is a number!
console.log("Updated Scores:", studentScores);

// READONLY ARRAY: Prevents anyone from accidentally modifying the list
const standardTaxRates: readonly number[] = [0.05, 0.12, 0.20];
// standardTaxRates.push(0.25); // ERROR: Property 'push' does not exist on 'readonly number[]'.

// =============================================================================
// STEP 2: TUPLES (STRICT FIXED-POSITION LISTS)
// =============================================================================
// Format: [typeAt0, typeAt1]

// Position 0 = latitude (number), Position 1 = longitude (number)
let storeCoordinates: [number, number] = [14.5995, 120.9842];
console.log("Latitude:", storeCoordinates[0]);
console.log("Longitude:", storeCoordinates[1]);

// Named Tuple (gives human-readable labels for self-documentation):
type ServerResponseTuple = [statusCode: number, statusText: string];
const apiSuccess: ServerResponseTuple = [200, "OK"];
console.log("Response Code:", apiSuccess[0], "Message:", apiSuccess[1]);

// =============================================================================
// STEP 3: OBJECT TYPE ANNOTATIONS
// =============================================================================
// Defining the shape of a user account:

const customerProfile: {
  readonly id: number;      // Locked: cannot be reassigned
  fullName: string;         // Required
  email: string;            // Required
  phoneNumber?: string;     // Optional: denoted by the '?' symbol
} = {
  id: 101,
  fullName: "Carl Joseph",
  email: "carl@example.com",
  // phoneNumber was omitted because it has '?' (it's optional)
};

customerProfile.fullName = "Carl J."; // Valid: fullName is not readonly
console.log("Customer ID:", customerProfile.id);
console.log("Customer Name:", customerProfile.fullName);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Updated Scores: [ 95, 88, 92, 79, 100 ]
  Latitude: 14.5995
  Longitude: 120.9842
  Response Code: 200 Message: OK
  Customer ID: 101
  Customer Name: Carl J.
*/

// =============================================================================
// TRY IT YOURSELF: DISASTERS PREVENTED
// =============================================================================
// 1. Trying to push a word into a number array:
// studentScores.push("perfect");
// -> TS Error: Argument of type 'string' is not assignable to parameter of type 'number'.

// 2. Trying to reassign a readonly property:
// customerProfile.id = 999;
// -> TS Error: Cannot assign to 'id' because it is a read-only property.

// 3. Adding an extra element to a tuple:
// storeCoordinates = [14.5995, 120.9842, 50];
// -> TS Error: Source has 3 elements but target allows only 2.