/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Creating & Modifying Tables
  ==============================================================================

  1. WHAT IS A TABLE?
     A table is the foundational building block of a relational database.
     It has a defined name, rows representing records, and columns with strict
     data types and constraints (e.g. `NOT NULL`, `DEFAULT`, `CHECK`).

  2. REAL-LIFE ANALOGY:
     A Pre-Printed Membership Application Form:
     - The paper has fixed boxes: "Full Name (Text only)", "Age (Number)", "Signature".
     - You cannot write your name in the Age box, and you cannot leave required
       fields blank. The form guarantees clean, uniform records!

  3. JARGON BUSTER:
     - `VARCHAR(n)`: Variable-length string up to `n` characters.
     - `BOOLEAN`: Stores `TRUE` or `FALSE`.
     - `TIMESTAMP`: Date and time value (use `TIMESTAMPTZ` for timezone support).
     - `NOT NULL`: Column constraint preventing empty/null values.
     - `DEFAULT`: Fallback value automatically applied when not provided during insert.
*/

-- =============================================================================
-- BAD PRACTICE: UNCONSTRAINED TABLES (ALLOWS DIRTY DATA)
-- =============================================================================
/*
  CREATE TABLE users (
      id INT,
      email TEXT, -- No NOT NULL constraint! Users can exist with no email!
      age INT     -- No CHECK! Someone could insert age = -999!
  );
*/

-- =============================================================================
-- GOOD PRACTICE: STRICT COLUMN CONSTRAINTS & AUDIT TIMESTAMPS
-- =============================================================================

-- Clean teardown for replayable runs
DROP TABLE IF EXISTS user_profiles;

-- Creating a robust table with data integrity checks
CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    bio TEXT,
    age INT CHECK (age >= 18 AND age <= 120),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Inspect table column structure
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns
WHERE table_name = 'user_profiles'
ORDER BY ordinal_position;

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT / RESULT SET]
  ------------------------------------------------------------------------------
  column_name | data_type                | is_nullable | column_default
  ------------+--------------------------+-------------+---------------------------
  id          | integer                  | NO          | nextval('user_profiles_id_seq'::regclass)
  username    | character varying        | NO          | NULL
  email       | character varying        | NO          | NULL
  bio         | text                     | YES         | NULL
  age         | integer                  | YES         | NULL
  is_active   | boolean                  | NO          | true
  created_at  | timestamp with time zone | NO          | CURRENT_TIMESTAMP
  updated_at  | timestamp with time zone | NO          | CURRENT_TIMESTAMP
*/

-- =============================================================================
-- BEHIND THE SCENES
-- =============================================================================
/*
  ALWAYS include `created_at` and `updated_at` timestamps on production tables!
  They are essential for debugging, auditing security events, and tracking
  when rows were modified by APIs.
*/