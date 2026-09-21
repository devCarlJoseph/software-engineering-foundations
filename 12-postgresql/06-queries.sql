/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Advanced PostgreSQL Queries & Aggregations
  ==============================================================================

  1. WHAT ARE ADVANCED QUERIES?
     Queries that analyze and summarize data using aggregate functions (`COUNT`, `SUM`,
     `AVG`, `MIN`, `MAX`), grouping (`GROUP BY`), post-aggregation filtering (`HAVING`),
     and Common Table Expressions (`WITH` CTEs) to break complex logic into clean steps.

  2. REAL-LIFE ANALOGY:
     Monthly Store Financial Report:
     - Instead of reading 10,000 individual receipts line by line, the manager wants:
       "Total sales grouped by department, showing only departments with over $10,000 in sales."
*/

DROP TABLE IF EXISTS task_metrics;

CREATE TABLE task_metrics (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    department VARCHAR(50) NOT NULL,
    task_name VARCHAR(100) NOT NULL,
    hours_spent NUMERIC(5, 2) NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO task_metrics (department, task_name, hours_spent, is_completed)
VALUES
    ('Engineering', 'API Development', 45.5, TRUE),
    ('Engineering', 'Code Review', 12.0, TRUE),
    ('Design', 'Wireframe Mockups', 20.0, TRUE),
    ('Design', 'Icon Assets', 8.5, TRUE),
    ('Marketing', 'Launch Campaign', 60.0, TRUE),
    ('Engineering', 'Database Indexing', 15.0, TRUE);

-- Advanced Query: CTE (Common Table Expression) + Aggregations + HAVING
WITH DepartmentSummary AS (
    SELECT 
        department,
        COUNT(*) AS total_tasks,
        SUM(hours_spent) AS total_hours,
        ROUND(AVG(hours_spent), 1) AS avg_hours_per_task
    FROM task_metrics
    WHERE is_completed = TRUE
    GROUP BY department
    HAVING SUM(hours_spent) > 25.0 -- Only departments with substantial hours
)
SELECT 
    department,
    total_tasks,
    total_hours,
    avg_hours_per_task
FROM DepartmentSummary
ORDER BY total_hours DESC;

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT / RESULT SET]
  ------------------------------------------------------------------------------
  department  | total_tasks | total_hours | avg_hours_per_task
  ------------+-------------+-------------+-------------------
  Engineering | 3           | 72.50       | 24.2
  Marketing   | 1           | 60.00       | 60.0
*/