/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Database Normalization (1NF, 2NF, 3NF)
  ==============================================================================

  1. WHAT IS NORMALIZATION?
     The systematic process of organizing data in a relational database to:
     1. Eliminate redundant (duplicate) data.
     2. Ensure data dependencies make logical sense.
     3. Prevent Update, Insertion, and Deletion anomalies.

  2. REAL-LIFE ANALOGY:
     Organizing a Cluttered Toolbox:
     - Unnormalized: You have 5 identical 10mm wrenches scattered in 5 different drawers.
       If you paint one wrench red, the other 4 are still silver (Inconsistent!).
     - Normalized: Exactly ONE 10mm wrench in its labeled slot. Everyone goes to
       that single slot to use it.

  3. JARGON BUSTER:
     - 1NF (First Normal Form): Every column contains atomic (single, indivisible) values;
       no comma-separated lists or repeating groups.
     - 2NF (Second Normal Form): Must be in 1NF, and all non-key columns must depend on
       the ENTIRE primary key (eliminates partial dependencies).
     - 3NF (Third Normal Form): Must be in 2NF, and no non-key column depends on another
       non-key column (eliminates transitive dependencies).
*/

-- =============================================================================
-- UNNORMALIZED DISASTER TABLE (VIOLATES 1NF, 2NF, AND 3NF)
-- =============================================================================
/*
  CREATE TABLE unnormalized_orders (
      order_id INT,
      customer_name VARCHAR(100),
      customer_city VARCHAR(50),
      customer_zipcode VARCHAR(10), -- Zip code determines city (Transitive dependency! Violates 3NF!)
      items_purchased TEXT          -- "Mouse, Keyboard, Monitor" (Not atomic! Violates 1NF!)
  );
*/

-- =============================================================================
-- FULLY NORMALIZED 3NF SCHEMA DESIGN
-- =============================================================================

DROP TABLE IF EXISTS order_line_items;
DROP TABLE IF EXISTS orders_3nf;
DROP TABLE IF EXISTS customers_3nf;
DROP TABLE IF EXISTS zip_codes;

-- 1. Eliminate Transitive Dependency (Zip code -> City separated)
CREATE TABLE zip_codes (
    zip_code VARCHAR(10) PRIMARY KEY,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL
);

-- 2. Customer Table (Contains only customer attributes)
CREATE TABLE customers_3nf (
    customer_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    zip_code VARCHAR(10) NOT NULL REFERENCES zip_codes(zip_code)
);

-- 3. Orders Table (Header info only)
CREATE TABLE orders_3nf (
    order_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id INT NOT NULL REFERENCES customers_3nf(customer_id),
    order_date DATE NOT NULL DEFAULT CURRENT_DATE
);

-- 4. Order Line Items Table (1NF Atomic items per row)
CREATE TABLE order_line_items (
    order_id INT NOT NULL REFERENCES orders_3nf(order_id),
    item_name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10, 2) NOT NULL,
    PRIMARY KEY (order_id, item_name) -- Composite Key
);

-- Insert sample normalized data
INSERT INTO zip_codes VALUES ('10001', 'New York', 'NY');
INSERT INTO customers_3nf (full_name, zip_code) VALUES ('Carl Joseph', '10001');
INSERT INTO orders_3nf (customer_id) VALUES (1);
INSERT INTO order_line_items VALUES (1, 'Mechanical Keyboard', 1, 99.00);

-- Query the normalized 3NF data via JOINs
SELECT 
    o.order_id,
    c.full_name,
    z.city,
    oli.item_name,
    oli.quantity,
    oli.unit_price
FROM orders_3nf o
JOIN customers_3nf c ON o.customer_id = c.customer_id
JOIN zip_codes z ON c.zip_code = z.zip_code
JOIN order_line_items oli ON o.order_id = oli.order_id;

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT / RESULT SET]
  ------------------------------------------------------------------------------
  order_id | full_name   | city     | item_name           | quantity | unit_price
  ---------+-------------+----------+---------------------+----------+-----------
  1        | Carl Joseph | New York | Mechanical Keyboard | 1        | 99.00
*/

-- =============================================================================
-- BEHIND THE SCENES: THE NORMALIZATION MANTRA
-- =============================================================================
/*
  "Each non-key attribute must provide a fact about:
   - The Key (1NF)
   - The Whole Key (2NF)
   - And Nothing But the Key (3NF)
   So Help Me Codd!" (Named after Edgar F. Codd, inventor of RDBMS)
*/