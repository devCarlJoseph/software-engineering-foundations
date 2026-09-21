/*
  ==============================================================================
  W3SCHOOLS-STYLE LEARNING GUIDE: PostgreSQL Relationships & Referential Actions
  ==============================================================================

  1. WHAT ARE RELATIONAL CONSTRAINTS IN POSTGRES?
     PostgreSQL provides industrial-strength referential actions to govern what happens
     when parent records are updated or deleted:
     - `ON DELETE RESTRICT`: Blocks parent deletion if child records exist (Default).
     - `ON DELETE CASCADE`: Automatically deletes all child rows when the parent row is deleted.
     - `ON DELETE SET NULL`: Sets the child's foreign key column to NULL.
     - `ON UPDATE CASCADE`: If the parent primary key changes, all children update automatically.

  2. REAL-LIFE ANALOGY:
     A Project and its Sub-Tasks:
     - If a project is cancelled and deleted from the system, all of its sub-tasks
       and checklists should be cleanly removed too (`ON DELETE CASCADE`),
       preventing orphaned zombie tasks from cluttering the database.
*/

DROP TABLE IF EXISTS task_history;
DROP TABLE IF EXISTS user_projects;
DROP TABLE IF EXISTS account_users;

-- Parent Table 1: account_users
CREATE TABLE account_users (
    user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL
);

-- Parent Table 2: user_projects (belongs to account_users)
CREATE TABLE user_projects (
    project_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    owner_id INT NOT NULL,
    project_name VARCHAR(100) NOT NULL,
    CONSTRAINT fk_project_owner 
        FOREIGN KEY (owner_id) 
        REFERENCES account_users(user_id) 
        ON DELETE CASCADE
);

-- Child Table: task_history (belongs to user_projects)
CREATE TABLE task_history (
    history_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    project_id INT NOT NULL,
    action_description TEXT NOT NULL,
    CONSTRAINT fk_history_project 
        FOREIGN KEY (project_id) 
        REFERENCES user_projects(project_id) 
        ON DELETE CASCADE
);

-- Insert hierarchy
INSERT INTO account_users (email) VALUES ('carl@dev.com');
INSERT INTO user_projects (owner_id, project_name) VALUES (1, 'TaskFlow Backend');
INSERT INTO task_history (project_id, action_description) VALUES (1, 'Created project repository');

-- Demonstrating ON DELETE CASCADE:
-- Deleting the user automatically deletes their projects AND task histories!
DELETE FROM account_users WHERE user_id = 1;

-- Check child tables (both should now have 0 rows!)
SELECT 
    (SELECT COUNT(*) FROM user_projects) AS remaining_projects,
    (SELECT COUNT(*) FROM task_history) AS remaining_histories;

/*
  ------------------------------------------------------------------------------
  [EXPECTED OUTPUT / RESULT SET]
  ------------------------------------------------------------------------------
  remaining_projects | remaining_histories
  -------------------+--------------------
  0                  | 0
*/