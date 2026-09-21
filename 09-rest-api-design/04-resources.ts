/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: REST Resources & Resource Modeling
  ==============================================================================

  1. WHAT IS A RESOURCE?
     In REST, any information or concept that can be named is a Resource:
     a user, a task, an image, a document, an order, or a collection of other resources.
     Resources are always NOUNS (never verbs) and are represented typically via JSON.

  2. REAL-LIFE ANALOGY:
     Nouns in a Filing System:
     - Good filing label: "Employees", "Contracts", "Invoices" (Nouns/Resources).
     - Bad filing label: "GetEmployeeData", "CreateInvoiceAction" (Actions/Verbs).
     The HTTP method provides the verb, so the URI only needs to name the noun!

  3. JARGON BUSTER:
     - Resource Archetypes:
       1. Document: A single resource instance (e.g., `/users/10`).
       2. Collection: A server-managed directory of resources (e.g., `/users`).
       3. Store: A client-managed resource repository.
       4. Controller: An executable function when an action doesn't map cleanly to CRUD
          (e.g., `/tasks/10/archive` or `/checkout`).
     - Sub-Resource: A child resource owned by a parent (e.g., `/tasks/10/comments`).
*/

// =============================================================================
// BAD PRACTICE: USING VERBS IN RESOURCE IDENTIFIERS
// =============================================================================
/*
  // ANTI-PATTERNS (RPC-Style disguised as REST):
  GET  /api/getAllUsers
  POST /api/createNewTask
  POST /api/deleteUserById?id=5
  POST /api/updateTaskStatus
*/

// =============================================================================
// GOOD PRACTICE: CLEAN NOUN-BASED RESOURCE MODELING
// =============================================================================

// Parent Resource
interface User {
  id: string;
  username: string;
}

// Child Sub-Resource
interface Comment {
  id: string;
  taskId: string;
  authorId: string;
  content: string;
}

// RESTful URI Resource Router Simulation
class RestResourceDirectory {
  // Collection: /users
  // Document:   /users/:id
  // Sub-Collection: /tasks/:taskId/comments

  public static resolveRoute(method: string, uri: string): string {
    // Pattern 1: Collection
    if (method === "GET" && uri === "/api/v1/tasks") {
      return "Fetching collection of tasks: [GET /api/v1/tasks]";
    }

    // Pattern 2: Single Document
    if (method === "GET" && /^\/api\/v1\/tasks\/[a-zA-Z0-9_-]+$/.test(uri)) {
      return `Fetching single task document: [GET ${uri}]`;
    }

    // Pattern 3: Sub-Resource Collection (Comments belonging to a task)
    if (method === "GET" && /^\/api\/v1\/tasks\/[a-zA-Z0-9_-]+\/comments$/.test(uri)) {
      return `Fetching nested sub-resource comments: [GET ${uri}]`;
    }

    // Pattern 4: Creation in collection
    if (method === "POST" && uri === "/api/v1/tasks") {
      return "Creating new task resource in collection: [POST /api/v1/tasks]";
    }

    return "404 Resource Not Found";
  }
}

console.log("=== RESTful Resource Resolution Demo ===");
console.log(RestResourceDirectory.resolveRoute("GET", "/api/v1/tasks"));
console.log(RestResourceDirectory.resolveRoute("POST", "/api/v1/tasks"));
console.log(RestResourceDirectory.resolveRoute("GET", "/api/v1/tasks/task_45"));
console.log(RestResourceDirectory.resolveRoute("GET", "/api/v1/tasks/task_45/comments"));

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === RESTful Resource Resolution Demo ===
  Fetching collection of tasks: [GET /api/v1/tasks]
  Creating new task resource in collection: [POST /api/v1/tasks]
  Fetching single task document: [GET /api/v1/tasks/task_45]
  Fetching nested sub-resource comments: [GET /api/v1/tasks/task_45/comments]
*/

// =============================================================================
// BEHIND THE SCENES: GOLDEN RULES OF RESOURCE MODELING
// =============================================================================
/*
  1. Always use plural nouns for collections:
     /tasks (NOT /task)
     /users (NOT /user)
  2. Maintain shallow nesting (maximum 2 levels deep):
     GOOD:  /tasks/12/comments
     BAD:   /departments/5/teams/3/projects/8/tasks/12/comments (too deep!)
     FIX:   Direct sub-resource access: /tasks/12/comments
*/