/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Node.js Application Structure
  ==============================================================================

  1. WHAT IS APPLICATION STRUCTURE?
     The architectural layout and organization of folders, layers, and files
     in a production Node.js backend. Clean structure ensures high scalability,
     ease of testing, and modular separation of concerns.

  2. REAL-LIFE ANALOGY:
     A Modern Hospital:
     - Triage / Reception (Routes/Controllers): Welcomes patients, verifies ID, directs to rooms.
     - Doctors / Specialists (Services): Make diagnoses, perform procedures, calculate dosages.
     - Medical Records Department (Repositories / Database): Stores patient files securely.
     The receptionist never performs surgery, and the surgeon doesn't manage the file archive!

  3. JARGON BUSTER:
     - 3-Tier Layered Architecture: Controller -> Service -> Repository.
     - Controller: Parses incoming HTTP requests, validates inputs, and sends HTTP responses.
     - Service: Pure business logic (does NOT know about `req` or `res`).
     - Repository: Data access layer (queries database or interacts with storage).
     - DTO (Data Transfer Object): The expected format/shape of data sent in a request.
*/

// =============================================================================
// RECOMMENDED PRODUCTION DIRECTORY TREE
// =============================================================================
/*
  src/
  ├── config/             <- Environment variable validation and app constants
  │   └── env.config.ts
  ├── controllers/        <- HTTP request handlers (req, res)
  │   └── user.controller.ts
  ├── services/           <- Pure business rules & calculations
  │   └── user.service.ts
  ├── repositories/       <- Database queries and persistence
  │   └── user.repository.ts
  ├── models/ or types/   <- Interfaces, schemas, TypeScript types
  │   └── user.types.ts
  ├── middlewares/        <- Auth check, logger, error handlers
  │   └── errorHandler.middleware.ts
  └── app.ts              <- Entry point server setup
*/

// =============================================================================
// RUNNABLE ARCHITECTURE DEMONSTRATION (CONTROLLER -> SERVICE -> REPO)
// =============================================================================

// ── LAYER 1: DATA MODEL & TYPES ──────────────────────────────────────────────
interface UserRecord {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
}

interface CreateUserDTO {
  username: string;
  email: string;
}

// ── LAYER 2: REPOSITORY (DATA ACCESS) ────────────────────────────────────────
class UserRepository {
  private users: UserRecord[] = [];

  public save(dto: CreateUserDTO): UserRecord {
    const record: UserRecord = {
      id: `usr_${this.users.length + 1}`,
      username: dto.username,
      email: dto.email,
      createdAt: new Date(),
    };
    this.users.push(record);
    return record;
  }

  public findByEmail(email: string): UserRecord | undefined {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }
}

// ── LAYER 3: SERVICE (BUSINESS LOGIC) ────────────────────────────────────────
class UserService {
  constructor(private userRepo: UserRepository) {}

  public registerUser(dto: CreateUserDTO): UserRecord {
    // Business Rule 1: Email must not be empty and must look valid
    if (!dto.email.includes("@")) {
      throw new Error("Validation Failed: Invalid email address format.");
    }

    // Business Rule 2: Email uniqueness check
    const existing = this.userRepo.findByEmail(dto.email);
    if (existing) {
      throw new Error(`Conflict: User with email "${dto.email}" already exists.`);
    }

    return this.userRepo.save(dto);
  }
}

// ── LAYER 4: CONTROLLER (HTTP / REQUEST HANDLER) ─────────────────────────────
class UserController {
  constructor(private userService: UserService) {}

  public handlePostUser(requestBody: unknown): { statusCode: number; payload: unknown } {
    try {
      const dto = requestBody as CreateUserDTO;
      const created = this.userService.registerUser(dto);
      return {
        statusCode: 201,
        payload: { success: true, user: created },
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Internal Server Error";
      return {
        statusCode: 400,
        payload: { success: false, error: message },
      };
    }
  }
}

// ── APPLICATION ASSEMBLY (Dependency Injection) ──────────────────────────────
const repository = new UserRepository();
const service = new UserService(repository);
const controller = new UserController(service);

console.log("=== Layered Application Architecture Demo ===");

// 1. Successful request
const response1 = controller.handlePostUser({
  username: "carl_developer",
  email: "carl@example.com",
});
console.log("Request 1 (Valid User):", response1);

// 2. Business rule violation (duplicate email)
const response2 = controller.handlePostUser({
  username: "carl_twin",
  email: "carl@example.com",
});
console.log("\nRequest 2 (Duplicate Email):", response2);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === Layered Application Architecture Demo ===
  Request 1 (Valid User): {
    statusCode: 201,
    payload: {
      success: true,
      user: {
        id: 'usr_1',
        username: 'carl_developer',
        email: 'carl@example.com',
        createdAt: <Date>
      }
    }
  }

  Request 2 (Duplicate Email): {
    statusCode: 400,
    payload: {
      success: false,
      error: 'Conflict: User with email "carl@example.com" already exists.'
    }
  }
*/

// =============================================================================
// BEHIND THE SCENES: WHY THIS STRUCTURE WINS
// =============================================================================
/*
  1. Testability: You can unit-test `UserService` without spinning up an HTTP server
     or connecting to a real database.
  2. Maintainability: If you switch from PostgreSQL to MongoDB, you only touch
     `UserRepository`. The controller and service remain 100% untouched.
  3. Scalability: Multiple engineers can work on different features simultaneously
     without merge conflicts.
*/