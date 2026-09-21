/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Database Indexes & Query Performance
  ==============================================================================

  1. WHAT IS AN INDEX?
     A specialized data structure (most commonly a B-Tree) that the database builds
     and maintains to find rows significantly faster without scanning every single
     page of data on disk.

  2. REAL-LIFE ANALOGY:
     The Index at the Back of a 1,000-Page Textbook:
     - Without an index (Full Table Scan): You must read all 1,000 pages line by line
       to find where "PostgreSQL" is mentioned (Takes 2 hours).
     - With an index (B-Tree Lookup): You flip to the back, look under "P", see
       "Page 452", and flip straight there (Takes 3 seconds)!

  3. JARGON BUSTER:
     - Full Table Scan (Seq Scan): Checking every single row in the table (Slow!).
     - Index Scan: Traversing the B-Tree index to locate row pointers directly (Instant!).
     - Trade-off: Indexes make `SELECT` super fast, but slow down `INSERT`, `UPDATE`,
       and `DELETE` because the database must update the index on every write!
     - `EXPLAIN ANALYZE`: SQL command showing the database execution plan and actual runtime.
*/

DROP TABLE IF EXISTS large_user_directory;
CREATE TABLE large_user_directory (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    country_code VARCHAR(5) NOT NULL
);

-- Creating a B-Tree index on email column
CREATE INDEX idx_users_email ON large_user_directory(email);

-- Creating a composite index on country_code and id
CREATE INDEX idx_users_country_id ON large_user_directory(country_code, id);

-- Inspect query execution plan using EXPLAIN
EXPLAIN SELECT id FROM large_user_directory WHERE email = 'carl@dev.com';

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT / RESULT SET]
  ------------------------------------------------------------------------------
  QUERY PLAN
  ------------------------------------------------------------------------------
  Index Scan using idx_users_email on large_user_directory
    Index Cond: ((email)::text = 'carl@dev.com'::text)
*/

-- =============================================================================
-- BEHIND THE SCENES: WHEN TO CREATE INDEXES
-- =============================================================================
/*
  DO index:
  - Columns frequently used in `WHERE` clauses (e.g. `email`, `status`).
  - Columns used in `JOIN` conditions (Foreign Keys).
  - Columns used in `ORDER BY` sorting.

  DON'T index:
  - Small tables (under 100 rows).
  - Columns that have only 2 distinct values (e.g. `is_active` boolean).
  - Columns that are rarely searched but heavily inserted/updated.
*/