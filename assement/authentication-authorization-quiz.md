# Assessment: Authentication & Authorization

---

### Part 1: Security Multiple-Choice

#### Q1: What HTTP status code corresponds to an Authentication failure vs an Authorization failure?
- [ ] A) AuthN: 403 Forbidden | AuthZ: 401 Unauthorized
- [ ] B) AuthN: 401 Unauthorized | AuthZ: 403 Forbidden
- [ ] C) Both return 400 Bad Request
- [ ] D) Both return 500 Server Error

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Correct Answer: B**

- **401 Unauthorized:** "Who are you?" (Missing or invalid token).
- **403 Forbidden:** "I know who you are, but you do not have permission to access this resource" (Role restriction).
</details>

---

#### Q2: Is a standard JWT encrypted?
- [ ] A) Yes, nobody can read the payload without the secret key
- [ ] B) No, JWT payloads are only Base64Url encoded; anyone can decode and read them, but cannot tamper with them without invalidating the signature
- [ ] C) Only when using HTTPS
- [ ] D) Only in production

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Correct Answer: B**

JWTs are signed, **not encrypted**! Anyone can decode the payload on `jwt.io`. Never store sensitive passwords or credit card numbers in a JWT payload!
</details>

---

### Part 2: Security Implementation Challenge

#### Write a TypeScript middleware `requireRole(role: string)` that inspects `req.user` and enforces Role-Based Access Control (RBAC).

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

```typescript
import { Request, Response, NextFunction } from "express";

export function requireRole(allowedRole: "admin" | "member") {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: Login required." });
    }

    if (req.user.role !== "admin" && req.user.role !== allowedRole) {
      return res.status(403).json({ error: `Forbidden: Requires '${allowedRole}' role.` });
    }

    return next();
  };
}
```
</details>

---

### Part 3: Interview Defense Question

> **Question:** *"Why are passwords hashed with a Salt and slow work factors (bcrypt/Argon2) rather than fast hashes like MD5 or SHA-256?"*

<details>
<summary><b>🔍 View Model Answer</b></summary>

**Model Answer:**
- **Salt:** Appending random bytes ensures identical passwords yield completely different hashes, neutralizing pre-computed lookup tables (Rainbow Tables).
- **Slow Work Factor:** SHA-256 was built for fast data verification; modern GPUs can calculate billions of SHA-256 hashes per second. Algorithms like bcrypt and Argon2 are key-stretching functions with adjustable computational costs, making brute-force cracking mathematically impractical.
</details>