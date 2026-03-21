# Example 4: Deploy to GitHub Pages
## Complete Documentation & Preparation

---

## 📋 Overview

**Purpose:** Automatically deploy your React app to GitHub Pages whenever you push to the master branch.

**What It Does:**
1. Builds your React app for production
2. Uploads the build as an artifact
3. Deploys to GitHub Pages
4. Provides a live public URL

**Your Results:**
- ✅ Total duration: **43 seconds**
- ✅ Build job: **27 seconds**
- ✅ Deploy job: **10 seconds**
- ✅ Live URL: `https://kirti.github.io/github-actions-pr...`

---

## 🔷 Complete Workflow File

**File:** `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ master ]  # Only deploy from master
  workflow_dispatch:      # Allow manual trigger

# Sets permissions for GITHUB_TOKEN
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          CI: false  # Treat warnings as warnings, not errors
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./build
  
  # Deployment job
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build  # Wait for build to complete
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 📖 Line-by-Line Explanation

### **1. Workflow Metadata**

```yaml
name: Deploy to GitHub Pages
```
- Human-readable name shown in Actions tab
- Appears in status badges and notifications

---

### **2. Triggers**

```yaml
on:
  push:
    branches: [ master ]
  workflow_dispatch:
```

**`push: branches: [ master ]`**
- Only triggers when pushing to master branch
- Won't run on feature branches
- **Why?** We only want to deploy production code, not development branches

**`workflow_dispatch:`**
- Allows manual triggering from GitHub UI
- Useful for:
  - Redeploying without new commits
  - Testing the deployment workflow
  - Emergency deployments

---

### **3. Permissions**

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

**What are permissions?**
- Controls what `GITHUB_TOKEN` can do
- By default, workflows have broad permissions
- Explicitly defining them follows security best practice (principle of least privilege)

**Breaking it down:**

| Permission | Purpose |
|------------|---------|
| `contents: read` | Read repository code (for checkout) |
| `pages: write` | Write/publish to GitHub Pages |
| `id-token: write` | Generate OIDC token for secure deployment |

**Why OIDC (id-token)?**
- More secure than using passwords/tokens
- Temporary credentials that expire
- GitHub generates them on-demand
- Industry standard for authentication

---

### **4. Concurrency Control**

```yaml
concurrency:
  group: "pages"
  cancel-in-progress: false
```

**What is concurrency control?**
- Prevents multiple deployments from running simultaneously
- Ensures only one deployment happens at a time

**`group: "pages"`**
- Creates a concurrency group named "pages"
- All workflows with the same group share the limit
- If a workflow is running, new ones wait

**`cancel-in-progress: false`**
- Don't cancel running deployments when new one starts
- Let them finish, queue the new one
- **Why false?** Canceling mid-deployment could leave the site in a broken state

**Alternative:**
```yaml
concurrency:
  group: "pages"
  cancel-in-progress: true  # Cancel old deployment, start new one
```
Use `true` if you want latest code deployed faster (but risks incomplete deployments).

---

### **5. Build Job**

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
```

**First job: Build the React app**

---

#### **Step 1: Checkout Code**
```yaml
- name: Checkout
  uses: actions/checkout@v4
```
- Downloads repository code to runner
- Required for accessing source files

---

#### **Step 2: Setup Node.js**
```yaml
- name: Setup Node
  uses: actions/setup-node@v4
  with:
    node-version: '22'
    cache: 'npm'
```

**`node-version: '22'`**
- Uses Node.js 22 (latest stable)
- Ensures consistent builds

**`cache: 'npm'`**
- Caches npm dependencies
- Speeds up subsequent builds
- Automatically invalidates when package-lock.json changes

---

#### **Step 3: Install Dependencies**
```yaml
- name: Install dependencies
  run: npm ci
```

**Why `npm ci`?**
- Clean install (removes node_modules first)
- Uses exact versions from package-lock.json
- Faster and more reliable in CI
- Won't modify package-lock.json

---

#### **Step 4: Build**
```yaml
- name: Build
  run: npm run build
  env:
    CI: false
```

**`npm run build`**
- Runs the build script from package.json
- For React: creates optimized production build in `build/` folder
- Minifies JS, optimizes assets, etc.

**`CI: false`**
- By default, `CI=true` treats warnings as errors
- In production React builds, warnings will fail the build
- Setting `CI=false` treats warnings as warnings
- **Use case:** ESLint warnings shouldn't block deployment

**When to use `CI: true`?**
```yaml
env:
  CI: true
```
Use in pull requests to enforce strict quality checks.

---

#### **Step 5: Setup Pages**
```yaml
- name: Setup Pages
  uses: actions/configure-pages@v4
```

**What does this do?**
- Configures GitHub Pages environment
- Sets up base URL and path
- Prepares deployment metadata
- Required before uploading artifacts

---

#### **Step 6: Upload Artifact**
```yaml
- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: ./build
```

**`upload-pages-artifact@v3`**
- Special artifact uploader for GitHub Pages
- Different from regular `upload-artifact@v4`
- Validates content is suitable for web hosting

**`path: ./build`**
- Location of built files (React's build output)
- Everything in `build/` folder gets deployed

---

### **6. Deploy Job**

```yaml
deploy:
  environment:
    name: github-pages
    url: ${{ steps.deployment.outputs.page_url }}
  runs-on: ubuntu-latest
  needs: build
```

**`environment:`**
- Uses GitHub Environments feature
- `github-pages` is a special built-in environment
- Provides deployment history and rollback

**`url: ${{ steps.deployment.outputs.page_url }}`**
- Displays the deployed URL in the UI
- Clickable link to your live site
- Retrieved from deployment step's output

**`needs: build`**
- **Critical!** Deploy only runs after build succeeds
- If build fails, deploy is skipped
- Creates job dependency chain

**Job dependency visualization:**
```
build (27s)
    ↓
  deploy (10s)
```

---

#### **Deployment Step**
```yaml
steps:
  - name: Deploy to GitHub Pages
    id: deployment
    uses: actions/deploy-pages@v4
```

**`id: deployment`**
- Gives this step an ID
- Allows referencing outputs: `${{ steps.deployment.outputs.page_url }}`

**`actions/deploy-pages@v4`**
- Official GitHub action for Pages deployment
- Downloads the artifact from build job
- Publishes to GitHub Pages
- Returns the live URL

---

## 🔧 Configuration Requirements

### **1. package.json Setup**

Add the `homepage` field:

```json
{
  "name": "my-react-app",
  "version": "0.1.0",
  "homepage": "https://USERNAME.github.io/REPO-NAME",
  "dependencies": {
    ...
  }
}
```

**Why is this needed?**
- React uses this for asset paths
- Without it, CSS/JS files won't load correctly
- Must match your GitHub Pages URL exactly

**How React uses it:**
```javascript
// Without homepage:
<script src="/static/js/main.js"></script>  // ❌ 404 error

// With homepage:
<script src="/REPO-NAME/static/js/main.js"></script>  // ✅ Works!
```

---

### **2. GitHub Repository Settings**

**Enable GitHub Pages:**
1. Repository → Settings → Pages
2. Source: **"GitHub Actions"** (not "Deploy from a branch")
3. This allows workflow-based deployments

---

### **3. Repository Visibility**

**GitHub Pages requirements:**
- ✅ **Public repositories:** Free
- ❌ **Private repositories:** Requires GitHub Enterprise (paid)

**Your case:** Made repository public to use free GitHub Pages.

---

## 🎯 Key Concepts Explained

### **1. Job Dependencies (needs)**

```yaml
jobs:
  build:
    # ... build steps
  
  deploy:
    needs: build  # Waits for build
    # ... deploy steps
```

**Benefits:**
- Sequential execution: build → deploy
- Deploy only runs if build succeeds
- Failed builds don't trigger deployments
- Clean separation of concerns

**Visualizing:**
```
┌─────────┐
│  build  │ (27s)
└────┬────┘
     │
     ↓
┌─────────┐
│ deploy  │ (10s)
└─────────┘
```

---

### **2. Environments**

```yaml
environment:
  name: github-pages
  url: ${{ steps.deployment.outputs.page_url }}
```

**What are environments?**
- Named deployment targets (dev, staging, production)
- Track deployment history
- Support protection rules
- Provide deployment URLs

**`github-pages` environment:**
- Special built-in environment for GitHub Pages
- Automatically created when you deploy
- Visible in repo's Environments tab

**Benefits:**
- Deployment history tracking
- Rollback to previous deployments
- View current deployment status
- Protection rules (required reviewers, wait timers)

**Advanced protection rules:**
```yaml
environment:
  name: production
  # Requires manual approval before deploying
```

---

### **3. Artifacts for Deployment**

**Why use artifacts instead of direct deployment?**

```yaml
# Build job
- uses: actions/upload-pages-artifact@v3
  with:
    path: ./build

# Deploy job (different runner)
- uses: actions/deploy-pages@v4  # Downloads artifact automatically
```

**Benefits:**
1. **Separation of concerns:** Build and deploy are independent
2. **Reusability:** Can deploy same artifact to multiple environments
3. **Reliability:** Artifact persists even if job fails
4. **Debugging:** Can download artifact to inspect build output

**Artifact flow:**
```
Build Job               Deploy Job
---------              -----------
npm run build    →     Download artifact
Create artifact  →     Publish to Pages
Upload artifact  →     Return URL
```

---

### **4. Step Outputs**

```yaml
- name: Deploy to GitHub Pages
  id: deployment  # Give step an ID
  uses: actions/deploy-pages@v4

# Later, reference the output:
url: ${{ steps.deployment.outputs.page_url }}
```

**How it works:**
1. Action sets output: `page_url=https://...`
2. Reference with: `steps.STEP_ID.outputs.OUTPUT_NAME`
3. Use in other steps or jobs

**Common use case:**
```yaml
- name: Deploy
  id: deploy
  run: echo "url=https://example.com" >> $GITHUB_OUTPUT

- name: Comment URL
  run: echo "Deployed to ${{ steps.deploy.outputs.url }}"
```

---

## 🚀 Deployment Flow Diagram

```
┌──────────────────────────────────────────────────────────┐
│                    TRIGGER: Push to master               │
└────────────────────────┬─────────────────────────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │   JOB 1: BUILD       │
              ├──────────────────────┤
              │ 1. Checkout code     │
              │ 2. Setup Node.js 22  │
              │ 3. npm ci            │
              │ 4. npm run build     │ → Creates ./build folder
              │ 5. Setup Pages       │
              │ 6. Upload artifact   │ → Saves ./build
              └──────────┬───────────┘
                         │
                   ✅ Build Success
                         │
                         ▼
              ┌──────────────────────┐
              │   JOB 2: DEPLOY      │
              ├──────────────────────┤
              │ 1. Download artifact │ ← Gets ./build from Job 1
              │ 2. Deploy to Pages   │ → Publishes to GitHub
              │ 3. Return URL        │
              └──────────┬───────────┘
                         │
                         ▼
                   🌐 LIVE SITE!
        https://username.github.io/repo-name
```

---

## 📊 Performance Analysis

### **Your Deployment Times**

| Phase | Duration | What Happened |
|-------|----------|---------------|
| Build | 27s | Installed deps, built React app |
| Deploy | 10s | Uploaded and published to Pages |
| **Total** | **43s** | From push to live site |

### **Time Breakdown**

**Build Job (27s):**
- Checkout: ~2s
- Setup Node + Cache restore: ~3s
- npm ci: ~12s
- npm run build: ~8s
- Upload artifact: ~2s

**Deploy Job (10s):**
- Download artifact: ~2s
- Deploy to Pages: ~6s
- DNS propagation: ~2s

---


## 🔒 Security Best Practices

### **1. Minimal Permissions**

```yaml
permissions:
  contents: read    # Only read repo
  pages: write      # Only write to Pages
  id-token: write   # Only for OIDC auth
```

✅ **Good:** Explicit minimal permissions
❌ **Bad:** Using default broad permissions

---

### **2. Environment Secrets**

```yaml
environment:
  name: production

steps:
  - name: Deploy
    env:
      API_KEY: ${{ secrets.PRODUCTION_API_KEY }}
```

**Benefits:**
- Different secrets per environment
- Production secrets not accessible in staging
- Better secret management

---

### **3. Branch Protection**

Configure in GitHub:
- Require PR reviews before merging to main
- Require status checks to pass
- Require signed commits
- Restrict who can push to main

---

### **4. Deployment Approval**

```yaml
environment:
  name: production
  # In GitHub UI, add required reviewers
```

**Benefits:**
- Manual approval before production deploys
- Review deployment changes
- Prevent accidental deployments

---

## 🎯 Real-World Deployment Scenarios

### **Scenario 1: Multi-environment setup**

```yaml
# Different URLs for each environment
- develop branch → https://dev.myapp.com
- staging branch → https://staging.myapp.com
- main branch → https://myapp.com
```

### **Scenario 2: Blue-Green deployment**

```yaml
# Deploy to blue environment
# Test blue environment
# Switch traffic from green to blue
# Keep green as backup for rollback
```

### **Scenario 3: Canary deployment**

```yaml
# Deploy to 10% of users
# Monitor metrics
# Gradually increase to 100%
# Rollback if issues detected
```

---

## 📝 Summary

### **What You Learned:**

1. ✅ **Two-job deployment pattern** (build → deploy)
2. ✅ **Job dependencies** with `needs`
3. ✅ **Environments** for deployment tracking
4. ✅ **Concurrency control** to prevent conflicts
5. ✅ **Permissions** for security
6. ✅ **Artifact sharing** between jobs
7. ✅ **Step outputs** for dynamic values

### **Key Metrics:**
- Build time: 27 seconds
- Deploy time: 10 seconds
- Total: 43 seconds from push to live! 🚀

### **Your Live Site:**
`https://kirti.github.io/github-actions-pr...`
