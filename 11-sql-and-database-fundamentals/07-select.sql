/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: SELECT Queries & Data Retrieval
  ==============================================================================

  1. WHAT IS SELECT?
     The `SELECT` statement retrieves rows and columns from one or more tables.
     It allows filtering (`WHERE`), sorting (`ORDER BY`), aggregating (`GROUP BY`),
     and limiting rows (`LIMIT`, `OFFSET`).

  2. REAL-LIFE ANALOGY:
     Searching an Inventory Spreadsheet:
     "Show me only the Name and Price of all items in the Electronics aisle,
     sorted from highest price to lowest, and show only the top 3."

  3. JARGON BUSTER:
     - `SELECT *`: Select all columns (avoid in production!).
     - `WHERE`: Filter rows based on conditions (`=`, `!=`, `<`, `>`, `LIKE`, `IN`, `BETWEEN`).
     - `ORDER BY ... ASC / DESC`: Sort results ascending or descending.
     - `LIMIT / OFFSET`: Restrict number of rows returned (used for API pagination).
*/

-- =============================================================================
-- BAD PRACTICE: USING SELECT * IN PRODUCTION BACKENDS
-- =============================================================================
/*
  SELECT * FROM users;
  // DANGER: Transmits massive unused text/blob columns over the network,
  // breaks memory caches, and risks leaking password hashes to API responses!
  // Always specify the exact column names you need!
*/

-- =============================================================================
-- GOOD PRACTICE: EXPLICIT COLUMN SELECTION, FILTERING & SORTING
-- =============================================================================

DROP TABLE IF EXISTS inventory_products;
CREATE TABLE inventory_products (
    product_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    stock INT NOT NULL
);

INSERT INTO inventory_products (name, category, price, stock)
VALUES
    ('Mechanical Keyboard', 'Electronics', 89.99, 15),
    ('Ergonomic Mouse', 'Electronics', 49.50, 40),
    ('Coffee Mug', 'Kitchen', 12.00, 100),
    ('Standing Desk', 'Furniture', 350.00, 5),
    ('USB-C Cable', 'Electronics', 15.99, 85);

-- Powerful filtered, sorted, and limited SELECT query:
SELECT 
    name, 
    category, 
    price,
    stock
FROM inventory_products
WHERE category = 'Electronics' 
  AND price BETWEEN 10.00 AND 100.00
ORDER BY price DESC
LIMIT 2 OFFSET 0;

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT / RESULT SET]
  ------------------------------------------------------------------------------
  name                | category    | price | stock
  --------------------+-------------+-------+-------
  Mechanical Keyboard | Electronics | 89.99 | 15
  Ergonomic Mouse     | Electronics | 49.50 | 40
*/