# Agent Operational Manual

Which rules and skills to use for each kind of task, for AI agents and for the people directing them. The always-on core in [AGENTS.md](../AGENTS.md) applies to every scenario. Paths below are relative to the repository root.

## 1. Scenario router

| Scenario | Read first | Then |
| :--- | :--- | :--- |
| New repository from an empty folder | [project-bootstrap](../.agents/skills/project-bootstrap/SKILL.md) | [native-from-scratch](../.agents/skills/native-from-scratch/SKILL.md), [ci-cd-pipeline](../.agents/skills/ci-cd-pipeline/SKILL.md) |
| New feature in an existing project | [change-existing-code](../.agents/skills/change-existing-code/SKILL.md) | [test-engineering](../.agents/skills/test-engineering/SKILL.md), rule [05](../.agents/rules/05-error-handling.md) |
| Bug report or failing behaviour | [systematic-debugging](../.agents/skills/systematic-debugging/SKILL.md) | [test-engineering](../.agents/skills/test-engineering/SKILL.md) for the regression test |
| Flaky test | [test-engineering](../.agents/skills/test-engineering/SKILL.md) section 4 | [systematic-debugging](../.agents/skills/systematic-debugging/SKILL.md) |
| Refactoring | [change-existing-code](../.agents/skills/change-existing-code/SKILL.md) | rule [02](../.agents/rules/02-clean-code.md) |
| Dependency or runtime upgrade | [change-existing-code](../.agents/skills/change-existing-code/SKILL.md) section 4 | rule [04](../.agents/rules/04-dependencies.md) |
| Code review or pull request review | [rigorous-code-audit](../.agents/skills/rigorous-code-audit/SKILL.md) | rule [06](../.agents/rules/06-security.md) |
| Security review, auth, payments, uploads, personal data | [security-hardening](../.agents/skills/security-hardening/SKILL.md) | [rigorous-code-audit](../.agents/skills/rigorous-code-audit/SKILL.md) |
| Slow code or high memory | [systematic-debugging](../.agents/skills/systematic-debugging/SKILL.md) "Performance problems" | its [tools reference](../.agents/skills/systematic-debugging/references/tools.md) |
| CI is failing | [systematic-debugging](../.agents/skills/systematic-debugging/SKILL.md) | [ci-cd-pipeline](../.agents/skills/ci-cd-pipeline/SKILL.md) |
| Set up or harden CI/CD | [ci-cd-pipeline](../.agents/skills/ci-cd-pipeline/SKILL.md) | [security-hardening](../.agents/skills/security-hardening/SKILL.md) section 4 |
| Containerise or deploy | [deploy-and-release](../.agents/skills/deploy-and-release/SKILL.md) | [ci-cd-pipeline](../.agents/skills/ci-cd-pipeline/SKILL.md) |
| Database schema change | [deploy-and-release](../.agents/skills/deploy-and-release/SKILL.md) section 4 | [change-existing-code](../.agents/skills/change-existing-code/SKILL.md) |
| Production incident | [systematic-debugging](../.agents/skills/systematic-debugging/SKILL.md) "Production incidents" | [deploy-and-release](../.agents/skills/deploy-and-release/SKILL.md) section 6 |
| Commit, pull request, release | rule [08](../.agents/rules/08-git-workflow.md) | |
| Documentation only | rule [01](../.agents/rules/01-core-principles.md) section 7 | [project-bootstrap assets](../.agents/skills/project-bootstrap/assets/) (README and ADR templates) |
| Question about the code, no change requested | rule [03](../.agents/rules/03-verification.md) | Answer from the code you read, with file and line references; change nothing |

## 2. Execution loop for any scenario

1. **Understand**: restate the goal and acceptance criteria; list assumptions.
2. **Ground**: read the relevant code, manifests and tests; run the baseline build and tests.
3. **Plan**: the smallest correct change; for multi-step work, a numbered plan with checkpoints.
4. **Do**: one step at a time, following the rules and the chosen skill.
5. **Verify**: run the formatter, linter, type checker and tests; read the actual output.
6. **Report**: the format in `AGENTS.md` section 7: changed, verified, not done, risks.

## 3. Using the spec where files are not loaded automatically

- **Chat models (ChatGPT, Claude.ai, Gemini, DeepSeek, Llama, Qwen and others)**: paste `AGENTS.md` first, then the rule or skill for the task. Tell the model it cannot run commands, so every result must be labelled unverified until you run it.
- **IDE or CLI agents that load only `AGENTS.md`**: the indexes in `AGENTS.md` direct the agent to open the right rule or skill file.
- **Sub-agents**: pass each one the task, the acceptance criteria, and the links to the relevant rule and skill files. Sub-agents start without the parent's context.

## 4. What humans should still do

- Approve anything irreversible or outward-facing: deletions, force pushes, migrations, deployments, publishing, messages to other people.
- Review diffs before merging; an agent's report is a summary, not proof.
- Keep the "Project profile" in `AGENTS.md` current, so agents run the right commands.
- Re-verify dated facts (runtime versions, tool locations, action SHAs) periodically; `node scripts/agents-sync.mjs` checks structure, not the outside world.
