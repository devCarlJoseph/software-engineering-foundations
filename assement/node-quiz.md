# Assessment: Node.js Fundamentals

---

### Part 1: Runtime Architecture Multiple-Choice

#### Q1: Which component compiles JavaScript directly into machine code in Node.js?
- [ ] A) Libuv
- [ ] B) Google Chrome V8 Engine
- [ ] C) Express
- [ ] D) npm

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Correct Answer: B (V8 Engine)**

V8 compiles and executes JavaScript code. Libuv handles the Event Loop, asynchronous I/O, and the worker thread pool.
</details>

---

#### Q2: What is the danger of running synchronous methods (`fs.readFileSync`) in an HTTP request handler?
- [ ] A) It deletes the file after reading
- [ ] B) It blocks the single main execution thread, causing all other incoming client requests to freeze until disk reading completes
- [ ] C) It uses 10x more memory
- [ ] D) It throws a compile error

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Correct Answer: B**

Node.js executes JavaScript on a single thread. Blocking it stops all request handling across the entire server.
</details>

---

### Part 2: Code Snippet Challenge

#### What will this module code print?
```javascript
// math.js
exports.add = (a, b) => a + b;
module.exports = (a, b) => a * b;

// app.js
const calc = require("./math");
console.log(typeof calc);
console.log(calc.add);
```

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Output:**
```text
function
undefined
```
**Why:** `exports` is just a pointer to `module.exports`. Reassigning `module.exports = ...` completely overwrites the export object, discarding anything previously attached to `exports`!
</details>

---

### Part 3: Interview Defense Question

> **Question:** *"How does Node.js achieve non-blocking asynchronous I/O with a single main thread?"*

<details>
<summary><b>🔍 View Model Answer</b></summary>

**Model Answer:**
Node.js offloads non-blocking operations to the OS kernel via asynchronous system calls (`epoll`, `kqueue`, `IOCP`). For operations that cannot be done asynchronously by the OS (file system I/O, crypto), Libuv uses a pool of background worker threads (default 4). When background work finishes, the Event Loop schedules the callback back onto the main thread.
</details>