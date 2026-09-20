/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Intersection Types (The "AND" Operator)
  ==============================================================================

  1. WHAT IS AN INTERSECTION TYPE?
     An "Intersection Type" combines multiple types into ONE single type.
     We use the ampersand symbol `&` (which means "AND").
     An object with an intersection type MUST have ALL properties of EVERY combined type.
     Syntax: `type Combined = TypeA & TypeB;`

  2. REAL-LIFE ANALOGY:
     A Smart Phone. It is a Telephone AND a Camera AND an Internet Browser.
     It has all the features of all three combined into one physical device.

  3. JARGON BUSTER:
     - Intersection: Combining types using `&`.
     - Composition: Building large, complex models by snapping together small,
       reusable building blocks.
     - Never: If you intersect two impossible things (like `string & number`),
       TypeScript marks that property as `never` because nothing can be both!
*/

// =============================================================================
// STEP 1: DEFINING REUSABLE BUILDING BLOCKS
// =============================================================================
// In backend databases, almost every table needs an ID and timestamps.
// Instead of copying and pasting them, we create reusable pieces:

type HasId = {
  id: string;
};

type HasTimestamps = {
  createdAt: string;
  updatedAt: string;
};

// =============================================================================
// STEP 2: COMBINING USING INTERSECTION (&)
// =============================================================================

// BaseRecord has BOTH 'id' AND 'createdAt' AND 'updatedAt':
type BaseDatabaseRecord = HasId & HasTimestamps;

// Domain-specific fields for an e-commerce product:
type ProductDetails = {
  title: string;
  price: number;
  inStock: boolean;
};

// Full Product Record snaps them all together:
type Product = BaseDatabaseRecord & ProductDetails;

const wirelessMouse: Product = {
  id: "prod_mouse_99",
  createdAt: "2026-09-20T10:00:00Z",
  updatedAt: "2026-09-20T12:30:00Z",
  title: "Ergonomic Wireless Mouse",
  price: 29.99,
  inStock: true,
};

console.log("Product Title:", wirelessMouse.title);
console.log("Product Price: $" + wirelessMouse.price);
console.log("Database ID:", wirelessMouse.id);
console.log("Created At:", wirelessMouse.createdAt);

// =============================================================================
// STEP 3: INTERSECTION COLLISION (CREATING NEVER)
// =============================================================================
// What happens if two types fight over the same property name?

type WorkerA = { accessCode: string };
type WorkerB = { accessCode: number };

type ImpossibleWorker = WorkerA & WorkerB;
// The 'accessCode' property is now 'never' because no value can be a string AND a number at the same time!

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Product Title: Ergonomic Wireless Mouse
  Product Price: $29.99
  Database ID: prod_mouse_99
  Created At: 2026-09-20T10:00:00Z
*/

// =============================================================================
// TRY IT YOURSELF: DISASTER PREVENTED
// =============================================================================
// If you omit even ONE property from an intersected type, TypeScript catches it:
// const brokenProduct: Product = {
//   id: "prod_01",
//   createdAt: "2026-09-20",
//   // Missing updatedAt, title, price, inStock!
// };
// -> TS Error: Type '{ id: string; createdAt: string; }' is missing properties from type 'ProductDetails'.