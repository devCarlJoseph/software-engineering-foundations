/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: REST API Searching (`?q=` or `?search=`)
  ==============================================================================

  1. WHAT IS SEARCHING IN REST?
     Searching allows free-form text matching across multiple attributes of a resource
     (such as searching for keywords in a task's title, description, and tags simultaneously).
     Typically exposed via `?q=keyword` or `?search=keyword`.

  2. REAL-LIFE ANALOGY:
     The Search Bar in an Email Client:
     - Filtering: Clicking the "Unread" folder (exact boolean match).
     - Searching: Typing "invoice" into the search bar. It matches "invoice" whether
       it appears in the subject line, the body text, or the sender's name.

  3. JARGON BUSTER:
     - Substring / Partial Match: Matches if keyword is contained anywhere inside the text.
     - Case-Insensitive: "Express" matches "express" or "EXPRESS".
     - Full-Text Search (FTS): Database feature that stems words (e.g. "running" matches "run")
       and ranks results by relevance score.
*/

// =============================================================================
// SEARCH ENGINE SIMULATION ACROSS MULTIPLE FIELDS
// =============================================================================

interface SearchableTask {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

const datasetToSearch: SearchableTask[] = [
  {
    id: "tsk_1",
    title: "Setup Node.js Development Server",
    description: "Install ts-node and configure package.json scripts",
    tags: ["backend", "setup", "node"],
  },
  {
    id: "tsk_2",
    title: "Database Index Optimization",
    description: "Create B-Tree index on PostgreSQL tasks table for faster search",
    tags: ["database", "sql", "performance"],
  },
  {
    id: "tsk_3",
    title: "Design REST API Endpoints",
    description: "Follow RESTful naming conventions for resource URLs",
    tags: ["api", "architecture", "rest"],
  },
];

function searchTasks(tasks: SearchableTask[], query: string | undefined): SearchableTask[] {
  // If search query is empty or just whitespace, return all tasks
  if (!query || query.trim().length === 0) {
    return tasks;
  }

  const normalizedKeyword = query.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesTitle = task.title.toLowerCase().includes(normalizedKeyword);
    const matchesDescription = task.description.toLowerCase().includes(normalizedKeyword);
    const matchesTag = task.tags.some((tag) => tag.toLowerCase().includes(normalizedKeyword));

    // Match if keyword appears in ANY of the searchable fields:
    return matchesTitle || matchesDescription || matchesTag;
  });
}

console.log("=== 1. Search by Keyword 'PostgreSQL' (Found in Description) ===");
console.log(searchTasks(datasetToSearch, "PostgreSQL"));

console.log("\n=== 2. Search by Keyword 'backend' (Found in Tag) ===");
console.log(searchTasks(datasetToSearch, "backend"));

console.log("\n=== 3. Search by Keyword 'Rest' (Case-Insensitive Match in Title) ===");
console.log(searchTasks(datasetToSearch, "rest"));

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === 1. Search by Keyword 'PostgreSQL' (Found in Description) ===
  [
    {
      id: 'tsk_2',
      title: 'Database Index Optimization',
      description: 'Create B-Tree index on PostgreSQL tasks table for faster search',
      tags: [ 'database', 'sql', 'performance' ]
    }
  ]

  === 2. Search by Keyword 'backend' (Found in Tag) ===
  [
    {
      id: 'tsk_1',
      title: 'Setup Node.js Development Server',
      description: 'Install ts-node and configure package.json scripts',
      tags: [ 'backend', 'setup', 'node' ]
    }
  ]

  === 3. Search by Keyword 'Rest' (Case-Insensitive Match in Title) ===
  [
    {
      id: 'tsk_3',
      title: 'Design REST API Endpoints',
      description: 'Follow RESTful naming conventions for resource URLs',
      tags: [ 'api', 'architecture', 'rest' ]
    }
  ]
*/

// =============================================================================
// BEHIND THE SCENES: FULL-TEXT SEARCH IN PRODUCTION
// =============================================================================
/*
  In production databases:
  - In PostgreSQL: Use `to_tsvector()` and `to_tsquery()` for English word stemming.
  - In MongoDB: Use text indexes `$text: { $search: "keyword" }`.
  - In Enterprise Search: Use dedicated search engines like Elasticsearch or Meilisearch
    when dealing with millions of documents with fuzzy typo tolerance!
*/