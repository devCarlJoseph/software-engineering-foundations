/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Spread (...) and Rest (...) Operators
  ==============================================================================

  1. WHAT ARE SPREAD AND REST?
     Both use the exact same three dots `...`, but perform OPPOSITE jobs:
     - SPREAD: Unpacks/expands elements of an array or object into individual items.
     - REST: Gathers multiple individual items together into a single array or object.

  2. REAL-LIFE ANALOGY:
     - SPREAD: Dumping a bag of marbles out onto the floor so they scatter.
     - REST: Scooping up all loose marbles on the floor and placing them into a jar.

  3. JARGON BUSTER:
     - Spread Syntax: `[...array]` or `{...object}` expanding items into a new container.
     - Rest Parameter: `function(...args)` collecting leftover function arguments.
     - Shallow Copy: Copying only top-level values. Nested objects/arrays still share
       memory references!
     - Variadic Function: A function that accepts any variable number of arguments.
*/

// =============================================================================
// STEP 1: SPREAD OPERATOR WITH ARRAYS (EXPANDING)
// =============================================================================

const frontendTech = ["React", "Vue"];
const backendTech = ["Node.js", "Express", "PostgreSQL"];

// Combining arrays without .concat():
const fullStackStack = ["Git", ...frontendTech, ...backendTech, "Docker"];
console.log("Combined Stack:", fullStackStack);

// Passing array elements as arguments to Math functions:
const testScores = [88, 92, 79, 99, 85];
const highestScore = Math.max(...testScores); // Math.max(88, 92, 79, 99, 85)
console.log("Highest Score:", highestScore); // 99

// =============================================================================
// STEP 2: SPREAD OPERATOR WITH OBJECTS (MERGING & OVERRIDING)
// =============================================================================
// Properties defined later overwrite properties from earlier objects!

const defaultSettings = {
  theme: "dark",
  fontSize: 14,
  showNotifications: true,
};

const userPreferences = {
  fontSize: 18, // User customized their font size
};

const finalConfig = {
  ...defaultSettings,
  ...userPreferences,
  lastUpdated: "2026-09-20",
};

console.log("Merged Configuration:", finalConfig);

// =============================================================================
// STEP 3: REST PARAMETERS IN FUNCTIONS (GATHERING ARGUMENTS)
// =============================================================================
// Rule: The rest parameter MUST be the last parameter in the function signature!

function sumScores(studentName, ...scores) {
  // 'scores' is collected into a TRUE array!
  const total = scores.reduce((sum, val) => sum + val, 0);
  return `${studentName}'s total score: ${total} across ${scores.length} exams`;
}

console.log(sumScores("Carl", 95, 88, 92));        // 3 exams
console.log(sumScores("Alice", 100, 98, 95, 94));  // 4 exams

// =============================================================================
// STEP 4: REST IN DESTRUCTURING (SENSITIVE DATA SANITIZATION)
// =============================================================================
// Backend Pattern: Strip out passwords before sending user data over an API!

const databaseUserRecord = {
  id: 101,
  username: "carl_dev",
  passwordHash: "$2b$12$secretPasswordHash",
  role: "admin",
  email: "carl@example.com",
};

// passwordHash is extracted alone; remaining fields gathered into 'publicProfile':
const { passwordHash, ...publicProfile } = databaseUserRecord;

console.log("Safe Public Profile (Password Omitted):", publicProfile);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Combined Stack: [ 'Git', 'React', 'Vue', 'Node.js', 'Express', 'PostgreSQL', 'Docker' ]
  Highest Score: 99
  Merged Configuration: {
    theme: 'dark',
    fontSize: 18,
    showNotifications: true,
    lastUpdated: '2026-09-20'
  }
  Carl's total score: 275 across 3 exams
  Alice's total score: 387 across 4 exams
  Safe Public Profile (Password Omitted): { id: 101, username: 'carl_dev', role: 'admin', email: 'carl@example.com' }
*/