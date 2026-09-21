/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: UPDATE Operations
  ==============================================================================

  1. WHAT IS UPDATE?
     The `UPDATE` statement modifies existing records in a table.
     CRITICAL WARNING: ALWAYS INCLUDE A `WHERE` CLAUSE!
     Running `UPDATE table SET col = val;` without `WHERE` updates EVERY SINGLE ROW
     in your entire database!

  2. REAL-LIFE ANALOGY:
     Changing Price Tags in a Grocery Store:
     - With WHERE clause: "Update price of Product ID #401 to $5.99." (Safe!)
     - Without WHERE clause: "Change price to $5.99." The clerk changes the price
       of every apple, television, and car in the store to $5.99! (Catastrophe!)

  3. JARGON BUSTER:
     - Target Clause: The `WHERE id = ...` filter restricting which rows get changed.
     - Atomic Update: Incrementing a value directly in the database (`points = points + 10`)
       to prevent race conditions between concurrent users.
*/

DROP TABLE IF EXISTS bank_accounts;
CREATE TABLE bank_accounts (
    account_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    holder_name VARCHAR(100) NOT NULL,
    balance NUMERIC(12, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE'
);

INSERT INTO bank_accounts (holder_name, balance)
VALUES 
    ('Carl Joseph', 1000.00),
    ('Sarah Connor', 2500.00);

-- ── SAFE, CONTROLLED UPDATE ──────────────────────────────────────────────────
UPDATE bank_accounts
SET 
    balance = balance + 250.00, -- Atomic credit
    status = 'ACTIVE'
WHERE account_id = 1
RETURNING account_id, holder_name, balance;

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT / RESULT SET]
  ------------------------------------------------------------------------------
  account_id | holder_name | balance
  -----------+-------------+---------
  1          | Carl Joseph | 1250.00
*/