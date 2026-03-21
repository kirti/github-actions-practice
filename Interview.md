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

**Great job completing Hour 1! You now understand the fundamentals of GitHub Actions CI/CD! 🎉**
