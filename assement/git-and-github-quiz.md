# Assessment: Git & GitHub

---

### Part 1: Version Control Multiple-Choice

#### Q1: What is the difference between `git merge` and `git rebase`?
- [ ] A) `git merge` preserves true history with a 3-way merge commit; `git rebase` replays commits on top of another branch to create a clean, linear history
- [ ] B) `git rebase` is for downloading files; `git merge` is for uploading
- [ ] C) `git merge` deletes the branch automatically
- [ ] D) They produce the exact same commit graph

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Correct Answer: A**

Merge leaves branch timelines intact with merge commits. Rebase rewrites history by moving the base of your branch to the tip of `main`.
</details>

---

#### Q2: What is the Golden Rule of Rebasing?
- [ ] A) Always rebase before committing
- [ ] B) Never rebase a public or shared branch that other teammates are actively working on
- [ ] C) Always rebase with the `--force` flag on `main`
- [ ] D) Only rebase on weekends

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Correct Answer: B**

Rebasing rewrites commit SHA hashes. Doing this on a public branch desynchronizes your teammates' git history!
</details>

---

### Part 2: Git Disaster Recovery Scenario

#### A developer accidentally committed a `.env` file with passwords 5 commits ago and pushed it to GitHub. They then made a new commit deleting the file. Is the file still in the repository history? How do you fix it?

<details>
<summary><b>🔍 View Answer & In-Depth Explanation</b></summary>

**Yes, the file is STILL in history!**  
Deleting a file in a new commit only removes it from the *latest snapshot*. The password remains in previous commit objects.

**Resolution:**
1. **Rotate the credentials immediately** on the database server.
2. Use `git-filter-repo` (or BFG Repo-Cleaner) to purge the file from all past commits:
   ```bash
   git filter-repo --invert-paths --path-match .env
   ```
3. Force-push the cleaned history: `git push origin --force --all`.
</details>

---

### Part 3: Interview Defense Question

> **Question:** *"Explain the difference between `git pull` and `git fetch`."*

<details>
<summary><b>🔍 View Model Answer</b></summary>

**Model Answer:**
`git fetch` safely downloads remote commits into your local `.git` repository without modifying your working files or branches.  
`git pull` is a shortcut that runs `git fetch` followed immediately by `git merge`. Senior engineers often prefer `git fetch` + `git rebase` to inspect changes first and avoid unwanted merge commits.
</details>