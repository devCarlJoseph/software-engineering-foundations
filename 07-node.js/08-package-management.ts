/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Package Management
  ==============================================================================

  1. WHAT IS PACKAGE MANAGEMENT?
     The system and tools used to discover, install, update, and manage reusable
     third-party code libraries (packages/dependencies) so you don't have to
     reinvent the wheel for every project.

  2. REAL-LIFE ANALOGY:
     A Construction Supply Catalog:
     - Instead of forging your own screws, sawing tree trunks into 2x4 planks,
       and making glass from beach sand, you order standard, tested supplies
       from a trusted catalog.
     - A package manager delivers those pre-built components directly to your workbench.

  3. JARGON BUSTER:
     - Dependency: A library your project needs to RUN in production (e.g., Express, PG driver).
     - DevDependency: A tool needed only during DEVELOPMENT (e.g., TypeScript compiler, Jest, ESLint).
     - Transitive Dependency: A package that one of your packages relies on.
     - `node_modules/`: The local folder where downloaded dependency code is stored.
     - Lockfile (`package-lock.json`): The exact frozen snapshot of every installed dependency version.
*/

// =============================================================================
// BAD PRACTICE: IGNORING OR DELETING THE LOCKFILE
// =============================================================================
/*
  // DANGER: Deleting `package-lock.json` or putting it in `.gitignore`!
  // If teammate A runs `npm install` today and teammate B runs it next week,
  // they might get different minor/patch versions that break production!
  // ALWAYS commit package-lock.json to Git!
*/

// =============================================================================
// ANATOMY OF A PROFESSIONAL package.json
// =============================================================================

interface PackageJsonManifest {
  name: string;
  version: string;
  description: string;
  main: string;
  scripts: Record<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

// Simulating the structure of a backend project's package.json
const sampleProjectPackage: PackageJsonManifest = {
  name: "task-management-api",
  version: "1.0.0",
  description: "RESTful Task Management API with Node.js and TypeScript",
  main: "dist/index.js",
  scripts: {
    build: "tsc",
    start: "node dist/index.js",
    dev: "tsx watch src/index.ts",
    test: "jest",
  },
  dependencies: {
    // Needed in Production:
    dotenv: "^16.4.5",
  },
  devDependencies: {
    // Needed only during Development / Build:
    typescript: "^5.4.5",
    "@types/node": "^20.12.7",
  },
};

console.log("=== Package Management Manifest Demo ===");
console.log(`Project:        ${sampleProjectPackage.name} v${sampleProjectPackage.version}`);
console.log("\nProduction Dependencies (shipped to server):");
Object.entries(sampleProjectPackage.dependencies).forEach(([pkg, ver]) => {
  console.log(`  - ${pkg}: ${ver}`);
});

console.log("\nDevelopment Dependencies (local machine only):");
Object.entries(sampleProjectPackage.devDependencies).forEach(([pkg, ver]) => {
  console.log(`  - ${pkg}: ${ver}`);
});

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === Package Management Manifest Demo ===
  Project:        task-management-api v1.0.0

  Production Dependencies (shipped to server):
    - dotenv: ^16.4.5

  Development Dependencies (local machine only):
    - typescript: ^5.4.5
    - @types/node: ^20.12.7
*/

// =============================================================================
// BEHIND THE SCENES: DEPENDENCIES VS DEV-DEPENDENCIES
// =============================================================================
/*
  INSTALL COMMAND CHEATSHEET:

  1. Install production dependency:
     npm install express
     -> Adds to "dependencies"

  2. Install development tool:
     npm install -D typescript @types/node
     -> Adds to "devDependencies"

  3. Production server install (skips devDependencies to save disk space and time):
     npm ci --omit=dev
*/