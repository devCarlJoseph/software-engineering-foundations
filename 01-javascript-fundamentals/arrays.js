/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: JavaScript Arrays & Functional Methods
  ==============================================================================

  1. WHAT IS AN ARRAY?
     An ordered, zero-indexed list of data elements. In JavaScript, arrays can
     hold any mix of primitives and objects.

  2. REAL-LIFE ANALOGY:
     A shopping receipt or Spotify playlist:
     - `map`: Converting every song title to UPPERCASE.
     - `filter`: Selecting only songs marked as "Favorites".
     - `reduce`: Adding up the total duration of every song on the playlist.

  3. JARGON BUSTER:
     - Mutating Method: Modifies the original array directly (`push`, `pop`, `splice`).
     - Non-Mutating / Pure Method: Leaves the original array untouched and returns
       a brand-new transformed array (`map`, `filter`, `toSorted`).
     - Predicate Function: A callback function that returns `true` or `false` to
       make a decision (used in `filter`, `find`, `some`, `every`).
     - Accumulator: The running total value being built up inside `.reduce()`.
*/

// Mock Data: E-Commerce Product Catalog
const catalog = [
  { id: "p1", name: "Mechanical Keyboard", price: 90, inStock: true },
  { id: "p2", name: "Wireless Mouse", price: 30, inStock: true },
  { id: "p3", name: "Gaming Monitor", price: 300, inStock: false },
  { id: "p4", name: "USB-C Cable", price: 15, inStock: true },
];

// =============================================================================
// STEP 1: MAP (TRANSFORM EVERY ITEM -> RETURNS NEW ARRAY)
// =============================================================================
// Extract just the product names formatted cleanly:

const productNames = catalog.map((product) => product.name);
console.log("All Product Names:", productNames);

// =============================================================================
// STEP 2: FILTER (SELECT MATCHING ITEMS -> RETURNS NEW ARRAY)
// =============================================================================
// Select only items that are in stock AND cost less than $100:

const affordableAvailableItems = catalog.filter((product) => {
  return product.inStock && product.price < 100;
});
console.log("Affordable & In Stock:", affordableAvailableItems.map((p) => p.name));

// =============================================================================
// STEP 3: REDUCE (ACCUMULATE ALL ITEMS INTO A SINGLE RESULT)
// =============================================================================
// Syntax: array.reduce((accumulator, currentItem) => ..., initialValue)

const totalInventoryValue = catalog.reduce((runningTotal, product) => {
  return product.inStock ? runningTotal + product.price : runningTotal;
}, 0); // 0 is the starting accumulator

console.log("Total In-Stock Inventory: $" + totalInventoryValue);

// =============================================================================
// STEP 4: SEARCH METHODS (FIND, SOME, EVERY, INCLUDES)
// =============================================================================

// find: Returns the FIRST matching item (or undefined)
const foundMonitor = catalog.find((product) => product.id === "p3");
console.log("Found Item:", foundMonitor ? foundMonitor.name : "Not found");

// some: Returns true if AT LEAST ONE item meets the condition
const hasOutOfStockItems = catalog.some((product) => !product.inStock);
console.log("Any out-of-stock items?:", hasOutOfStockItems); // true

// every: Returns true ONLY if ALL items meet the condition
const allCostOverTen = catalog.every((product) => product.price > 10);
console.log("All items cost over $10?:", allCostOverTen); // true

// =============================================================================
// STEP 5: MUTATING VS IMMUTABLE SORTING (ES2023)
// =============================================================================
const rawNumbers = [40, 10, 50, 20];

// Old Way (Mutates original): rawNumbers.sort((a, b) => a - b);
// Modern Immutable Way: toSorted() leaves original untouched!
const sortedNumbers = rawNumbers.toSorted((a, b) => a - b);

console.log("Original untouched:", rawNumbers);   // [40, 10, 50, 20]
console.log("Sorted copy:", sortedNumbers);       // [10, 20, 40, 50]

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  All Product Names: [ 'Mechanical Keyboard', 'Wireless Mouse', 'Gaming Monitor', 'USB-C Cable' ]
  Affordable & In Stock: [ 'Mechanical Keyboard', 'Wireless Mouse', 'USB-C Cable' ]
  Total In-Stock Inventory: $135
  Found Item: Gaming Monitor
  Any out-of-stock items?: true
  All items cost over $10?: true
  Original untouched: [ 40, 10, 50, 20 ]
  Sorted copy: [ 10, 20, 40, 50 ]
*/