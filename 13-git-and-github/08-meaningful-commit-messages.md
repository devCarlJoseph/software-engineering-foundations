# W3Schools-Style Guide: Conventional Commits

## 1. What are Conventional Commits?
**Conventional Commits** is a lightweight convention on top of commit messages that provides a standardized format for creating an explicit commit history.

### The Canonical Structure:
```text
<type>(<optional scope>): <imperative description>

[optional body]

[optional footer(s)]
```

---

## 2. Real-Life Analogy
> **A Doctor's Medical Chart**
> - **Bad Entry:** "did some work" or "fixed it" or "changes".
>   If a patient has an emergency 3 weeks later, the chart is useless!
> - **Good Entry:** `med(cardio): administered 50mg Metoprolol for blood pressure`.
>   Anyone on the hospital team understands the exact scope and action instantly.

---

## 3. Standard Commit Types

| Type | Purpose | Example |
|---|---|---|
| `feat` | Introduces a new feature | `feat(auth): implement JWT token verification` |
| `fix` | Patches a bug | `fix(db): resolve connection timeout in pg pool` |
| `docs` | Documentation changes only | `docs(readme): add setup and deployment steps` |
| `style` | Formatting, missing semicolons, whitespace | `style(lint): format files according to prettier` |
| `refactor` | Code restructuring without fixing bugs or adding features | `refactor(services): extract email logic into helper` |
| `perf` | Performance improvement | `perf(query): add B-Tree index on task status` |
| `test` | Adding or updating unit/integration tests | `test(auth): add test suite for token expiration` |
| `chore` | Build tools, dependencies, tsconfig changes | `chore(deps): upgrade typescript to version 5.4` |

---

## 4. Good vs. Bad Practice Comparison

| Bad Commit Message ❌ | Why It's Bad | Conventional Commit Message ✅ |
|---|---|---|
| `fixed stuff` | Vague, no scope | `fix(auth): prevent empty passwords during registration` |
| `WIP` | Work in progress, zero info | `feat(api): scaffold task controller handlers` |
| `Added new endpoints` | Past tense, no scope | `feat(tasks): add POST and GET /api/v1/tasks routes` |
| `update` | Tells nothing about changes | `docs(api): document query parameters in README` |

---

## 5. Golden Rules for Writing Commits
1. **Use the Imperative Mood:** Write *"add feature"*, not *"added"* or *"adds"*. Think: *"If applied, this commit will..."*
2. **Keep the Subject Line Under 50-72 Characters.**
3. **Do Not End the Subject Line with a Period.**
4. **Use Lowercase for Types and Scopes.**