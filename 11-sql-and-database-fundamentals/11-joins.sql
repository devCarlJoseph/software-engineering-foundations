/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: SQL JOINs (INNER, LEFT, RIGHT, FULL)
  ==============================================================================

  1. WHAT IS A JOIN?
     A SQL clause used to combine rows from two or more tables based on a related
     column between them (typically Primary Key <-> Foreign Key).

  2. REAL-LIFE ANALOGY:
     Venn Diagrams:
     - INNER JOIN: Only people who are BOTH employees AND signed up for the gym.
     - LEFT JOIN: ALL employees, plus their gym membership info if they have one.
       If they don't go to the gym, gym columns show `NULL`.

  3. JARGON BUSTER:
     - `INNER JOIN`: Returns rows that have matching values in BOTH tables.
     - `LEFT (OUTER) JOIN`: Returns ALL rows from left table, and matched rows from right table.
     - `RIGHT JOIN`: Returns ALL rows from right table, and matched rows from left.
     - `FULL OUTER JOIN`: Returns all rows when there is a match in EITHER table.
*/

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE order_items (
    order_id INT PRIMARY KEY,
    customer_id INT,
    item_name VARCHAR(50) NOT NULL
);

INSERT INTO customers (customer_id, name) VALUES
    (1, 'Carl'),
    (2, 'Sarah'),
    (3, 'David'); -- Has no orders

INSERT INTO order_items (order_id, customer_id, item_name) VALUES
    (101, 1, 'Laptop'),
    (102, 1, 'Mouse'),
    (103, 2, 'Keyboard');

-- ── 1. INNER JOIN: Only customers with orders ────────────────────────────────
SELECT c.name, o.item_name
FROM customers c
INNER JOIN order_items o ON c.customer_id = o.customer_id;

-- ── 2. LEFT JOIN: All customers, including David who has NULL orders ─────────
SELECT c.name, COALESCE(o.item_name, 'No Orders Placed') AS item_status
FROM customers c
LEFT JOIN order_items o ON c.customer_id = o.customer_id;

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT / RESULT SET]
  ------------------------------------------------------------------------------
  -- INNER JOIN:
  name  | item_name
  ------+----------
  Carl  | Laptop
  Carl  | Mouse
  Sarah | Keyboard

  -- LEFT JOIN:
  name  | item_status
  ------+-----------------
  Carl  | Laptop
  Carl  | Mouse
  Sarah | Keyboard
  David | No Orders Placed
*/