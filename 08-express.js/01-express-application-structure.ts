/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Express.js Application Structure
  ==============================================================================

  1. WHAT IS EXPRESS.JS?
     Express is a minimal, fast, and unopinionated web framework for Node.js.
     It provides a thin layer of fundamental web application features (routing,
     middleware pipeline, templating, request/response utilities) on top of
     Node's native `http` module.

  2. REAL-LIFE ANALOGY:
     An Assembly Line Factory:
     - The Raw Material: An incoming HTTP request from a client.
     - Conveyor Belt (Middleware Pipeline): The request passes station to station.
       Station 1 logs it, Station 2 parses JSON, Station 3 validates permissions.
     - The Shipping Bay (Route Handler): The final station packages the finished
       response and sends it back to the customer.

  3. JARGON BUSTER:
     - `express()`: The top-level factory function that creates an Express application instance.
     - Middleware: A function with access to `(req, res, next)` that runs in the pipeline.
     - Route Handler: A function that handles requests to a specific path and HTTP verb.
     - Bootstrapping: The startup sequence of configuring middleware, mounting routes,
       and starting the listening server.
*/

// =============================================================================
// RECOMMENDED FOLDER STRUCTURE FOR EXPRESS PROJECTS
// =============================================================================
/*
  task-management-api/
  ├── src/
  │   ├── config/             <- Environment variables & DB connection setup
  │   ├── routes/             <- Express routers (task.routes.ts, user.routes.ts)
  │   ├── controllers/        <- Functions processing requests and sending responses
  │   ├── services/           <- Core business calculations and database logic
  │   ├── middlewares/        <- Auth, logging, validation, error handlers
  │   ├── app.ts              <- Express app instance (middleware + routes mounted)
  │   └── server.ts           <- Port listener (app.listen) separating app from server
  ├── package.json
  └── tsconfig.json
*/

// =============================================================================
// RUNNABLE EXPRESS STRUCTURE PATTERN
// =============================================================================

// Standard Express interfaces simulation for standalone execution
interface MockRequest {
  method: string;
  url: string;
}

interface MockResponse {
  statusCode: number;
  headers: Record<string, string>;
  status(code: number): MockResponse;
  json(body: unknown): void;
  send(body: string): void;
}

type NextFunction = (err?: unknown) => void;
type MiddlewareFn = (req: MockRequest, res: MockResponse, next: NextFunction) => void;

class ExpressAppSimulation {
  private middlewares: MiddlewareFn[] = [];
  private routes: Map<string, (req: MockRequest, res: MockResponse) => void> = new Map();

  // Mounting global middleware: app.use()
  public use(fn: MiddlewareFn): void {
    this.middlewares.push(fn);
  }

  // Registering a GET route: app.get()
  public get(path: string, handler: (req: MockRequest, res: MockResponse) => void): void {
    this.routes.set(`GET ${path}`, handler);
  }

  // Simulating an incoming HTTP request through the pipeline
  public handleRequest(req: MockRequest, res: MockResponse): void {
    let index = 0;

    const next: NextFunction = (err) => {
      if (err) {
        res.status(500).json({ error: "Internal Pipeline Error" });
        return;
      }

      if (index < this.middlewares.length) {
        const currentMiddleware = this.middlewares[index++];
        currentMiddleware(req, res, next);
      } else {
        // Route handler execution
        const routeKey = `${req.method} ${req.url}`;
        const handler = this.routes.get(routeKey);
        if (handler) {
          handler(req, res);
        } else {
          res.status(404).json({ error: `Cannot ${req.method} ${req.url}` });
        }
      }
    };

    next();
  }
}

// ── BOOTSTRAPPING THE APP ────────────────────────────────────────────────────
const app = new ExpressAppSimulation();

// 1. Global Middleware: Logger
app.use((req, _res, next) => {
  console.log(`[Middleware: Logger] ${req.method} ${req.url} at ${new Date().toISOString()}`);
  next();
});

// 2. Global Middleware: Security Header simulation
app.use((_req, res, next) => {
  res.headers["X-Content-Type-Options"] = "nosniff";
  next();
});

// 3. Route Handlers
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "healthy", uptime: process.uptime() });
});

app.get("/api/info", (_req, res) => {
  res.status(200).json({ name: "Task API", version: "1.0.0" });
});

// ── TEST RUN OF THE PIPELINE ─────────────────────────────────────────────────
function createMockRes(): MockResponse {
  const res: MockResponse = {
    statusCode: 200,
    headers: {},
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(body: unknown) {
      console.log(`[Response ${this.statusCode}] JSON:`, body);
    },
    send(body: string) {
      console.log(`[Response ${this.statusCode}] Text:`, body);
    },
  };
  return res;
}

console.log("=== Testing Express Pipeline ===");
app.handleRequest({ method: "GET", url: "/health" }, createMockRes());
console.log("\n=== Testing Unknown Route ===");
app.handleRequest({ method: "GET", url: "/unknown" }, createMockRes());

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === Testing Express Pipeline ===
  [Middleware: Logger] GET /health at <ISO Timestamp>
  [Response 200] JSON: { status: 'healthy', uptime: <number> }

  === Testing Unknown Route ===
  [Middleware: Logger] GET /unknown at <ISO Timestamp>
  [Response 404] JSON: { error: 'Cannot GET /unknown' }
*/

// =============================================================================
// BEHIND THE SCENES: SEPARATION OF APP AND SERVER
// =============================================================================
/*
  BEST PRACTICE IN REAL PROJECTS:
  - `src/app.ts`: Creates `const app = express()`, attaches middleware & routes,
    and exports `app`. It does NOT call `.listen()`.
  - `src/server.ts`: Imports `app` and calls `app.listen(PORT, ...)`.

  Why separate them?
  Because during unit testing with Supertest (`npm test`), Supertest tests `app`
  directly in memory WITHOUT binding to a real network port!
*/