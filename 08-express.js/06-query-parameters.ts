/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Express Query Parameters (`req.query`)
  ==============================================================================

  1. WHAT ARE QUERY PARAMETERS?
     Query parameters are optional key-value pairs appended after a question mark (`?`)
     at the end of a URL. Multiple query params are separated by ampersands (`&`).
     Express automatically parses them into the `req.query` object.

  2. REAL-LIFE ANALOGY:
     Shopping Filters on an E-Commerce Site:
     - You visit the Shoes page: `/shoes`
     - You filter: Size 10, Color Red, Sorted by Price:
       `/shoes?size=10&color=red&sort=price_asc`
     The page stays the Shoes page, but query parameters filter and paginate the results!

  3. JARGON BUSTER:
     - Route Param vs Query Param:
       - Route Param (`/tasks/:id`): Identifies a SPECIFIC unique resource.
       - Query Param (`/tasks?status=completed&page=2`): FILTERS, SORTS, or PAGINATES resources.
     - `req.query`: The parsed object containing query key-values.
     - Sanitization: Cleaning query inputs to prevent malicious injection or invalid types.
*/

// =============================================================================
// BAD PRACTICE: TRUSTING QUERY PARAMS BLINDLY FOR PAGINATION
// =============================================================================
/*
  // DANGER: If a user sends ?limit=-50 or ?limit=9999999,
  // your database could crash or freeze trying to fetch millions of rows!
  const limit = req.query.limit;
  db.query(`SELECT * FROM tasks LIMIT ${limit}`); // CRASH or SQL Injection!
*/

// =============================================================================
// GOOD PRACTICE: TYPE-SAFE QUERY PARSING WITH DEFAULTS AND BOUNDS
// =============================================================================

interface TaskQueryFilters {
  status?: "completed" | "pending";
  search?: string;
  page: number;
  limit: number;
}

const mockTasks = [
  { id: 1, title: "Review Node.js runtime", status: "completed" },
  { id: 2, title: "Practice Express routes", status: "completed" },
  { id: 3, title: "Set up PostgreSQL database", status: "pending" },
  { id: 4, title: "Implement JWT auth", status: "pending" },
];

function parseTaskQueryParams(rawQuery: Record<string, string | undefined>): TaskQueryFilters {
  // 1. Safe pagination with fallbacks and maximum safety caps
  const parsedPage = parseInt(rawQuery.page ?? "1", 10);
  const page = !isNaN(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const parsedLimit = parseInt(rawQuery.limit ?? "10", 10);
  // Cap maximum limit at 50 to protect database:
  const limit = !isNaN(parsedLimit) && parsedLimit > 0 ? Math.min(parsedLimit, 50) : 10;

  // 2. Validate status filter
  let status: "completed" | "pending" | undefined;
  if (rawQuery.status === "completed" || rawQuery.status === "pending") {
    status = rawQuery.status;
  }

  const search = rawQuery.search?.trim();

  return { status, search, page, limit };
}

// Simulating the controller handler
function listTasksController(rawQuery: Record<string, string | undefined>) {
  const filters = parseTaskQueryParams(rawQuery);
  console.log("[Parsed Safe Filters]:", filters);

  let filtered = mockTasks;

  if (filters.status) {
    filtered = filtered.filter((t) => t.status === filters.status);
  }

  if (filters.search) {
    filtered = filtered.filter((t) => t.title.toLowerCase().includes(filters.search!.toLowerCase()));
  }

  console.log(`[Results Returned (${filtered.length} found)]:`, filtered);
}

console.log("=== Scenario 1: Filtering by status = 'completed' ===");
listTasksController({ status: "completed", limit: "5" });

console.log("\n=== Scenario 2: Keyword search with excessive limit (capped at 50) ===");
listTasksController({ search: "database", limit: "999" });

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === Scenario 1: Filtering by status = 'completed' ===
  [Parsed Safe Filters]: { status: 'completed', search: undefined, page: 1, limit: 5 }
  [Results Returned (2 found)]: [
    { id: 1, title: 'Review Node.js runtime', status: 'completed' },
    { id: 2, title: 'Practice Express routes', status: 'completed' }
  ]

  === Scenario 2: Keyword search with excessive limit (capped at 50) ===
  [Parsed Safe Filters]: { status: undefined, search: 'database', page: 1, limit: 50 }
  [Results Returned (1 found)]: [
    { id: 3, title: 'Set up PostgreSQL database', status: 'pending' }
  ]
*/

// =============================================================================
// BEHIND THE SCENES: URL STRUCTURE
// =============================================================================
/*
  https://api.dev.com/api/v1/tasks?status=pending&limit=20&page=1
  └─────── Path Segment ────────┘ └─────── Query String ────────┘
                                    key=val   &   key=val  & ...

  Express translates this into:
  req.query = {
    status: "pending",
    limit: "20",
    page: "1"
  }
*/