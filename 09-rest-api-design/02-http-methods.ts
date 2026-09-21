/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: HTTP Methods (CRUD in REST)
  ==============================================================================

  1. WHAT ARE HTTP METHODS?
     HTTP methods (or verbs) specify the desired action to be performed on a given
     resource. In REST, HTTP methods map directly to CRUD operations:
     - CREATE -> POST
     - READ   -> GET
     - UPDATE -> PUT (full replacement) or PATCH (partial update)
     - DELETE -> DELETE

  2. REAL-LIFE ANALOGY:
     A Sticky Note on an Office Bulletin Board:
     - GET: You read what is written on the note.
     - POST: You stick a brand new note on the board.
     - PUT: You take down the note, throw it in the trash, and put a completely new one in its place.
     - PATCH: You take a pen and change only one line on the existing note.
     - DELETE: You take down the note and throw it away.

  3. JARGON BUSTER:
     - Safe Method: A method that does NOT alter server state (read-only, e.g., GET, HEAD).
     - Idempotent: An operation that produces the exact same result no matter how many
       times you call it consecutively (e.g., GET, PUT, DELETE).
     - Non-Idempotent: Repeating the call creates new/different side effects (e.g., POST
       called 3 times creates 3 duplicate items).
*/

// =============================================================================
// BAD PRACTICE: USING GET FOR MUTATIONS (STATE CHANGES)
// =============================================================================
/*
  // DISASTER: Using GET to delete or create records:
  // GET /api/tasks/delete?id=5
  // Why is this terrible? Web crawlers (like Googlebot) follow all GET links!
  // A web spider could accidentally delete your entire database!
*/

// =============================================================================
// GOOD PRACTICE: IDEMPOTENT VS NON-IDEMPOTENT HANDLERS
// =============================================================================

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

class TaskDatabase {
  private tasks: Map<number, Task> = new Map([
    [1, { id: 1, title: "Review HTTP Methods", completed: false }],
  ]);
  private nextId = 2;

  // 1. GET - Safe & Idempotent (Reading)
  public get(id: number): Task | undefined {
    return this.tasks.get(id);
  }

  // 2. POST - Non-Idempotent (Create: calling twice creates 2 items)
  public post(title: string): Task {
    const newTask: Task = { id: this.nextId++, title, completed: false };
    this.tasks.set(newTask.id, newTask);
    return newTask;
  }

  // 3. PUT - Idempotent (Replace entire resource)
  public put(id: number, completeReplacement: Omit<Task, "id">): Task {
    const updated: Task = { id, ...completeReplacement };
    this.tasks.set(id, updated);
    return updated;
  }

  // 4. PATCH - Idempotent (Update specific fields only)
  public patch(id: number, partial: Partial<Omit<Task, "id">>): Task | null {
    const existing = this.tasks.get(id);
    if (!existing) return null;
    const patched: Task = { ...existing, ...partial };
    this.tasks.set(id, patched);
    return patched;
  }

  // 5. DELETE - Idempotent (Deleting twice yields same absent state)
  public delete(id: number): boolean {
    return this.tasks.delete(id);
  }
}

const db = new TaskDatabase();

console.log("=== 1. POST (Create) ===");
const created = db.post("Build RESTful Services");
console.log("Created Task:", created);

console.log("\n=== 2. PATCH (Partial Update - only toggle completed) ===");
const patched = db.patch(created.id, { completed: true });
console.log("Patched Task:", patched);

console.log("\n=== 3. PUT (Full Replacement) ===");
const replaced = db.put(created.id, { title: "Completely Replaced Task Title", completed: false });
console.log("Replaced Task:", replaced);

console.log("\n=== 4. DELETE (Remove) ===");
console.log("Deleted Task successfully?:", db.delete(created.id));
console.log("Second delete (Idempotent - returns false safely):", db.delete(created.id));

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT IN TERMINAL]
  ------------------------------------------------------------------------------
  === 1. POST (Create) ===
  Created Task: { id: 2, title: 'Build RESTful Services', completed: false }

  === 2. PATCH (Partial Update - only toggle completed) ===
  Patched Task: { id: 2, title: 'Build RESTful Services', completed: true }

  === 3. PUT (Full Replacement) ===
  Replaced Task: {
    id: 2,
    title: 'Completely Replaced Task Title',
    completed: false
  }

  === 4. DELETE (Remove) ===
  Deleted Task successfully?: true
  Second delete (Idempotent - returns false safely): false
*/

// =============================================================================
// BEHIND THE SCENES: HTTP METHOD PROPERTIES TABLE
// =============================================================================
/*
  ┌─────────┬──────────────┬──────────────┬─────────────────────────────────┐
  │ Method  │ Safe (Read)? │ Idempotent?  │ Primary Purpose                 │
  ├─────────┼──────────────┼──────────────┼─────────────────────────────────┤
  │ GET     │ YES          │ YES          │ Fetch resource(s)               │
  │ POST    │ NO           │ NO           │ Create resource or run action   │
  │ PUT     │ NO           │ YES          │ Complete replacement of resource│
  │ PATCH   │ NO           │ YES / MAYBE  │ Partial field update            │
  │ DELETE  │ NO           │ YES          │ Remove resource                 │
  └─────────┴──────────────┴──────────────┴─────────────────────────────────┘
*/