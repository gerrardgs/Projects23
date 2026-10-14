# Agent Operational Manual

This manual provides practical procedures for AI agents and human engineers applying UCNA-Spec to real-world software engineering workflows.

---

## 1. Starting a New Component or Service (Native From Scratch)

When tasked with building a new module, microservice, or CLI tool:

1. **Activate the Skill**: Consult [native-from-scratch](../.agents/skills/native-from-scratch/SKILL.md).
2. **Consult Rule 04**: Check [04-dependencies](../.agents/rules/04-dependencies.md) to identify standard library capabilities for your language.
3. **Establish Day-One Guardrails**:
   - Create `.gitignore`, `.editorconfig`.
   - Configure the native linter and strict type checker (`tsconfig.json`, `pyproject.toml`, or `Cargo.toml`).
   - Write a self-contained README with verified *install, test, run* commands.
4. **Build the Functional Core First**:
   - Write pure functions for validation, domain models, and state transitions.
   - Unit-test these pure functions with deterministic tests (no network, no mocks).
5. **Build the I/O Shell**:
   - Wrap the pure core in standard HTTP handlers, CLI parsers, or file processors.
   - Enforce timeouts, graceful shutdown, and size limits on input bodies.

---

## 2. Refactoring Existing Code Safely

When modifying or refactoring existing code:

1. **Characterize Before Changing**:
   - Read the existing implementation and its callers.
   - Run existing tests to ensure a green baseline. If tests are missing, write a characterization test asserting the current behavior before touching the code.
2. **Apply the Rule of Clean Code**:
   - Follow [02-clean-code](../.agents/rules/02-clean-code.md).
   - Use early returns to keep nesting depth $\le 3$.
   - Maintain cyclomatic complexity $\le 10$.
3. **Keep Diffs Minimal & Focused**:
   - Do not reformat unrelated files or rename public interfaces unless explicitly requested.
   - Verify every step by running the test suite after each atomic change.

---

## 3. Systematic Debugging Protocol

When diagnosing a failure or production defect:

1. **Reproduce with Evidence**:
   - Construct a minimal, deterministic reproducer test that fails with the reported bug.
   - Never "guess" a fix without reproducing the symptom.
2. **Isolate the Cause**:
   - Formulate one hypothesis at a time.
   - Trace variables and state transitions using logs or debuggers.
3. **Fix the Root Cause**:
   - Address the fundamental flaw, not merely the symptom.
   - Ensure boundary values (null, empty, negative, max) are resilient per [05-error-handling](../.agents/rules/05-error-handling.md).
4. **Retain the Regression Test**:
   - Keep the reproducer test in the test suite permanently to prevent future regressions.

---

## 4. Code Auditing & Pull Request Review

When reviewing a PR or auditing an existing codebase:

1. **Activate the Skill**: Consult [rigorous-code-audit](../.agents/skills/rigorous-code-audit/SKILL.md).
2. **Run Automated Toolchain**: Execute the project's native formatter, linter, type checker, and test runner.
3. **Security Checklist**: Audit against OWASP Top 10:2025 (Access control, injection, cryptographic weaknesses, supply-chain hygiene).
4. **Falsification & Verification**: Confirm candidate bugs by tracing code paths and constructing concrete scenarios before reporting.
5. **Severity-Ranked Output**: Report findings ordered by severity (Critical, High, Medium, Low) with concrete files, lines, and fixes.
