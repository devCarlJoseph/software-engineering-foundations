// =============================================================================
// FILE: 01-javascript-fundamentals/conditional.js
// TOPIC: Conditionals (if, else if, else, Nested Conditionals, and switch)
// =============================================================================

// -----------------------------------------------------------------------------
// 1. BASIC IF / ELSE IF / ELSE
// -----------------------------------------------------------------------------
const currentTemperature = 28;

if (currentTemperature > 30) {
  console.log("Weather alert: Hot weather");
} else if (currentTemperature >= 20) {
  console.log("Weather alert: Moderate and pleasant weather");
} else if (currentTemperature >= 10) {
  console.log("Weather alert: Cool weather");
} else {
  console.log("Weather alert: Cold weather");
}

// -----------------------------------------------------------------------------
// 2. TRUTHY AND FALSY CONDITIONS
// -----------------------------------------------------------------------------
// JavaScript automatically coerces condition expressions to boolean.
// The only 6 falsy values in JavaScript are: false, 0, "", null, undefined, and NaN.
// EVERYTHING ELSE is truthy (including empty arrays [] and empty objects {}).

const userInput = "user_123";

if (userInput) {
  console.log("Input is valid and non-empty:", userInput);
} else {
  console.log("Input is missing or falsy");
}

const emptyList = [];
if (emptyList) {
  console.log("Empty arrays are TRUTHY in JavaScript!");
}

// -----------------------------------------------------------------------------
// 3. COMBINING CONDITIONS WITH LOGICAL OPERATORS
// -----------------------------------------------------------------------------
const hasValidToken = true;
const userRole = "admin";
const isAccountActive = true;

// AND (&&) requires all conditions to evaluate to true:
if (hasValidToken && userRole === "admin" && isAccountActive) {
  console.log("Access granted to admin panel");
} else {
  console.log("Access denied");
}

// OR (||) requires at least one condition to evaluate to true:
const isWeekend = false;
const isHoliday = true;

if (isWeekend || isHoliday) {
  console.log("Office closed today");
} else {
  console.log("Office open for business");
}

// -----------------------------------------------------------------------------
// 4. NESTED IF STATEMENTS
// -----------------------------------------------------------------------------
const productStock = 5;
const customerBalance = 100;
const itemPrice = 40;

if (productStock > 0) {
  console.log("Item is in stock. Checking balance...");
  if (customerBalance >= itemPrice) {
    console.log("Purchase approved! Processing checkout...");
  } else {
    console.log("Purchase failed: Insufficient funds.");
  }
} else {
  console.log("Purchase failed: Item is out of stock.");
}

// -----------------------------------------------------------------------------
// 5. SWITCH STATEMENT (WITH BREAK AND DEFAULT)
// -----------------------------------------------------------------------------
// Evaluates a single expression against matching case clauses using strict equality (===).

const dayCode = 3;
let dayName;

switch (dayCode) {
  case 1:
    dayName = "Monday";
    break;
  case 2:
    dayName = "Tuesday";
    break;
  case 3:
    dayName = "Wednesday";
    break;
  case 4:
    dayName = "Thursday";
    break;
  case 5:
    dayName = "Friday";
    break;
  case 6:
  case 7:
    // Multiple cases grouped together (Fall-through):
    dayName = "Weekend";
    break;
  default:
    dayName = "Invalid Day Code";
    break;
}

console.log("Day resolved by switch:", dayName); // "Wednesday"