<?php
/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Inheritance & Polymorphism
  ==============================================================================

  1. WHAT IS INHERITANCE?
     "Inheritance" allows a child class to inherit all properties and methods
     from a parent class using the `extends` keyword.
     This promotes code reuse (DRY: Don't Repeat Yourself).

  2. REAL-LIFE ANALOGY:
     Vehicles:
     - Parent Class: `Vehicle` (has wheels, engine, fuel, `start()`).
     - Child Classes: `Car`, `Motorcycle`, `Truck`.
     All are Vehicles, but a `Truck` adds `cargoCapacity`, while a `Motorcycle` can `wheelie()`.

  3. JARGON BUSTER:
     - Parent / Base / Super Class: The general class being inherited from.
     - Child / Derived / Sub Class: The specialized class that inherits from the parent.
     - extends: The PHP keyword used to inherit from a parent class.
     - parent::__construct(): Calling the parent class constructor from the child class.
     - Method Overriding (Polymorphism): A child class replacing a parent's method
       with its own custom version.
*/

// =============================================================================
// STEP 1: BASE PARENT CLASS
// =============================================================================

class Employee {
    public function __construct(
        public string $name,
        public float $baseSalary
    ) {}

    // Method to be overridden by children (Polymorphism):
    public function calculateTotalCompensation(): float {
        return $this->baseSalary;
    }
}

// =============================================================================
// STEP 2: DERIVED CHILD CLASSES (USING EXTENDS)
// =============================================================================

class Developer extends Employee {
    public function __construct(
        string $name,
        float $baseSalary,
        public string $primaryLanguage // Developer-specific property
    ) {
        // Call the parent constructor:
        parent::__construct($name, $baseSalary);
    }

    // Method Overriding: Developers get an annual tech stipend
    public function calculateTotalCompensation(): float {
        $techStipend = 2000.00;
        return $this->baseSalary + $techStipend;
    }
}

class SalesManager extends Employee {
    public function __construct(
        string $name,
        float $baseSalary,
        public float $annualCommissionBonus // Sales-specific property
    ) {
        parent::__construct($name, $baseSalary);
    }

    // Method Overriding: Sales gets commission bonus
    public function calculateTotalCompensation(): float {
        return $this->baseSalary + $this->annualCommissionBonus;
    }
}

// =============================================================================
// STEP 3: TESTING POLYMORPHISM
// =============================================================================

$dev = new Developer("Carl", 80000, "PHP / TypeScript");
$sales = new SalesManager("Alice", 60000, 15000);

echo "Developer: {$dev->name} (Language: {$dev->primaryLanguage})\n";
echo "Compensation: $" . number_format($dev->calculateTotalCompensation(), 2) . "\n\n";

echo "Sales: {$sales->name}\n";
echo "Compensation: $" . number_format($sales->calculateTotalCompensation(), 2) . "\n";

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Developer: Carl (Language: PHP / TypeScript)
  Compensation: $82,000.00

  Sales: Alice
  Compensation: $75,000.00
*/