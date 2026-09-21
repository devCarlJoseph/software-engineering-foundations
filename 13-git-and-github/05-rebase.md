# W3Schools-Style Guide: Git Rebase

## 1. What is Git Rebase?
**Rebasing** is the process of taking commits from a feature branch and replaying them one by one on top of another base commit (such as the latest `main`).
It produces a perfectly straight, linear history without merge bubbles.

---

## 2. Real-Life Analogy
> **Detaching and Re-attaching a Branch on a Tree**
> - You branched off `main` last week.
> - While you worked, your teammates added 10 new commits to `main`.
> - Rebasing detaches your branch from last week's position and re-attaches it directly to **TODAY's** tip of `main`.

---

## 3. Visual Comparison: Merge vs. Rebase

```
Initial State:
          (c3) ───> (c4) [main]
         ╱
(c1) ───> (c2)
         ╲
          (c5) ───> (c6) [feat]

After Merge (Branch bubble created):
(c1) ───> (c2) ───> (c3) ───> (c4) ───> (M1) [main]
         ╲                     ╱
          (c5) ──────> (c6) ───

After Rebase (Clean straight line!):
(c1) ───> (c2) ───> (c3) ───> (c4) ───> (c5') ───> (c6') [feat]
```

---

## 4. The Golden Rule of Rebasing
> [!IMPORTANT]
> **NEVER rebase a public branch!**
> Only rebase your own private local feature branch. Rebasing rewrites commit SHA hashes; doing this on a shared branch will desynchronize your teammates' git history!

---

## 5. Practical CLI Guide

```bash
# 1. On your feature branch, pull the latest updates into main
git switch feat/my-feature

# 2. Replay your commits on top of current main
git rebase main

# 3. Interactive Rebase: Clean up (squash) messy commits before opening a PR
# (Squash the last 3 commits into 1 clean commit)
git rebase -i HEAD~3
```

### Inside the Interactive Rebase Editor (`git rebase -i`):
```text
pick 7a8b9c0 feat(auth): add login endpoint
squash 8b9c0d1 fix typo in variable name
squash 9c0d1e2 add missing semicolon
```

---

## 6. Expected Terminal Output

```text
$ git rebase main
Successfully rebased and updated refs/heads/feat/my-feature.

$ git log --oneline -n 4
9c0d1e2 (HEAD -> feat/my-feature) feat(auth): implement complete login service
7a8b9c0 (main) feat(db): update postgres pool configuration
5067a09 feat(server): initialize express application entry point
1c39ee2 docs: update project readme
```