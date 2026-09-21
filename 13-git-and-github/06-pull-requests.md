# W3Schools-Style Guide: Pull Requests (PR) & Code Reviews

## 1. What is a Pull Request?
A **Pull Request (PR)** is a collaboration mechanism hosted on GitHub (or GitLab/Bitbucket) where a developer submits their completed branch for peer review, automated CI test validation, and formal approval before merging into `main`.

---

## 2. Real-Life Analogy
> **Submitting an Architectural Blueprint for City Permit Approval**
> - You do not pour concrete directly on city streets without permission (you do not push directly to `main`).
> - You submit the blueprints to the city inspector (Pull Request).
> - The inspector reviews the plans, checks safety compliance (CI tests), suggests improvements, and grants the permit!

---

## 3. Anatomy of a High-Quality PR Template

```markdown
## Summary
Brief description of what this PR accomplishes and why the change was made.

## Changes Made
- Added JWT auth middleware in `src/middlewares/auth.ts`.
- Protected `POST /api/v1/tasks` route with authentication guard.
- Added 12 unit tests verifying valid, expired, and missing tokens.

## How to Test
1. Run `npm test` -> All 12 tests should pass.
2. Send `GET /api/v1/tasks` with header `Authorization: Bearer <valid_token>`.
3. Verify response status is `200 OK`.

## Related Issue
Closes #42
```

---

## 4. Practical CLI & GitHub Guide

```bash
# 1. Push your local branch to GitHub and set upstream tracking
git push -u origin feat/task-management-api

# 2. Using GitHub CLI (gh) to create PR directly from terminal:
gh pr create \
  --title "feat(tasks): implement task management CRUD endpoints" \
  --body "Adds full RESTful task routes with PostgreSQL persistence." \
  --base main \
  --head feat/task-management-api
```

---

## 5. Expected Terminal Output

```text
$ git push -u origin feat/task-management-api
Enumerating objects: 15, done.
Counting objects: 100% (15/15), done.
Writing objects: 100% (15/15), 3.42 KiB | 3.42 MiB/s, done.
Total 15 (delta 4), reused 0 (delta 0)
remote: Resolving deltas: 100% (4/4), done.
remote: 
remote: Create a pull request for 'feat/task-management-api' on GitHub by visiting:
remote:      https://github.com/devCarlJoseph/software-engineering-foundations/pull/new/feat/task-management-api
remote: 
To https://github.com/devCarlJoseph/software-engineering-foundations.git
 * [new branch]      feat/task-management-api -> feat/task-management-api
branch 'feat/task-management-api' set up to track 'origin/feat/task-management-api'.
```

---

## 6. Behind the Scenes: The PR Review Checklist
- [ ] Are all automated GitHub Actions CI tests passing (green checkmarks)?
- [ ] Is the branch rebased and up to date with `main`?
- [ ] Did at least one peer engineer review and approve the PR?
- [ ] Are there zero console errors and zero lint warnings?