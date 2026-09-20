/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Small Functions & Single Level of Abstraction
  ==============================================================================

  1. WHAT ARE SMALL FUNCTIONS?
     Functions should do ONE thing, do it well, and do it only.
     A clean function is typically under 15–20 lines of code.

  2. REAL-LIFE ANALOGY:
     Fast Food Kitchen Stations:
     You don't have one worker taking cash, frying fries, grilling beef, wrapping
     burgers, and sweeping floors all at once.
     Each person manages one dedicated step of the assembly process.

  3. JARGON BUSTER:
     - Level of Abstraction: Keeping high-level business workflow steps separate
       from low-level math formulas or database queries.
     - Side Effect: When a function claims to calculate something, but secretly
       modifies an outside global variable or writes to disk without you knowing.
*/

// =============================================================================
// BAD PRACTICE: MONOLITHIC FUNCTION DOING 4 DIFFERENT JOBS
// =============================================================================
/*
  function processCheckout(cart: any[]) {
    // 1. Math calculation logic
    // 2. Formatting text strings
    // 3. Email receipt sending
    // 4. Updating inventory database
  }
*/

// =============================================================================
// GOOD PRACTICE: SMALL, FOCUSED FUNCTIONS THAT COMPOSE TOGETHER
// =============================================================================

type CartItem = {
  name: string;
  unitPrice: number;
  quantity: number;
};

// Small Helper 1: Calculate subtotal
function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}

// Small Helper 2: Calculate tax
function calculateTax(subtotal: number, taxRate = 0.08): number {
  return subtotal * taxRate;
}

// Small Helper 3: Format the receipt output
function formatReceipt(orderId: string, finalTotal: number): string {
  return `Receipt #${orderId} | Total Charged: $${finalTotal.toFixed(2)}`;
}

// High-Level Orchestrator: Reads cleanly like plain English!
function checkoutCart(orderId: string, items: CartItem[]): string {
  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  const grandTotal = subtotal + tax;

  return formatReceipt(orderId, grandTotal);
}

const itemsInBasket: CartItem[] = [
  { name: "Mechanical Keyboard", unitPrice: 89.99, quantity: 1 },
  { name: "Mouse Pad", unitPrice: 15.00, quantity: 2 },
];

console.log(checkoutCart("ORD-8819", itemsInBasket));

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Receipt #ORD-8819 | Total Charged: $129.59
*/