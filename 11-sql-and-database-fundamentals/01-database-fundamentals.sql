/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Database Fundamentals & DBMS
  ==============================================================================

  1. WHAT IS A RELATIONAL DATABASE (RDBMS)?
     An organized collection of structured data stored electronically in tables
     composed of rows (records) and columns (attributes). A Relational Database
     Management System (RDBMS) like PostgreSQL or MySQL ensures data integrity,
     concurrency, security, and persistence.

  2. REAL-LIFE ANALOGY:
     A Digital Accounting Ledger with Linked Sheets:
     - Excel Workbook = Database
     - Single Sheet = Table
     - Single Row = One Customer Record
     - Single Column Header = An attribute (e.g. Email, Balance)
     Unlike simple spreadsheets, an RDBMS enforces strict rules so nobody can
     enter "abc" into a price column or delete a customer who has pending orders!

  3. JARGON BUSTER:
     - SQL: Structured Query Language, the standardized language used to interact with RDBMS.
     - DDL (Data Definition Language): Commands that define structure (`CREATE`, `ALTER`, `DROP`).
     - DML (Data Manipulation Language): Commands that manage data (`SELECT`, `INSERT`, `UPDATE`, `DELETE`).
     - Schema: The blueprint/structure defining tables, columns, and constraints.
*/

-- =============================================================================
-- BAD PRACTICE: STORING UNSTRUCTURED DATA IN FLAT TEXT FILES
-- =============================================================================
/*
  Writing data to "users.txt" line by line:
  "1,Carl Joseph,carl@dev.com,100"
  Problem: No transactions, concurrent writes corrupt the file, searching 1M rows
  takes 30 seconds, and there is zero type safety!
*/

-- =============================================================================
-- GOOD PRACTICE: CREATING A DEDICATED DATABASE & CHECKING SYSTEM METADATA
-- =============================================================================

-- Step 1: Creating a fresh isolated database for the project (DDL)
-- CREATE DATABASE taskflow_db;

-- Step 2: Selecting / verifying database version and current timestamp
SELECT 
    version() AS database_engine_version,
    CURRENT_TIMESTAMP AS connection_time,
    current_database() AS active_database;

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT / RESULT SET]
  ------------------------------------------------------------------------------
  database_engine_version                          | connection_time            | active_database
  -------------------------------------------------+----------------------------+-----------------
  PostgreSQL 16.x on x86_64-pc-windows-msvc...     | 2026-09-22 02:30:00.000+00 | taskflow_db
*/

-- =============================================================================
-- BEHIND THE SCENES: THE 4 CATEGORIES OF SQL COMMANDS
-- =============================================================================
/*
  ┌───────────────┬──────────────────────────┬─────────────────────────────────┐
  │ Category      │ Full Name                │ Common Commands                 │
  ├───────────────┼──────────────────────────┼─────────────────────────────────┤
  │ DDL           │ Data Definition Language │ CREATE, ALTER, DROP, TRUNCATE   │
  │ DML           │ Data Manipulation Lang.  │ INSERT, UPDATE, DELETE          │
  │ DQL           │ Data Query Language      │ SELECT                          │
  │ DCL / TCL     │ Control & Transaction    │ COMMIT, ROLLBACK, GRANT, REVOKE │
  └───────────────┴──────────────────────────┴─────────────────────────────────┘
*/