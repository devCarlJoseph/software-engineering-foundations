/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: PostgreSQL Setup & Cluster Verification
  ==============================================================================

  1. WHAT IS POSTGRESQL?
     PostgreSQL ("Postgres") is the world's most advanced open-source object-relational
     database system. It has over 35 years of active development, renowned for
     rock-solid reliability, data integrity, rich feature set (JSONB, Full-Text
     Search), and strict SQL standards compliance.

  2. REAL-LIFE ANALOGY:
     A Bank Vault with High-Precision Clocks and Security Guards:
     - Other systems might prioritize raw speed at the cost of losing a transaction.
     - Postgres is engineered so that once it says "Saved", that data survives
       crashes, power cuts, and disk failures without ever getting corrupted.

  3. JARGON BUSTER:
     - Cluster: A collection of databases managed by a single running PostgreSQL server instance.
     - `psql`: The official interactive terminal-based frontend CLI for PostgreSQL.
     - Default Port: `5432` is the standard TCP port Postgres listens on.
     - Default Superuser: `postgres` is the default root administrative user.
*/

-- =============================================================================
-- SYSTEM SETUP VERIFICATION QUERIES
-- =============================================================================

-- 1. Check server version, operating system architecture, and compiler
SELECT version() AS postgres_full_version;

-- 2. Inspect active connection details
SELECT 
    current_user AS logged_in_user,
    current_database() AS connected_database,
    inet_server_addr() AS server_ip_address,
    inet_server_port() AS listening_port;

-- 3. Check uptime and start time of the Postgres cluster
SELECT 
    pg_postmaster_start_time() AS server_started_at,
    now() - pg_postmaster_start_time() AS total_server_uptime;

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT / RESULT SET]
  ------------------------------------------------------------------------------
  logged_in_user | connected_database | server_ip_address | listening_port
  ---------------+--------------------+-------------------+---------------
  postgres       | postgres           | 127.0.0.1         | 5432

  server_started_at             | total_server_uptime
  ------------------------------+--------------------
  2026-09-22 02:00:00.123456+00 | 00:45:12.345678
*/

-- =============================================================================
-- BEHIND THE SCENES: ESSENTIAL psql CLI SHORTCUT COMMANDS
-- =============================================================================
/*
  Inside your terminal `psql`:
  ┌───────────────┬────────────────────────────────────────────────────────────┐
  │ Command       │ What It Does                                               │
  ├───────────────┼────────────────────────────────────────────────────────────┤
  │ \l            │ List all databases in the cluster                          │
  │ \c <dbname>   │ Connect / switch to another database                       │
  │ \dt           │ List all tables in current database                        │
  │ \d <table_name>│ Describe columns, types, and indexes of a specific table │
  │ \du           │ List all database users and their roles                    │
  │ \q            │ Quit / exit psql                                           │
  └───────────────┴────────────────────────────────────────────────────────────┘
*/