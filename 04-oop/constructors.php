<?php
/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: PHP Constructors (__construct)
  ==============================================================================

  1. WHAT IS A CONSTRUCTOR?
     A constructor is a special "magic" method (`__construct`) that runs
     AUTOMATICALLY the exact millisecond an object is created with `new`.
     It is used to initialize mandatory data (like setting the ID or title).

  2. REAL-LIFE ANALOGY:
     A Birth Certificate:
     When a baby is born, you don't wait 3 years to assign a name and birthdate.
     Those values are recorded the moment of creation.

  3. JARGON BUSTER:
     - Magic Method: Built-in PHP methods starting with double-underscore `__`
       triggered automatically by the PHP engine.
     - Constructor Property Promotion (PHP 8.0+): Declaring `public` or `private`
       directly in the constructor argument list so PHP automatically creates the
       class property for you in one clean line!
*/

// =============================================================================
// STEP 1: MODERN PHP 8 CONSTRUCTOR PROMOTION
// =============================================================================

class User {
    // Instead of declaring properties above, PHP 8 lets you declare them right here:
    public function __construct(
        public int $id,
        public string $name,
        public string $email,
        public string $role = "student" // Default argument
    ) {
        // Runs automatically upon 'new User(...)':
        echo "[LOG]: Initialized user record for {$this->name} (ID: {$this->id})\n";
    }

    public function getProfileSummary(): string {
        return "User #{$this->id}: {$this->name} <{$this->email}> [Role: {$this->role}]";
    }
}

// =============================================================================
// STEP 2: CREATING INSTANCES (PASSING ARGUMENTS TO CONSTRUCTOR)
// =============================================================================

$user1 = new User(1, "Carl Joseph", "carl@example.com", "lead_dev");
$user2 = new User(2, "Alice Smith", "alice@example.com"); // Uses default role "student"

echo "\n" . $user1->getProfileSummary() . "\n";
echo $user2->getProfileSummary() . "\n";

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  [LOG]: Initialized user record for Carl Joseph (ID: 1)
  [LOG]: Initialized user record for Alice Smith (ID: 2)

  User #1: Carl Joseph <carl@example.com> [Role: lead_dev]
  User #2: Alice Smith <alice@example.com> [Role: student]
*/