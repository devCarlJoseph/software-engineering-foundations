/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Express Error Handling Middleware
  ==============================================================================

  1. WHAT IS ERROR HANDLING MIDDLEWARE?
     Express error-handling middleware is a special 4-argument function:
     `(err, req, res, next)`.
     Express knows it is an error handler ONLY because it takes exactly 4 arguments!
     It catches synchronous and asynchronous exceptions, prevents server crashes,
     and returns uniform error JSON to the client.

  2. REAL-LIFE ANALOGY:
     The Safety Net Under Trapeze Artists:
     - The performers (route handlers) try their stunts.
     - If an artist slips (throws an exception or calls `next(err)`), they don't
       crash into the ground (server doesn't exit).
     - They land safely in the safety net (Error Middleware), which cleans up
       and handles the incident smoothly.

  3. JARGON BUSTER:
     - 4-Parameter Signature: `(err, req, res, next)` is mandatory for Express to
       recognize an error middleware.
     - `next(error)`: Calling `next()` with ANY argument tells Express to skip ALL
       remaining regular route middlewares and jump straight to the error handler!
     - Custom AppError: A subclass of `Error` storing an HTTP status code (e.g. 404, 400).
*/

// =============================================================================
// BAD PRACTICE: UNCAUGHT PROMISE REJECTIONS CRASHING THE SERVER
// =============================================================================
/*
  // DANGER: In older Express versions, an uncaught async error terminates the Node process!
  app.get("/data", async (req, res) => {
    const user = await db.findUser(); // If DB fails, whole Node server crashes!
    res.json(user);
  });
*/

// =============================================================================
// GOOD PRACTICE: CUSTOM APPERROR & CENTRALIZED ERROR MIDDLEWARE
// =============================================================================

// 1. Custom operational error class
class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// 2. Centralized error response formatter (simulating (err, req, res, next))
function globalErrorHandler(
  err: Error | AppError,
  reqPath: string,
  isProduction: boolean
): { statusCode: number; payload: Record<string, unknown> } {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || "Something went wrong on our server.";

  // Log error stack internally for developers
  console.error(`[GlobalErrorHandler Caught Error on ${reqPath}]:`, err.message);

  // Send safe sanitized response to client (hide raw stack traces in production!)
  return {
    statusCode,
    payload: {
      success: false,
      status: statusCode >= 500 ? "error" : "fail",
      message,
      ...(isProduction ? {} : { stack: err.stack }), // Only show stack trace in dev
    },
  };
}

// 3. Simulating async controller with next(err)
function simulateControllerAction(action: "ok" | "not_found" | "crash") {
  try {
    if (action === "not_found") {
      throw new AppError("Task with ID #404 does not exist.", 404);
    }
    if (action === "crash") {
      throw new Error("Database connection pool exhausted unexpectedly!");
    }
    console.log("[Controller]: Action completed successfully!");
  } catch (err) {
    // In Express: return next(err);
    const handled = globalErrorHandler(err as Error, "/api/tasks", false);
    console.log(`[HTTP Response ${handled.statusCode}]:`, handled.payload);
  }
}

console.log("=== Scenario 1: Operational 404 AppError ===");
simulateControllerAction("not_found");

console.log("\n=== Scenario 2: Unhandled 500 Crash ===");
simulateControllerAction("crash");

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === Scenario 1: Operational 404 AppError ===
  [GlobalErrorHandler Caught Error on /api/tasks]: Task with ID #404 does not exist.
  [HTTP Response 404]: {
    success: false,
    status: 'fail',
    message: 'Task with ID #404 does not exist.',
    stack: '<stack trace>'
  }

  === Scenario 2: Unhandled 500 Crash ===
  [GlobalErrorHandler Caught Error on /api/tasks]: Database connection pool exhausted unexpectedly!
  [HTTP Response 500]: {
    success: false,
    status: 'error',
    message: 'Database connection pool exhausted unexpectedly!',
    stack: '<stack trace>'
  }
*/

// =============================================================================
// BEHIND THE SCENES: HOW TO WIRE THIS IN EXPRESS
// =============================================================================
/*
  At the VERY BOTTOM of your `app.ts` (after all routes):

  // 1. Catch unhandled routes (404)
  app.all("*", (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
  });

  // 2. Global error handling middleware (must have 4 arguments!)
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      message: err.message,
    });
  });
*/