# Assessment: Object-Oriented Programming (OOP)

---

### Part 1: Conceptual & Architecture Questions

#### Q1: What is the main reason to prefer "Composition over Inheritance"?
- [ ] A) Inheritance creates brittle, tightly-coupled hierarchies where changes to a parent class break subclasses
- [ ] B) Composition is only allowed in functional programming
- [ ] C) Inheritance uses more memory
- [ ] D) Classes cannot inherit methods in modern OOP

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Correct Answer: A**

Inheritance models *"is-a"* relationships and tightly couples classes. Composition models *"has-a"* relationships by assembling smaller, independent components, leading to far more flexible, testable code.
</details>

---

#### Q2: What is the primary purpose of Abstraction?
- [ ] A) To make all classes private
- [ ] B) To hide complex internal implementation details and expose only essential, high-level interfaces
- [ ] C) To create duplicate database records
- [ ] D) To avoid writing unit tests

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Correct Answer: B**

Abstraction lets consumers use a class through a simple interface (e.g. `car.drive()`) without needing to understand the internal mechanics of the combustion engine or fuel injection.
</details>

---

### Part 2: Code Architecture Challenge

#### Refactor this tightly coupled inheritance hierarchy into clean Composition:
```typescript
// TIGHTLY COUPLED INHERITANCE:
class DatabaseUser {
  save() { console.log("Saved to database"); }
  sendEmail() { console.log("Sent welcome email"); }
}

class AdminUser extends DatabaseUser {
  deleteSystem() { console.log("Deleted system"); }
}
```

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Clean Composition Approach:**
```typescript
interface DatabaseService {
  save(data: unknown): void;
}

interface NotificationService {
  sendEmail(to: string, message: string): void;
}

class User {
  constructor(
    private db: DatabaseService,
    private notifier: NotificationService,
    public username: string
  ) {}

  public register() {
    this.db.save({ user: this.username });
    this.notifier.sendEmail(this.username, "Welcome aboard!");
  }
}
```
Now `User` has zero knowledge of how database queries or email transports work, making it easy to test with mocks!
</details>

---

### Part 3: Interview Defense Question

> **Question:** *"What is Polymorphism, and how do Interfaces enable it?"*

<details>
<summary><b>🔍 View Model Answer</b></summary>

**Model Answer:**
Polymorphism ("many forms") is the ability of different classes to respond to the same method call in their own specific way.
By having classes implement a common interface (e.g., `interface PaymentMethod { pay(amount: number): void }`), a checkout service can process `StripePayment`, `PayPalPayment`, or `CryptoPayment` identically without knowing which concrete class is passed.
</details>