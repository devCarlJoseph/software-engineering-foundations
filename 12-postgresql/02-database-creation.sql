/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Creating Databases, Roles, and Schemas
  ==============================================================================

  1. WHAT ARE ROLES AND SCHEMAS IN POSTGRESQL?
     - Database: The top-level container for data.
     - Role: A user account that can log in, or a group of permissions.
     - Schema: A namespace inside a database that contains tables (like folders
       inside a hard drive). By default, tables are created in the `public` schema.

  2. REAL-LIFE ANALOGY:
     An Office Building:
     - Database = The entire office building ("TaskFlow Headquarters").
     - Roles = Employee keycards with specific permissions (Manager key vs Guest key).
     - Schemas = Department floors (Floor 2: "accounting", Floor 3: "human_resources").
       Each department can have a table named "invoices" without name collisions!

  3. JARGON BUSTER:
     - `ENCODING 'UTF8'`: Ensures the database supports all international alphabets,
       languages, and emojis without data corruption.
     - Principle of Least Privilege: Never use the root `postgres` user in your Node.js app!
       Always create a dedicated app user with restricted permissions!
*/

-- =============================================================================
-- CREATING A DEDICATED APPLICATION USER & DATABASE
-- =============================================================================

-- Step 1: Create an isolated application user role with password
-- (Run this as postgres superuser)
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'taskflow_app_user') THEN
        CREATE ROLE taskflow_app_user WITH LOGIN PASSWORD 'SecureAppPass2026!';
    END IF;
END $$;

-- Step 2: Create a production-ready database with UTF-8 character encoding
-- Note: CREATE DATABASE cannot run inside a multi-statement transaction block in psql
-- CREATE DATABASE taskflow_production
--     WITH OWNER = taskflow_app_user
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'en_US.UTF-8'
--     LC_CTYPE = 'en_US.UTF-8';

-- Step 3: Verify created databases and owners
SELECT 
    datname AS database_name,
    pg_catalog.pg_get_userbyid(datdba) AS owner_name,
    pg_encoding_to_char(encoding) AS character_encoding
FROM pg_database
WHERE datname LIKE 'taskflow%' OR datname = 'postgres'
ORDER BY datname;

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT / RESULT SET]
  ------------------------------------------------------------------------------
  database_name       | owner_name        | character_encoding
  --------------------+-------------------+-------------------
  postgres            | postgres          | UTF8
  taskflow_production | taskflow_app_user | UTF8
*/