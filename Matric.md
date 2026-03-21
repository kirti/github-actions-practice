## 🔷 Example 2: Matrix Build
- Test on Multiple Node Versions
- Run tests on Node 18, 20, and 22 simultaneously
- See 3 jobs running in parallel
- Understand matrix strategy

# Matrix Strategy creates multiple jobs from one definition:

- node-version: [18, 20, 22] → Creates 3 jobs
- All run in parallel (at the same time)
- Uses ${{ matrix.node-version }} to reference the current value

### Real-world use cases:

- Test on multiple Node versions (like we just did)
- Test on multiple OS (Ubuntu, Windows, macOS)
- Test with different dependency versions
- Test different configurations

### **Purpose**
Test your application across multiple Node.js versions simultaneously to ensure compatibility.

### **What It Does**
1. Creates 3 parallel jobs (one for each Node version)
2. Tests on Node.js 18, 20, and 22
3. All jobs run at the same time
4. Shows which versions pass/fail

### **Workflow File: `.github/workflows/matrix-ci.yml`**

```yaml
name: Matrix CI

on:
  push:
    branches: [ master, feature/github-actions-practice ]
  pull_request:
    branches: [ master ]
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18, 20, 22]
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Setup Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test -- --passWithNoTests --watchAll=false
    
    - name: Build project
      run: npm run build
    
    - name: Display Node version
      run: |
        echo "Testing on Node.js ${{ matrix.node-version }}"
        node --version
```

### **Key Concepts Learned**

#### **1. Matrix Strategy**
```yaml
strategy:
  matrix:
    node-version: [18, 20, 22]
```

This single configuration creates **3 jobs**:
- Job 1: Node.js 18
- Job 2: Node.js 20
- Job 3: Node.js 22

All run in **parallel**!

#### **2. Matrix Variables**
```yaml
node-version: ${{ matrix.node-version }}
```
- Access current matrix value using `${{ matrix.variable-name }}`
- Can use in step names, commands, or action inputs
- Makes workflows DRY (Don't Repeat Yourself)



#### **3. Real-World Matrix Examples**

**Multiple Node versions:**
```yaml
strategy:
  matrix:
    node-version: [16, 18, 20, 22]
```

**Multiple Operating Systems:**
```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest, macos-latest]
runs-on: ${{ matrix.os }}
```

**Multiple Dimensions:**
```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest]
    node-version: [18, 20, 22]
```
This creates **6 jobs** (2 OS × 3 Node versions)!

**With Include (add specific combinations):**
```yaml
strategy:
  matrix:
    node-version: [18, 20]
    include:
      - node-version: 22
        experimental: true
```

**With Exclude (remove specific combinations):**
```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest]
    node-version: [18, 20, 22]
    exclude:
      - os: windows-latest
        node-version: 18
```

### **Questions - Example 2**

#### **Q6: What is a matrix strategy in GitHub Actions?**
**Answer:**
- Matrix strategy allows running the same job with different configurations
- Creates multiple jobs from a single job definition
- All matrix jobs run in parallel for faster feedback
- Common use cases:
  - Testing across multiple Node/Python versions
  - Testing on different operating systems
  - Testing with different dependency versions
  - Cross-platform compatibility testing

#### **Q7: How many jobs does this matrix create?**
```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest, macos-latest]
    node-version: [16, 18, 20]
```
**Answer:**
- 9 jobs (3 OS × 3 Node versions)
- ubuntu + Node 16, ubuntu + Node 18, ubuntu + Node 20
- windows + Node 16, windows + Node 18, windows + Node 20
- macos + Node 16, macos + Node 18, macos + Node 20
- All run in parallel

#### **Q8: What happens if one matrix job fails?**
**Answer:**
- By default, other jobs continue running
- The overall workflow is marked as failed
- You can change this behavior with `fail-fast`:
```yaml
strategy:
  fail-fast: false  # Continue all jobs even if one fails
  matrix:
    node-version: [18, 20, 22]
```
- With `fail-fast: true` (default), remaining jobs are cancelled when one fails

#### **Q9: How do you access matrix values in your workflow?**
**Answer:**
Use the expression syntax: `${{ matrix.variable-name }}`

Examples:
```yaml
# In step names
- name: Test on Node ${{ matrix.node-version }}

# In with parameters
with:
  node-version: ${{ matrix.node-version }}

# In run commands
run: echo "Testing on ${{ matrix.os }}"
```

#### **Q10: When should you use matrix builds?**
**Answer:**
Use matrix builds when you need to:
- Test compatibility across multiple versions (Node, Python, etc.)
- Ensure cross-platform compatibility (Linux, Windows, Mac)
- Test with different configurations or feature flags
- Validate against multiple dependency versions

Don't use for:
- Simple single-version projects
- When you only support one platform
- When parallel jobs would be wasteful (same test 5 times)

---