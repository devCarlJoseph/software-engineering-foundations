# Assessment: JavaScript Fundamentals

---

### Part 1: Conceptual & Architecture Questions

#### Q1: What is the output of the following closure snippet?
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 50);
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 50);
}
```
- [ ] A) `0, 1, 2` followed by `0, 1, 2`
- [ ] B) `3, 3, 3` followed by `0, 1, 2`
- [ ] C) `3, 3, 3` followed by `3, 3, 3`
- [ ] D) `0, 1, 2` followed by `3, 3, 3`

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Correct Answer: B (`3, 3, 3` followed by `0, 1, 2`)**

- `var` is function-scoped. By the time the asynchronous timer callbacks run from the Macrotask queue, the loop has completed and the single shared variable `i` is `3`.
- `let` is block-scoped. Each loop iteration creates a fresh binding for `j`, preserving `0`, `1`, and `2` for each respective callback closure.
</details>

---

#### Q2: What will `typeof null` and `typeof NaN` return?
- [ ] A) `"null"` and `"NaN"`
- [ ] B) `"object"` and `"number"`
- [ ] C) `"undefined"` and `"number"`
- [ ] D) `"object"` and `"object"`

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Correct Answer: B (`"object"` and `"number"`)**

- `typeof null === "object"` is a famous historical bug in JavaScript's initial implementation where the type tag for objects was `0`, and `null` was represented as the NULL pointer (`0x00`).
- `NaN` stands for "Not-a-Number", but per the IEEE 754 floating-point specification, its data type is numeric (`"number"`).
</details>

---

### Part 2: Predict the Output Challenge

```javascript
const user = {
  name: "Carl",
  regularFn: function() { return `Hi, ${this.name}`; },
  arrowFn: () => { return `Hi, ${this.name}`; }
};

const detached = user.regularFn;

console.log(user.regularFn());
console.log(user.arrowFn());
console.log(detached());
```

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Output:**
```text
Hi, Carl
Hi, undefined
Hi, undefined
```
- `user.regularFn()`: Invoked with `user` as receiver; `this` points to `user`.
- `user.arrowFn()`: Arrow functions do not bind `this`; they inherit lexically from the outer module scope where `this.name` is `undefined`.
- `detached()`: Invoked without an object context, causing `this` to be `undefined` in strict mode.
</details>

---

### Part 3: Real-World Bug Hunt Challenge

```javascript
// BUG ALERT: Find the subtle flaw in this discount calculation
function applyDiscount(price, discount) {
  if (!price) {
    throw new Error("Price is required!");
  }
  const finalPrice = price - (discount || 0.1) * price;
  return finalPrice;
}

// What happens if price is 0 (Free product) or discount is 0 (No discount)?
```

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**The Bugs:**
1. If `price === 0`, `!price` evaluates to `true`, throwing an error for free items!
2. If `discount === 0` (0% off), `discount || 0.1` evaluates `0` as falsy and applies an unwanted `10%` discount!

**Fix (Use Nullish Coalescing `??` and explicit type checks):**
```javascript
function applyDiscount(price, discount) {
  if (typeof price !== "number" || price < 0) {
    throw new Error("Valid price is required!");
  }
  const activeDiscount = discount ?? 0.1;
  return price - activeDiscount * price;
}
```
</details>

---

### Part 4: Interview Defense Question

> **Question:** *"Why does `0.1 + 0.2 !== 0.3` in JavaScript, and how do you handle monetary calculations reliably in financial backends?"*

<details>
<summary><b>🔍 View Model Answer</b></summary>

**Model Answer:**
JavaScript represents numbers using IEEE 754 double-precision 64-bit binary floating point. Fractions like `1/10` repeat infinitely in binary, causing tiny precision rounding errors (`0.30000000000000004`).

**Production Solution:**
1. Store currency as integers in the smallest unit (e.g., store $19.99 as `1999` cents).
2. In PostgreSQL, always use `NUMERIC` or `DECIMAL` columns, never `FLOAT`.
3. Use arbitrary-precision libraries like `decimal.js` for complex financial math.
</details>