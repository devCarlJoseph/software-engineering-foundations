/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Type Narrowing
  ==============================================================================

  1. WHAT IS TYPE NARROWING?
     "Type Narrowing" is the process of taking a broad type (like `string | number`)
     and filtering it down to a more specific type inside an `if` statement or `switch`.

  2. REAL-LIFE ANALOGY:
     Airport Security Customs Check.
     Everyone is a "Passenger" (broad type).
     - If you hold a Local Passport, the officer sends you to Lane 1.
     - If you hold an International Passport, the officer sends you to Lane 2.
     Inside Lane 1, the system KNOWS you are a local citizen.

  3. JARGON BUSTER:
     - Type Guard: A code check (like `typeof x === "string"`) that proves the type to TypeScript.
     - Discriminated Union: A group of types that all share ONE common property
       (like `kind: "circle"` vs `kind: "square"`) that acts as an identity badge.
     - Type Predicate (`val is Type`): A custom function that returns true/false to
       tell TypeScript: "Yes, this variable is definitely this type!"
*/

// =============================================================================
// STEP 1: TYPEOF TYPE GUARD (FOR PRIMITIVES)
// =============================================================================

function formatInputData(value: string | number): string {
  if (typeof value === "string") {
    // TypeScript KNOWS value is a string here:
    return "String in uppercase: " + value.toUpperCase();
  } else {
    // TypeScript KNOWS value MUST be a number here:
    return "Number with 2 decimals: $" + value.toFixed(2);
  }
}

console.log(formatInputData("hello foundations"));
console.log(formatInputData(24.5));

// =============================================================================
// STEP 2: THE 'IN' OPERATOR (CHECKING OBJECT PROPERTIES)
// =============================================================================

type Car = { drive: () => void };
type Boat = { sail: () => void };

function operateVehicle(vehicle: Car | Boat): void {
  if ("drive" in vehicle) {
    // TypeScript narrows 'vehicle' to Car!
    vehicle.drive();
  } else {
    // TypeScript narrows 'vehicle' to Boat!
    vehicle.sail();
  }
}

const myTesla: Car = { drive: () => console.log("Driving on the highway...") };
operateVehicle(myTesla);

// =============================================================================
// STEP 3: DISCRIMINATED UNIONS (THE GOLD STANDARD IN TYPESCRIPT)
// =============================================================================
// Both shapes share a literal 'kind' tag that identifies them without guessing:

interface Circle {
  kind: "circle"; // Identity tag
  radius: number;
}

interface Rectangle {
  kind: "rectangle"; // Identity tag
  width: number;
  height: number;
}

type GeometricShape = Circle | Rectangle;

function calculateArea(shape: GeometricShape): number {
  switch (shape.kind) {
    case "circle":
      // TypeScript knows shape is Circle!
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      // TypeScript knows shape is Rectangle!
      return shape.width * shape.height;
  }
}

const tableTop: Rectangle = { kind: "rectangle", width: 10, height: 5 };
console.log("Calculated Area:", calculateArea(tableTop));

// =============================================================================
// STEP 4: CUSTOM TYPE PREDICATE FUNCTION (x is Type)
// =============================================================================

interface Dog {
  bark: () => void;
}

interface Cat {
  meow: () => void;
}

// 'animal is Dog' is the Type Predicate:
function isDog(animal: Dog | Cat): animal is Dog {
  return (animal as Dog).bark !== undefined;
}

function speak(pet: Dog | Cat): void {
  if (isDog(pet)) {
    pet.bark(); // TypeScript knows this is Dog
  } else {
    pet.meow(); // TypeScript knows this is Cat
  }
}

const myPuppy: Dog = { bark: () => console.log("Woof! Woof!") };
speak(myPuppy);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  String in uppercase: HELLO FOUNDATIONS
  Number with 2 decimals: $24.50
  Driving on the highway...
  Calculated Area: 50
  Woof! Wooff!
*/

// =============================================================================
// TRY IT YOURSELF: DISASTER PREVENTED
// =============================================================================
// Without narrowing, calling .toFixed() on string | number is blocked:
// function badFunction(x: string | number) {
//   x.toFixed(2);
// }
// -> TS Error: Property 'toFixed' does not exist on type 'string | number'. Property 'toFixed' does not exist on type 'string'.