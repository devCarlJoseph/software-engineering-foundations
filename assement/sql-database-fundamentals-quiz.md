# Assessment: SQL & Database Fundamentals

---

### Part 1: Relational Concepts Questions

#### Q1: What does the ACID acronym stand for?
- [ ] A) Action, Consistency, Index, Durability
- [ ] B) Atomicity, Consistency, Isolation, Durability
- [ ] C) Asynchronous, Concurrent, Isolated, Distributed
- [ ] D) Aggregate, Column, Interface, Database

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Correct Answer: B**

- **Atomicity:** All statements succeed or all are rolled back.
- **Consistency:** Database integrity rules and constraints are never violated.
- **Isolation:** Concurrent transactions execute without cross-interference.
- **Durability:** Committed transactions permanently survive crashes.
</details>

---

#### Q2: What is the result of an `INNER JOIN` vs a `LEFT JOIN`?
- [ ] A) `INNER JOIN` returns all rows from left table; `LEFT JOIN` returns matching rows
- [ ] B) `INNER JOIN` returns only rows that match in BOTH tables; `LEFT JOIN` returns ALL rows from left table with matching rows from right (or NULL)
- [ ] C) They are identical in modern SQL
- [ ] D) `LEFT JOIN` is only supported in MySQL

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Correct Answer: B**

If a user has 0 orders, an `INNER JOIN` drops the user entirely. A `LEFT JOIN` keeps the user in the results with `order_id = NULL`.
</details>

---

### Part 2: Normalization Challenge

#### Identify the normalization violation in this table:
```sql
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    customer_name VARCHAR(100),
    customer_city VARCHAR(50),
    customer_zip VARCHAR(10) -- Notice: zip code determines city!
);
```

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Violation:** **Third Normal Form (3NF)**  
**Reason:** Transitive Dependency. `customer_city` depends on `customer_zip`, which is a non-key attribute!

**The Fix:** Separate into 3 clean tables:
1. `zip_codes (zip_code PK, city, state)`
2. `customers (customer_id PK, customer_name, zip_code FK)`
3. `orders (order_id PK, customer_id FK, order_date)`
</details>

---

### Part 3: Interview Defense Question

> **Question:** *"What is the performance trade-off of adding database indexes?"*

<details>
<summary><b>🔍 View Model Answer</b></summary>

**Model Answer:**
Indexes (B-Trees) make `SELECT` queries fast by replacing sequential scans with logarithmic lookups. However, they add storage overhead and **slow down `INSERT`, `UPDATE`, and `DELETE` writes** because the database engine must recalculate and update the index tree on every write operation.
</details>