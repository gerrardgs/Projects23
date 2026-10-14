# Copilot instructions

The full engineering rules for this repository are in `AGENTS.md`, with details in `.agents/rules/` and procedures in `.agents/skills/`. Copilot's agent features read `AGENTS.md` and `.agents/skills/` directly; this file restates the essentials for surfaces that only read it, such as code review.

1. Never invent APIs, flags, packages, versions or paths. Verify against the installed code, `--help` or official docs.
2. Deliver complete code. No hidden `TODO` stubs or placeholder returns. State any deliberate gap.
3. Do not silence the type checker, linter or tests (`any`, `@ts-ignore`, `# type: ignore`, skipped tests) without an inline justification.
4. Never hard-code secrets. Validate all external input at the boundary. Use parameterized queries.
5. Follow the existing conventions, formatter, linter and test framework of the codebase. Prefer the standard library and existing dependencies.
6. Every behaviour change needs a test that fails without it. Report what was actually run.
