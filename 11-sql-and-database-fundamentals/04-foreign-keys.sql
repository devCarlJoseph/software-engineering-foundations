/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Foreign Keys (FK) & Referential Integrity
  ==============================================================================

  1. WHAT IS A FOREIGN KEY?
     A column in one table that points directly to the Primary Key of another table.
     It creates an official relational link and enforces Referential Integrity:
     you cannot create a child record that points to a non-existent parent!

  2. REAL-LIFE ANALOGY:
     A Student ID on an Exam Paper:
     - The Student Table has enrolled students (ID: 101, 102, 103).
     - The Exam Papers Table has a `student_id` Foreign Key.
     - You CANNOT hand in an exam paper for Student ID 999 if no such student exists!

  3. JARGON BUSTER:
     - Parent Table: The table containing the referenced Primary Key.
     - Child Table: The table containing the Foreign Key.
     - Referential Integrity: Guaranteeing no "orphan" child records can exist.
     - Cascade Actions:
       - `ON DELETE CASCADE`: If parent is deleted, automatically delete its children.
       - `ON DELETE SET NULL`: If parent is deleted, set foreign key to NULL.
       - `ON DELETE RESTRICT`: Block parent deletion if children exist (safest default!).
*/

-- =============================================================================
-- CREATING PARENT AND CHILD TABLES WITH FOREIGN KEY CONSTRAINTS
-- =============================================================================

DROP TABLE IF EXISTS task_comments;
DROP TABLE IF EXISTS project_tasks;

-- 1. PARENT TABLE: project_tasks
CREATE TABLE project_tasks (
    task_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(150) NOT NULL
);

-- 2. CHILD TABLE: task_comments (points back to project_tasks)
CREATE TABLE task_comments (
    comment_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    task_id INT NOT NULL,
    comment_text TEXT NOT NULL,
    posted_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    
    -- Defining the Foreign Key with CASCADE rule:
    CONSTRAINT fk_task_comments_task
        FOREIGN KEY (task_id)
        REFERENCES project_tasks(task_id)
        ON DELETE CASCADE
);

-- Insert sample parent records
INSERT INTO project_tasks (title) VALUES ('Build REST API');

-- Insert valid child record pointing to existing task #1
INSERT INTO task_comments (task_id, comment_text) 
VALUES (1, 'Initial endpoints are approved and tested.');

-- Verify connected records
SELECT 
    p.task_id,
    p.title,
    c.comment_id,
    c.comment_text
FROM project_tasks p
JOIN task_comments c ON p.task_id = c.task_id;

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT / RESULT SET]
  ------------------------------------------------------------------------------
  task_id | title          | comment_id | comment_text
  --------+----------------+------------+------------------------------------------
  1       | Build REST API | 1          | Initial endpoints are approved and tested.
*/

-- =============================================================================
-- DEMONSTRATION OF REFERENTIAL INTEGRITY PREVENTING BUGS
-- =============================================================================
/*
  -- Trying to insert a comment for non-existent task_id 999:
  INSERT INTO task_comments (task_id, comment_text) VALUES (999, 'Invalid comment');
  
  -- DATABASE ERROR THROWN:
  -- ERROR: insert or update on table "task_comments" violates foreign key constraint "fk_task_comments_task"
  -- DETAIL: Key (task_id)=(999) is not present in table "project_tasks".
*/