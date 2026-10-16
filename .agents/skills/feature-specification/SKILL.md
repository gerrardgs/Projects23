---
name: feature-specification
description: Turn a feature request, user story or vague idea into a clear specification, technical plan and ordered task list before writing code (spec-driven development) - goals and non-goals, users and scenarios, acceptance criteria in Given/When/Then form, edge cases, non-functional requirements (security, performance, accessibility, privacy), open questions, design options and risks. Use when a request is larger than a small fix, is ambiguous, touches several components, or when the user asks for a spec, PRD, plan, breakdown or estimate.
license: MIT
metadata:
  version: "1.0.0"
---

# Feature Specification and Planning

Agents and humans both build the wrong thing fastest when "what" and "why" are skipped. Spec-driven development fixes the intent first, then the approach, then the tasks; GitHub's open-source [Spec Kit](https://github.com/github/spec-kit) uses the same order (principles once per project; then specify, plan, tasks, implement for each feature). This skill is tool-independent.

Keep the size proportional: a one-day change needs a few lines, not a document. Store the result where the project keeps such files (for example `docs/specs/<feature>.md`) or in the issue.

## 1. Specify: what and why (no technology yet)

```text
Problem:        <who has which problem today; evidence>
Goal:           <the outcome that will be true when this is done>
Non-goals:      <what this deliberately does not do>
Users:          <roles and their main scenarios>
Acceptance criteria (each one testable):
  Given <context>, when <action>, then <observable result>
  ...
Edge cases:     <empty, maximum, invalid, concurrent, offline, partial failure, permissions>
Non-functional: <security and privacy, performance targets, accessibility (WCAG 2.2 AA), reliability, compliance>
Open questions: <decisions only the user or owner can make>
```

- Write acceptance criteria as observable behaviour, not implementation. Each becomes at least one test ([test-engineering](../test-engineering/SKILL.md)).
- Ask the open questions now, before planning ([AGENTS.md](../../../AGENTS.md) section 6, "Ambiguous request").

## 2. Plan: how

- Read the existing code and conventions first ([change-existing-code](../change-existing-code/SKILL.md)); reuse before adding.
- Describe the approach: components touched, data model and contract changes (API, events, schema), migrations, configuration, feature flags, and observability.
- For a significant choice, compare two or three options with their trade-offs and record the decision ([ADR template](../project-bootstrap/assets/adr-template.md)).
- List risks with mitigations: security (threat model, [security-hardening](../security-hardening/SKILL.md)), data migration, performance, backward compatibility, rollout and rollback.

## 3. Tasks: ordered, small and verifiable

- Break the plan into tasks that each leave the system working and can be reviewed on their own: typically under a day each.
- Order by dependency and risk: contracts and tests first, risky unknowns early (a spike to learn), polish last.
- For each task, state its "done" check (a test, a command, an observable result).

```text
1. <task> — done when <check>
2. <task> — done when <check>
```

## 4. Implement and converge

- Implement task by task with [09-clean-execution](../../rules/09-clean-execution.md): verify after each, self-review, keep the task list updated.
- When reality differs from the plan, update the spec or plan first, then the code, so they never drift apart.
- Finish by checking every acceptance criterion against a passing test or demonstration, and report any criterion not met.

## Done when

- [ ] Goals, non-goals, acceptance criteria, edge cases and non-functional requirements are written and agreed
- [ ] Open questions answered by the owner, or explicitly deferred
- [ ] Plan names affected components, contract and data changes, risks and the rollback
- [ ] Tasks are small, ordered and each has a verification
- [ ] Every acceptance criterion maps to a passing test
