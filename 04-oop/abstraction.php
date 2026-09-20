<?php
/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Abstraction (Abstract Classes & Interfaces)
  ==============================================================================

  1. WHAT IS ABSTRACTION?
     "Abstraction" means hiding complex background implementation details and
     exposing ONLY the essential, high-level interface.
     An Abstract Class CANNOT be instantiated on its own; it serves strictly as
     an architectural base for child classes to implement!

  2. REAL-LIFE ANALOGY:
     The Gas Pedal in a Car:
     When you step on the gas pedal, you know the car moves forward.
     You don't need to know the fuel injection timing, the piston valve movement,
     or the spark plug voltage. Those complex details are *abstracted away*.

  3. JARGON BUSTER:
     - abstract class: A class that cannot be created directly (`new Shape()` is illegal).
     - abstract method: A method signature declared in the parent with NO body.
       Every child class MUST write its own implementation of it!
     - interface: A pure contract where ALL methods are abstract.
*/

// =============================================================================
// STEP 1: ABSTRACT PARENT CLASS
// =============================================================================

abstract class NotificationService {
    public function __construct(public string $recipient) {}

    // Abstract method: Forces EVERY child to write its own 'send' logic:
    abstract public function send(string $message): bool;

    // Concrete shared method: Can be used by all children as-is
    public function logDispatch(string $type): void {
        echo "[AUDIT LOG]: Dispatched {$type} notification to '{$this->recipient}'\n";
    }
}

// =============================================================================
// STEP 2: CONCRETE CHILD IMPLEMENTATIONS
// =============================================================================

class EmailNotification extends NotificationService {
    public function send(string $message): bool {
        echo "Sending SMTP Email to {$this->recipient}: \"{$message}\"\n";
        $this->logDispatch("EMAIL");
        return true;
    }
}

class SmsNotification extends NotificationService {
    public function send(string $message): bool {
        echo "Sending Twilio SMS to {$this->recipient}: \"{$message}\"\n";
        $this->logDispatch("SMS");
        return true;
    }
}

// =============================================================================
// STEP 3: TESTING ABSTRACTION
// =============================================================================

// THE DISASTER PREVENTED:
// $bad = new NotificationService("admin"); 
// -> Fatal Error: Cannot instantiate abstract class NotificationService

$email = new EmailNotification("carl@enterprise.com");
$email->send("Your password was reset successfully.");

echo "\n";

$sms = new SmsNotification("+1-555-0199");
$sms->send("Your verification code is 882194.");

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Sending SMTP Email to carl@enterprise.com: "Your password was reset successfully."
  [AUDIT LOG]: Dispatched EMAIL notification to 'carl@enterprise.com'

  Sending Twilio SMS to +1-555-0199: "Your verification code is 882194."
  [AUDIT LOG]: Dispatched SMS notification to '+1-555-0199'
*/