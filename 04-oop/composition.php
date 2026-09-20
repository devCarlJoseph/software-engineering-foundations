<?php
/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Composition ("Has-A" vs "Is-A")
  ==============================================================================

  1. WHAT IS COMPOSITION?
     "Composition" is an OOP design principle where a class achieves functionality
     by CONTAINING instances of other classes rather than inheriting from them.
     Golden Rule: "Favor Composition over Inheritance."

  2. REAL-LIFE ANALOGY:
     - Inheritance ("Is-A"): A Dog *is an* Animal.
     - Composition ("Has-A"): A Car *has an* Engine, *has* Wheels, *has a* GPS.
       You don't make `Car extends Engine`. You pass an `Engine` INTO the `Car`!

  3. JARGON BUSTER:
     - Composition ("Has-A"): Assembling an object out of separate component parts.
     - Dependency Injection: Passing required helper objects into the constructor
       from the outside, making code testable and flexible.
     - Fragile Base Class Problem: When a deep inheritance tree (`A extends B extends C`)
       breaks because changing one line in `A` unexpectedly breaks `C`.
*/

// =============================================================================
// STEP 1: INDEPENDENT COMPONENT CLASSES
// =============================================================================

class Engine {
    public function start(): void {
        echo "Engine: V8 combustion engine purring smoothly.\n";
    }
}

class GpsNavigator {
    public function navigateTo(string $destination): void {
        echo "GPS: Calculating fastest route to '{$destination}'...\n";
    }
}

// =============================================================================
// STEP 2: COMPOSING THE MAIN CLASS
// =============================================================================
// Car DOES NOT extend Engine or GpsNavigator. It CONTAINS them!

class Car {
    // Composition via Dependency Injection:
    public function __construct(
        public string $model,
        private Engine $engine,
        private GpsNavigator $gps
    ) {}

    public function beginTrip(string $destination): void {
        echo "Starting trip in {$this->model}:\n";
        $this->engine->start();           // Delegates task to Engine component
        $this->gps->navigateTo($destination); // Delegates task to GPS component
        echo "Car is on the road!\n";
    }
}

// =============================================================================
// STEP 3: ASSEMBLING THE SYSTEM
// =============================================================================

$myEngine = new Engine();
$myGps = new GpsNavigator();

// Inject components into the Car:
$myCar = new Car("Ford Mustang", $myEngine, $myGps);
$myCar->beginTrip("Manila Baywalk");

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Starting trip in Ford Mustang:
  Engine: V8 combustion engine purring smoothly.
  GPS: Calculating fastest route to 'Manila Baywalk'...
  Car is on the road!
*/