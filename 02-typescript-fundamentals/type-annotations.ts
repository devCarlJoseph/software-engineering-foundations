/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Type Annotations & Type Inference
  ==============================================================================

  1. WHAT IS IT?
     In JavaScript, a variable can hold a number right now and suddenly hold a
     word 5 seconds later, which leads to silent bugs.
     A "Type Annotation" is like putting a clear, permanent label on a container
     that says: "This container can ONLY hold numbers."

  2. REAL-LIFE ANALOGY:
     A medicine bottle with a printed label: "Liquid Only - 50ml".
     If someone tries to put powder or rocks into it, they are stopped immediately.

  3. JARGON BUSTER:
     - Type Annotation: Explicitly writing `: string` or `: number` next to a variable.
     - Type Inference: TypeScript being smart enough to guess the type automatically
       from the initial value without you writing it.
     - Compile-time: The moment BEFORE your code runs, when TypeScript checks for mistakes.
     - Runtime: The moment your code is actually running on the user's computer or server.
     - Transpilation: Converting TypeScript code into plain JavaScript so Node.js or
       browsers can run it.
*/

// =============================================================================
// STEP 1: EXPLICIT ANNOTATIONS (Writing the types yourself)
// =============================================================================
const storeName: string = "TechGear Warehouse";
const maxCartCapacity: number = 10;
const isStoreOpen: boolean = true;

console.log("Store Name:", storeName);
console.log("Cart Limit:", maxCartCapacity);
console.log("Store Open Status:", isStoreOpen);

// =============================================================================
// STEP 2: TYPE INFERENCE (Letting TypeScript do the work)
// =============================================================================
// When you assign a value on the same line, you don't NEED to write `: string`.
// TypeScript automatically locks it to that type.
let defaultCurrency = "USD"; // TypeScript automatically infers this as a 'string'
let itemShippingFee = 4.99;  // TypeScript automatically infers this as a 'number'

defaultCurrency = "EUR"; // Perfectly valid: it's still a string!
console.log("Updated Currency:", defaultCurrency);

// =============================================================================
// STEP 3: FUNCTION PARAMETERS & RETURN TYPES
// =============================================================================
// Always annotate function parameters so people know what to pass in.
// The return type is placed after the parentheses: (params): ReturnType

function calculateTotal(price: number, quantity: number): number {
  const subtotal = price * quantity;
  return subtotal;
}

const keyboardCost: number = calculateTotal(49.99, 2);
console.log("Total Keyboard Cost: $" + keyboardCost);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Store Name: TechGear Warehouse
  Cart Limit: 10
  Store Open Status: true
  Updated Currency: EUR
  Total Keyboard Cost: $99.98
*/

// =============================================================================
// BEHIND THE SCENES: WHAT THE COMPILER DOES
// =============================================================================
/*
  1. The TypeScript compiler (tsc) inspects `calculateTotal("49.99", "2")`.
  2. It sees you promised that parameters must be `number`, but you passed `string`.
  3. It immediately halts with a red squiggly error BEFORE producing any JavaScript.
  4. When you build your project, TypeScript STRIPS AWAY all `: string` and `: number`
     labels, generating clean, fast, vanilla JavaScript.
*/

// =============================================================================
// TRY IT YOURSELF: DISASTER PREVENTED
// =============================================================================
// In plain JavaScript, "49.99" + "2" gives "49.992" (string gluing).
// TypeScript prevents this catastrophic pricing bug before it ever runs:

// maxCartCapacity = "fifteen"; 
// -> TS Error: Type 'string' is not assignable to type 'number'.

// calculateTotal("49.99", 2); 
// -> TS Error: Argument of type 'string' is not assignable to parameter of type 'number'.