# AGENTS.md: Engineering Rules for AI Coding Agents

These instructions apply to every AI model and coding agent working in this repository: Claude Code, Codex, Gemini CLI, Antigravity, Cursor, Windsurf/Devin, GitHub Copilot, Cline, Aider, and any chat model given this file as a system prompt.
They describe how an experienced engineer works, from an empty folder to a running deployment, and how to change existing code safely.

This file is the **always-on core**. Deeper guidance loads on demand:

- **Rules** (short, normative): [`.agents/rules/`](.agents/rules/)
- **Skills** (step-by-step procedures): [`.agents/skills/`](.agents/skills/) (mirrored to `.claude/skills/` for Claude Code and Cline)

If your tool does not load these folders automatically, **open the matching file from the tables in sections 4 and 5 before starting that kind of work.**

---

## 1. Priorities (when goals conflict, the higher one wins)

1. **Safety and security**: never leak secrets, destroy data, or weaken security controls.
2. **Correctness**: code does what was asked and is verified by running it.
3. **Respect for the existing codebase**: follow its conventions, architecture and tooling.
4. **Clarity**: code another engineer can read, change and debug.
5. **Performance**: measure first, then optimize.
6. **Brevity**: least important; never trade correctness for shorter output.

## 2. Non-negotiables

1. **Do not fabricate.** Never invent APIs, functions, CLI flags, config keys, package names, versions, file paths, URLs, or test results. If you have not verified it, check it (see [03-verification](.agents/rules/03-verification.md)) or say plainly that it is unverified.
2. **Ship complete work, or state the gap.** Do not hide `TODO`, `pass`, `...`, `throw new Error("not implemented")` or stubbed returns in code presented as finished. If the scope is deliberately partial, say so explicitly in your response.
3. **Never silence the toolchain to "pass".** Do not add `any`, `@ts-ignore`, `# type: ignore`, `//nolint`, `#[allow(...)]`, `eslint-disable`, skipped tests, or weakened assertions unless the user approves, and then add an inline reason.
4. **Never hard-code secrets.** No credentials, tokens or keys in code, tests, logs, commits or examples. Read them from the environment or a secret manager.
5. **Confirm before irreversible or outward-facing actions**: deleting data or files, force-pushing, rewriting history, running migrations against shared databases, deploying, publishing packages, or sending anything to external services.
6. **Match the codebase.** Use its language version, formatter, linter, test framework, folder layout and naming. Do not introduce a new framework, pattern or dependency when an existing one does the job.
7. **Report honestly.** State what you ran and what it printed. If something failed or was not run, say so.

## 3. Workflow for every task

1. **Understand.** Restate the goal and the acceptance criteria. Identify inputs, outputs, edge cases, failure modes and constraints. Ask only when a decision truly belongs to the user; otherwise pick the conventional option and state it.
2. **Ground in reality.** Read the relevant code before editing. Detect the stack from manifests (`package.json`, `pyproject.toml`, `go.mod`, `Cargo.toml`, `pom.xml`, `build.gradle(.kts)`, `*.csproj`, `composer.json`, `Gemfile`), lockfiles, CI config and the README. Note the exact runtime and dependency versions.
3. **Plan the smallest correct change.** Prefer modifying existing code over adding layers. Write the plan down for multi-file or risky changes.
4. **Implement.** Write idiomatic, typed, complete code per [01-core-principles](.agents/rules/01-core-principles.md) and [02-clean-code](.agents/rules/02-clean-code.md). Handle errors per [05-error-handling](.agents/rules/05-error-handling.md).
5. **Verify by executing.** Run the formatter, linter, type checker, tests and build that the project already uses. Add or update tests for the behaviour you changed. A change is not verified until the commands have actually run.
6. **Report.** Use the format in section 7.

## 4. Rules index

| File | Activation | Use it for |
| :--- | :--- | :--- |
| [01-core-principles.md](.agents/rules/01-core-principles.md) | always | Engineering principles, scope discipline, simplicity |
| [02-clean-code.md](.agents/rules/02-clean-code.md) | always | Naming, functions, types, state, comments, formatting |
| [03-verification.md](.agents/rules/03-verification.md) | always | Anti-hallucination protocol and how to verify APIs, packages, flags |
| [04-dependencies.md](.agents/rules/04-dependencies.md) | on demand | Adding, replacing or upgrading dependencies; standard-library-first choices |
| [05-error-handling.md](.agents/rules/05-error-handling.md) | on demand | Errors, validation at boundaries, logging, resource cleanup |

## 5. Skills index (procedures)

| Skill | Use it when |
| :--- | :--- |
| [native-from-scratch](.agents/skills/native-from-scratch/SKILL.md) | Building a new service, CLI or module with the standard library first |
| [rigorous-code-audit](.agents/skills/rigorous-code-audit/SKILL.md) | Reviewing a change or codebase for correctness, security and quality |

## 6. Lifecycle essentials (summary; follow the rule or skill for detail)

- **Start from scratch**: choose a currently supported runtime version; commit a lockfile; add `.editorconfig`, `.gitignore`, a formatter, a linter, a type checker and a test runner on day one; write a README that explains how to build, test and run.
- **Change existing code**: read before writing; reproduce or characterise current behaviour with a test before changing it; keep diffs small and focused; do not reformat unrelated code.
- **Test**: every behaviour change gets a test that fails without the change. Tests must be deterministic. No network, clock or randomness without control. Cover edge cases: empty, zero, negative, maximum, Unicode, concurrent, timeout, and failure paths.
- **Debug**: reproduce first, then isolate, form one hypothesis at a time, prove it with evidence (logs, debugger, a failing test), fix the root cause, and keep the reproducer as a regression test. Never "fix" by guessing.
- **Secure**: validate all external input at the boundary; use parameterized queries; encode output for its context; apply least privilege; keep secrets out of the repository; scan dependencies for known vulnerabilities before release.
- **Deploy**: build once and promote the same artifact; configure through environment variables; expose health checks; make migrations backward compatible; have a tested rollback path; log in a structured format without secrets or personal data.

## 7. Definition of done and report format

A task is done when all of these hold:

- [ ] Acceptance criteria met; behaviour verified by running code or tests
- [ ] Formatter, linter, type checker and tests pass, using the project's own commands
- [ ] New or changed behaviour covered by tests, including failure paths
- [ ] No secrets, debug leftovers, commented-out code or unexplained suppressions
- [ ] Public interfaces, configuration and environment variables documented
- [ ] Commands, flags and APIs used were verified, not assumed

End every task with a short report:

```text
Changed:    <files and what changed, one line each>
Verified:   <commands run and their result, e.g. "npm test → 42 passed">
Not done:   <anything skipped, unverified or out of scope, or "nothing">
Risks:      <follow-ups, migrations, breaking changes, or "none">
```

## 8. Project profile (fill in per project)

If a field below is empty, detect it from the repository and propose the value to the user. Do not guess.

- Runtime and version:
- Install:
- Format / lint / type-check:
- Test:
- Build / run:
- Deploy target:
