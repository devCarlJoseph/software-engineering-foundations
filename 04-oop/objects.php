<?php
/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: PHP Objects (Instantiation)
  ==============================================================================

  1. WHAT IS AN OBJECT?
     An "Object" is a concrete, living instance built from a class blueprint.
     You can build as many separate, independent objects from one class as you want!

  2. REAL-LIFE ANALOGY:
     Cookie Cutter vs Real Cookies:
     - Class: The metal cookie cutter shape.
     - Objects: The actual, edible baked cookies with their own frosting and sprinkles.

  3. JARGON BUSTER:
     - Instantiation: Creating a new object from a class using the `new` keyword.
     - Instance: Another word for an object created from a class.
     - Object Operator (`->`): Used in PHP to access properties or call methods on an object.
*/

// Define the blueprint:
class BankAccount {
    public string $accountNumber;
    public float $balance = 0.0;

    public function deposit(float $amount): void {
        $this->balance += $amount;
    }

    public function getStatement(): string {
        return "Account [{$this->accountNumber}] Balance: $" . number_format($this->balance, 2);
    }
}

// =============================================================================
// STEP 1: INSTANTIATING OBJECTS USING 'NEW'
// =============================================================================

// Object 1: Carl's Account
$accountA = new BankAccount();
$accountA->accountNumber = "ACCT-1001";
$accountA->deposit(500.00);

// Object 2: Alice's Account (Entirely independent in memory!)
$accountB = new BankAccount();
$accountB->accountNumber = "ACCT-2002";
$accountB->deposit(1250.75);

// =============================================================================
// STEP 2: OBSERVING INDEPENDENT STATE
// =============================================================================

echo $accountA->getStatement() . "\n";
echo $accountB->getStatement() . "\n";

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Account [ACCT-1001] Balance: $500.00
  Account [ACCT-2002] Balance: $1,250.75
*/