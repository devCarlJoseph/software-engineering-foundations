/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Protecting API Routes
  ==============================================================================

  1. WHAT ARE PROTECTED ROUTES?
     API endpoints that require a valid, verified identity before allowing access
     to the underlying resource.
     Unauthenticated callers are stopped at the door with an HTTP 401 response.

  2. REAL-LIFE ANALOGY:
     An ATM Machine:
     - Public screen (Welcome, Choose Language): Anyone walking by can view it.
     - Protected screen (Withdraw Cash, Check Balance): Requires inserting a debit
       card and entering the correct PIN. You cannot see your balance without unlocking it.

  3. JARGON BUSTER:
     - Public Routes: Open to everyone (e.g. `POST /auth/login`, `POST /auth/register`).
     - Protected Routes: Require credentials (e.g. `GET /tasks`, `POST /tasks`, `GET /profile`).
     - Route Guard: Middleware placed ahead of the route handler to verify credentials.
*/

// =============================================================================
// ROUTE ROUTER SIMULATION: PUBLIC VS PROTECTED
// =============================================================================

interface IncomingApiRequest {
  path: string;
  method: string;
  authorizationHeader?: string;
}

interface UserSessionContext {
  userId: string;
  role: string;
}

class ApiGatewayRouter {
  // Public route whitelist (no credentials required)
  private static PUBLIC_ROUTES = ["/api/v1/auth/login", "/api/v1/auth/register", "/health"];

  public static handleRequest(
    req: IncomingApiRequest
  ): { status: number; body: Record<string, unknown> } {
    console.log(`--> [Router]: ${req.method} ${req.path}`);

    // Check 1: Is this route public?
    const isPublic = this.PUBLIC_ROUTES.includes(req.path);

    if (isPublic) {
      console.log("   [Access]: Route is PUBLIC. Granting access immediately.");
      return { status: 200, body: { message: "Public resource loaded." } };
    }

    // Check 2: Protected Route Guard
    console.log("   [Access]: Route is PROTECTED. Verifying credentials...");
    const user = this.authenticateHeader(req.authorizationHeader);

    if (!user) {
      return {
        status: 401,
        body: { error: "Unauthorized: Access token missing or invalid." },
      };
    }

    // Resource Handler
    return {
      status: 200,
      body: {
        message: `Successfully retrieved protected data for user '${user.userId}'.`,
        secretData: ["Financial Report Q3", "User Audit Log"],
      },
    };
  }

  private static authenticateHeader(authHeader?: string): UserSessionContext | null {
    if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
    const token = authHeader.split(" ")[1];

    if (token === "valid_secret_token") {
      return { userId: "usr_carl_77", role: "member" };
    }
    return null;
  }
}

console.log("=== Test 1: Accessing Public Route (Login) ===");
const res1 = ApiGatewayRouter.handleRequest({
  path: "/api/v1/auth/login",
  method: "POST",
});
console.log(`Response ${res1.status}:`, res1.body);

console.log("\n=== Test 2: Accessing Protected Route Without Token ===");
const res2 = ApiGatewayRouter.handleRequest({
  path: "/api/v1/tasks",
  method: "GET",
});
console.log(`Response ${res2.status}:`, res2.body);

console.log("\n=== Test 3: Accessing Protected Route With Valid Token ===");
const res3 = ApiGatewayRouter.handleRequest({
  path: "/api/v1/tasks",
  method: "GET",
  authorizationHeader: "Bearer valid_secret_token",
});
console.log(`Response ${res3.status}:`, res3.body);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === Test 1: Accessing Public Route (Login) ===
  --> [Router]: POST /api/v1/auth/login
     [Access]: Route is PUBLIC. Granting access immediately.
  Response 200: { message: 'Public resource loaded.' }

  === Test 2: Accessing Protected Route Without Token ===
  --> [Router]: GET /api/v1/tasks
     [Access]: Route is PROTECTED. Verifying credentials...
  Response 401: { error: 'Unauthorized: Access token missing or invalid.' }

  === Test 3: Accessing Protected Route With Valid Token ===
  --> [Router]: GET /api/v1/tasks
     [Access]: Route is PROTECTED. Verifying credentials...
  Response 200: {
    message: "Successfully retrieved protected data for user 'usr_carl_77'.",
    secretData: [ 'Financial Report Q3', 'User Audit Log' ]
  }
*/

// =============================================================================
// BEHIND THE SCENES
// =============================================================================
/*
  In Express projects:
  Mount the auth middleware at router level:

  // src/routes/task.routes.ts
  const taskRouter = Router();

  // Apply to ALL routes in this router:
  taskRouter.use(authenticateUserMiddleware);

  taskRouter.get("/", getTasks);
  taskRouter.post("/", createTask);
*/