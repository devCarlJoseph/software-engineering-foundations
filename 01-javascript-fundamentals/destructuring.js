// =============================================================================
// FILE: 01-javascript-fundamentals/destructuring.js
// TOPIC: Destructuring Assignment (Objects and Arrays)
// =============================================================================

// -----------------------------------------------------------------------------
// 1. BASIC OBJECT DESTRUCTURING
// -----------------------------------------------------------------------------
// Unpacks properties from an object into distinct variables matching the property names.

const databaseConfig = {
  host: "localhost",
  port: 5432,
  database: "foundations_db",
};

const { host, port, database } = databaseConfig;
console.log("Host:", host);         // "localhost"
console.log("Port:", port);         // 5432
console.log("Database:", database); // "foundations_db"

// -----------------------------------------------------------------------------
// 2. RENAMING VARIABLES & DEFAULT VALUES (OBJECTS)
// -----------------------------------------------------------------------------
const serverResponse = {
  status: 200,
  url: "https://api.test.com/data",
  // timeout is missing from serverResponse
};

// Syntax: { propertyName: newVariableName = defaultValue }
const {
  status: statusCode, // Renamed 'status' to 'statusCode'
  url: endpointUrl,   // Renamed 'url' to 'endpointUrl'
  timeout = 5000,     // Default value assigned because timeout does not exist in object
} = serverResponse;

console.log("Renamed status:", statusCode);   // 200
console.log("Renamed url:", endpointUrl);     // "https://api.test.com/data"
console.log("Default timeout:", timeout);     // 5000

// -----------------------------------------------------------------------------
// 3. NESTED OBJECT DESTRUCTURING
// -----------------------------------------------------------------------------
const developerProfile = {
  id: 101,
  personal: {
    fullName: "Carl Joseph",
    city: "Manila",
  },
};

const {
  personal: { fullName, city },
} = developerProfile;

console.log("Nested Name:", fullName); // "Carl Joseph"
console.log("Nested City:", city);     // "Manila"

// -----------------------------------------------------------------------------
// 4. BASIC ARRAY DESTRUCTURING (POSITIONAL)
// -----------------------------------------------------------------------------
// Unpacks values from an array according to their index position.

const coordinates = [14.5995, 120.9842];

const [latitude, longitude] = coordinates;
console.log("Latitude:", latitude);   // 14.5995
console.log("Longitude:", longitude); // 120.9842

// -----------------------------------------------------------------------------
// 5. SKIPPING ARRAY ELEMENTS & DEFAULTS
// -----------------------------------------------------------------------------
const colors = ["Red", "Green", "Blue", "Yellow"];

// Skip elements using commas:
const [firstColor, , thirdColor] = colors; // Skipped index 1 ("Green")
console.log("First color:", firstColor); // "Red"
console.log("Third color:", thirdColor); // "Blue"

// Default value for array items that are undefined:
const [primaryRole, secondaryRole = "guest"] = ["admin"];
console.log("Primary role:", primaryRole);     // "admin"
console.log("Secondary role:", secondaryRole); // "guest" (used fallback)

// -----------------------------------------------------------------------------
// 6. SWAPPING VARIABLES WITH ARRAY DESTRUCTURING
// -----------------------------------------------------------------------------
let valA = "FIRST";
let valB = "SECOND";

// Swap without temporary variable:
[valA, valB] = [valB, valA];

console.log("After swap - valA:", valA); // "SECOND"
console.log("After swap - valB:", valB); // "FIRST"