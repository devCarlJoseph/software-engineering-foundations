# Assessment: TypeScript Fundamentals

---

### Part 1: Conceptual & Architecture Questions

#### Q1: What is the primary difference between `interface` and `type` alias?
- [ ] A) Interfaces compile into JavaScript classes; types are erased
- [ ] B) Interfaces support declaration merging (can be reopened); type aliases cannot be declared twice with the same name
- [ ] C) `type` cannot describe object structures
- [ ] D) There are zero differences

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Correct Answer: B**

Interfaces can merge multiple declarations across files. `type` aliases cannot be reopened, but can represent unions (`"pending" | "done"`), tuples, and primitives.
</details>

---

#### Q2: What does TypeScript's `unknown` type represent compared to `any`?
- [ ] A) `unknown` turns off all type checking
- [ ] B) `unknown` is the type-safe counterpart of `any`; you cannot invoke methods on it without narrowing first
- [ ] C) `unknown` is identical to `never`
- [ ] D) `unknown` can only hold `null` or `undefined`

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Correct Answer: B**

`any` disables all compile-time checks. `unknown` forces you to perform type guards (e.g. `typeof x === "string"` or `instanceof`) before accessing properties.
</details>

---

### Part 2: Code Snippet & Type Predicate Challenge

#### How do you fix this function so TypeScript correctly narrows `animal` inside the `if` block?
```typescript
interface Fish { swim: () => void; }
interface Bird { fly: () => void; }

function isFish(animal: Fish | Bird): boolean {
  return (animal as Fish).swim !== undefined;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim(); // Compile error: Property 'swim' does not exist on type 'Bird'
  }
}
```

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Fix:** Change return type from `boolean` to a **Type Predicate**:
```typescript
function isFish(animal: Fish | Bird): animal is Fish {
  return (animal as Fish).swim !== undefined;
}
```
A return type of `animal is Fish` tells the compiler to narrow `pet` inside the truthy branch.
</details>

---

### Part 3: Real-World Generic Challenge

#### Write a type-safe function `getProperty` that extracts a key from an object and blocks invalid keys at compile-time.

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Verification:
const task = { id: 1, title: "Learn TS", isDone: false };
const title = getProperty(task, "title"); // Type: string
// getProperty(task, "password"); // Compile Error!
```
</details>

---

### Part 4: Interview Defense Question

> **Question:** *"Why should you enable `strictNullChecks` and `noImplicitAny` in your `tsconfig.json`?"*

<details>
<summary><b>🔍 View Model Answer</b></summary>

**Model Answer:**
Without `strictNullChecks`, `null` and `undefined` are legal values for every single type, leading to unexpected runtime crashes like `Cannot read properties of undefined`.
Without `noImplicitAny`, TypeScript silently falls back to `any` whenever it cannot infer a type, silently disabling type safety.
</details>