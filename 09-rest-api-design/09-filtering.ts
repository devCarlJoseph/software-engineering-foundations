/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: REST API Filtering Patterns
  ==============================================================================

  1. WHAT IS FILTERING?
     Allowing clients to request only resources that match specific criteria
     using query parameters. In REST, filtering should be expressive, predictable,
     and secure against denial of service or injection attacks.

  2. REAL-LIFE ANALOGY:
     Filtering Products at a Hardware Store:
     - You ask the clerk: "Show me only screws that are made of brass and 2 inches long."
     - URL representation: `/api/v1/screws?material=brass&length=2in`

  3. JARGON BUSTER:
     - Exact Match Filter: `?status=completed`
     - Range Filter: `?dueDate[gte]=2026-09-01&dueDate[lte]=2026-09-30`
     - Set Inclusion Filter: `?priority=high,urgent` (multi-value in-list)
     - Whitelist Validation: Only allowing filtering on indexed, safe columns.
*/

// =============================================================================
// BAD PRACTICE: ALLOWING ARBITRARY UNINDEXED FILTERS
// =============================================================================
/*
  // DANGER: Passing raw query params straight into database query without validation!
  // Allowing users to filter on non-indexed text fields causes full table scans!
*/

// =============================================================================
// GOOD PRACTICE: TYPE-SAFE WHITELISTED FILTERING ENGINE
// =============================================================================

interface TaskRecord {
  id: number;
  title: string;
  status: "pending" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  assignedUserId: number;
}

const mockTaskDatabase: TaskRecord[] = [
  { id: 1, title: "Configure Express app", status: "completed", priority: "high", assignedUserId: 10 },
  { id: 2, title: "Implement Auth token", status: "in_progress", priority: "high", assignedUserId: 10 },
  { id: 3, title: "Design database schemas", status: "completed", priority: "medium", assignedUserId: 20 },
  { id: 4, title: "Write unit tests", status: "pending", priority: "low", assignedUserId: 10 },
];

// Whitelist of fields clients are allowed to filter by:
const ALLOWED_FILTER_FIELDS = ["status", "priority", "assignedUserId"] as const;

function applyFilters(
  tasks: TaskRecord[],
  queryParams: Record<string, string | undefined>
): TaskRecord[] {
  let filtered = [...tasks];

  // 1. Filter by Status
  if (queryParams.status) {
    const statuses = queryParams.status.split(","); // Supports ?status=pending,in_progress
    filtered = filtered.filter((t) => statuses.includes(t.status));
  }

  // 2. Filter by Priority
  if (queryParams.priority) {
    filtered = filtered.filter((t) => t.priority === queryParams.priority);
  }

  // 3. Filter by Assigned User ID
  if (queryParams.assignedUserId) {
    const userId = parseInt(queryParams.assignedUserId, 10);
    if (!isNaN(userId)) {
      filtered = filtered.filter((t) => t.assignedUserId === userId);
    }
  }

  return filtered;
}

console.log("=== Scenario 1: Filter by assignedUserId=10 AND priority=high ===");
const scenario1 = applyFilters(mockTaskDatabase, { assignedUserId: "10", priority: "high" });
console.log(scenario1);

console.log("\n=== Scenario 2: Multi-value Set Filter (status=pending,in_progress) ===");
const scenario2 = applyFilters(mockTaskDatabase, { status: "pending,in_progress" });
console.log(scenario2);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === Scenario 1: Filter by assignedUserId=10 AND priority=high ===
  [
    { id: 1, title: 'Configure Express app', status: 'completed', priority: 'high', assignedUserId: 10 },
    { id: 2, title: 'Implement Auth token', status: 'in_progress', priority: 'high', assignedUserId: 10 }
  ]

  === Scenario 2: Multi-value Set Filter (status=pending,in_progress) ===
  [
    { id: 2, title: 'Implement Auth token', status: 'in_progress', priority: 'high', assignedUserId: 10 },
    { id: 4, title: 'Write unit tests', status: 'pending', priority: 'low', assignedUserId: 10 }
  ]
*/

// =============================================================================
// BEHIND THE SCENES: ADVANCED FILTER OPERATOR SYNTAX
// =============================================================================
/*
  LHS Brackets Syntax (popularized by Stripe and Strapi):
  - ?price[gte]=100    -> Greater than or equal to 100
  - ?price[lte]=500    -> Less than or equal to 500
  - ?status[ne]=draft  -> Not equal to draft
  - ?tags[in]=ts,node  -> Matches any tag in set
*/