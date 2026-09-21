/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: DELETE & Soft Deletes
  ==============================================================================

  1. WHAT IS DELETE?
     The `DELETE` statement removes existing rows from a table based on a `WHERE` condition.
     Like `UPDATE`, running `DELETE` without a `WHERE` clause wipes the entire table clean!

  2. REAL-LIFE ANALOGY:
     Shredding a Document vs. Archiving It in a Box:
     - Hard Delete (`DELETE`): Throwing the contract in the paper shredder. Gone forever.
     - Soft Delete (`is_deleted = TRUE`): Moving the folder to a locked archive drawer.
       It is hidden from daily view, but available for audits and recovery if needed.

  3. JARGON BUSTER:
     - Hard Delete: Physically deleting rows from disk storage (`DELETE FROM table`).
     - Soft Delete: Setting a timestamp (`deleted_at TIMESTAMPTZ`) or flag (`is_deleted = TRUE`).
     - `TRUNCATE TABLE`: High-speed command that empties a whole table by resetting storage blocks.
*/

DROP TABLE IF EXISTS customer_orders;
CREATE TABLE customer_orders (
    order_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    deleted_at TIMESTAMPTZ DEFAULT NULL -- Soft-delete column
);

INSERT INTO customer_orders (customer_name)
VALUES ('Order A'), ('Order B'), ('Order C');

-- ── 1. HARD DELETE (Permanently removes Order C) ─────────────────────────────
DELETE FROM customer_orders
WHERE order_id = 3;

-- ── 2. SOFT DELETE (Safely flags Order B as deleted) ─────────────────────────
UPDATE customer_orders
SET deleted_at = CURRENT_TIMESTAMP
WHERE order_id = 2;

-- Active records query (Standard filter in production APIs):
SELECT order_id, customer_name, deleted_at
FROM customer_orders
WHERE deleted_at IS NULL;

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT / RESULT SET]
  ------------------------------------------------------------------------------
  order_id | customer_name | deleted_at
  ---------+---------------+-----------
  1        | Order A       | NULL
*/