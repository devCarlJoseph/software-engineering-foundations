/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: PostgreSQL Integration with Node.js (`pg`)
  ==============================================================================

  1. HOW DOES NODE.JS TALK TO POSTGRESQL?
     Node.js connects to PostgreSQL using the industry-standard `pg` (node-postgres) driver.
     Key architectural requirements:
     1. Connection Pooling (`pg.Pool`): Reusing persistent TCP socket connections
        instead of creating a new expensive connection per HTTP request.
     2. Parameterized Queries (`$1, $2`): The ONLY defense against SQL Injection!
        Never concatenate user strings directly into SQL queries!

  2. REAL-LIFE ANALOGY:
     A Taxi Fleet vs. Buying a New Car for Every Trip:
     - Without Connection Pool: Every customer buys a brand new car from the dealership,
       drives to their destination, and crushes the car into scrap metal (Disastrous latency!).
     - With Connection Pool: A fleet of 10 taxis wait in a queue. A rider hops in,
       gets dropped off, and the taxi returns to the pool ready for the next customer!
*/

-- =============================================================================
-- SQL SCHEMA REQUIRED FOR THE NODE.JS SERVICE
-- =============================================================================

DROP TABLE IF EXISTS node_tasks;

CREATE TABLE node_tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- CORRESPONDING NODE.JS (TYPESCRIPT) CONNECTION POOL & QUERY IMPLEMENTATION
-- =============================================================================
/*
  import { Pool } from "pg";

  // 1. Configure the Connection Pool using Environment Variables
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/taskflow_db",
    max: 20,                   // Maximum 20 simultaneous client connections
    idleTimeoutMillis: 30000,  // Close idle clients after 30 seconds
    connectionTimeoutMillis: 2000, // Error if connection takes > 2s
  });

  // 2. SAFE PARAMETERIZED QUERY (PREVENTS SQL INJECTION)
  async function createNewTask(title: string): Promise<any> {
    // DO NOT DO THIS: `INSERT INTO node_tasks (title) VALUES ('${title}')` <- SQL INJECTION VULNERABLE!
    
    // ALWAYS DO THIS (Parameterized with $1):
    const queryText = `
      INSERT INTO node_tasks (title) 
      VALUES ($1) 
      RETURNING id, title, is_completed, created_at;
    `;
    
    const values = [title]; // Database safely escapes parameter
    const result = await pool.query(queryText, values);
    return result.rows[0];
  }

  // 3. SAFE QUERY WITH MULTIPLE PARAMETERS
  async function updateTaskStatus(taskId: number, completed: boolean): Promise<any> {
    const queryText = `
      UPDATE node_tasks 
      SET is_completed = $1 
      WHERE id = $2 
      RETURNING *;
    `;
    const result = await pool.query(queryText, [completed, taskId]);
    return result.rows[0];
  }
*/

-- Verify initial table is ready for Node.js connections
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'node_tasks';

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT / RESULT SET]
  ------------------------------------------------------------------------------
  table_name | column_name  | data_type
  -----------+--------------+--------------------------
  node_tasks | id           | integer
  node_tasks | title        | character varying
  node_tasks | is_completed | boolean
  node_tasks | created_at   | timestamp with time zone
*/