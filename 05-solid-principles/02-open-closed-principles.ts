/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Open/Closed Principle (OCP)
  ==============================================================================

  1. WHAT IS OCP?
     You should be able to add NEW features to a system WITHOUT editing existing,
     tested, working code. You do this by using polymorphism and interfaces!

  2. THE DISASTER PREVENTED:
     Editing an existing 500-line `if/else` or `switch` statement every time marketing
     invents a new holiday discount. One typo breaks existing Black Friday discounts!
*/

// =============================================================================
// STEP 1: DEFINE A COMMON EXTENSIBLE CONTRACT (INTERFACE)
// =============================================================================

interface DiscountStrategy {
  applyDiscount(totalAmount: number): number;
}

// =============================================================================
// STEP 2: EXISTING STRATEGIES (CLOSED TO MODIFICATION)
// =============================================================================

class RegularCustomerDiscount implements DiscountStrategy {
  applyDiscount(totalAmount: number): number {
    return totalAmount; // No discount
  }
}

class SilverCustomerDiscount implements DiscountStrategy {
  applyDiscount(totalAmount: number): number {
    return totalAmount * 0.90; // 10% off
  }
}

// =============================================================================
// STEP 3: EXTENSION (ADDING A NEW VIP TIER WITHOUT TOUCHING OLD CLASSES!)
// =============================================================================
// When business adds VIP tier, we just create a NEW class:

class VipCustomerDiscount implements DiscountStrategy {
  applyDiscount(totalAmount: number): number {
    return totalAmount * 0.80; // 20% off
  }
}

// The Checkout Calculator is CLOSED to edits — it never needs to change again!
class CheckoutCalculator {
  public calculateFinalAmount(subtotal: number, strategy: DiscountStrategy): number {
    return strategy.applyDiscount(subtotal);
  }
}

const checkout = new CheckoutCalculator();
const cartTotal = 100.0;

console.log("Regular: $" + checkout.calculateFinalAmount(cartTotal, new RegularCustomerDiscount()));
console.log("Silver: $" + checkout.calculateFinalAmount(cartTotal, new SilverCustomerDiscount()));
console.log("VIP: $" + checkout.calculateFinalAmount(cartTotal, new VipCustomerDiscount()));

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Regular: $100
  Silver: $90
  VIP: $80
*/