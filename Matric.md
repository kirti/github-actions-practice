Example 2: Matrix Build - Test on Multiple Node Versions
- Run tests on Node 18, 20, and 22 simultaneously
- See 3 jobs running in parallel
- Understand matrix strategy

# Matrix Strategy creates multiple jobs from one definition:

- node-version: [18, 20, 22] → Creates 3 jobs
- All run in parallel (at the same time)
- Uses ${{ matrix.node-version }} to reference the current value

Real-world use cases:

- Test on multiple Node versions (like we just did)
- Test on multiple OS (Ubuntu, Windows, macOS)
- Test with different dependency versions
- Test different configurations

