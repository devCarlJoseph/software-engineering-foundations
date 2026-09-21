# Assessment: Clean Code & Software Design

---

### Part 1: Best Practices Multiple-Choice

#### Q1: What is a "Guard Clause"?
- [ ] A) A cryptographic firewall
- [ ] B) An early return check at the top of a function that handles invalid inputs or edge cases, flattening nested if-else pyramids
- [ ] C) A database transaction lock
- [ ] D) A TypeScript linter rule

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Correct Answer: B**

Guard clauses validate inputs and return early, keeping the "happy path" flat and easy to read.
</details>

---

#### Q2: What is "Technical Debt"?
- [ ] A) The cost of hosting servers in the cloud
- [ ] B) Shortcuts taken today (messy code, skipped tests) that result in extra development friction and bugs later
- [ ] C) Missing license files
- [ ] D) Paying for npm packages

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Correct Answer: B**

Just like financial debt, technical debt accrues interest: every new feature takes longer to build and debug until the messy code is refactored.
</details>

---

### Part 2: Refactoring Challenge

#### Refactor this deeply nested "arrow" code using guard clauses:
```typescript
function processOrder(order: any) {
  if (order) {
    if (order.items && order.items.length > 0) {
      if (order.isPaid) {
        return "Order fulfilled";
      } else {
        return "Order not paid";
      }
    } else {
      return "Empty order";
    }
  } else {
    return "Invalid order";
  }
}
```

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Clean Guard Clause Refactor:**
```typescript
function processOrder(order: any): string {
  if (!order) return "Invalid order";
  if (!order.items || order.items.length === 0) return "Empty order";
  if (!order.isPaid) return "Order not paid";

  return "Order fulfilled";
}
```
</details>

---

### Part 3: Interview Defense Question

> **Question:** *"Why is feature-based folder organization superior to type-based organization as a project scales?"*

<details>
<summary><b>🔍 View Model Answer</b></summary>

**Model Answer:**
- **Type-based (`/controllers`, `/services`, `/models`):** Adding a single feature requires modifying files across 4 different folders.
- **Feature-based (`/modules/users`, `/modules/orders`):** Keeps all related models, controllers, and services together. High cohesion, low coupling, and easy deletion or refactoring of features.
</details>