/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Liskov Substitution Principle (LSP)
  ==============================================================================

  1. WHAT IS LSP?
     If class `B` is a subclass of class `A`, you should be able to pass `B`
     anywhere `A` is expected without causing errors or unexpected behavior.
     Never create a child class that throws errors on inherited parent methods!

  2. CLASSIC VIOLATION (The Ostrich / Penguin Problem):
     class Bird { fly() { ... } }
     class Ostrich extends Bird {
       fly() { throw new Error("Ostriches cannot fly!"); } // BREAKS LSP!
     }
*/

// =============================================================================
// THE REFACTORED SOLUTION (PROPER HIERARCHY)
// =============================================================================

// Base interface: All birds can move and eat
interface Bird {
  name: string;
  eat(): void;
}

// Specialized interface: ONLY for birds that actually fly!
interface FlyingBird extends Bird {
  fly(): void;
}

class Eagle implements FlyingBird {
  constructor(public name: string) {}
  eat(): void { console.log(`${this.name} is hunting fish.`); }
  fly(): void { console.log(`${this.name} soars at 10,000 feet!`); }
}

class Penguin implements Bird {
  constructor(public name: string) {}
  eat(): void { console.log(`${this.name} eats krill in Antarctica.`); }
  swim(): void { console.log(`${this.name} swims through icy water!`); }
}

// A function designed for any Bird:
function feedBird(bird: Bird) {
  bird.eat(); // Guaranteed to work for Eagle AND Penguin!
}

// A function designed ONLY for FlyingBirds:
function launchAirPatrol(bird: FlyingBird) {
  bird.fly();
}

const myEagle = new Eagle("Bald Eagle");
const myPenguin = new Penguin("Emperor Penguin");

feedBird(myEagle);
feedBird(myPenguin);
launchAirPatrol(myEagle);
// launchAirPatrol(myPenguin); // TypeScript catches this at compile time!

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Bald Eagle is hunting fish.
  Emperor Penguin eats krill in Antarctica.
  Bald Eagle soars at 10,000 feet!
*/