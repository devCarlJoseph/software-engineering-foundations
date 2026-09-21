# Assessment: PostgreSQL

---

### Part 1: PostgreSQL Features Questions

#### Q1: Which index type in PostgreSQL is specifically designed for querying JSONB documents with containment operators (`@>`)?
- [ ] A) B-Tree
- [ ] B) GIN (Generalized Inverted Index)
- [ ] C) Hash
- [ ] D) BRIN

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Correct Answer: B (GIN Index)**

GIN indexes are designed for multi-key composite structures like `JSONB`, text search vectors, and arrays, making containment queries fast.
</details>

---

#### Q2: How should queries always be executed in Node.js using `pg` to prevent SQL Injection?
- [ ] A) String concatenation: `pool.query("SELECT * FROM users WHERE id = " + id)`
- [ ] B) String interpolation: `pool.query(\`SELECT * FROM users WHERE id = ${id}\`)`
- [ ] C) Parameterized queries: `pool.query("SELECT * FROM users WHERE id = $1", [id])`
- [ ] D) Converting inputs to uppercase

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Correct Answer: C**

Parameterized queries send SQL statements and raw user parameters separately to the database engine, treating user input strictly as data, not executable code.
</details>

---

### Part 2: Index Optimization Challenge

#### Look at this query executed on a table of 2,000,000 tasks:
```sql
SELECT id, title, created_at 
FROM tasks 
WHERE user_id = 4502 AND status = 'pending' 
ORDER BY created_at DESC 
LIMIT 20;
```
**Write the single most optimal composite index to make this query run in < 2 milliseconds.**

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Optimal Composite Index:**
```sql
CREATE INDEX idx_tasks_user_status_created 
ON tasks (user_id, status, created_at DESC);
```
- Places equality columns (`user_id`, `status`) first.
- Places sort column (`created_at DESC`) last, allowing Postgres to scan the already pre-sorted index without performing an expensive in-memory quicksort!
</details>

---

### Part 3: Interview Defense Question

> **Question:** *"Why is `gen_random_uuid()` often preferred as a Primary Key over auto-incrementing `SERIAL` in modern cloud backends?"*

<details>
<summary><b>🔍 View Model Answer</b></summary>

**Model Answer:**
1. **Distributed Generation:** Applications can generate UUIDs in memory before hitting the database without waiting for database sequence generation.
2. **Security:** Sequential IDs (`/users/1`, `/users/2`) expose customer counts and invite enumeration scraping attacks; UUIDs are unguessable.
3. **Database Merging:** UUIDs prevent collisions when merging databases from different environments or shards.
</details>