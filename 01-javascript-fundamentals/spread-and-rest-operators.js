// =============================================================================
// FILE: 01-javascript-fundamentals/spread-and-rest-operators.js
// TOPIC: Spread Operator (...spread) and Rest Parameters (...rest)
// =============================================================================

// -----------------------------------------------------------------------------
// 1. SPREAD WITH ARRAYS (EXPANDING ELEMENTS)
// -----------------------------------------------------------------------------
// The spread operator (...) expands an array into individual elements.

const frontendTech = ["HTML", "CSS", "JavaScript"];
const backendTech = ["Node.js", "Express", "PostgreSQL"];

// Merging arrays into a new combined array:
const fullStackTech = [...frontendTech, ...backendTech, "Docker"];
console.log("Merged array:", fullStackTech);

// Creating a shallow clone of an array:
const originalNumbers = [1, 2, 3];
const clonedNumbers = [...originalNumbers];
clonedNumbers.push(4); // Modifying the clone does not affect the original
console.log("Original numbers:", originalNumbers); // [1, 2, 3]
console.log("Cloned numbers:", clonedNumbers);     // [1, 2, 3, 4]

// Spreading an array into Math functions:
const testScores = [88, 92, 79, 95, 84];
const highestScore = Math.max(...testScores); // Math.max(88, 92, 79, 95, 84)
console.log("Highest score:", highestScore); // 95

// -----------------------------------------------------------------------------
// 2. SPREAD WITH OBJECTS (EXPANDING PROPERTIES)
// -----------------------------------------------------------------------------
// The spread operator on an object copies its key-value pairs into a new object.

const defaultSettings = {
  theme: "dark",
  fontSize: 14,
  autoSave: true,
};

const userPreferences = {
  fontSize: 16, // User chooses a different font size
};

// Merging objects (keys from later objects override keys from earlier objects):
const finalSettings = {
  ...defaultSettings,
  ...userPreferences,
  lastUpdated: "2026-09-19",
};
console.log("Final merged settings:", finalSettings);
// { theme: "dark", fontSize: 16, autoSave: true, lastUpdated: "2026-09-19" }

// -----------------------------------------------------------------------------
// 3. REST PARAMETER IN FUNCTION ARGUMENTS (GATHERING VALUES)
// -----------------------------------------------------------------------------
// The rest operator gathers multiple remaining arguments into a single Array.
// Rule: The rest parameter MUST be the last parameter in the function signature.

function sumAllNumbers(...numbersToSum) {
  // numbersToSum is a true array!
  let total = 0;
  for (const num of numbersToSum) {
    total += num;
  }
  return total;
}

console.log("Sum 3 items:", sumAllNumbers(10, 20, 30));             // 60
console.log("Sum 5 items:", sumAllNumbers(1, 2, 3, 4, 5));          // 15

// Combining standard parameters with rest parameters:
function logTeam(teamName, leader, ...members) {
  console.log(`Team: ${teamName}`);
  console.log(`Leader: ${leader}`);
  console.log(`Members: ${members.join(", ")}`);
}

logTeam("Alpha", "Carl", "Alice", "Bob", "Charlie");

// -----------------------------------------------------------------------------
// 4. REST IN DESTRUCTURING
// -----------------------------------------------------------------------------
// Collects the remaining properties or elements that were not explicitly unpacked.

// Rest in Array Destructuring:
const colors = ["Red", "Green", "Blue", "Yellow", "Purple"];
const [firstColor, secondColor, ...remainingColors] = colors;

console.log("First color:", firstColor);           // "Red"
console.log("Second color:", secondColor);         // "Green"
console.log("Remaining colors:", remainingColors); // ["Blue", "Yellow", "Purple"]

// Rest in Object Destructuring:
const userAccount = {
  id: 1,
  username: "carl",
  passwordHash: "secret123",
  email: "carl@example.com",
};

// Isolate sensitive fields and collect the rest:
const { passwordHash, ...publicProfile } = userAccount;
console.log("Sensitive field omitted:", publicProfile);
// { id: 1, username: "carl", email: "carl@example.com" }