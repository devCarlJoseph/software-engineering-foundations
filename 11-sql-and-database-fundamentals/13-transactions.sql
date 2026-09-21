/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Database Transactions & ACID Properties
  ==============================================================================

  1. WHAT IS A TRANSACTION?
     A sequence of one or more SQL operations executed as a single, atomic unit of work.
     Either ALL statements succeed together (`COMMIT`), or if anything fails,
     the entire operation is undone (`ROLLBACK`) as if nothing happened!

  2. REAL-LIFE ANALOGY:
     Bank Wire Transfer:
     - Step 1: Deduct $100 from Carl's account.
     - Step 2: Add $100 to Sarah's account.
     If the power cuts out or server crashes between Step 1 and Step 2,
     Carl's money must NOT disappear into thin air!
     A transaction rolls back Step 1, restoring Carl's original balance!

  3. JARGON BUSTER:
     - ACID Properties:
       - Atomicity: "All or Nothing".
       - Consistency: Rules and constraints are never violated.
       - Isolation: Concurrent transactions don't interfere with each other.
       - Durability: Once committed, data survives power outages and crashes.
     - `BEGIN`: Starts a transaction block.
     - `COMMIT`: Persists all changes permanently.
     - `ROLLBACK`: Aborts and cancels all changes made in the transaction.
*/

DROP TABLE IF EXISTS account_balances;
CREATE TABLE account_balances (
    account_id INT PRIMARY KEY,
    owner_name VARCHAR(50) NOT NULL,
    balance NUMERIC(10, 2) NOT NULL CHECK (balance >= 0) -- Balance cannot be negative!
);

INSERT INTO account_balances (account_id, owner_name, balance)
VALUES (1, 'Carl', 500.00), (2, 'Sarah', 200.00);

-- ── 1. SUCCESSFUL TRANSACTION (COMMIT) ───────────────────────────────────────
BEGIN;

    -- Debit $100 from Carl
    UPDATE account_balances 
    SET balance = balance - 100.00 
    WHERE account_id = 1;

    -- Credit $100 to Sarah
    UPDATE account_balances 
    SET balance = balance + 100.00 
    WHERE account_id = 2;

COMMIT;

-- Verify balances after successful transfer
SELECT owner_name, balance FROM account_balances;

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT / RESULT SET]
  ------------------------------------------------------------------------------
  owner_name | balance
  -----------+--------
  Carl       | 400.00
  Sarah      | 300.00
*/

-- ── 2. FAILED TRANSACTION WITH ROLLBACK ──────────────────────────────────────
BEGIN;

    -- Attempt to withdraw $1,000 (Violates balance >= 0 check constraint!)
    UPDATE account_balances 
    SET balance = balance - 1000.00 
    WHERE account_id = 1;

    -- If error occurs:
ROLLBACK; -- Undoes everything safely!