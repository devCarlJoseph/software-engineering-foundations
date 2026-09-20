/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: TypeScript Modules
  ==============================================================================

  1. WHAT ARE MODULES?
     A "Module" is simply an independent file. In TypeScript, any file that has an
     `import` or `export` is considered a module.
     Modules keep code organized, clean, and decoupled.

  2. REAL-LIFE ANALOGY:
     A Hardware Store Tool Wall.
     The store doesn't keep all tools piled in one giant heap on the floor.
     Pliers are in Aisle 1, Screws in Aisle 2. When building a desk, you check out
     ONLY the exact 2 tools you need.

  3. JARGON BUSTER:
     - Module: A self-contained file that shares code via `export` and `import`.
     - Named Export: Exporting items using their exact variable or type name.
     - Type-Only Export (`export type`): Telling TypeScript: "This is 100% just a type.
       Do NOT generate any JavaScript code for it when compiling!"
     - Type Elision: The process where TypeScript erases types during compilation so
       production JavaScript bundles stay lightweight and fast.
*/

// =============================================================================
// STEP 1: EXPORTING TYPES AND INTERFACES
// =============================================================================

export interface DatabaseConnectionConfig {
  host: string;
  port: number;
  databaseName: string;
}

export type AuthenticationToken = string;

// =============================================================================
// STEP 2: EXPORTING REGULAR CODE (FUNCTIONS & CONSTANTS)
// =============================================================================

export const DEFAULT_DATABASE_PORT: number = 5432;

export function buildPostgresConnectionString(config: DatabaseConnectionConfig): string {
  return `postgresql://${config.host}:${config.port}/${config.databaseName}`;
}

// =============================================================================
// STEP 3: EXPLICIT TYPE-ONLY EXPORT SYNTAX (TS 3.8+)
// =============================================================================
// This guarantees that this type vanishes completely from the compiled output:

type SystemHealthMetric = {
  cpuUsagePercentage: number;
  memoryUsageMb: number;
};

export type { SystemHealthMetric };

// =============================================================================
// STEP 4: VERIFYING IN ACTION (INSIDE THIS MODULE)
// =============================================================================

const localDbConfig: DatabaseConnectionConfig = {
  host: "localhost",
  port: DEFAULT_DATABASE_PORT,
  databaseName: "foundations_db",
};

const connectionUri: string = buildPostgresConnectionString(localDbConfig);
console.log("Generated Connection URI:", connectionUri);

// =============================================================================
// REFERENCE: HOW ANOTHER FILE IMPORTS FROM THIS MODULE
// =============================================================================
/*
  In another file (e.g. app.ts):

  // 1. Importing only the type (zero bytes in compiled JS):
  import type { DatabaseConnectionConfig } from "./modules";

  // 2. Importing executable code:
  import { buildPostgresConnectionString, DEFAULT_DATABASE_PORT } from "./modules";
*/

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Generated Connection URI: postgresql://localhost:5432/foundations_db
*/

// =============================================================================
// BEHIND THE SCENES: WHAT HAPPENS DURING COMPILATION
// =============================================================================
/*
  When you run `tsc modules.ts`, notice what happens:
  1. `export interface DatabaseConnectionConfig` -> COMPLETELY DISAPPEARS.
  2. `export type AuthenticationToken` -> COMPLETELY DISAPPEARS.
  3. `export const DEFAULT_DATABASE_PORT = 5432` -> KEPT in JavaScript.
  4. `export function buildPostgresConnectionString` -> KEPT in JavaScript.
  This is called "Type Elision". It ensures that adding TypeScript types NEVER
  makes your compiled JavaScript files larger or slower!
*/