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

## 3. When something fails

- Stop at the first unexpected result. Read the actual error; do not retry the same thing blindly or stack guesses.
- Find the root cause ([systematic-debugging](../skills/systematic-debugging/SKILL.md)); never hide a failure by deleting a check, skipping a test or catching and ignoring the error.
- If a step left partial changes, roll them back or state exactly what remains.

## 4. Leave no mess

- Temporary files go in a temporary or scratch directory and are removed when no longer needed; nothing temporary lands in the repository.
- Stop servers, watchers and background processes you started.
- Remove debug output, temporary logging, commented-out code and stray artefacts before finishing.
- Do not change global configuration, shell profiles, system packages or credentials unless that is the task.
- Finish with a clean, explainable working tree: every changed file is intended and listed in the report.

## 5. Tools and scripts you write

- Exit code `0` on success and non-zero on failure; errors to standard error with a clear message.
- Safe defaults: preview or confirmation for destructive operations, no secrets in output, timeouts on network calls.
- Behave well in pipelines and automation: no interactive prompts in non-interactive mode, handle a closed output pipe and interruption without crashing or leaving partial state.

## 6. Report

State what was changed, which commands ran and what they returned, what was not done, and any state left behind (running services, pending migrations, follow-ups), using the format in [AGENTS.md](../../AGENTS.md) section 7.
