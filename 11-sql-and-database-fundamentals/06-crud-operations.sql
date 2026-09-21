/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: The 4 Core CRUD Operations
  ==============================================================================

  1. WHAT IS CRUD?
     The four basic functions of persistent storage:
     - C: CREATE  -> SQL `INSERT`
     - R: READ    -> SQL `SELECT`
     - U: UPDATE  -> SQL `UPDATE`
     - D: DELETE  -> SQL `DELETE`

  2. REAL-LIFE ANALOGY:
     A Filing Folder in an Office:
     - CREATE: Putting a brand new folder in the cabinet.
     - READ: Opening the drawer and viewing the contents.
     - UPDATE: Erasing a phone number in the file and writing a new one.
     - DELETE: Shredding the folder in the shredder.

  3. JARGON BUSTER:
     - `RETURNING`: PostgreSQL extension that returns the inserted, updated,
       or deleted rows immediately without needing a second query!
*/

-- Setup clean playground table
DROP TABLE IF EXISTS crud_demo_tasks;
CREATE TABLE crud_demo_tasks (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE
);

-- ── 1. CREATE (INSERT) ───────────────────────────────────────────────────────
INSERT INTO crud_demo_tasks (title, is_completed)
VALUES ('Learn CRUD Operations', FALSE);

-- ── 2. READ (SELECT) ─────────────────────────────────────────────────────────
SELECT id, title, is_completed 
FROM crud_demo_tasks 
WHERE is_completed = FALSE;

-- ── 3. UPDATE (UPDATE) ───────────────────────────────────────────────────────
UPDATE crud_demo_tasks
SET is_completed = TRUE
WHERE id = 1;

-- ── 4. DELETE (DELETE) ───────────────────────────────────────────────────────
DELETE FROM crud_demo_tasks
WHERE id = 1;

-- Confirm final state (table should now be empty)
SELECT COUNT(*) AS remaining_rows FROM crud_demo_tasks;

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT / RESULT SET]
  ------------------------------------------------------------------------------
  remaining_rows
  --------------
  0
*/