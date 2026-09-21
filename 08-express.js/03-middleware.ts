/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Express Middleware & next()
  ==============================================================================

  1. WHAT IS MIDDLEWARE?
     Middleware functions are functions that have access to the request object (`req`),
     the response object (`res`), and the `next` middleware function in the application’s
     request-response cycle.

  2. REAL-LIFE ANALOGY:
     Airport Security Checkpoints:
     - Checkpoint 1 (ID & Boarding Pass Check): If valid, officer says "Next!" (`next()`).
     - Checkpoint 2 (Metal Detector & Luggage Scan): If clear, officer says "Next!" (`next()`).
     - If security finds prohibited goods: They halt you immediately and turn you away
       (`res.status(403).json(...)`). You NEVER reach the departure gate!

  3. JARGON BUSTER:
     - `next()`: Passes control to the next middleware in line.
     - Hanging Request: Forgetting to call `next()` AND forgetting to send `res.send()`
       causes the browser/client to hang forever waiting for a response!
     - Middleware Types:
       - Application-level: Runs for all routes (`app.use(fn)`).
       - Router-level: Runs for specific router (`router.use(fn)`).
       - Route-level: Runs for a single endpoint (`app.get('/admin', guardFn, handler)`).
       - Error-handling: Has 4 parameters `(err, req, res, next)`.
*/

// =============================================================================
// BAD PRACTICE: FORGETTING next() OR res.send()
// =============================================================================
/*
  // BUG: The request hangs forever!
  app.use((req, res, next) => {
    console.log("Logged request!");
    // Forgot next()!
    // Forgot res.send()!
    // Result: Client timeout after 60 seconds!
  });
*/

// =============================================================================
// GOOD PRACTICE: COMPOSABLE MIDDLEWARE PIPELINE
// =============================================================================

interface RequestContext {
  id: string;
  method: string;
  url: string;
  startTime: number;
  userRole?: string;
}

type MiddlewareHandler = (ctx: RequestContext, next: () => void) => void;

// 1. Request ID & Timing Middleware
const requestTimerMiddleware: MiddlewareHandler = (ctx, next) => {
  ctx.startTime = Date.now();
  ctx.id = `req_${Math.floor(Math.random() * 10000)}`;
  console.log(`[Timer Middleware]: Assigned ID ${ctx.id}`);
  next(); // Always call next!
};

// 2. Logging Middleware
const requestLoggerMiddleware: MiddlewareHandler = (ctx, next) => {
  console.log(`[Logger Middleware]: ${ctx.method} ${ctx.url} (ID: ${ctx.id})`);
  next();
};

// 3. Role-Based Guard Middleware
const adminOnlyMiddleware: MiddlewareHandler = (ctx, next) => {
  if (ctx.userRole !== "admin") {
    console.log(`[Guard Middleware]: Access DENIED for role '${ctx.userRole ?? "guest"}'! Halting.`);
    return; // Don't call next()! We halted the chain.
  }
  console.log(`[Guard Middleware]: Access GRANTED to Admin.`);
  next();
};

// ── EXECUTING THE CHAIN ──────────────────────────────────────────────────────
function executePipeline(chain: MiddlewareHandler[], context: RequestContext): void {
  let index = 0;

  const next = () => {
    if (index < chain.length) {
      const fn = chain[index++];
      fn(context, next);
    } else {
      console.log(`[Final Destination]: Route Handler executed successfully!`);
    }
  };

  next();
}

console.log("=== Scenario A: Admin User (Passes All Middlewares) ===");
const adminContext: RequestContext = {
  id: "",
  method: "GET",
  url: "/api/admin/metrics",
  startTime: 0,
  userRole: "admin",
};
executePipeline([requestTimerMiddleware, requestLoggerMiddleware, adminOnlyMiddleware], adminContext);

console.log("\n=== Scenario B: Member User (Blocked by Guard Middleware) ===");
const memberContext: RequestContext = {
  id: "",
  method: "GET",
  url: "/api/admin/metrics",
  startTime: 0,
  userRole: "member",
};
executePipeline([requestTimerMiddleware, requestLoggerMiddleware, adminOnlyMiddleware], memberContext);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === Scenario A: Admin User (Passes All Middlewares) ===
  [Timer Middleware]: Assigned ID req_<random>
  [Logger Middleware]: GET /api/admin/metrics (ID: req_<random>)
  [Guard Middleware]: Access GRANTED to Admin.
  [Final Destination]: Route Handler executed successfully!

  === Scenario B: Member User (Blocked by Guard Middleware) ===
  [Timer Middleware]: Assigned ID req_<random>
  [Logger Middleware]: GET /api/admin/metrics (ID: req_<random>)
  [Guard Middleware]: Access DENIED for role 'member'! Halting.
*/

// =============================================================================
// BEHIND THE SCENES
// =============================================================================
/*
  ORDER OF EXECUTION MATTERS:
  Middleware executes in the EXACT order you write `app.use()`.
  - Put JSON parser (`express.json()`) near the top so request bodies are parsed early.
  - Put authentication before routes that need protection.
  - Put 404 catch-alls and global error handlers at the very bottom!
*/