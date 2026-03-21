### ✅ Example 1: Simple Node.js CI
 
 **Key Concepts Learned**

#### **1. Workflow Triggers (`on:`)**
```yaml
on:
  push:
    branches: [ master, feature/github-actions-practice ]
  pull_request:
    branches: [ master ]
  workflow_dispatch:
```

- **`push`**: Runs when code is pushed to specified branches
- **`pull_request`**: Runs when PR is created/updated
- **`workflow_dispatch`**: Allows manual triggering from GitHub UI

#### **2. Jobs**
```yaml
jobs:
  build:
    runs-on: ubuntu-latest
```

- Each workflow can have multiple jobs
- Jobs run in parallel by default
- `runs-on` specifies the runner (Ubuntu, Windows, macOS)

#### **3. Steps**
Two types of steps:

**Action Steps (uses):**
```yaml
- name: Checkout code
  uses: actions/checkout@v4
```

**Command Steps (run):**
```yaml
- name: Install dependencies
  run: npm ci
```

#### **4. Why `npm ci` instead of `npm install`?**

| `npm install` | `npm ci` |
|---------------|----------|
| Updates package-lock.json | Requires package-lock.json |
| Installs latest compatible versions | Installs exact versions |
| Slower | Faster |
| Good for development | 

**Perfect for CI/CD** 

### **Example 1 Questions**

 **Q1: What is the difference between `npm install` and `npm ci`?**
**Answer:** 
- `npm ci` (clean install) is designed for CI/CD environments
- It's faster because it skips certain user-facing features
- It requires `package-lock.json` and installs exact versions
- It removes `node_modules` before installing (clean slate)
- `npm install` can modify `package-lock.json`, while `npm ci` never does

 **Q2: Why do we need `actions/checkout@v4`?**
**Answer:**
- GitHub Actions runners start with an empty workspace
- `actions/checkout@v4` clones your repository code into the runner
- Without it, your code wouldn't be available for testing/building
- The `@v4` specifies the version of the action to use

**Q3: What does `runs-on: ubuntu-latest` mean?**
**Answer:**
- Specifies which operating system to run the job on
- `ubuntu-latest` uses the latest Ubuntu Linux version (currently 22.04)
- Other options: `windows-latest`, `macos-latest`
- GitHub provides free runners for public repositories

 **Q4: What is `workflow_dispatch` and when would you use it?**
**Answer:**
- Allows manual triggering of workflows from GitHub UI
- Useful for:
  - On-demand deployments
  - Manual testing
  - Workflows that shouldn't run automatically
  - Workflows with user inputs
- Can accept input parameters for customization

#### **Q5: Explain the workflow execution order**
**Answer:**
Steps execute sequentially within a job:
1. Checkout code from repository
2. Setup Node.js environment (version 22)
3. Install dependencies using npm ci
4. Run tests (fails if tests fail)
5. Build project (only runs if tests pass)

If any step fails, subsequent steps are skipped and the workflow fails.

---
