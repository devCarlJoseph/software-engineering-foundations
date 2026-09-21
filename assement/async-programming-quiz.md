# Assessment: Asynchronous Programming

---

### Part 1: Conceptual & Architecture Questions

#### Q1: What happens if an `async` function throws an error?
- [ ] A) The Node.js process immediately exits
- [ ] B) It returns a Promise in the rejected state (`Promise.reject(err)`)
- [ ] C) It returns `null`
- [ ] D) It freezes execution

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Correct Answer: B**

Every `async` function returns a Promise. Throwing an error causes that Promise to be rejected, which can be caught via `try/catch` or `.catch()`.
</details>

---

#### Q2: What is the main difference between `Promise.all()` and `Promise.allSettled()`?
- [ ] A) `Promise.all()` is slower than `Promise.allSettled()`
- [ ] B) `Promise.all()` short-circuits and rejects immediately if ANY promise rejects; `Promise.allSettled()` waits for ALL promises to finish regardless of success or failure
- [ ] C) `Promise.allSettled()` only works with timers
- [ ] D) They are identical

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Correct Answer: B**

`Promise.all` is "all-or-nothing" (ideal when every task is mandatory). `Promise.allSettled` is ideal when you want results from independent operations even if some fail.
</details>

---

### Part 2: Predict the Event Loop Execution Order

```javascript
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
process.nextTick(() => console.log("4"));
console.log("5");
```

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Output:** `1`, `5`, `4`, `3`, `2`

1. `1` and `5` are synchronous call stack operations.
2. `4` (`process.nextTick`) executes immediately after synchronous code, before microtasks.
3. `3` (Promise microtask) executes from the microtask queue.
4. `2` (`setTimeout` macrotask) executes in the next event loop iteration.
</details>

---

### Part 3: Real-World Bug Hunt Challenge

```javascript
// BUG ALERT: Why is this loop running sequentially instead of in parallel?
async function fetchUserDashboard(userIds) {
  const dashboards = [];
  for (const id of userIds) {
    const data = await api.get(`/users/${id}`);
    dashboards.push(data);
  }
  return dashboards;
}
```

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**The Flaw:** Using `await` inside a `for...of` loop forces each request to wait for the previous one to finish, taking `N * latency` time!

**Optimal Fix (Run concurrently with `Promise.all`):**
```javascript
async function fetchUserDashboard(userIds) {
  return Promise.all(userIds.map(id => api.get(`/users/${id}`)));
}
```
</details>

---

### Part 4: Interview Defense Question

> **Question:** *"What is the unhandledRejection event in Node.js and why is it dangerous?"*

<details>
<summary><b>🔍 View Model Answer</b></summary>

**Model Answer:**
An `unhandledRejection` occurs when a Promise rejects and has no `.catch()` handler attached. In modern Node.js, unhandled promise rejections terminate the Node process with a non-zero exit code to prevent servers from running in an unpredictable, corrupted state.
</details>