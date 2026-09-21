/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: PostgreSQL Index Types (B-Tree & GIN)
  ==============================================================================

  1. WHAT ARE POSTGRESQL INDEX TYPES?
     PostgreSQL supports multiple indexing algorithms tailored to specific data structures:
     - B-Tree: Default index. Best for comparisons (`=`, `<`, `>`, `BETWEEN`, `ORDER BY`).
     - GIN (Generalized Inverted Index): Specialized index for multi-value types
       like `JSONB`, Arrays, and Full-Text Search documents!

  2. REAL-LIFE ANALOGY:
     The Index in a Cookbook:
     - B-Tree: Recipes alphabetized by recipe name (Apple Pie, Beef Stew, Curry).
     - GIN Index: Inverted index by ingredient! Look up "Garlic" -> immediately shows
       Recipes #12, #45, #88, #102 that contain garlic!
*/

DROP TABLE IF EXISTS dev_tickets;

CREATE TABLE dev_tickets (
    ticket_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    status VARCHAR(30) NOT NULL,
    labels JSONB NOT NULL DEFAULT '[]'::jsonb -- Array of tags inside JSONB
);

-- 1. Standard B-Tree Index on status column
CREATE INDEX idx_dev_tickets_status ON dev_tickets USING btree (status);

-- 2. GIN Index on JSONB labels column!
CREATE INDEX idx_dev_tickets_labels_gin ON dev_tickets USING gin (labels);

-- Insert sample tickets
INSERT INTO dev_tickets (title, status, labels)
VALUES 
    ('Memory Leak in Auth Service', 'open', '["critical", "backend", "security"]'::jsonb),
    ('Fix CSS Alignment', 'resolved', '["frontend", "minor"]'::jsonb);

-- Query using JSONB containment operator (@>) powered by the GIN index!
SELECT ticket_id, title, status, labels
FROM dev_tickets
WHERE labels @> '["security"]'::jsonb;

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT / RESULT SET]
  ------------------------------------------------------------------------------
  ticket_id | title                       | status | labels
  ----------+-----------------------------+--------+-----------------------------------
  1         | Memory Leak in Auth Service | open   | ["critical", "backend", "security"]
*/