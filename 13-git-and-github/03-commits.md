# W3Schools-Style Guide: Git Commits & Snapshot History

## 1. What is a Commit?
A **commit** is an immutable cryptographic snapshot of your entire repository at a specific point in time. Each commit contains author information, a timestamp, a commit message, a snapshot tree of all files, and a pointer to its parent commit(s).

---

## 2. Real-Life Analogy
> **A Formal Legal Notary Stamping a Document**
> - You bring a contract to a notary.
> - The notary checks your ID (Author), records the exact date and time (Timestamp), attaches an official seal (SHA-1 Hash), and files it into the official county records.
> - Nobody can alter a single page without breaking the notary's seal!

---

## 3. Jargon Buster
| Term | Definition |
|---|---|
| **Author vs Committer** | The Author is who originally wrote the code. The Committer is who applied the commit (can differ during rebasing or cherry-picking). |
| **Parent SHA** | The cryptographic hash of the commit that immediately precedes this commit. |
| **Commit Graph (DAG)** | The tree structure formed by commits pointing backwards to their parents. |
| **`git commit --amend`** | Rewrites the most recent commit to add missed files or update the commit message. |

---

## 4. The Anatomy of a Commit Object

```
┌────────────────────────────────────────────────────────┐
│ COMMIT OBJECT: 5ef4017                                 │
├────────────────────────────────────────────────────────┤
│ Tree:      a82d91f (Root folder snapshot)              │
│ Parent:    1c39ee2 (Previous commit hash)              │
│ Author:    Carl Joseph <carl@developer.com>            │
│ Date:      Tue Sep 22 02:00:00 2026 +0800              │
│ Message:   feat(auth): implement password hashing      │
└────────────────────────────────────────────────────────┘
```

---

## 5. Practical CLI Guide

```bash
# 1. Stage your changes
git add src/auth/password.ts

# 2. Record commit
git commit -m "feat(auth): implement password hashing with salt"

# 3. Forgot a file? Amend the previous commit without creating a duplicate commit!
git add src/auth/types.ts
git commit --amend --no-edit

# 4. View detailed commit metadata
git log -n 1 --stat
```

---

## 6. Expected Terminal Output

```text
$ git log -n 1
commit 5ef4017a82d91f6874a62323399d8de7f651f7f (HEAD -> main)
Author: Carl Joseph <carl@developer.com>
Date:   Tue Sep 22 02:00:00 2026 +0800

    feat(auth): implement password hashing with salt

 src/auth/password.ts | 65 +++++++++++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 65 insertions(+)
```

---

## 7. Behind the Scenes
- **Atomic Commits Principle:** A commit should represent ONE single logical unit of work. Do not bundle "fixed login bug", "changed button color", and "updated database password" into one giant commit. Separate them into 3 clean commits!