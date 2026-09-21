/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Primary Keys (PK)
  ==============================================================================

  1. WHAT IS A PRIMARY KEY?
     A column (or set of columns) that uniquely identifies each individual row
     in a table. A primary key enforces two fundamental rules:
     1. It must be UNIQUE (no duplicate IDs allowed).
     2. It must be NOT NULL (no blank IDs allowed).

  2. REAL-LIFE ANALOGY:
     Your Government Social Security / National ID Number:
     - Two citizens might share the exact same name ("Carl Joseph") and birthday.
     - Their National ID number is guaranteed to be 100% unique to that individual person.

  3. JARGON BUSTER:
     - Surrogate Key: An artificial unique identifier with no business meaning
       (e.g., auto-incrementing integer `1, 2, 3...` or a UUID).
     - Natural Key: A unique attribute that exists naturally in the real world
       (e.g., Vehicle Identification Number [VIN] or ISBN for books).
     - UUID (Universally Unique Identifier): A 128-bit random number (e.g.
       `123e4567-e89b-12d3-a456-426614174000`) ideal for distributed systems.
     - Composite Key: A primary key made by combining two or more columns together.
*/

-- =============================================================================
-- BAD PRACTICE: USING EDITABLE BUSINESS DATA AS A PRIMARY KEY
-- =============================================================================
/*
  CREATE TABLE accounts (
      email VARCHAR(255) PRIMARY KEY -- DANGER! If user wants to change their email,
                                     -- every foreign key in 10 other tables breaks!
  );
*/

-- =============================================================================
-- GOOD PRACTICE: AUTO-INCREMENTING INT OR UUID SURROGATE KEYS
-- =============================================================================

DROP TABLE IF EXISTS tasks_with_pk;

-- Approach A: Auto-incrementing SERIAL / IDENTITY (Fastest, compact)
CREATE TABLE tasks_with_pk (
    task_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Inserting rows without specifying the primary key (database generates it!)
INSERT INTO tasks_with_pk (title) 
VALUES 
    ('Configure PostgreSQL Server'),
    ('Design Database Schema'),
    ('Implement Foreign Keys');

-- Query to verify primary key uniqueness and ordering
SELECT task_id, title FROM tasks_with_pk ORDER BY task_id ASC;

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT / RESULT SET]
  ------------------------------------------------------------------------------
  task_id | title
  --------+------------------------------
  1       | Configure PostgreSQL Server
  2       | Design Database Schema
  3       | Implement Foreign Keys
*/

-- =============================================================================
-- BEHIND THE SCENES: CLUSTERED B-TREE INDEX ON PRIMARY KEYS
-- =============================================================================
/*
  When you declare `PRIMARY KEY`:
  - The database AUTOMATICALLY builds a unique B-Tree index on that column under the hood.
  - Finding a row by its primary key (`WHERE task_id = 2`) is instantaneous O(log N),
    even if the table contains 100,000,000 rows!
*/