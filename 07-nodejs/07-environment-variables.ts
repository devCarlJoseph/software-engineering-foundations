/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Environment Variables
  ==============================================================================

  1. WHAT ARE ENVIRONMENT VARIABLES?
     Values defined outside the application code in the operating system or `.env` files
     that change depending on the environment (Development, Staging, Production).
     They keep secrets (API keys, database passwords) and dynamic configurations
     (port numbers) secure and out of your source code.

  2. REAL-LIFE ANALOGY:
     A Master Keycard:
     - You don't engrave the hotel master key code onto the front door for everyone to read.
     - You keep the code on a separate keycard carried only by authorized staff in that building.
     - Environment variables keep credentials safe and off public GitHub repositories!

  3. JARGON BUSTER:
     - `process.env`: The built-in Node.js global object containing all environment variables.
     - `.env` file: A text file storing key-value pairs (`KEY=VALUE`) for local development.
     - `.gitignore`: The file telling Git to NEVER commit `.env` containing real secrets.
     - `.env.example`: A safe template file committed to Git showing needed variable names
       without real secret values.
*/

// =============================================================================
// BAD PRACTICE: HARDCODING SENSITIVE SECRETS IN CODE
// =============================================================================
/*
  // DISASTER WAITING TO HAPPEN:
  const DB_PASSWORD = "mySuperSecretPassword123!"; // Pushed to GitHub! Hackers find this!
  const PORT = 5432;                               // Hardcoded port can't change per server!
*/

// =============================================================================
// GOOD PRACTICE: STRONGLY TYPED, VALIDATED CONFIGURATION OBJECT
// =============================================================================

// Step 1: Simulate environment variables set in OS or .env
process.env.NODE_ENV = process.env.NODE_ENV ?? "development";
process.env.PORT = process.env.PORT ?? "8080";
process.env.DATABASE_URL = process.env.DATABASE_URL ?? "postgresql://localhost:5432/app_db";
process.env.JWT_SECRET = process.env.JWT_SECRET ?? "super_secure_demo_key";

// Step 2: Define a typed Config interface
interface AppEnvironmentConfig {
  nodeEnv: "development" | "production" | "test";
  port: number;
  databaseUrl: string;
  jwtSecret: string;
  isProduction: boolean;
}

// Step 3: Validate and parse environment variables with fail-fast validation
function loadAndValidateConfig(): AppEnvironmentConfig {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("[FATAL]: JWT_SECRET environment variable is missing!");
  }

  const rawPort = process.env.PORT ?? "3000";
  const parsedPort = parseInt(rawPort, 10);
  if (isNaN(parsedPort)) {
    throw new Error(`[FATAL]: PORT must be a valid number, received: "${rawPort}"`);
  }

  const nodeEnv = (process.env.NODE_ENV ?? "development") as AppEnvironmentConfig["nodeEnv"];

  return {
    nodeEnv,
    port: parsedPort,
    databaseUrl: process.env.DATABASE_URL ?? "",
    jwtSecret,
    isProduction: nodeEnv === "production",
  };
}

// Step 4: Use the validated config everywhere in your app
const appConfig = loadAndValidateConfig();

console.log("=== Loaded Application Configuration ===");
console.log("Environment:       ", appConfig.nodeEnv);
console.log("Listening Port:    ", appConfig.port);
console.log("Database URL:      ", appConfig.databaseUrl);
console.log("Is Production?:    ", appConfig.isProduction);
console.log("Secret Masked:     ", appConfig.jwtSecret.slice(0, 4) + "****");

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === Loaded Application Configuration ===
  Environment:        development
  Listening Port:     8080
  Database URL:       postgresql://localhost:5432/app_db
  Is Production?:     false
  Secret Masked:      supe****
*/

// =============================================================================
// BEHIND THE SCENES: THE 12-FACTOR APP RULE
// =============================================================================
/*
  The 12-Factor App methodology states:
  "Store config in the environment."

  Rules for .env files:
  1. ALWAYS add `.env` to your `.gitignore`.
  2. Create a `.env.example` file for teammates with placeholder values:
       PORT=3000
       DATABASE_URL=postgresql://user:password@localhost:5432/db_name
       JWT_SECRET=your_jwt_secret_here
  3. In Node.js 20.6+, you can run scripts with built-in .env loading:
       node --env-file=.env app.js
     (No need for third-party `dotenv` package anymore!)
*/