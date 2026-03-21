## 📝 Practice Interview Questions - Consolidation

### **Scenario-Based Questions**

#### **Q17: Your workflow takes 5 minutes to run. How would you optimize it?**
**Answer:**

1. **Add caching:**
   ```yaml
   - uses: actions/setup-node@v4
     with:
       cache: 'npm'
   ```

2. **Use matrix for parallel jobs:**
   ```yaml
   strategy:
     matrix:
       test-suite: [unit, integration, e2e]
   ```

3. **Only run on relevant changes:**
   ```yaml
   on:
     push:
       paths:
         - 'src/**'
         - 'package.json'
   ```

4. **Use faster runners (if budget allows):**
   ```yaml
   runs-on: ubuntu-latest-4-cores
   ```

5. **Skip unnecessary steps:**
   ```yaml
   - name: Build
     if: github.event_name != 'pull_request'
     run: npm run build
   ```

#### **Q18: How would you set up CI for a React + Node.js full-stack app?**
**Answer:**

```yaml
name: Full Stack CI

on: [push, pull_request]

jobs:
  frontend:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./frontend
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      - run: npm ci
      - run: npm test
      - run: npm run build
  
  backend:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./backend
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
          cache-dependency-path: backend/package-lock.json
      - run: npm ci
      - run: npm test
```

Two separate jobs for frontend and backend, running in parallel.

#### **Q19: Explain how you'd debug a failing workflow**
**Answer:**

1. **Check the logs:**
   - Go to Actions tab → Failed workflow → Click on failed step
   - Read error messages carefully

2. **Run locally:**
   ```bash
   npm ci
   npm test
   npm run build
   ```

3. **Enable debug logging:**
   - Settings → Secrets → Add `ACTIONS_STEP_DEBUG` = `true`
   - Re-run workflow for verbose logs

4. **Add debugging steps:**
   ```yaml
   - name: Debug info
     run: |
       node --version
       npm --version
       ls -la
       cat package.json
   ```

5. **Use tmate for SSH access:**
   ```yaml
   - name: Setup tmate session
     uses: mxschmitt/action-tmate@v3
   ```

6. **Check common issues:**
   - Node version mismatch
   - Missing environment variables
   - Cache corruption (clear cache)
   - Secrets not set correctly

#### **Q20: How do you handle secrets in GitHub Actions?**
**Answer:**

**Setting secrets:**
1. Repository Settings → Secrets and variables → Actions
2. New repository secret
3. Name: `API_KEY`, Value: `secret-value`

**Using secrets:**
```yaml
steps:
  - name: Deploy
    env:
      API_KEY: ${{ secrets.API_KEY }}
      DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
    run: ./deploy.sh
```

**Best practices:**
- ✅ Never echo secrets: `echo ${{ secrets.API_KEY }}` (visible in logs)
- ✅ Use environment variables
- ✅ Mask secrets automatically in logs
- ✅ Use environment-specific secrets for dev/staging/prod
- ✅ Rotate secrets regularly
- ✅ Use minimum required permissions

**Secret scopes:**
- Repository secrets - Available to all workflows
- Environment secrets - Only in specific environments
- Organization secrets - Shared across repos
---

## 📚 Additional Resources

- **GitHub Actions Docs**: https://docs.github.com/en/actions
- **Workflow Syntax**: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions
- **Actions Marketplace**: https://github.com/marketplace?type=actions
- **Caching Dependencies**: https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows

---




## 🎓 Questions

### **Q21: Explain the purpose of the `needs` keyword**

**Answer:**
`needs` creates job dependencies in GitHub Actions.

```yaml
jobs:
  build:
    # ... build steps
  
  deploy:
    needs: build  # Won't run until build completes
```

**How it works:**
- Jobs run in parallel by default
- `needs` enforces sequential execution
- Deploy waits for build to finish
- If build fails, deploy is skipped

**Benefits:**
- Prevents deploying broken code
- Logical workflow order
- Resource optimization (no wasted deploy if build fails)

**Multiple dependencies:**
```yaml
deploy:
  needs: [build, test, lint]  # Waits for all three
```

---

### **Q22: Why separate build and deploy into two jobs?**

**Answer:**

**Separation benefits:**

1. **Different concerns:**
   - Build: Create production artifacts
   - Deploy: Publish artifacts to hosting

2. **Reusability:**
   ```yaml
   build:
     # ... one build
   
   deploy-staging:
     needs: build
     # Deploy same artifact to staging
   
   deploy-production:
     needs: build
     # Deploy same artifact to production
   ```

3. **Failure isolation:**
   - Build fails → Clear feedback, no deployment attempted
   - Deploy fails → Can retry without rebuilding

4. **Security:**
   - Build job: Limited permissions
   - Deploy job: Elevated permissions (pages:write)
   - Principle of least privilege

5. **Debugging:**
   - Can download build artifact to inspect
   - Can redeploy without rebuilding

**Single job approach (not recommended):**
```yaml
jobs:
  build-and-deploy:
    steps:
      - run: npm run build
      - run: deploy.sh
    # ❌ Harder to reuse, debug, and manage permissions
```

---

### **Q23: What is the difference between `upload-artifact` and `upload-pages-artifact`?**

**Answer:**

| Feature | `upload-artifact@v4` | `upload-pages-artifact@v3` |
|---------|---------------------|---------------------------|
| **Purpose** | General file storage | GitHub Pages deployment |
| **Validation** | None | Validates web content |
| **File types** | Any | Web files (HTML, CSS, JS) |
| **Integration** | Generic | GitHub Pages specific |
| **Download** | Manual or via actions | Automatic in deploy job |

**`upload-artifact@v4` (generic):**
```yaml
- uses: actions/upload-artifact@v4
  with:
    name: test-results
    path: ./coverage
    retention-days: 7
```
Use for: Coverage reports, logs, test results, any files.

**`upload-pages-artifact@v3` (Pages-specific):**
```yaml
- uses: actions/upload-pages-artifact@v3
  with:
    path: ./build
```
Use for: Deploying to GitHub Pages only.

**Why use Pages-specific?**
- Validates content is suitable for web hosting
- Optimizes for Pages deployment
- Integrates with `deploy-pages` action
- Follows Pages best practices

---

### **Q24: Explain the `environment` keyword in deployment jobs**

**Answer:**

```yaml
deploy:
  environment:
    name: github-pages
    url: ${{ steps.deployment.outputs.page_url }}
```

**What are environments?**
Named deployment targets that provide:
1. **Deployment tracking** - History of all deployments
2. **Protection rules** - Required approvals, wait timers
3. **Secrets** - Environment-specific secrets
4. **URLs** - Live deployment URLs

**Built-in `github-pages` environment:**
- Automatically created for Pages deployments
- Tracks deployment history
- Shows current deployment status
- Provides rollback capability

**Custom environments:**
```yaml
environment:
  name: production
  url: https://myapp.com
```

**Protection rules (Enterprise):**
```yaml
environment:
  name: production
  # Settings in GitHub UI:
  # - Required reviewers: @senior-devs
  # - Wait timer: 5 minutes
  # - Deployment branches: main only
```

**Benefits:**
- See deployment history in UI
- Track which code is deployed where
- Prevent accidental production deployments
- Require manual approval for sensitive environments

---

### **Q25: What does `concurrency` control and when would you use it?**

**Answer:**

```yaml
concurrency:
  group: "pages"
  cancel-in-progress: false
```

**Purpose:** Prevent multiple workflows from running simultaneously.

**How it works:**
- `group`: Identifies related workflows
- Workflows in the same group can't run concurrently
- New workflows wait for current one to finish

**`cancel-in-progress` options:**

**`false` (queue new runs):**
```yaml
concurrency:
  group: "pages"
  cancel-in-progress: false
```
- Current deployment: Completes
- New deployment: Waits in queue
- **Use for:** Production deployments (avoid partial deploys)

**`true` (cancel old runs):**
```yaml
concurrency:
  group: "pages"
  cancel-in-progress: true
```
- Current deployment: Cancelled
- New deployment: Starts immediately
- **Use for:** Preview environments (latest code matters most)

**Real-world examples:**

**Production deployment:**
```yaml
concurrency:
  group: production-deploy
  cancel-in-progress: false  # Don't interrupt deployments
```

**Preview environments:**
```yaml
concurrency:
  group: preview-${{ github.ref }}
  cancel-in-progress: true  # Cancel old, deploy latest
```

**Database migrations:**
```yaml
concurrency:
  group: db-migration
  cancel-in-progress: false  # Never interrupt migrations!
```

---

### **Q26: Why set `CI: false` in the build step?**

**Answer:**

```yaml
- name: Build
  run: npm run build
  env:
    CI: false
```

**What is `CI` environment variable?**
- When `CI=true`, Create React App treats warnings as errors
- Build fails if there are any ESLint warnings
- Default in CI environments

**`CI=true` behavior:**
```bash
Warning: 'useState' is defined but never used
❌ Build failed! (treats warning as error)
```

**`CI=false` behavior:**
```bash
Warning: 'useState' is defined but never used
✅ Build succeeded (warning is just a warning)
```

**When to use `CI=false`:**
- Production deployments (warnings shouldn't block deployment)
- You have some warnings but code still works
- Warnings will be fixed later

**When to use `CI=true`:**
- Pull request checks (enforce strict quality)
- Staging deployments (catch issues early)
- Zero-warning policy in your team

**Best practice:**
```yaml
# Strict in PRs
- name: Build (PR)
  if: github.event_name == 'pull_request'
  run: npm run build
  env:
    CI: true  # Fail on warnings

# Lenient in production
- name: Build (Production)
  if: github.event_name == 'push'
  run: npm run build
  env:
    CI: false  # Allow warnings
```

---

### **Q27: How would you deploy to multiple environments (staging, production)?**

**Answer:**

**Approach 1: Separate workflows**

`.github/workflows/deploy-staging.yml`:
```yaml
name: Deploy Staging

on:
  push:
    branches: [ develop ]

jobs:
  deploy:
    environment:
      name: staging
      url: https://staging.myapp.com
    steps:
      - uses: actions/checkout@v4
      - run: npm run build
      - run: deploy-to-staging.sh
```

`.github/workflows/deploy-production.yml`:
```yaml
name: Deploy Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    environment:
      name: production
      url: https://myapp.com
    steps:
      - uses: actions/checkout@v4
      - run: npm run build
      - run: deploy-to-production.sh
```

**Approach 2: Single workflow with environments**

```yaml
name: Deploy

on:
  push:
    branches: [ main, develop ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: build
          path: ./build
  
  deploy-staging:
    if: github.ref == 'refs/heads/develop'
    needs: build
    environment:
      name: staging
      url: https://staging.myapp.com
    steps:
      - uses: actions/download-artifact@v4
      - run: deploy-to-staging.sh
  
  deploy-production:
    if: github.ref == 'refs/heads/main'
    needs: build
    environment:
      name: production
      url: https://myapp.com
    steps:
      - uses: actions/download-artifact@v4
      - run: deploy-to-production.sh
```

**Approach 3: Reusable workflow**

`.github/workflows/deploy-reusable.yml`:
```yaml
name: Deploy (Reusable)

on:
  workflow_call:
    inputs:
      environment:
        required: true
        type: string
      url:
        required: true
        type: string

jobs:
  deploy:
    environment:
      name: ${{ inputs.environment }}
      url: ${{ inputs.url }}
    steps:
      - run: deploy.sh ${{ inputs.environment }}
```

`.github/workflows/deploy-staging.yml`:
```yaml
name: Deploy Staging
on:
  push:
    branches: [ develop ]

jobs:
  deploy:
    uses: ./.github/workflows/deploy-reusable.yml
    with:
      environment: staging
      url: https://staging.myapp.com
```

---

### **Q28: How do you rollback a failed deployment?**


**Answer:**

**Option 1: Via GitHub UI**
1. Go to repository → Environments → github-pages
2. Click on previous successful deployment
3. Click "Re-run jobs"

**Option 2: Git revert**
```bash
# Find the commit that broke deployment
git log

# Revert it
git revert <bad-commit-sha>
git push origin main

# Triggers new deployment with previous working code
```

**Option 3: Manual workflow dispatch with specific commit**
```yaml
on:
  workflow_dispatch:
    inputs:
      git-ref:
        description: 'Git ref to deploy'
        required: true
        default: 'main'

jobs:
  deploy:
    steps:
      - uses: actions/checkout@v4
        with:
          ref: ${{ inputs.git-ref }}
      # ... rest of deployment
```

Then manually trigger with a previous working commit SHA.

**Option 4: Tag-based deployment**
```bash
# Tag last working version
git tag v1.2.3-working
git push origin v1.2.3-working

# Deploy specific tag
```

```yaml
on:
  push:
    tags:
      - 'v*'
```

**Best practice for rollback:**
1. Have automated tests to catch issues before deploy
2. Use environment protection rules for production
3. Monitor deployments (analytics, error tracking)
4. Keep deployment artifacts for easy rollback
5. Practice rollback procedures regularly

---
