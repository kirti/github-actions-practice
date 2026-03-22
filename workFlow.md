# GitHub Actions Workflows Overview

This directory contains 8 production-ready GitHub Actions workflows demonstrating various CI/CD patterns and automation strategies.

---

## 📋 Quick Reference

| Workflow | File | Triggers | Purpose |
|----------|------|----------|---------|
| **Node.js CI** | `nodejs-ci.yml` | Push, PR | Basic CI pipeline |
| **Matrix CI** | `matrix-ci.yml` | Push, PR | Multi-version testing |
| **Cache CI** | `cache-ci.yml` | Push, PR | Optimized CI with caching |
| **Deploy** | `deploy.yml` | Push to main | GitHub Pages deployment |
| **PR Checks** | `pr-checks.yml` | Pull Request | Quality gates |
| **Health Check** | `scheduled-health-check.yml` | Daily | Automated monitoring |
| **PR Automation** | `pr-automation.yml` | Pull Request | Auto-labeling |
| **AI Review** | `ai-code-review.yml` | Pull Request | AI code review |

---

## 📚 Detailed Documentation

Each workflow has its own comprehensive README:

1. [Node.js CI](./README-nodejs-ci.md) - Basic continuous integration
2. [Matrix CI](./README-matrix-ci.md) - Multi-version testing strategy
3. [Cache CI](./README-cache-ci.md) - Performance optimization with caching
4. [Deploy to GitHub Pages](./README-deploy.md) - Automated deployment
5. [PR Checks](./README-pr-checks.md) - Pull request quality gates
6. [Scheduled Health Check](./README-scheduled.md) - Daily monitoring
7. [PR Automation](./README-pr-automation.md) - Intelligent PR management
8. [AI Code Review](./README-ai-code-review.md) - OpenAI-powered reviews

---

## 🎯 Learning Path

### For Beginners
Start with these workflows in order:
1. **nodejs-ci.yml** - Learn basic workflow structure
2. **matrix-ci.yml** - Understand parallel execution
3. **cache-ci.yml** - Optimize for performance

### For Intermediate Users
4. **deploy.yml** - Deployment patterns
5. **pr-checks.yml** - Quality automation
6. **pr-automation.yml** - Advanced automation

### For Advanced Users
7. **ai-code-review.yml** - AI integration
8. **scheduled-health-check.yml** - Monitoring strategies

---

## 🔧 Common Patterns Used

### Triggers
```yaml
on:
  push:
    branches: [ main ]
  pull_request:
  workflow_dispatch:
  schedule:
    - cron: '0 9 * * *'
```

### Permissions
```yaml
permissions:
  contents: read
  pull-requests: write
  pages: write
```

### Job Dependencies
```yaml
jobs:
  build:
    runs-on: ubuntu-latest
  
  deploy:
    needs: build
    runs-on: ubuntu-latest
```

### Caching
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '22'
    cache: 'npm'
```

---

## 📊 Performance Metrics

Based on actual runs:

| Workflow | Average Duration | Cache Impact |
|----------|------------------|--------------|
| Node.js CI | 30s | N/A |
| Matrix CI | 30s × 3 (parallel) | N/A |
| Cache CI | 47s cached, 57s uncached | 17% faster |
| Deploy | 43s (27s build + 10s deploy) | Cached |
| PR Checks | 30s | N/A |
| Health Check | 45s | Cached |
| PR Automation | 15s | N/A |
| AI Review | 30s | N/A |

---

## 🎓 Key Concepts

### 1. **Jobs vs Steps**
- **Jobs** run in parallel by default
- **Steps** run sequentially within a job
- Use `needs` to create job dependencies

### 2. **Matrix Builds**
- Test across multiple versions/configurations
- All matrix jobs run in parallel
- Efficient for compatibility testing

### 3. **Caching**
- Speeds up workflows by reusing dependencies
- Cache key based on `package-lock.json` hash
- Automatic cache cleanup after 7 days

### 4. **Environments**
- Track deployments (dev, staging, prod)
- Add protection rules
- Manage environment-specific secrets

### 5. **Secrets**
- Store sensitive data securely
- Repository, environment, or organization scope
- Never exposed in logs

---

## 🐛 Troubleshooting

### Common Issues

**Workflow not triggering?**
- Check branch name in trigger
- Verify file paths if using `paths` filter
- Ensure workflow file is on the branch

**Permission denied?**
- Check `permissions` in workflow
- Verify token has required scopes
- Review branch protection rules

**Cache not working?**
- Verify cache key matches
- Check if dependencies changed
- Cache may be evicted (7-day limit)

**Secrets not accessible?**
- Ensure secret name matches exactly
- Check secret scope (repo/environment)
- Verify workflow has environment specified

---

## 💡 Best Practices

### ✅ DO
- Use specific action versions (`@v4` not `@latest`)
- Set minimal permissions required
- Cache dependencies when possible
- Use matrix for compatibility testing
- Add descriptive names to steps
- Use `needs` for job dependencies

### ❌ DON'T
- Hardcode secrets in workflows
- Use `@latest` for actions (unpredictable)
- Run expensive operations on every commit
- Ignore cache when appropriate
- Mix job concerns (separate build/deploy)

---

## 📝 Workflow Template

Basic structure for new workflows:

```yaml
name: Workflow Name

on:
  push:
    branches: [ main ]
  pull_request:
  workflow_dispatch:

env:
  NODE_VERSION: '22'

jobs:
  job-name:
    runs-on: ubuntu-latest
    
    permissions:
      contents: read
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run task
      run: npm run task
```

---

## **CRON Breakdown:**
```
0 9 1 * *
│ │ │ │ │
│ │ │ │ └─── Day of week (0-6, * = any)
│ │ │ └───── Month (1-12, * = any)
│ │ └─────── Day of month (1-31) ← 1st day!
│ └───────── Hour (0-23) ← 9 AM
└─────────── Minute (0-59) ← On the hour

## 🔗 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax Reference](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Actions Marketplace](https://github.com/marketplace?type=actions)
- [Caching Dependencies](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows)

---



**Made with ❤️ for developers learning GitHub Actions**
