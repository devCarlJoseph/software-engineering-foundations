/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: Database Relationships (1:1, 1:N, M:N)
  ==============================================================================

  1. WHAT ARE RELATIONSHIPS?
     The mathematical associations between tables in a database schema:
     1. One-to-One (1:1): One row in Table A maps to exactly one row in Table B.
     2. One-to-Many (1:N): One row in Table A maps to multiple rows in Table B (Most Common).
     3. Many-to-Many (M:N): Multiple rows in Table A map to multiple rows in Table B
        (requires a Junction/Pivot Table).

  2. REAL-LIFE ANALOGIES:
     - 1:1: Citizen and Passport (One person has one passport; one passport belongs to one person).
     - 1:N: Customer and Orders (One customer places 20 orders; each order belongs to one customer).
     - M:N: Students and Courses (One student enrolls in 5 courses; each course has 40 students).

  3. JARGON BUSTER:
     - Junction / Pivot / Bridge Table: A table whose sole job is connecting two tables
       in an M:N relationship by holding two Foreign Keys.
     - Cardinality: The numerical count of how records relate across tables.
*/

-- =============================================================================
-- IMPLEMENTATION OF ALL 3 RELATIONSHIP TYPES
-- =============================================================================

DROP TABLE IF EXISTS task_tag_junction;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS tasks_rel;
DROP TABLE IF EXISTS user_settings;
DROP TABLE IF EXISTS users_rel;

-- ── 1. ONE-TO-ONE (1:1): Users and User Settings ─────────────────────────────
CREATE TABLE users_rel (
    user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(50) NOT NULL
);

CREATE TABLE user_settings (
    user_id INT PRIMARY KEY, -- Primary Key AND Foreign Key in one ensures 1:1!
    dark_mode BOOLEAN DEFAULT TRUE,
    email_notifications BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_user_settings FOREIGN KEY (user_id) REFERENCES users_rel(user_id) ON DELETE CASCADE
);

-- ── 2. ONE-TO-MANY (1:N): One User has Many Tasks ────────────────────────────
CREATE TABLE tasks_rel (
    task_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT NOT NULL, -- Many tasks point to one user
    title VARCHAR(100) NOT NULL,
    CONSTRAINT fk_tasks_user FOREIGN KEY (user_id) REFERENCES users_rel(user_id) ON DELETE CASCADE
);

-- ── 3. MANY-TO-MANY (M:N): Tasks and Tags (via Junction Table) ───────────────
CREATE TABLE tags (
    tag_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tag_name VARCHAR(30) UNIQUE NOT NULL
);

-- Junction Table linking Tasks <-> Tags
CREATE TABLE task_tag_junction (
    task_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (task_id, tag_id), -- Composite Primary Key prevents duplicate pairings
    CONSTRAINT fk_junction_task FOREIGN KEY (task_id) REFERENCES tasks_rel(task_id) ON DELETE CASCADE,
    CONSTRAINT fk_junction_tag FOREIGN KEY (tag_id) REFERENCES tags(tag_id) ON DELETE CASCADE
);

-- Populate sample M:N association
INSERT INTO users_rel (username) VALUES ('carl_developer');
INSERT INTO tasks_rel (user_id, title) VALUES (1, 'Complete SQL Module');
INSERT INTO tags (tag_name) VALUES ('Database'), ('Backend');

-- Link task #1 with both 'Database' and 'Backend' tags
INSERT INTO task_tag_junction (task_id, tag_id) VALUES (1, 1), (1, 2);

-- Query the Many-to-Many relationship
SELECT 
    t.title AS task_title,
    tg.tag_name
FROM tasks_rel t
JOIN task_tag_junction j ON t.task_id = j.task_id
JOIN tags tg ON j.tag_id = tg.tag_id;

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT / RESULT SET]
  ------------------------------------------------------------------------------
  task_title          | tag_name
  --------------------+----------
  Complete SQL Module | Database
  Complete SQL Module | Backend
*/