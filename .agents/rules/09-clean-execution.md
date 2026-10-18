---
trigger: always_on
description: "Clean execution: how an agent carries out any task - predictable, minimal, verified step by step, reversible, and leaving no mess behind."
---

# R-09: Clean Execution

Clean code ([02-clean-code](02-clean-code.md)) is about what the result looks like. Clean execution is about how the work is done: **predictable, minimal, verified, reversible, and leaving no mess.** Both are required.

## 1. Before acting

- Understand the request and read the code, configuration and commands involved ([AGENTS.md](../../AGENTS.md) section 3).
- Plan the smallest change that solves it. For multi-step work, write the steps and the check that proves each one.
- Prefer a preview: dry-run flags (`--dry-run`, `--check`, `plan`, `diff`, `-WhatIf`), a scratch copy, or a test, before the real action.

## 2. While acting

- One logical change at a time; verify it (build, lint, type-check, test, or run) before the next one.
- Use the project's own commands and versions, not global or remembered ones.
- Commands are idempotent where possible: running them twice must not duplicate data or break state.
- Touch only what the task needs. No drive-by reformatting, renames or "improvements" ([01-core-principles](01-core-principles.md) section 1).
- Regenerate derived files with their generator after changing sources (lockfiles, mirrors, generated code); never edit generated output by hand.
- No irreversible or outward-facing action (deleting, force-pushing, migrating shared data, deploying, publishing, sending messages) without explicit approval.

### Existing code is preserved: confirm and discuss first

Code that already exists was written for a reason you may not see. Never delete it on your own judgement.

**Needs the user's confirmation first:**

- Deleting or emptying files, functions, classes, tests, assertions, configuration, dependencies or documentation.
- Overwriting a file with a full rewrite, or replacing an existing implementation with a new one.
- Commenting out, disabling or bypassing existing code, checks or tests.
- Moving or renaming public interfaces, files or modules that other code may use.
- Discarding work: `git reset --hard`, `git checkout -- <path>`, `git restore`, `git clean`, `git stash drop` or `clear`, or deleting branches.
- Any change to existing code beyond what the user asked for, even when it looks like an improvement ([01-core-principles](01-core-principles.md) section 1).

**Needs no confirmation:** reading and analysing; adding new code; editing the lines the request is about, in the way it asks; removing temporary files, logs and debug output that you created yourself in this task.

**How to ask.** Stop before the change and present a proposal, then wait:

```text
Proposal:       <delete | replace | rewrite | move | disable> <files, symbols or lines>
Why:            <what the task needs, or the problem you found>
Depends on it:  <callers, tests, configuration, docs, other systems; found by searching, not guessed>
Options:        <keep as is | deprecate | hide behind a flag | replace step by step>, with trade-offs
Risk and undo:  <what could break; how to restore it (commit, revert, backup)>
Decision:       <the question the user needs to answer>
```

- An explicit request ("delete the legacy export module") is the approval for exactly that, nothing more. Approval for one change is not approval for others.
- Silence or an unclear answer is not consent; keep the code.
- In non-interactive runs (CI, scheduled or background agents), never delete existing code; put the proposal in the report or pull request description instead.
- When removal is agreed, prefer a reversible path: a separate commit, deprecation first for public interfaces, and a feature flag or the strangler fig pattern for replacements ([change-existing-code](../skills/change-existing-code/SKILL.md)).

## 3. When something fails

- Stop at the first unexpected result. Read the actual error; do not retry the same thing blindly or stack guesses.
- Find the root cause ([systematic-debugging](../skills/systematic-debugging/SKILL.md)); never hide a failure by deleting a check, skipping a test or catching and ignoring the error.
- If a step left partial changes, roll them back or state exactly what remains.

## 4. Leave no mess

- Temporary files go in a temporary or scratch directory and are removed when no longer needed; nothing temporary lands in the repository.
- Stop servers, watchers and background processes you started.
- Remove the debug output, temporary logging, commented-out code and stray artefacts that you added before finishing. Existing ones are not yours to delete; mention them instead (section 2).
- Do not change global configuration, shell profiles, system packages or credentials unless that is the task.
- Finish with a clean, explainable working tree: every changed file is intended and listed in the report.

## 5. Tools and scripts you write

- Exit code `0` on success and non-zero on failure; errors to standard error with a clear message.
- Safe defaults: preview or confirmation for destructive operations, no secrets in output, timeouts on network calls.
- Behave well in pipelines and automation: no interactive prompts in non-interactive mode, handle a closed output pipe and interruption without crashing or leaving partial state.

## 6. Review your own work before reporting

Self-review catches what a single pass misses. The OpenSSF guide for AI code assistants reports that even two rounds of this "recursive criticism and improvement" substantially improve the security of generated code ([source](https://best.openssf.org/Security-Focused-Guide-for-AI-Code-Assistant-Instructions)).

1. Re-read the full diff against the request, the acceptance criteria and the rules: correctness, edge cases, security (rule [06](06-security.md)), clean code (rule [02](02-clean-code.md)), leftovers (section 4).
2. Write down the concrete problems you find, fix them, and re-run the checks.
3. Repeat once more for risky changes (security, data, money, concurrency, migrations). Stop when a round finds nothing new.

Self-review complements real tools and human review; it never replaces running the linter, tests and scanners.

## 7. Report

State what was changed, which commands ran and what they returned, what was not done, and any state left behind (running services, pending migrations, follow-ups), using the format in [AGENTS.md](../../AGENTS.md) section 7.
