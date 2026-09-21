/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Express Routing & express.Router()
  ==============================================================================

  1. WHAT IS ROUTING?
     Routing defines how an application responds to a client request for a
     particular endpoint (a URI/path) and a specific HTTP method (GET, POST, etc.).
     As apps grow, `express.Router()` allows breaking routes into modular files.

  2. REAL-LIFE ANALOGY:
     Highway Signposts & Exit Ramps:
     - Main Highway: The main Express app (`/api`).
     - Exit 4 (Users): Directs to the `userRouter` for `/api/users`.
     - Exit 5 (Tasks): Directs to the `taskRouter` for `/api/tasks`.
     Each exit ramp manages its own local streets independently.

  3. JARGON BUSTER:
     - HTTP Verbs:
       - `GET`: Retrieve resource(s).
       - `POST`: Create a new resource.
       - `PUT`: Replace an entire resource.
       - `PATCH`: Partially update a resource.
       - `DELETE`: Remove a resource.
     - `express.Router()`: An isolated instance of middleware and routes (a "mini-app").
     - Route Prefix: The base URL under which a router is mounted (e.g., `app.use('/tasks', taskRouter)`).
*/

// =============================================================================
// BAD PRACTICE: DUMPING ALL ROUTES INTO ONE GIANT FILE
// =============================================================================
/*
  // DANGER: In a real project with 80+ endpoints, putting every route directly on `app`
  // in a single 2,000-line server.ts file creates merge conflicts and chaos!
  app.get("/users", ...);
  app.post("/users", ...);
  app.get("/tasks", ...);
  app.post("/tasks", ...);
  app.get("/orders", ...);
*/

// =============================================================================
// GOOD PRACTICE: MODULAR ROUTERS WITH express.Router()
// =============================================================================

type RouteHandler = (req: { method: string; path: string }, res: { send: (msg: string) => void }) => void;

// Modular Router class simulating express.Router()
class ExpressRouter {
  public routes: Map<string, RouteHandler> = new Map();

  public get(path: string, handler: RouteHandler): void {
    this.routes.set(`GET ${path}`, handler);
  }

  public post(path: string, handler: RouteHandler): void {
    this.routes.set(`POST ${path}`, handler);
  }

  public delete(path: string, handler: RouteHandler): void {
    this.routes.set(`DELETE ${path}`, handler);
  }
}

// ── MODULE: task.router.ts ───────────────────────────────────────────────────
const taskRouter = new ExpressRouter();

taskRouter.get("/", (_req, res) => {
  res.send("LIST all tasks from TaskRouter");
});

taskRouter.post("/", (_req, res) => {
  res.send("CREATE new task from TaskRouter");
});

taskRouter.delete("/:id", (_req, res) => {
  res.send("DELETE task from TaskRouter");
});

// ── MOUNTING ON MAIN APP ─────────────────────────────────────────────────────
class MiniApp {
  private routeMap: Map<string, RouteHandler> = new Map();

  // Mounting router with a prefix: app.use("/api/tasks", taskRouter)
  public mount(prefix: string, router: ExpressRouter): void {
    router.routes.forEach((handler, routeKey) => {
      const [verb, subPath] = routeKey.split(" ");
      const fullPath = `${verb} ${prefix}${subPath === "/" ? "" : subPath}`;
      this.routeMap.set(fullPath, handler);
    });
  }

  public dispatch(method: string, path: string): void {
    const key = `${method} ${path}`;
    const handler = this.routeMap.get(key);
    console.log(`--> Dispatching: ${key}`);
    if (handler) {
      handler({ method, path }, { send: (msg) => console.log(`   Response: "${msg}"`) });
    } else {
      console.log(`   Response: 404 Route Not Found`);
    }
  }
}

const mainApp = new MiniApp();

// Mount modular router under prefix:
mainApp.mount("/api/tasks", taskRouter);

console.log("=== Testing Modular Router Dispatch ===");
mainApp.dispatch("GET", "/api/tasks");
mainApp.dispatch("POST", "/api/tasks");
mainApp.dispatch("DELETE", "/api/tasks/:id");
mainApp.dispatch("GET", "/api/users"); // Not registered

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === Testing Modular Router Dispatch ===
  --> Dispatching: GET /api/tasks
     Response: "LIST all tasks from TaskRouter"
  --> Dispatching: POST /api/tasks
     Response: "CREATE new task from TaskRouter"
  --> Dispatching: DELETE /api/tasks/:id
     Response: "DELETE task from TaskRouter"
  --> Dispatching: GET /api/users
     Response: 404 Route Not Found
*/

// =============================================================================
// BEHIND THE SCENES: REAL EXPRESS SYNTAX CHEATSHEET
// =============================================================================
/*
  In a real project:

  // src/routes/task.routes.ts:
  import { Router } from "express";
  export const taskRouter = Router();

  taskRouter.get("/", getAllTasks);
  taskRouter.post("/", createTask);

  // src/app.ts:
  import express from "express";
  import { taskRouter } from "./routes/task.routes";

  const app = express();
  app.use("/api/v1/tasks", taskRouter); // All routes inside taskRouter now begin with /api/v1/tasks!
*/