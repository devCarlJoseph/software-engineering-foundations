// =============================================================================
// FILE: 02-typescript-fundamentals/type-narrowing.ts
// TOPIC: Type Narrowing (Type Guards, in Operator, and Discriminated Unions)
// =============================================================================

// Type narrowing is the process of refining a broad type (like a union)
// into a more specific type within a conditional code path.

// -----------------------------------------------------------------------------
// 1. TYPEOF TYPE GUARDS
// -----------------------------------------------------------------------------
// Checks primitive types: "string", "number", "boolean", "symbol", "bigint"

function processValue(val: string | number): number {
  if (typeof val === "string") {
    // TypeScript knows 'val' is definitely a string here:
    return val.length;
  }
  // TypeScript knows 'val' must be a number here:
  return val * 2;
}

// -----------------------------------------------------------------------------
// 2. EQUALITY NARROWING (===) AND TRUTHINESS
// -----------------------------------------------------------------------------

function printTitle(title: string | null | undefined): void {
  if (title !== null && title !== undefined) {
    // Narrowed to 'string':
    console.log("Valid title:", title.toUpperCase());
  } else {
    console.log("No title provided");
  }
}

// -----------------------------------------------------------------------------
// 3. THE 'IN' OPERATOR (CHECKING PROPERTY EXISTENCE)
// -----------------------------------------------------------------------------

type Car = { drive: () => void };
type Boat = { sail: () => void };

function operateVehicle(vehicle: Car | Boat): void {
  if ("drive" in vehicle) {
    // Narrowed to Car:
    vehicle.drive();
  } else {
    // Narrowed to Boat:
    vehicle.sail();
  }
}

// -----------------------------------------------------------------------------
// 4. INSTANCEOF TYPE GUARDS
// -----------------------------------------------------------------------------

function formatTimestamp(input: Date | string): string {
  if (input instanceof Date) {
    // Narrowed to Date instance:
    return input.toISOString();
  }
  // Narrowed to string:
  return input;
}

// -----------------------------------------------------------------------------
// 5. DISCRIMINATED UNIONS (TAGGED UNIONS) - INDUSTRY BEST PRACTICE
// -----------------------------------------------------------------------------
// Every type in the union shares a single common literal property (the "discriminant").

interface Circle {
  kind: "circle"; // Discriminant
  radius: number;
}

interface Square {
  kind: "square"; // Discriminant
  sideLength: number;
}

type Shape = Circle | Square;

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      // TypeScript automatically narrows 'shape' to Circle:
      return Math.PI * shape.radius ** 2;
    case "square":
      // TypeScript automatically narrows 'shape' to Square:
      return shape.sideLength * shape.sideLength;
  }
}

// -----------------------------------------------------------------------------
// 6. USER-DEFINED TYPE PREDICATES (VALUE IS TYPE)
// -----------------------------------------------------------------------------
// A custom function that returns a boolean, telling TypeScript how to narrow.

interface Fish {
  swim: () => void;
}

interface Bird {
  fly: () => void;
}

// Return type 'animal is Fish' is the type predicate:
function isFish(animal: Fish | Bird): animal is Fish {
  return (animal as Fish).swim !== undefined;
}

function moveAnimal(animal: Fish | Bird): void {
  if (isFish(animal)) {
    animal.swim(); // TypeScript knows this is Fish
  } else {
    animal.fly();  // TypeScript knows this is Bird
  }
}