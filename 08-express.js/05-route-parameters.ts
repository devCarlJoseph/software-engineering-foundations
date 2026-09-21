/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Express Route Parameters (`req.params`)
  ==============================================================================

  1. WHAT ARE ROUTE PARAMETERS?
     Route parameters are named URL segments used to capture specific values
     specified at their position in the URL.
     The captured values are populated into the `req.params` object.

  2. REAL-LIFE ANALOGY:
     Passport Number in an Airport Line:
     - URL Template: `/passports/:passportId`
     - When you visit: `/passports/P88392A`
     - Express automatically captures: `passportId = "P88392A"`.
     Every traveler uses the exact same gate, but their passport identifier changes.

  3. JARGON BUSTER:
     - `:paramName`: The colon prefix denotes a route parameter placeholder.
     - `req.params`: JavaScript object containing all matched route parameters as STRINGS.
     - Type Coercion: Route params are ALWAYS strings! If you need a numeric ID,
       you must parse it manually (`parseInt(req.params.id, 10)`).
*/

// =============================================================================
// BAD PRACTICE: FORGETTING THAT req.params VALUES ARE ALWAYS STRINGS
// =============================================================================
/*
  app.get("/tasks/:id", (req, res) => {
    const taskId = req.params.id; // "10" is a string!

    // Strict equality bug:
    const task = tasks.find(t => t.id === taskId); // FAILS if t.id is the number 10!
    // 10 === "10" is FALSE in JavaScript/TypeScript!
  });
*/

// =============================================================================
// GOOD PRACTICE: PARSING AND VALIDATING ROUTE PARAMETERS
// =============================================================================

interface TaskItem {
  id: number;
  title: string;
  completed: boolean;
}

const taskDatabase: TaskItem[] = [
  { id: 1, title: "Learn Node.js Runtime", completed: true },
  { id: 2, title: "Master Express Routing", completed: true },
  { id: 3, title: "Build Task Management API", completed: false },
];

// Controller for route: GET /api/tasks/:id
function getTaskByIdHandler(
  params: { id?: string },
  res: { status: (code: number) => { json: (data: unknown) => void } }
): void {
  const rawId = params.id;

  // Step 1: Validate parameter presence
  if (!rawId) {
    return res.status(400).json({ error: "Route parameter :id is required." });
  }

  // Step 2: Parse and type-check numeric ID
  const numericId = parseInt(rawId, 10);
  if (isNaN(numericId) || numericId <= 0) {
    return res.status(400).json({ error: `Invalid task ID: "${rawId}". Must be a positive integer.` });
  }

  // Step 3: Find resource
  const task = taskDatabase.find((t) => t.id === numericId);
  if (!task) {
    return res.status(404).json({ error: `Task #${numericId} not found.` });
  }

  // Step 4: Return found resource
  return res.status(200).json({ success: true, data: task });
}

// Helper to print responses
const mockSender = {
  status: (code: number) => ({
    json: (data: unknown) => console.log(`[Status ${code}]:`, data),
  }),
};

console.log("=== Scenario 1: Valid Numeric Param ===");
getTaskByIdHandler({ id: "2" }, mockSender);

console.log("\n=== Scenario 2: Non-existent ID ===");
getTaskByIdHandler({ id: "99" }, mockSender);

console.log("\n=== Scenario 3: Non-numeric / Invalid Param ===");
getTaskByIdHandler({ id: "abc" }, mockSender);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === Scenario 1: Valid Numeric Param ===
  [Status 200]: {
    success: true,
    data: { id: 2, title: 'Master Express Routing', completed: true }
  }

  === Scenario 2: Non-existent ID ===
  [Status 404]: { error: 'Task #99 not found.' }

  === Scenario 3: Non-numeric / Invalid Param ===
  [Status 400]: { error: 'Invalid task ID: "abc". Must be a positive integer.' }
*/

// =============================================================================
// BEHIND THE SCENES: MULTIPLE ROUTE PARAMETERS
// =============================================================================
/*
  You can define multiple parameters in a single path:

  Route:
  app.get("/users/:userId/tasks/:taskId", (req, res) => {
    console.log(req.params.userId); // e.g. "45"
    console.log(req.params.taskId); // e.g. "102"
  });

  URL: /users/45/tasks/102
  Resulting req.params: { userId: "45", taskId: "102" }
*/