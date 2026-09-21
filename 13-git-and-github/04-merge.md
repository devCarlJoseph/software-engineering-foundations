# W3Schools-Style Guide: Git Merge (Fast-Forward vs. 3-Way)

## 1. What is Git Merge?
**Merging** combines the histories and changes from one branch into another.
Depending on whether the target branch has progressed, Git chooses between:
1. **Fast-Forward Merge:** Moves the target pointer forward without creating a merge commit.
2. **3-Way Merge:** Compares the common ancestor, branch A, and branch B, generating a dedicated merge commit.

---

## 2. Real-Life Analogy
> **Two Streams Converging into a River**
> - Stream A (`main`) and Stream B (`feat/db`) flow independently.
> - At the junction point, they combine their waters into a single flowing river.
> - The junction point is the **Merge Commit**.

---

## 3. Fast-Forward vs. 3-Way Merge Visuals

### A. Fast-Forward Merge (Clean linear path)
```
Before:  (c1) ───> (c2) [main]
                     ╲
                      ───> (c3) ───> (c4) [feat/api]

After:   (c1) ───> (c2) ───> (c3) ───> (c4) [main, feat/api]
```

### B. 3-Way Merge (Diverged branches)
```
Before:  (c1) ───> (c2) ───> (c3) [main]
                     ╲
                      ───> (c4) ───> (c5) [feat/api]

After:   (c1) ───> (c2) ───> (c3) ───────> (M1 Merge Commit) [main]
                     ╲                    ╱
                      ───> (c4) ───> (c5)
```

---

## 4. Practical CLI Guide

```bash
# Step 1: Switch to the destination branch (usually main)
git switch main

# Step 2: Ensure your local main is up to date
git pull origin main

# Step 3: Merge the feature branch into main
git merge feat/api

# Team Best Practice: Force a merge commit even if fast-forward is possible:
git merge --no-ff feat/api -m "merge: pull request #12 from feat/api into main"
```

---

## 5. Expected Terminal Output

```text
$ git switch main
Switched to branch 'main'

$ git merge feat/api
Updating 5067a09..7a8b9c0
Fast-forward
 src/api/tasks.ts | 42 ++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 42 insertions(+)
 create mode 100644 src/api/tasks.ts
```

---

## 6. Behind the Scenes
- The `--no-ff` (no fast-forward) flag is the default behavior used by **GitHub Pull Requests**. It creates a clear visual record in history showing when a feature started, what commits it contained, and when it was integrated.