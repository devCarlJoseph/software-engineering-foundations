<?php
/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: PHP Classes
  ==============================================================================

  1. WHAT IS A CLASS?
     A "Class" is a blueprint or template from which individual objects are created.
     It defines the properties (variables) and methods (functions) that the object will have.

  2. REAL-LIFE ANALOGY:
     An Architectural Floor Plan:
     The blueprint is NOT a house you can sleep in. It is simply the drawing that
     dictates: "Every house built from this plan must have 2 bedrooms, 1 door, and 1 kitchen."

  3. JARGON BUSTER:
     - Class: The blueprint / template.
     - Property: A variable that belongs to a class (e.g. `$title`, `$price`).
     - Method: A function that belongs to a class (e.g. `calculateDiscount()`).
     - $this: A special pseudo-variable referring to the CURRENT object instance.
*/

// =============================================================================
// STEP 1: DEFINING A CLASS
// =============================================================================

class Product {
    // 1. Properties (Variables inside a class)
    public string $name;
    public float $price;
    public bool $inStock = true;

    // 2. Methods (Functions inside a class)
    public function getFormattedPrice(): string {
        // '$this' refers to the specific product currently calling this method:
        return "$" . number_format($this->price, 2);
    }

    public function applyDiscountPercentage(float $percent): void {
        $discountAmount = $this->price * ($percent / 100);
        $this->price -= $discountAmount;
    }
}

// Display confirmation of class declaration:
echo "Class 'Product' defined successfully.\n";

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Class 'Product' defined successfully.
*/