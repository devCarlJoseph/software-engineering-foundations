<?php
/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Encapsulation (Access Modifiers)
  ==============================================================================

  1. WHAT IS ENCAPSULATION?
     "Encapsulation" is bundling data and the methods that operate on that data
     together, while RESTRICTING direct access to internal components.
     We make properties `private` and provide controlled `public` methods (getters/setters).

  2. REAL-LIFE ANALOGY:
     A Capsule Medicine Pill / An ATM Machine:
     You do not open the ATM with a crowbar and manually move the cash gears.
     The cash vault is `private`. You must use the `public` keypad interface
     which validates your PIN and balance before dispensing money safely.

  3. JARGON BUSTER:
     - public: Accessible from anywhere (inside and outside the class).
     - private: Accessible ONLY from within the class itself.
     - protected: Accessible within the class itself AND by child classes that inherit it.
     - Getter: A public method that safely reads a private property (`getBalance()`).
     - Setter: A public method that validates and sets a private property (`setPin()`).
*/

class BankVault {
    // Private properties: Protected from direct external modification!
    private float $balance;
    private string $pinHash;

    public function __construct(float $initialDeposit, string $pin) {
        $this->balance = $initialDeposit;
        $this->pinHash = password_hash($pin, PASSWORD_DEFAULT);
    }

    // Public Getter: Controlled read access
    public function getBalance(): float {
        return $this->balance;
    }

    // Public Setter / Business Method: Enforces validation rules
    public function withdraw(float $amount, string $pin): bool {
        // Validate PIN security check:
        if (!password_verify($pin, $this->pinHash)) {
            echo "Access Denied: Invalid PIN.\n";
            return false;
        }

        // Validate Business Rule:
        if ($amount <= 0 || $amount > $this->balance) {
            echo "Transaction Failed: Insufficient funds or invalid amount.\n";
            return false;
        }

        $this->balance -= $amount;
        echo "Withdrawal Approved! Dispensed: $" . number_format($amount, 2) . "\n";
        return true;
    }
}

// =============================================================================
// TESTING ENCAPSULATION
// =============================================================================

$vault = new BankVault(1000.00, "1234");

// THE DISASTER PREVENTED:
// $vault->balance = 99999999; 
// -> Fatal Error: Cannot access private property BankVault::$balance

// Safe Interaction via Public Methods:
$vault->withdraw(250.00, "1234"); // Success!
$vault->withdraw(500.00, "wrong_pin"); // Denied!
echo "Remaining Balance: $" . number_format($vault->getBalance(), 2) . "\n";

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Withdrawal Approved! Dispensed: $250.00
  Access Denied: Invalid PIN.
  Remaining Balance: $750.00
*/