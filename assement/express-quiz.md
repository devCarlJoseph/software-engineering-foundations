# Assessment: Express.js Architecture

---

### Part 1: Middleware & Routing Questions

#### Q1: What causes the error `Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client`?
- [ ] A) The port is already in use
- [ ] B) Attempting to send a response (`res.json()`, `res.send()`) more than once in a single request cycle
- [ ] C) Missing body-parser
- [ ] D) Invalid URL syntax

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Correct Answer: B**

HTTP is a single-request, single-response protocol. Once headers are sent, you cannot send another response. Always use `return res.status(...)...` to prevent execution from continuing!
</details>

---

#### Q2: How does Express identify an Error-Handling Middleware?
- [ ] A) By its function name
- [ ] B) By having exactly 4 parameters: `(err, req, res, next)`
- [ ] C) By placing it at the top of the file
- [ ] D) By throwing an error inside it

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Correct Answer: B**

Express inspects function arity (`fn.length`). Only functions with exactly 4 parameters are treated as error handlers.
</details>

---

### Part 2: Bug Hunt Challenge

```typescript
// Find the bug that causes this route to hang indefinitely on error:
app.get("/api/tasks", async (req, res, next) => {
  try {
    const tasks = await db.getTasks();
    res.json(tasks);
  } catch (err) {
    console.error("Database failed", err);
  }
});
```

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**The Bug:** The `catch` block logs the error, but **never sends a response or calls `next(err)`**! The client's browser will spin until timeout.

**Fix:**
```typescript
} catch (err) {
  return next(err); // Delegate to global error middleware!
}
```
</details>

---

### Part 3: Interview Defense Question

> **Question:** *"Why should you separate `app.ts` (Express instance configuration) from `server.ts` (`app.listen()`) in production Node.js projects?"*

<details>
<summary><b>🔍 View Model Answer</b></summary>

**Model Answer:**
Separating configuration from networking allows automated integration testing with Supertest without binding to a physical network port. It also allows exporting `app` to serverless platforms (like AWS Lambda) while keeping local Docker deployments identical.
</details>