/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: REST API Endpoints & URI Design
  ==============================================================================

  1. WHAT ARE ENDPOINTS?
     An endpoint is the specific URI (Uniform Resource Identifier) where an API
     can access the resources they need. Consistent, intuitive URI design makes
     an API self-descriptive and predictable for developers.

  2. REAL-LIFE ANALOGY:
     A Clean Street Address:
     - Clean: "123 Main Street, Apt 4"
     - Messy: "The blue door behind the tree next to John's old garage"
     Standard endpoint conventions allow any developer to guess your URLs
     without even opening the documentation!

  3. JARGON BUSTER:
     - API Versioning: Prefixing URIs with versions (e.g. `/api/v1/tasks`) so future
       breaking changes don't crash existing client mobile apps or integrations.
     - Plural Nouns: Using `/tasks` instead of `/task`.
     - Kebab-Case: Using hyphens for multi-word paths (`/api/v1/user-profiles`),
       never camelCase or snake_case in URIs.
     - Trailing Slashes: Standardizing whether `/tasks` and `/tasks/` are treated identically.
*/

// =============================================================================
// BAD PRACTICE: INCONSISTENT, MESSY ENDPOINT DESIGNS
// =============================================================================
/*
  // POOR DESIGN CHOICES:
  /api/v1/get_all_tasks        <- Snake case + verb!
  /api/v1/task/create          <- Singular + verb!
  /api/v1/UserProfiles         <- PascalCase!
  /api/v1/deleteTask?id=12     <- Query param for ID deletion!
*/

// =============================================================================
// GOOD PRACTICE: CLEAN, STANDARDIZED ENDPOINT MATRIX
// =============================================================================

interface EndpointSpec {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  description: string;
  expectedStatus: number;
}

// Canonical RESTful endpoint table for a Task Management Resource
const taskEndpointsMatrix: EndpointSpec[] = [
  {
    method: "GET",
    path: "/api/v1/tasks",
    description: "List all tasks (supports pagination, filter, search)",
    expectedStatus: 200,
  },
  {
    method: "POST",
    path: "/api/v1/tasks",
    description: "Create a new task in the collection",
    expectedStatus: 201,
  },
  {
    method: "GET",
    path: "/api/v1/tasks/:id",
    description: "Retrieve a single specific task by identifier",
    expectedStatus: 200,
  },
  {
    method: "PUT",
    path: "/api/v1/tasks/:id",
    description: "Completely replace all properties of a task",
    expectedStatus: 200,
  },
  {
    method: "PATCH",
    path: "/api/v1/tasks/:id",
    description: "Partially update specific fields of a task",
    expectedStatus: 200,
  },
  {
    method: "DELETE",
    path: "/api/v1/tasks/:id",
    description: "Permanently remove a task",
    expectedStatus: 204,
  },
  // Sub-resource endpoints:
  {
    method: "GET",
    path: "/api/v1/tasks/:id/comments",
    description: "List all comments attached to this specific task",
    expectedStatus: 200,
  },
  {
    method: "POST",
    path: "/api/v1/tasks/:id/comments",
    description: "Post a new comment under this specific task",
    expectedStatus: 201,
  },
];

console.log("=== Standard RESTful Endpoint Blueprint ===");
taskEndpointsMatrix.forEach((ep) => {
  const methodPadded = ep.method.padEnd(7, " ");
  const pathPadded = ep.path.padEnd(28, " ");
  console.log(`${methodPadded} ${pathPadded} -> HTTP ${ep.expectedStatus} | ${ep.description}`);
});

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === Standard RESTful Endpoint Blueprint ===
  GET     /api/v1/tasks                -> HTTP 200 | List all tasks (supports pagination, filter, search)
  POST    /api/v1/tasks                -> HTTP 201 | Create a new task in the collection
  GET     /api/v1/tasks/:id            -> HTTP 200 | Retrieve a single specific task by identifier
  PUT     /api/v1/tasks/:id            -> HTTP 200 | Completely replace all properties of a task
  PATCH   /api/v1/tasks/:id            -> HTTP 200 | Partially update specific fields of a task
  DELETE  /api/v1/tasks/:id            -> HTTP 204 | Permanently remove a task
  GET     /api/v1/tasks/:id/comments   -> HTTP 200 | List all comments attached to this specific task
  POST    /api/v1/tasks/:id/comments   -> HTTP 201 | Post a new comment under this specific task
*/

// =============================================================================
// BEHIND THE SCENES: URI DESIGN RULES SUMMARY
// =============================================================================
/*
  1. Use lower-case letters only.
  2. Use hyphens (-) to separate words, NEVER underscores (_).
  3. NEVER use verbs in URIs.
  4. Always include API versioning at root: `/api/v1/`.
  5. Do NOT include file extensions (no `/tasks.json` or `/tasks.xml`).
     Use the `Accept: application/json` header instead!
*/