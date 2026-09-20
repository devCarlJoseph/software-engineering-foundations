/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Destructuring Assignment
  ==============================================================================

  1. WHAT IS DESTRUCTURING?
     A clean syntax that unpacks values from arrays or properties from objects
     into distinct, individual variables in a single line.

  2. REAL-LIFE ANALOGY:
     Unpacking a Grocery Bag.
     Instead of pulling the entire heavy bag out every time you want an apple,
     you unpack the apple and milk directly into individual refrigerator spots.

  3. JARGON BUSTER:
     - Destructuring: Extracting data from arrays/objects using pattern matching.
     - Property Aliasing / Renaming: Extracting a property while giving the variable
       a different name (`{ oldName: newName }`).
     - Default Fallback: Assigning a backup value if the property is undefined.
     - Positional Matching: In array destructuring, variables match by index order (0, 1, 2).
*/

// =============================================================================
// STEP 1: OBJECT DESTRUCTURING (EXTRACTION, RENAMING, & DEFAULTS)
// =============================================================================

const serverConfig = {
  hostName: "api.production.internal",
  port: 5432,
  // databaseName is intentionally omitted to test default fallback!
};

// Extracting properties:
// - hostName is renamed to 'domain'
// - port is extracted as 'port'
// - databaseName gets default fallback "main_db"
const { hostName: domain, port, databaseName = "main_db" } = serverConfig;

console.log("Extracted Domain:", domain);
console.log("Extracted Port:", port);
console.log("Default Database:", databaseName);

// =============================================================================
// STEP 2: NESTED OBJECT DESTRUCTURING
// =============================================================================

const userAccount = {
  id: "usr_998",
  profile: {
    fullName: "Carl Joseph",
    location: {
      city: "Manila",
      country: "Philippines",
    },
  },
};

// Reaching deep into nested structures in one single statement:
const {
  profile: {
    fullName,
    location: { city },
  },
} = userAccount;

console.log("User:", fullName, "lives in:", city);

// =============================================================================
// STEP 3: ARRAY DESTRUCTURING (POSITIONAL MATCHING)
// =============================================================================

const coordinates = [14.5995, 120.9842]; // [Latitude, Longitude]

// Position 0 -> lat, Position 1 -> lng
const [latitude, longitude] = coordinates;
console.log("Latitude:", latitude, "Longitude:", longitude);

// Skipping elements with commas:
const rgbColors = ["#FF0000", "#00FF00", "#0000FF"];
const [redHex, , blueHex] = rgbColors; // Skipped index 1 ("#00FF00")
console.log("Red:", redHex, "Blue:", blueHex);

// =============================================================================
// STEP 4: FUNCTION PARAMETER DESTRUCTURING (EXPRESS CONTROLLER PATTERN)
// =============================================================================
// Standard pattern for Node.js API handlers receiving `req.body`:

function handleTaskCreation({ title, priority = "medium", isDone = false }) {
  console.log(`Creating Task: "${title}" [Priority: ${priority}] (Completed: ${isDone})`);
}

handleTaskCreation({ title: "Build PostgreSQL Schema", priority: "high" });

// =============================================================================
// STEP 5: SWAPPING VARIABLES WITHOUT TEMPORARY VARIABLES
// =============================================================================
let player1 = "Mario";
let player2 = "Luigi";

[player1, player2] = [player2, player1]; // Swapped!
console.log("After Swap: Player 1 =", player1, "| Player 2 =", player2);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Extracted Domain: api.production.internal
  Extracted Port: 5432
  Default Database: main_db
  User: Carl Joseph lives in: Manila
  Latitude: 14.5995 Longitude: 120.9842
  Red: #FF0000 Blue: #0000FF
  Creating Task: "Build PostgreSQL Schema" [Priority: high] (Completed: false)
  After Swap: Player 1 = Luigi | Player 2 = Mario
*/