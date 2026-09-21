/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: REST API Pagination (Offset vs Cursor)
  ==============================================================================

  1. WHAT IS PAGINATION?
     The practice of breaking large datasets into smaller chunks (pages).
     Returning 100,000 database rows in a single response crashes servers and
     freezes mobile devices. Pagination is MANDATORY for all collection endpoints.

  2. REAL-LIFE ANALOGY:
     Reading a Dictionary:
     - Offset Pagination: "Turn to Page 42." Easy to navigate, but if pages are
       ripped out or inserted, numbers shift.
     - Cursor Pagination: "Start reading immediately after the word 'Banana'."
       Extremely fast, always accurate even if words are inserted or deleted.

  3. JARGON BUSTER:
     - Offset-Based Pagination (`?page=2&limit=10`): Skips `(page - 1) * limit` rows.
       Great for simple UIs with page numbers (1, 2, 3... 10).
     - Cursor-Based Pagination (`?cursor=tsk_50&limit=10`): Queries rows strictly
       after a unique ID or timestamp. Ideal for infinite scrolling (e.g. Twitter/Instagram).
     - Performance Cliff: In SQL, `OFFSET 1000000` is very slow because the database
       must scan and discard 1 million rows before returning 10!
*/

// =============================================================================
// IMPLEMENTATION: OFFSET-BASED PAGINATION WITH METADATA LINKS
// =============================================================================

interface PaginatedResult<T> {
  data: T[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPageUrl: string | null;
    prevPageUrl: string | null;
  };
}

// Simulated dataset of 25 tasks
const allDatabaseRecords = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  title: `Task #${i + 1}`,
}));

function paginateOffset<T>(
  dataset: T[],
  page: number,
  limit: number,
  baseUrl: string
): PaginatedResult<T> {
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);
  const totalRecords = dataset.length;
  const totalPages = Math.ceil(totalRecords / safeLimit);

  // Offset formula: (page - 1) * limit
  const startIndex = (safePage - 1) * safeLimit;
  const slicedData = dataset.slice(startIndex, startIndex + safeLimit);

  const hasNextPage = safePage < totalPages;
  const hasPrevPage = safePage > 1;

  return {
    data: slicedData,
    pagination: {
      currentPage: safePage,
      pageSize: slicedData.length,
      totalRecords,
      totalPages,
      hasNextPage,
      hasPrevPage,
      nextPageUrl: hasNextPage ? `${baseUrl}?page=${safePage + 1}&limit=${safeLimit}` : null,
      prevPageUrl: hasPrevPage ? `${baseUrl}?page=${safePage - 1}&limit=${safeLimit}` : null,
    },
  };
}

console.log("=== Page 1 Result ===");
const page1 = paginateOffset(allDatabaseRecords, 1, 5, "/api/v1/tasks");
console.log("Items on Page 1:", page1.data.map((t) => t.title));
console.log("Page 1 Metadata:", page1.pagination);

console.log("\n=== Page 5 (Final Page) Result ===");
const page5 = paginateOffset(allDatabaseRecords, 5, 5, "/api/v1/tasks");
console.log("Items on Page 5:", page5.data.map((t) => t.title));
console.log("Has next page?:", page5.pagination.hasNextPage);

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === Page 1 Result ===
  Items on Page 1: [ 'Task #1', 'Task #2', 'Task #3', 'Task #4', 'Task #5' ]
  Page 1 Metadata: {
    currentPage: 1,
    pageSize: 5,
    totalRecords: 25,
    totalPages: 5,
    hasNextPage: true,
    hasPrevPage: false,
    nextPageUrl: '/api/v1/tasks?page=2&limit=5',
    prevPageUrl: null
  }

  === Page 5 (Final Page) Result ===
  Items on Page 5: [ 'Task #21', 'Task #22', 'Task #23', 'Task #24', 'Task #25' ]
  Has next page?: false
*/

// =============================================================================
// BEHIND THE SCENES: OFFSET VS CURSOR COMPARISON
// =============================================================================
/*
  ┌──────────────────────┬─────────────────────────┬─────────────────────────┐
  │ Feature              │ Offset Pagination       │ Cursor Pagination       │
  ├──────────────────────┼─────────────────────────┼─────────────────────────┤
  │ Query Format         │ ?page=3&limit=20        │ ?cursor=tsk_102&limit=20│
  │ UI Best Fit          │ Numbered Pages [1,2,3]  │ Infinite Scrolling      │
  │ SQL Query            │ LIMIT 20 OFFSET 40      │ WHERE id > 102 LIMIT 20 │
  │ Speed with 1M rows   │ Slow (scans all rows)   │ Instant (uses B-Tree)   │
  │ Handling insertions  │ Can skip or duplicate   │ Perfectly stable        │
  └──────────────────────┴─────────────────────────┴─────────────────────────┘
*/