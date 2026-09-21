/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: REST Query Parameters Architecture
  ==============================================================================

  1. WHAT ARE QUERY PARAMETERS IN REST?
     Query parameters are the standard mechanism used to modify collection retrieval
     requests without altering the resource endpoint itself.
     They are used for 4 primary purposes:
     1. Filtering (`?status=completed`)
     2. Sorting (`?sort=createdAt:desc`)
     3. Field Selection (`?fields=id,title`)
     4. Pagination (`?page=2&limit=20`)

  2. REAL-LIFE ANALOGY:
     Ordering a Custom Coffee:
     - Resource: Coffee (`/drinks/coffee`)
     - Query Parameters: Modifiers and customizations
       `/drinks/coffee?milk=oat&syrup=vanilla&temperature=iced`
     It is still the coffee resource, but tailored to your precise criteria!

  3. JARGON BUSTER:
     - Field Selection (Sparse Fieldsets): Requesting only specific object fields
       to save bandwidth over mobile networks (e.g. `?fields=id,title`).
     - Sorting Parameter: Standard format: `?sort=-createdAt` (minus sign means descending)
       or `?sort=createdAt:desc`.
*/

// =============================================================================
// DEMONSTRATION OF QUERY PARAMETER PARSER IN REST
// =============================================================================

interface ParsedRestQuery {
  filters: Record<string, string>;
  sortField?: string;
  sortDirection: "ASC" | "DESC";
  selectedFields?: string[];
  page: number;
  limit: number;
}

function parseRestQueryString(rawQuery: Record<string, string | undefined>): ParsedRestQuery {
  // 1. Pagination extraction
  const page = Math.max(1, parseInt(rawQuery.page ?? "1", 10) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(rawQuery.limit ?? "10", 10) || 10));

  // 2. Sorting extraction (e.g. ?sort=-createdAt or ?sort=createdAt)
  let sortField: string | undefined;
  let sortDirection: "ASC" | "DESC" = "ASC";

  if (rawQuery.sort) {
    if (rawQuery.sort.startsWith("-")) {
      sortField = rawQuery.sort.substring(1);
      sortDirection = "DESC";
    } else {
      sortField = rawQuery.sort;
      sortDirection = "ASC";
    }
  }

  // 3. Sparse fieldsets (e.g. ?fields=id,title,status)
  const selectedFields = rawQuery.fields ? rawQuery.fields.split(",").map((f) => f.trim()) : undefined;

  // 4. Extract all other keys as filters
  const reservedKeys = ["page", "limit", "sort", "fields", "search"];
  const filters: Record<string, string> = {};

  Object.entries(rawQuery).forEach(([key, val]) => {
    if (!reservedKeys.includes(key) && val !== undefined) {
      filters[key] = val;
    }
  });

  return { filters, sortField, sortDirection, selectedFields, page, limit };
}

console.log("=== Parsing Complex REST Query String ===");
const incomingQuery = {
  status: "in_progress",
  priority: "high",
  sort: "-createdAt",
  fields: "id,title,priority",
  page: "2",
  limit: "25",
};

const parsed = parseRestQueryString(incomingQuery);
console.log("Resulting Parsed Query Plan:", JSON.stringify(parsed, null, 2));

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === Parsing Complex REST Query String ===
  Resulting Parsed Query Plan: {
    "filters": {
      "status": "in_progress",
      "priority": "high"
    },
    "sortField": "createdAt",
    "sortDirection": "DESC",
    "selectedFields": [
      "id",
      "title",
      "priority"
    ],
    "page": 2,
    "limit": 25
  }
*/

// =============================================================================
// BEHIND THE SCENES: STANDARDIZED REST QUERY PATTERNS
// =============================================================================
/*
  Industry Standard Conventions:
  - Filtering:       /api/v1/tasks?priority=high&assignedTo=usr_12
  - Sorting:         /api/v1/tasks?sort=-createdAt (descending) or ?sort=title (ascending)
  - Sparse Fields:   /api/v1/tasks?fields=id,title,dueDate
  - Pagination:      /api/v1/tasks?page=1&limit=20
*/