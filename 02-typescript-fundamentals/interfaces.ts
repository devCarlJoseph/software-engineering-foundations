/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: TypeScript Interfaces
  ==============================================================================

  1. WHAT IS AN INTERFACE?
     An "Interface" is an official contract or blueprint. It tells TypeScript:
     "Any object claiming to be this type MUST have these exact properties and methods."

  2. REAL-LIFE ANALOGY:
     A Driver's License Application. The government interface says you MUST provide:
     - Full Legal Name (string)
     - Birthdate (Date)
     - Eye Color (string)
     - Organ Donor status (optional boolean)
     If you skip your Birthdate, the application is rejected immediately.

  3. JARGON BUSTER:
     - Contract: A mandatory set of rules an object must fulfill.
     - Extends (Inheritance): Creating a new interface that takes all rules from an
       old interface and adds new rules on top.
     - Declaration Merging: If you write two interfaces with the exact same name,
       TypeScript automatically merges their rules together into one big contract.
     - Zero Runtime Cost: Interfaces exist ONLY during development. When converted
       to JavaScript, they vanish completely (leaving zero overhead).
*/

// =============================================================================
// STEP 1: DEFINING A BASIC INTERFACE
// =============================================================================

interface SmartWatch {
  readonly serialNumber: string; // Locked
  brand: string;
  batteryLevel: number;
  hasHeartRateSensor?: boolean;  // Optional
}

const myWatch: SmartWatch = {
  serialNumber: "SN_TECH_8819",
  brand: "PulseTracker",
  batteryLevel: 94,
  hasHeartRateSensor: true,
};

console.log("Watch Brand:", myWatch.brand);
console.log("Battery remaining:", myWatch.batteryLevel + "%");

// =============================================================================
// STEP 2: INTERFACES WITH FUNCTIONS (METHOD CONTRACTS)
// =============================================================================
// Used in backend development to ensure different payment gateways behave the same.

interface PaymentProcessor {
  processCharge(amount: number): boolean;
  issueRefund(transactionId: string): boolean;
}

const stripeService: PaymentProcessor = {
  processCharge(amount: number): boolean {
    console.log("Charging $" + amount + " through Stripe API");
    return true;
  },
  issueRefund(transactionId: string): boolean {
    console.log("Refunding transaction: " + transactionId);
    return true;
  },
};

stripeService.processCharge(49.99);
stripeService.issueRefund("TX_98765");

// =============================================================================
// STEP 3: EXTENDING INTERFACES (INHERITANCE)
// =============================================================================
// Don't repeat yourself! Build on top of existing contracts.

interface BasicUser {
  id: string;
  name: string;
}

interface SuperAdminUser extends BasicUser {
  permissions: string[]; // Inherits 'id' and 'name', plus adds 'permissions'
}

const headAdmin: SuperAdminUser = {
  id: "USR_001",
  name: "Carl",
  permissions: ["DELETE_USER", "ACCESS_DATABASE", "VIEW_LOGS"],
};

console.log("Admin Name:", headAdmin.name);
console.log("Admin Permissions Count:", headAdmin.permissions.length);

// =============================================================================
// STEP 4: DECLARATION MERGING (UNIQUE FEATURE OF INTERFACES)
// =============================================================================
// If you write the same interface name twice, TypeScript combines them:

interface AppSettings {
  appName: string;
}

interface AppSettings {
  portNumber: number; // Merged with appName!
}

const productionConfig: AppSettings = {
  appName: "Foundations Backend",
  portNumber: 3000,
};

console.log("App:", productionConfig.appName, "running on Port:", productionConfig.portNumber);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Watch Brand: PulseTracker
  Battery remaining: 94%
  Charging $49.99 through Stripe API
  Refunding transaction: TX_98765
  Admin Name: Carl
  Admin Permissions Count: 3
  App: Foundations Backend running on Port: 3000
*/

// =============================================================================
// TRY IT YOURSELF: DISASTER PREVENTED
// =============================================================================
// Missing a required property causes an immediate error:
// const brokenWatch: SmartWatch = {
//   serialNumber: "123",
//   brand: "BrandX"
//   // Missing 'batteryLevel'!
// };
// -> TS Error: Property 'batteryLevel' is missing in type '{ serialNumber: string; brand: string; }'