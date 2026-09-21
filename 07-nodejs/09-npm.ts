/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: NPM (Node Package Manager) & SemVer
  ==============================================================================

  1. WHAT IS NPM?
     NPM is two things:
     1. The world's largest online registry of software packages (npmjs.com).
     2. The Command Line Interface (CLI) bundled with Node.js to install and publish packages.

  2. REAL-LIFE ANALOGY:
     The App Store for Code:
     - npmjs.com is the App Store server hosting millions of apps.
     - The `npm` CLI command on your laptop is the App Store app on your phone
       that downloads, updates, and uninstalls items with one tap.

  3. JARGON BUSTER:
     - SemVer (Semantic Versioning): Standard version format: `MAJOR.MINOR.PATCH` (e.g., 2.4.1).
       - MAJOR (2.0.0): Breaking changes! Code might not work without rewrites.
       - MINOR (2.1.0): New features added in a backward-compatible way.
       - PATCH (2.1.1): Backward-compatible bug fixes.
     - Caret (`^1.2.3`): Allows MINOR and PATCH updates (up to < 2.0.0).
     - Tilde (`~1.2.3`): Allows PATCH updates only (up to < 1.3.0).
     - Exact (`1.2.3`): Locks strictly to that specific version.
     - `npx`: Runs a package without globally installing it permanently.
*/

// =============================================================================
// SEMANTIC VERSIONING (SemVer) DEMONSTRATION
// =============================================================================

type VersionChangeType = "major" | "minor" | "patch";

function parseSemVer(version: string) {
  const [major, minor, patch] = version.split(".").map(Number);
  return { major, minor, patch };
}

function bumpVersion(currentVersion: string, change: VersionChangeType): string {
  const { major, minor, patch } = parseSemVer(currentVersion);

  switch (change) {
    case "major":
      return `${major + 1}.0.0`; // Breaking change resets minor and patch
    case "minor":
      return `${major}.${minor + 1}.0`; // New feature resets patch
    case "patch":
      return `${major}.${minor}.${patch + 1}`; // Bug fix increments patch only
  }
}

const currentRelease = "1.4.2";

console.log("=== NPM Semantic Versioning (SemVer) Demo ===");
console.log("Current Base Version: ", currentRelease);
console.log("After Bug Fix (patch):", bumpVersion(currentRelease, "patch"));
console.log("After Feature (minor):", bumpVersion(currentRelease, "minor"));
console.log("After Breaking (major):", bumpVersion(currentRelease, "major"));

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === NPM Semantic Versioning (SemVer) Demo ===
  Current Base Version:  1.4.2
  After Bug Fix (patch): 1.4.3
  After Feature (minor): 1.5.0
  After Breaking (major): 2.0.0
*/

// =============================================================================
// ESSENTIAL NPM CLI COMMANDS REFERENCE
// =============================================================================
/*
  ┌─────────────────────────────────┬──────────────────────────────────────────┐
  │ Command                         │ What It Does                             │
  ├─────────────────────────────────┼──────────────────────────────────────────┤
  │ npm init -y                     │ Create a new default package.json        │
  │ npm install <pkg>               │ Install a production dependency          │
  │ npm install -D <pkg>            │ Install a development dependency         │
  │ npm uninstall <pkg>             │ Remove a package                         │
  │ npm update                      │ Update packages within SemVer range      │
  │ npm run <script>                │ Execute a custom script in package.json  │
  │ npm audit                       │ Scan installed packages for security bugs│
  │ npm audit fix                   │ Automatically patch vulnerable packages │
  │ npx <tool>                      │ Execute a CLI tool without saving it     │
  │                                 │ (e.g., npx prisma init)                  │
  └─────────────────────────────────┴──────────────────────────────────────────┘
*/