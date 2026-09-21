/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Authentication Middleware
  ==============================================================================

  1. WHAT IS AUTHENTICATION MIDDLEWARE?
     Middleware that intercepts incoming requests to protected routes, verifies
     the client's identity (typically by verifying a Bearer JWT token in the
     `Authorization` header), and attaches the authenticated user to `req.user`.

  2. REAL-LIFE ANALOGY:
     A VIP Club Bouncer:
     - Public entrance (`/login`, `/register`): Open to everyone.
     - VIP Room (`/api/tasks`, `/api/admin`): Guarded by a bouncer (Auth Middleware).
     - You show your VIP wristband (JWT Token). If genuine and unexpired, you pass through.
     - If missing or counterfeit, the bouncer denies entry (`401 Unauthorized`).

  3. JARGON BUSTER:
     - Authentication (401 Unauthorized): "Who are you?" (Checking identity).
     - Authorization (403 Forbidden): "What are you allowed to do?" (Checking permissions/roles).
     - Bearer Token: HTTP header standard format: `Authorization: Bearer <token>`.
     - `req.user`: Attaching the decoded payload to the request object so downstream
       route handlers know who made the request!
*/

// =============================================================================
// BAD PRACTICE: CHECKING AUTH INSIDE EVERY ROUTE HANDLER INDIVIDUALLY
// =============================================================================
/*
  // DANGER: Copy-pasting auth check in 30 different controllers (violates DRY):
  app.get("/tasks", (req, res) => {
    if (!req.headers.authorization) return res.status(401)...;
  });
  app.post("/tasks", (req, res) => {
    if (!req.headers.authorization) return res.status(401)...;
  });
*/

// =============================================================================
// GOOD PRACTICE: REUSABLE AUTHENTICATION & ROLE-GUARD MIDDLEWARES
// =============================================================================

interface AuthenticatedUser {
  id: string;
  username: string;
  role: "admin" | "member";
}

interface ExtendedRequest {
  headers: Record<string, string | undefined>;
  user?: AuthenticatedUser; // Attached by auth middleware!
}

// Simulated Token Verification (like jwt.verify())
function verifyToken(token: string): AuthenticatedUser | null {
  if (token === "valid_admin_token_xyz") {
    return { id: "usr_10", username: "carl_admin", role: "admin" };
  }
  if (token === "valid_member_token_abc") {
    return { id: "usr_20", username: "ana_member", role: "member" };
  }
  return null; // Invalid or expired
}

// 1. Authentication Middleware: Checks identity
function requireAuth(req: ExtendedRequest, res: { status: (c: number) => { json: (d: unknown) => void } }, next: () => void): void {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized: Missing or malformed Bearer token." });
    return;
  }

  const token = authHeader.split(" ")[1];
  const user = verifyToken(token);

  if (!user) {
    res.status(401).json({ error: "Unauthorized: Invalid or expired token." });
    return;
  }

  // Attach authenticated user to request object:
  req.user = user;
  console.log(`[AuthMiddleware]: Successfully authenticated user "${user.username}" (${user.role})`);
  next();
}

// 2. Authorization Middleware: Checks roles
function requireRole(allowedRole: "admin" | "member") {
  return (req: ExtendedRequest, res: { status: (c: number) => { json: (d: unknown) => void } }, next: () => void) => {
    if (!req.user || req.user.role !== allowedRole) {
      res.status(403).json({ error: `Forbidden: Requires '${allowedRole}' role.` });
      return;
    }
    next();
  };
}

// Helper to log responses
const mockHttpOut = {
  status: (code: number) => ({
    json: (body: unknown) => console.log(`[HTTP ${code} Response]:`, body),
  }),
};

console.log("=== Test 1: Request with No Token ===");
const unauthReq: ExtendedRequest = { headers: {} };
requireAuth(unauthReq, mockHttpOut, () => console.log("Passed to controller!"));

console.log("\n=== Test 2: Request with Valid Member Token -> Reaching Protected Route ===");
const memberReq: ExtendedRequest = { headers: { authorization: "Bearer valid_member_token_abc" } };
requireAuth(memberReq, mockHttpOut, () => {
  console.log(`[Task Controller]: Listing tasks for user ${memberReq.user?.username}`);
});

console.log("\n=== Test 3: Member Token Attempting Admin Route ===");
requireRole("admin")(memberReq, mockHttpOut, () => {
  console.log("Admin route executed!");
});

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === Test 1: Request with No Token ===
  [HTTP 401 Response]: { error: 'Unauthorized: Missing or malformed Bearer token.' }

  === Test 2: Request with Valid Member Token -> Reaching Protected Route ===
  [AuthMiddleware]: Successfully authenticated user "ana_member" (member)
  [Task Controller]: Listing tasks for user ana_member

  === Test 3: Member Token Attempting Admin Route ===
  [HTTP 403 Response]: { error: "Forbidden: Requires 'admin' role." }
*/

// =============================================================================
// BEHIND THE SCENES: MOUNTING ON ROUTES
// =============================================================================
/*
  In real Express:

  // Protect an entire router:
  taskRouter.use(requireAuth);
  taskRouter.get("/", getAllTasks);
  taskRouter.post("/", createTask);

  // Protect a specific route with multiple middlewares:
  taskRouter.delete("/:id", requireAuth, requireRole("admin"), deleteTask);
*/