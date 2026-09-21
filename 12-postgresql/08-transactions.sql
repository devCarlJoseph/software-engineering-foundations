/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: PostgreSQL Transactions & Savepoints
  ==============================================================================

  1. WHAT ARE SAVEPOINTS?
     A Savepoint allows partial rollbacks within a transaction block.
     You can roll back steps that caused an error without losing the rest
     of the work done earlier in the transaction!

  2. REAL-LIFE ANALOGY:
     Checkpoints in a Video Game:
     - You pass Level 1 -> Checkpoint saved (`SAVEPOINT level1`).
     - In Level 2, your character falls off a cliff.
     - You don't restart the ENTIRE game from Level 0; you respawn at Checkpoint 1
       (`ROLLBACK TO SAVEPOINT level1`) and continue!
*/

DROP TABLE IF EXISTS project_budget;

CREATE TABLE project_budget (
    project_name VARCHAR(50) PRIMARY KEY,
    funds NUMERIC(10, 2) NOT NULL
);

INSERT INTO project_budget VALUES ('Project Apollo', 10000.00);

-- Demonstration of Savepoint Rollback
BEGIN;

    -- Step 1: Valid purchase
    UPDATE project_budget 
    SET funds = funds - 2000.00 
    WHERE project_name = 'Project Apollo';

    -- Create Savepoint A
    SAVEPOINT after_first_purchase;

    -- Step 2: Risky experimental purchase
    UPDATE project_budget 
    SET funds = funds - 5000.00 
    WHERE project_name = 'Project Apollo';

    -- We decide to cancel the experimental purchase, but keep Step 1:
    ROLLBACK TO SAVEPOINT after_first_purchase;

COMMIT;

-- Verify balance (Should reflect only Step 1 deduction of 2000)
SELECT project_name, funds FROM project_budget;

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT / RESULT SET]
  ------------------------------------------------------------------------------
  project_name   | funds
  ---------------+--------
  Project Apollo | 8000.00
*/