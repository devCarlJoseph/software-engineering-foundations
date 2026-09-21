# W3Schools-Style Guide: Merge Conflict Resolution

## 1. What is a Merge Conflict?
A **merge conflict** occurs when two branches have modified the **exact same lines** in a file differently, and Git cannot automatically determine which version is correct. Git pauses the merge and asks a human to resolve the discrepancy.

---

## 2. Real-Life Analogy
> **Two Editors with Red Pens Marking the Same Sentence**
> - Editor A changed the price to "$10".
> - Editor B changed the price to "$12".
> - The printing press stops! The head editor must decide whether the correct price is $10, $12, or a combination of both.

---

## 3. Anatomizing Git Conflict Markers

When a conflict occurs, Git writes conflict markers directly inside your file:

```typescript
<<<<<<< HEAD (Current branch, e.g. main)
const PORT = process.env.PORT || 3000;
=======
const PORT = process.env.PORT || 8080;
>>>>>>> feat/custom-port (Incoming branch)
```

| Marker | Meaning |
|---|---|
| `<<<<<<< HEAD` | Beginning of the conflict; shows the code on your current branch. |
| `=======` | The divider line between the two competing versions. |
| `>>>>>>> branch_name` | End of the conflict; shows the code coming from the branch you are merging. |

---

## 4. Step-by-Step Resolution Workflow

### Step 1: Triggering the conflict
```bash
git switch main
git merge feat/custom-port
# Output: CONFLICT (content): Merge conflict in src/config.ts
```

### Step 2: Open the file in your code editor (VS Code)
Pick one of the options:
- **Accept Current Change** (Keep `3000`)
- **Accept Incoming Change** (Keep `8080`)
- **Accept Both Changes** or manually edit the line

### Step 3: Delete ALL conflict markers (`<<<`, `===`, `>>>`)
Make the file clean:
```typescript
const PORT = process.env.PORT || 8080;
```

### Step 4: Stage and conclude the merge
```bash
git add src/config.ts
git commit -m "chore: resolve merge conflict in src/config.ts"
```

---

## 5. Expected Terminal Output

```text
$ git merge feat/custom-port
Auto-merging src/config.ts
CONFLICT (content): Merge conflict in src/config.ts
Automatic merge failed; fix conflicts and then commit the result.

$ git status
Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   src/config.ts

$ git add src/config.ts
$ git commit -m "chore: resolve merge conflict in src/config.ts"
[main 4aa65dc] chore: resolve merge conflict in src/config.ts
```