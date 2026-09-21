# W3Schools-Style Guide: Git Branches & HEAD

## 1. What is a Git Branch?
A **branch** in Git is simply a lightweight, movable 41-byte pointer pointing directly to a specific commit. Branching allows you to diverge from the main line of development to work on features or bug fixes in complete isolation without affecting production code.

---

## 2. Real-Life Analogy
> **Parallel Timelines in a Sci-Fi Movie**
> - **Main Timeline (`main`):** The stable, peaceful reality where the app runs smoothly for users.
> - **Branch (`feat/login`):** You step into a parallel universe to build a new feature.
> - If the feature is successful, you merge the timelines together!
> - If it breaks completely, you delete the parallel universe (`git branch -D`). The main timeline was never affected.

---

## 3. Jargon Buster
| Term | Definition |
|---|---|
| **HEAD** | A special pointer that tells Git which branch and commit you are currently looking at. |
| **`main` / `master`** | The default production branch containing stable, deployable code. |
| **Feature Branch** | A short-lived branch created for a single task (e.g. `feat/jwt-auth`). |
| **Detached HEAD** | State when `HEAD` points directly to a specific commit hash rather than a named branch. |

---

## 4. Visual Branching Diagram

```
       (commit 1) ───> (commit 2) ───> (commit 3)  [main]
                                ╲
                                 └───> (commit 4) ───> (commit 5)  [feat/auth] (HEAD)
```

---

## 5. Practical CLI Guide

### Creating and Switching Branches

```bash
# 1. View all local branches (* shows where HEAD is pointing)
git branch

# 2. Modern way: Create AND switch to a new branch in one command
git switch -c feat/jwt-auth
# (Older equivalent: git checkout -b feat/jwt-auth)

# 3. Make changes and commit on the feature branch
git add src/auth.ts
git commit -m "feat(auth): implement token generator"

# 4. Switch back to main
git switch main

# 5. Delete branch after merging
git branch -d feat/jwt-auth
```

---

## 6. Expected Terminal Output

```text
$ git switch -c feat/jwt-auth
Switched to a new branch 'feat/jwt-auth'

$ git commit -m "feat(auth): implement token generator"
[feat/jwt-auth 7a8b9c0] feat(auth): implement token generator
 1 file changed, 45 insertions(+)
 create mode 100644 src/auth.ts

$ git switch main
Switched to branch 'main'
Your branch is up to date with 'origin/main'.

$ git branch
  feat/jwt-auth
* main
```

---

## 7. Behind the Scenes
- When you create a branch with `git branch feat/name`, Git does **not** duplicate your files. It literally writes a 40-character commit hash into a small text file located at `.git/refs/heads/feat/name`. This makes branch creation instantaneous (taking < 1 millisecond)!