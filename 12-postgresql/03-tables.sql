/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: PostgreSQL Tables & Modern Data Types
  ==============================================================================

  1. WHAT MAKES POSTGRES TABLES SPECIAL?
     Postgres offers modern data types that go far beyond primitive integers and strings:
     - `UUID`: Cryptographically secure unique identifiers.
     - `JSONB`: High-performance binary JSON with indexing and key-lookup capabilities!
     - `TIMESTAMPTZ`: Timestamp with full timezone preservation.
     - `TEXT`: Unlimited variable-length string (no performance difference vs VARCHAR in Postgres!).
     - `ENUM`: Custom type restricting a column to a strict list of allowed values.

  2. REAL-LIFE ANALOGY:
     A Modular Storage Rack with Specialized Bins:
     - A bin with dividers for dates with timezones.
     - A flexible plastic container (`JSONB`) for storing unstructured nested documents
       like user preferences or audit tags.
*/

-- Setup: Enable UUID generation extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS app_tasks;
DROP TYPE IF EXISTS task_priority_enum;

-- Step 1: Define a custom Postgres ENUM type
CREATE TYPE task_priority_enum AS ENUM ('low', 'medium', 'high', 'critical');

-- Step 2: Create table utilizing Postgres-native data types
CREATE TABLE app_tasks (
    -- UUID Primary Key generated automatically
    task_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    title VARCHAR(150) NOT NULL,
    description TEXT,
    
    -- Using the custom ENUM
    priority task_priority_enum NOT NULL DEFAULT 'medium',
    
    -- JSONB: Stores nested structured data (tags, custom user settings)
    metadata JSONB DEFAULT '{}'::jsonb,
    
    -- Always use TIMESTAMPTZ in production backends:
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample row with JSONB metadata
INSERT INTO app_tasks (title, priority, metadata)
VALUES (
    'Configure PostgreSQL Connection Pool',
    'high',
    '{"tags": ["database", "devops"], "client": "Acme Corp", "estimatedHours": 4}'::jsonb
);

-- Query the JSONB column directly using Postgres ->> operators
SELECT 
    title,
    priority,
    metadata->>'client' AS client_name,
    metadata->'tags'->>0 AS primary_tag
FROM app_tasks;

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT / RESULT SET]
  ------------------------------------------------------------------------------
  title                                | priority | client_name | primary_tag
  -------------------------------------+----------+-------------+------------
  Configure PostgreSQL Connection Pool | high     | Acme Corp   | database
*/