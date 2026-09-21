# Assessment: SOLID Principles

---

### Part 1: Principle Identification Questions

#### Q1: Which principle is violated if adding a new payment method requires modifying an existing class with another `else if` branch?
- [ ] A) Single Responsibility Principle
- [ ] B) Open/Closed Principle
- [ ] C) Interface Segregation Principle
- [ ] D) Liskov Substitution Principle

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Correct Answer: B (Open/Closed Principle)**

Classes should be **open for extension, but closed for modification**. You should create a new class implementing a `PaymentProcessor` interface rather than modifying existing classes.
</details>

---

#### Q2: What does the Liskov Substitution Principle (LSP) enforce?
- [ ] A) Subtypes must be substitutable for their base types without breaking application correctness
- [ ] B) All functions must return promises
- [ ] C) Every class must have an interface
- [ ] D) Controllers should not talk to repositories

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Correct Answer: A**

If `class ReadOnlyFile extends File`, but calling `readOnlyFile.write()` throws an unsupported operation exception, it violates LSP because it cannot substitute for `File` without breaking callers.
</details>

---

### Part 2: Refactoring Challenge

#### Identify which principle is violated and refactor this code:
```typescript
interface SmartDevice {
  print(): void;
  scan(): void;
  fax(): void;
}

class BasicPrinter implements SmartDevice {
  print() { console.log("Printing..."); }
  scan() { throw new Error("I cannot scan!"); }
  fax() { throw new Error("I cannot fax!"); }
}
```

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Violation:** **Interface Segregation Principle (ISP)**  
Clients should not be forced to depend on methods they do not use.

**Refactored (Segregated Interfaces):**
```typescript
interface Printer { print(): void; }
interface Scanner { scan(): void; }
interface FaxMachine { fax(): void; }

class BasicPrinter implements Printer {
  print() { console.log("Printing..."); }
}

class AllInOneMachine implements Printer, Scanner, FaxMachine {
  print() { console.log("Printing..."); }
  scan() { console.log("Scanning..."); }
  fax() { console.log("Faxing..."); }
}
```
</details>

---

### Part 3: Interview Defense Question

> **Question:** *"Explain Dependency Inversion Principle (DIP) and how Dependency Injection (DI) helps achieve it."*

<details>
<summary><b>🔍 View Model Answer</b></summary>

**Model Answer:**
- **DIP Rule:** High-level modules should not depend on low-level modules; both should depend on abstractions (interfaces).
- **How DI helps:** Instead of a service instantiating its own database client (`this.db = new PostgresClient()`), the database client is injected through the constructor (`constructor(private db: DatabaseInterface)`). This decouples the service from concrete implementations.
</details>