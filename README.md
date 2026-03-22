# GitHub Actions Practice Repository 🚀

A comprehensive collection of production-ready GitHub Actions workflows demonstrating CI/CD, automation, and AI integration.

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success)](https://kirti.github.io/github-actions-practice)
[![Node.js CI](https://github.com/kirti/github-actions-practice/workflows/Node.js%20CI/badge.svg)](https://github.com/kirti/github-actions-practice/actions)
[![AI Code Review](https://img.shields.io/badge/AI-Code%20Review-blue)](https://github.com/kirti/github-actions-practice/actions)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Workflows](#workflows)
- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Workflow Details](#workflow-details)
- [Technologies Used](#technologies-used)
- [Interview Preparation](#interview-preparation)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

This repository demonstrates **professional-grade GitHub Actions workflows** covering:

✅ **Continuous Integration** - Automated testing and building  
✅ **Continuous Deployment** - Auto-deploy to GitHub Pages  
✅ **Code Quality** - Automated linting and testing  
✅ **PR Automation** - Auto-labeling and statistics  
✅ **AI Integration** - OpenAI-powered code reviews  
✅ **Performance Optimization** - Caching and matrix strategies  
✅ **Scheduled Tasks** - Daily health checks  

**Built for:** Full-stack developers preparing for interviews and learning modern DevOps practices.

---

## 🔄 Workflows

### 1. **Node.js CI** [`nodejs-ci.yml`](.github/workflows/nodejs-ci.yml)
Basic continuous integration for Node.js applications.

**Triggers:** Push, Pull Request  
**Duration:** ~30s  
**Purpose:** Run tests and build on every code change

[📖 Full Documentation](.github/workflows/README-nodejs-ci.md)

---

### 2. **Matrix CI** [`matrix-ci.yml`](.github/workflows/matrix-ci.yml)
Test across multiple Node.js versions simultaneously.

**Triggers:** Push, Pull Request  
**Node Versions:** 18, 20, 22  
**Duration:** ~30s per version (parallel)  
**Purpose:** Ensure compatibility across Node.js versions

[📖 Full Documentation](.github/workflows/README-matrix-ci.md)

---

### 3. **CI with Caching** [`cache-ci.yml`](.github/workflows/cache-ci.yml)
Optimized CI with dependency caching for faster builds.

**Triggers:** Push, Pull Request  
**Duration:** 47s (cached) vs 57s (uncached)  
**Improvement:** 17% faster builds  
**Purpose:** Speed up workflows by caching dependencies

[📖 Full Documentation](.github/workflows/README-cache-ci.md)

---

### 4. **Deploy to GitHub Pages** [`deploy.yml`](.github/workflows/deploy.yml)
Automated deployment to GitHub Pages.

**Triggers:** Push to main  
**Duration:** 43s (build: 27s, deploy: 10s)  
**Live URL:** [https://kirti.github.io/github-actions-practice](https://kirti.github.io/github-actions-practice)  
**Purpose:** Automatically deploy React app to production

[📖 Full Documentation](.github/workflows/README-deploy.md)

---

### 5. **PR Checks** [`pr-checks.yml`](.github/workflows/pr-checks.yml)
Automated testing and quality checks on pull requests.

**Triggers:** PR opened, synchronized  
**Checks:** Linting, Tests, Build, Coverage  
**Purpose:** Ensure code quality before merging

[📖 Full Documentation](.github/workflows/README-pr-checks.md)

---

### 6. **Scheduled Health Check** [`scheduled-health-check.yml`](.github/workflows/scheduled-health-check.yml)
Daily automated health checks with issue creation on failure.

**Triggers:** Daily at 9 AM UTC, Manual dispatch  
**Checks:** Tests, Build, Dependencies, Security  
**Purpose:** Monitor repository health automatically

[📖 Full Documentation](.github/workflows/README-scheduled.md)

---

### 7. **PR Automation** [`pr-automation.yml`](.github/workflows/pr-automation.yml)
Intelligent PR labeling and statistics.

**Triggers:** PR opened, synchronized  
**Features:**
- 🏷️ Auto-labels based on files changed
- 📏 Size labels (XS, S, M, L, XL)
- 📊 Statistics comment with recommendations
**Duration:** ~15s total

[📖 Full Documentation](.github/workflows/README-pr-automation.md)

---

### 8. **AI Code Review** [`ai-code-review.yml`](.github/workflows/ai-code-review.yml) 🤖
OpenAI-powered automated code reviews with fix suggestions.

**Triggers:** PR with JS/TS file changes  
**Model:** GPT-3.5 Turbo  
**Features:**
- 🔍 Security vulnerability detection
- ⚡ Performance optimization suggestions
- ♿ Accessibility improvements
- 🎯 React best practices
- 📝 Before/after code examples

**Duration:** ~30s  
**Cost:** ~$0.01 per review

[📖 Full Documentation](.github/workflows/README-ai-code-review.md)

---

## ✨ Features

### 🎯 **Production-Ready Workflows**
- All workflows tested and working
- Real-world use cases
- Best practices implemented

### 🚀 **Performance Optimized**
- Dependency caching (17% faster)
- Matrix builds (parallel execution)
- Conditional job execution

### 🤖 **AI-Powered Automation**
- GPT-3.5 code reviews
- Automated fix suggestions
- Security vulnerability detection

### 📊 **Comprehensive Monitoring**
- PR statistics and sizing
- Auto-labeling by file type
- Daily health checks

### 🔒 **Security First**
- Secret management
- Minimal permissions
- OIDC authentication

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- GitHub account
- OpenAI API key (for AI Code Review)

### Local Setup

```bash
# Clone the repository
git clone https://github.com/kirti/github-actions-practice.git
cd github-actions-practice

# Install dependencies
npm install

# Run tests
npm test

# Start development server
npm start

# Build for production
npm run build
```

### Setting Up GitHub Actions

1. **Fork/Clone this repository**

2. **Enable GitHub Pages**
   - Settings → Pages
   - Source: GitHub Actions

3. **Add Secrets** (for AI Code Review)
   - Settings → Secrets → Actions
   - Add `OPENAI_API_KEY`

4. **Create Labels** (for PR Automation)
   ```bash
   # Run from repository root
   gh label create "workflows" -c "8B5CF6" -d "GitHub Actions workflows"
   gh label create "source-code" -c "3B82F6" -d "Source code changes"
   gh label create "documentation" -c "F59E0B" -d "Documentation"
   gh label create "size/XS" -c "6B7280" -d "Extra small PR"
   gh label create "size/S" -c "6B7280" -d "Small PR"
   gh label create "size/M" -c "6B7280" -d "Medium PR"
   gh label create "size/L" -c "6B7280" -d "Large PR"
   gh label create "size/XL" -c "6B7280" -d "Extra large PR"
   ```

5. **Push changes** - Workflows will run automatically!

---

## 📁 Project Structure

```
github-actions-practice/
├── .github/
│   ├── workflows/
│   │   ├── nodejs-ci.yml              # Basic CI
│   │   ├── matrix-ci.yml              # Multi-version testing
│   │   ├── cache-ci.yml               # Cached CI
│   │   ├── deploy.yml                 # GitHub Pages deployment
│   │   ├── pr-checks.yml              # PR quality checks
│   │   ├── scheduled-health-check.yml # Daily monitoring
│   │   ├── pr-automation.yml          # Auto-labeling
│   │   ├── ai-code-review.yml         # AI code review
│   │   ├── README-*.md                # Individual workflow docs
│   │   └── README.md                  # Workflows overview
│   └── CODEOWNERS                     # Code ownership
├── src/
│   ├── components/
│   │   ├── UserProfile.js             # Sample component
│   │   ├── UserList.js                # Data fetching example
│   │   ├── TodoForm.js                # Form handling example
│   │   └── ProductCard.js             # Complex component
│   ├── App.js                         # Main app
│   └── App.test.js                    # Tests
├── public/                            # Static assets
├── package.json                       # Dependencies
└── README.md                          # This file
```

---

## 🔍 Workflow Details

### Comparison Table

| Workflow | Triggers | Duration | Key Features |
|----------|----------|----------|--------------|
| Node.js CI | Push, PR | ~30s | Basic testing & build |
| Matrix CI | Push, PR | ~30s × 3 | Multi-version testing |
| Cache CI | Push, PR | ~47s | 17% faster with cache |
| Deploy | Push to main | ~43s | Auto-deploy to Pages |
| PR Checks | PR | ~30s | Quality gates |
| Health Check | Daily 9AM UTC | ~45s | Automated monitoring |
| PR Automation | PR | ~15s | Auto-labels & stats |
| AI Review | PR (JS/TS) | ~30s | AI-powered reviews |

### Performance Metrics

- **Caching Impact:** 57s → 47s (17% improvement)
- **Matrix Parallelization:** 3 versions tested simultaneously
- **Deployment Speed:** Main → Production in 43 seconds
- **AI Review:** ~30s per PR with 3 files

---

## 🛠 Technologies Used

### Core
- **React** 18.x - UI framework
- **Node.js** 22.x - Runtime environment
- **GitHub Actions** - CI/CD platform

### DevOps
- **GitHub Pages** - Hosting
- **npm** - Package management
- **Jest** - Testing framework

### AI Integration
- **OpenAI API** - GPT-3.5 Turbo
- **GitHub Script** - Automation

### Tools
- **ESLint** - Linting
- **Prettier** - Code formatting
- **React Testing Library** - Component testing

---

## 📚 Interview Preparation

### Key Concepts Demonstrated

✅ **CI/CD Pipelines** - Complete automation from commit to deployment  
✅ **Matrix Strategies** - Parallel testing across versions  
✅ **Caching** - Performance optimization techniques  
✅ **Job Dependencies** - Workflow orchestration  
✅ **Environments** - Deployment management  
✅ **Secrets Management** - Secure credential handling  
✅ **Conditional Execution** - Smart workflow triggers  
✅ **AI Integration** - Modern automation with LLMs  

### Interview Questions Covered

This repository demonstrates answers to:

**GitHub Actions:**
- How do you optimize CI/CD pipelines?
- What's the difference between jobs and steps?
- How do you handle secrets securely?
- Explain matrix builds and when to use them
- How do you cache dependencies?

**React:**
- Common mistakes and how to fix them
- Performance optimization techniques
- Accessibility best practices
- Security considerations

**DevOps:**
- Blue-green deployments
- Rollback strategies
- Monitoring and alerting
- Cost optimization

**AI/Automation:**
- Integrating AI into workflows
- Prompt engineering for code review
- Cost management with AI APIs

[📖 Complete Interview Q&A Document](./INTERVIEW_PREP.md)

---

## 🎓 Learning Path

### Beginner
1. Start with `nodejs-ci.yml` - Understand basic workflow structure
2. Try `matrix-ci.yml` - Learn parallel execution
3. Explore `cache-ci.yml` - Optimize performance

### Intermediate
4. Study `deploy.yml` - Deployment strategies
5. Review `pr-checks.yml` - Quality gates
6. Analyze `pr-automation.yml` - Automation patterns

### Advanced
7. Implement `ai-code-review.yml` - AI integration
8. Customize workflows for your projects
9. Create your own reusable actions

---

## 📊 Workflow Execution Stats

Based on actual runs in this repository:

| Metric | Value |
|--------|-------|
| Total Workflows | 8 |
| Average Success Rate | 100% (for passing code) |
| Fastest Workflow | PR Automation (~15s) |
| Slowest Workflow | Cache CI first run (~57s) |
| Cache Hit Rate | ~85% |
| AI Review Accuracy | High (catches 30+ issue types) |
| Cost per PR (with AI) | ~$0.01 |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

**Note:** All PRs will be automatically reviewed by our AI Code Review bot! 🤖

---

## 🐛 Known Issues

- AI Code Review requires OpenAI API key (costs ~$0.01 per review)
- GitHub Pages deployment requires public repository (or GitHub Enterprise)
- Some workflows may need label creation before first run

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **GitHub Actions** - For the amazing CI/CD platform
- **OpenAI** - For GPT-3.5 Turbo API
- **React Team** - For the excellent framework
- **Community** - For best practices and patterns

---

## 📧 Contact

**Author:** Kirti  
**Repository:** [github-actions-practice](https://github.com/kirti/github-actions-practice)  
**Live Demo:** [https://kirti.github.io/github-actions-practice](https://kirti.github.io/github-actions-practice)

---

## 🔗 Useful Links

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [React Documentation](https://react.dev)
- [Workflow Syntax Reference](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

---

**⭐ Star this repository if it helped you learn GitHub Actions!**

**💼 Perfect for showcasing in your portfolio and interviews!**

---

*Last Updated: March 2026*
*Made with ❤️ for developers preparing for interviews*
