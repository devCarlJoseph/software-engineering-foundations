# Assessment: REST API Design

---

### Part 1: API Conventions Questions

#### Q1: Which HTTP method should be used for a partial update of a resource?
- [ ] A) `PUT`
- [ ] B) `POST`
- [ ] C) `PATCH`
- [ ] D) `UPDATE`

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Correct Answer: C (PATCH)**

`PUT` replaces the **entire** resource. `PATCH` applies **partial updates** to specific fields.
</details>

---

#### Q2: Which URI violates RESTful design conventions?
- [ ] A) `GET /api/v1/tasks`
- [ ] B) `POST /api/v1/tasks`
- [ ] C) `GET /api/v1/getTasksList`
- [ ] D) `DELETE /api/v1/tasks/42`

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Correct Answer: C (`GET /api/v1/getTasksList`)**

RESTful URIs must use **nouns** (resources), never verbs! The HTTP verb (`GET`) already defines the action.
</details>

---

### Part 2: Design Challenge

#### You need to design an endpoint allowing clients to fetch tasks assigned to user #10 that are completed, sorted by creation date, limited to 20 items. Write the canonical RESTful URI.

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Canonical RESTful URI:**
```text
GET /api/v1/tasks?userId=10&status=completed&sort=-createdAt&limit=20
```
*(Or sub-resource style: `GET /api/v1/users/10/tasks?status=completed&sort=-createdAt&limit=20`)*
</details>

---

### Part 3: Interview Defense Question

> **Question:** *"What is the difference between Offset Pagination and Cursor Pagination, and when should you choose each?"*

<details>
<summary><b>🔍 View Model Answer</b></summary>

**Model Answer:**
- **Offset Pagination (`?page=2&limit=20`):** Simple to implement and supports jumping to specific page numbers. However, `OFFSET 1000000` is slow in SQL because it scans all previous rows, and records can shift if rows are inserted while users browse.
- **Cursor Pagination (`?cursor=tsk_100&limit=20`):** Queries rows strictly after a unique ID or timestamp (`WHERE id > cursor LIMIT 20`). Uses B-Tree indexes for instantaneous lookups at scale and is immune to shift anomalies. Best for infinite scroll feeds!
</details>