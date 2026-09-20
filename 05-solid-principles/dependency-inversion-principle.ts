/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Dependency Inversion Principle (DIP)
  ==============================================================================

  1. WHAT IS DIP?
     High-level business logic (e.g. `OrderService`) should NEVER directly instantiate
     low-level implementation details (e.g. `new MySQLDatabase()`).
     Instead, both depend on an interface contract (`DatabaseConnection`).

  2. THE DISASTER PREVENTED:
     If your `OrderService` has `const db = new MySQLDatabase()` hardcoded inside it,
     switching to PostgreSQL requires rewriting your core business logic!
*/

// =============================================================================
// STEP 1: THE ABSTRACTION (INTERFACE)
// =============================================================================

interface DatabaseService {
  saveRecord(table: string, data: object): boolean;
}

// =============================================================================
// STEP 2: LOW-LEVEL IMPLEMENTATIONS (PLUGINS)
// =============================================================================

class MySQLDatabase implements DatabaseService {
  public saveRecord(table: string, data: object): boolean {
    console.log(`[MySQL]: Executed INSERT INTO ${table} VALUES (...)`);
    return true;
  }
}

class PostgreSQLDatabase implements DatabaseService {
  public saveRecord(table: string, data: object): boolean {
    console.log(`[PostgreSQL]: Executed INSERT INTO ${table} (RETURNING id)...`);
    return true;
  }
}

// =============================================================================
// STEP 3: HIGH-LEVEL BUSINESS LOGIC (DEPENDS ONLY ON ABSTRACTION)
// =============================================================================

class UserRegistrationService {
  // Dependency Injection: Pass the database interface into the constructor!
  constructor(private db: DatabaseService) {}

  public registerUser(username: string): void {
    console.log(`Registering user '${username}'...`);
    this.db.saveRecord("users", { username: username, registeredAt: new Date() });
    console.log(`User '${username}' successfully onboarded!`);
  }
}

// Today we run on MySQL:
const appOnMysql = new UserRegistrationService(new MySQLDatabase());
appOnMysql.registerUser("carl_dev");

console.log("\n--- Switching Database Engine ---");

// Tomorrow we switch to PostgreSQL WITHOUT changing a single line of UserRegistrationService!
const appOnPostgres = new UserRegistrationService(new PostgreSQLDatabase());
appOnPostgres.registerUser("carl_dev");

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  Registering user 'carl_dev'...
  [MySQL]: Executed INSERT INTO users VALUES (...)
  User 'carl_dev' successfully onboarded!

  --- Switching Database Engine ---
  Registering user 'carl_dev'...
  [PostgreSQL]: Executed INSERT INTO users (RETURNING id)...
  User 'carl_dev' successfully onboarded!
*/