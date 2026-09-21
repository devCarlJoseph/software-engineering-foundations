# W3Schools-Style Guide: Repository Organization & .gitignore

## 1. What is Repository Organization?
Structuring a professional software repository with standardized root-level configuration files that guide both automated tools (Git, CI, linters) and human engineers.

---

## 2. Real-Life Analogy
> **A Clean House with a "No Shoes Inside" Rule**
> - The `.gitignore` file is the doormat outside the front door.
> - Muddy boots (`node_modules/` taking 500MB, `.env` with secret passwords, log files) stay at the door and are **never allowed inside the clean house** (Git history)!

---

## 3. Production `.gitignore` Template for Node.js & TypeScript

```gitignore
# ── Dependency Folders ──
node_modules/
npm-debug.log*
yarn-debug.log*

# ── Secrets & Environment Variables (NEVER COMMIT!) ──
.env
.env.local
.env.development
.env.production

# ── Build & Transpiler Outputs ──
dist/
build/
*.tsbuildinfo

# ── Operating System Junk ──
.DS_Store
Thumbs.db

# ── IDE & Local Editor Settings ──
.vscode/*
!.vscode/extensions.json
.idea/
*.swp
*.log
```

---

## 4. Standard Repository Root File Blueprint

```text
my-project/
├── .github/
│   └── workflows/
│       └── ci.yml             <- Automated CI tests running on every PR
├── src/                       <- All application source code
├── .editorconfig              <- Enforces identical indentation across IDEs
├── .gitignore                 <- Prevents committing secrets and build junk
├── LICENSE                    <- Legal rights (e.g. MIT, Apache 2.0)
├── package.json               <- Dependencies and project scripts
├── tsconfig.json              <- TypeScript compiler settings
└── README.md                  <- Project handbook, setup instructions & roadmap
```

---

## 5. Emergency Guide: Accidental Secret Commit
If you accidentally committed a `.env` file with passwords:
```bash
# 1. DO NOT just delete the file and commit! It remains in Git history!
# 2. Immediately change/rotate the password on your database server!
# 3. Remove from Git tracking without deleting your local file:
git rm --cached .env

# 4. Commit the removal:
git commit -m "chore: remove .env from git tracking"
```