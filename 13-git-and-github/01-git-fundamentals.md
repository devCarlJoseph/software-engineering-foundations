# W3Schools-Style Guide: Git Fundamentals

## 1. What is Git?
Git is a distributed version control system (VCS) designed to track changes in source code over time. Unlike older centralized systems, every developer has a full, independent copy of the entire repository history locally on their machine.

---

## 2. Real-Life Analogy
> **A Video Game Save System with Checkpoints**
> - **Working Directory:** You playing the game in real time.
> - **Staging Area (Index):** Pausing the game and choosing which achievements or inventory items you want to save.
> - **Git Repository (Commit):** Creating an unalterable permanent **Save Slot #12**.
> If your character falls into a trap later, you can reload Save Slot #12 instantly!

---

## 3. Jargon Buster
| Term | Definition |
|---|---|
| **Working Directory** | The actual sandbox folder on your computer where you create and edit files. |
| **Staging Area (Index)** | The staging buffer where changes are selected and reviewed via `git add` before being committed. |
| **Repository (.git)** | The hidden database inside your project where Git stores all snapshots, commits, and branch pointers. |
| **SHA-1 Hash** | A 40-character unique hexadecimal fingerprint (e.g. `5067a09...`) calculated from the exact contents of a commit snapshot. |
| **Untracked File** | A file in your folder that Git sees, but is not yet included in version history or the staging area. |

---

## 4. The 3 Trees of Git Architecture

```
┌────────────────────────┐      git add       ┌────────────────────────┐     git commit      ┌────────────────────────┐
│   Working Directory    │  ───────────────>  │      Staging Area      │  ────────────────>  │     Git Repository     │
│   (Files on disk)      │  <───────────────  │    (Index / Cache)     │                     │     (.git database)    │
└────────────────────────┘    git restore     └────────────────────────┘                     └────────────────────────┘
```

---

## 5. Practical CLI Guide

### Bad Practice (Blindly Staging Everything)
```bash
# DANGER: Staging unwanted log files, secrets, and node_modules
git add .
git commit -m "update"
```

### Good Practice (Selective Staging & Status Checks)
```bash
# 1. Initialize a new git repository in the current folder
git init

# 2. Check the current state of files
git status

# 3. Stage a specific file
git add server.ts

# 4. Commit with a meaningful conventional message
git commit -m "feat(server): initialize express application entry point"

# 5. Inspect history
git log --oneline
```

---

## 6. Expected Terminal Output

```text
$ git status
On branch main
No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   server.ts

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        README.md

$ git commit -m "feat(server): initialize express application entry point"
[main (root-commit) 5067a09] feat(server): initialize express application entry point
 1 file changed, 25 insertions(+)
 create mode 100644 server.ts

$ git log --oneline
5067a09 (HEAD -> main) feat(server): initialize express application entry point
```

---

## 7. Behind the Scenes
- Git does **not** store diffs (deltas). Git stores **snapshots**.
- If a file has not changed between commits, Git does not duplicate it; it simply points to the existing stored blob, keeping your `.git` folder lightweight and fast.