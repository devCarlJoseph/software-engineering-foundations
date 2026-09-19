// =============================================================================
// FILE: 02-typescript-fundamentals/interfaces.ts
// TOPIC: Interfaces (Contracts, Extensibility, and Declaration Merging)
// =============================================================================

// -----------------------------------------------------------------------------
// 1. BASIC INTERFACE DEFINITION
// -----------------------------------------------------------------------------
// An interface defines the structure/contract that an object must satisfy.

interface DatabaseConnection {
  readonly connectionId: string; // Read-only property
  host: string;
  port: number;
  ssl?: boolean;                 // Optional property
}

const pgConnection: DatabaseConnection = {
  connectionId: "conn_pg_01",
  host: "localhost",
  port: 5432,
  // ssl is optional, so omitting it is completely valid
};

// pgConnection.connectionId = "new_id"; // Error: Cannot assign to 'connectionId' because it is a read-only property.

// -----------------------------------------------------------------------------
// 2. INTERFACE WITH METHOD SIGNATURES
// -----------------------------------------------------------------------------

interface CacheService {
  get(key: string): string | null;
  set(key: string, value: string): void;
  clear(): boolean;
}

const memoryCache: CacheService = {
  get(key: string): string | null {
    return key === "token" ? "xyz123" : null;
  },
  set(key: string, value: string): void {
    console.log(`Stored ${key}: ${value}`);
  },
  clear(): boolean {
    return true;
  },
};

// -----------------------------------------------------------------------------
// 3. EXTENDING INTERFACES (INHERITANCE)
// -----------------------------------------------------------------------------
// Interfaces can inherit properties from one or more other interfaces using 'extends'.

interface BaseUser {
  id: string;
  email: string;
  createdAt: Date;
}

interface AdminUser extends BaseUser {
  permissions: string[];
  accessLevel: number;
}

const adminAccount: AdminUser = {
  id: "usr_admin_01",
  email: "admin@example.com",
  createdAt: new Date(),
  permissions: ["manage_users", "view_logs"],
  accessLevel: 1,
};

// -----------------------------------------------------------------------------
// 4. DECLARATION MERGING (UNIQUE FEATURE OF INTERFACES)
// -----------------------------------------------------------------------------
// If you define two interfaces with the exact same name, TypeScript merges them.

interface ServerConfig {
  port: number;
}

interface ServerConfig {
  host: string;
}

// ServerConfig now requires BOTH 'port' AND 'host':
const config: ServerConfig = {
  port: 8080,
  host: "127.0.0.1",
};

// -----------------------------------------------------------------------------
// 5. INDEX SIGNATURES (DYNAMIC PROPERTY KEYS)
// -----------------------------------------------------------------------------
// Used when you do not know all property names in advance, but know their types.

interface ErrorDictionary {
  [errorCode: string]: string; // Any string key must map to a string value
}

const errorMessages: ErrorDictionary = {
  NOT_FOUND: "The requested resource could not be found",
  UNAUTHORIZED: "You must be authenticated to access this resource",
  FORBIDDEN: "You do not have permission for this action",
};