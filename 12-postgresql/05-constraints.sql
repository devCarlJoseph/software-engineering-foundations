/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: PostgreSQL Constraints (CHECK, UNIQUE, EXCLUDE)
  ==============================================================================

  1. WHAT ARE POSTGRES CONSTRAINTS?
     Rules enforced by the database engine at the disk level to ensure data accuracy
     and reliability. Any transaction violating a constraint is instantly rejected!
     - `PRIMARY KEY`: Unique + Not Null.
     - `FOREIGN KEY`: Referential link to another table.
     - `UNIQUE`: Prevents duplicates across a column or set of columns.
     - `NOT NULL`: Forbids missing/empty values.
     - `CHECK`: Evaluates a custom boolean expression on inserted/updated values.

  2. REAL-LIFE ANALOGY:
     Building Code Regulations:
     - The blueprint requires stair steps to be between 4 and 7 inches high.
     - A construction worker cannot build a 20-inch step; the inspector immediately halts work!
*/

DROP TABLE IF EXISTS employee_contracts;

CREATE TABLE employee_contracts (
    contract_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    employee_email VARCHAR(255) NOT NULL,
    
    -- CHECK 1: Ensure email looks like a valid email string
    CONSTRAINT chk_valid_email 
        CHECK (employee_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
        
    salary NUMERIC(10, 2) NOT NULL,
    -- CHECK 2: Minimum wage business constraint
    CONSTRAINT chk_minimum_salary 
        CHECK (salary >= 30000.00),
        
    start_date DATE NOT NULL,
    end_date DATE,
    -- CHECK 3: End date must always be after start date
    CONSTRAINT chk_date_order 
        CHECK (end_date IS NULL OR end_date > start_date)
);

-- Test 1: Valid contract insertion
INSERT INTO employee_contracts (employee_email, salary, start_date, end_date)
VALUES ('carl@company.com', 75000.00, '2026-10-01', '2027-10-01');

-- Query to verify valid record
SELECT contract_id, employee_email, salary FROM employee_contracts;

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT / RESULT SET]
  ------------------------------------------------------------------------------
  contract_id | employee_email   | salary
  ------------+------------------+---------
  1           | carl@company.com | 75000.00
*/

-- =============================================================================
-- DEMONSTRATING CONSTRAINT VIOLATIONS
-- =============================================================================
/*
  -- Trying to insert a contract where end_date is BEFORE start_date:
  INSERT INTO employee_contracts (employee_email, salary, start_date, end_date)
  VALUES ('ana@company.com', 80000.00, '2026-10-01', '2026-05-01');
  
  -- DATABASE BLOCKS THE WRITE:
  -- ERROR: new row for relation "employee_contracts" violates check constraint "chk_date_order"
*/