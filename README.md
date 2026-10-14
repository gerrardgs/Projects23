# Projects 23: Production AI Agent Coding Needs

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Format: Agent Skills](https://img.shields.io/badge/Format-Agent%20Skills-blue.svg)](https://agentskills.io/specification)
[![Validate](https://github.com/gerrardgs/Projects23/actions/workflows/validate.yml/badge.svg)](https://github.com/gerrardgs/Projects23/actions/workflows/validate.yml)

Free, model-agnostic rules and skills that make AI coding agents work like an experienced engineer. They cover the whole lifecycle, from an empty folder through testing, debugging, security, CI/CD and deployment, and safe changes to existing code. One source of truth, loaded by Claude Code, Codex, Gemini CLI, Antigravity, Cursor, Windsurf, GitHub Copilot, Cline, Aider, or any chat model you paste it into.

Every version, command, package name, extension ID and template in this repository was checked against official sources or by running it. Each time-sensitive fact carries its verification date.

## What is inside

| Layer | Location | Loaded | Contents |
| :--- | :--- | :--- | :--- |
| Core | [`AGENTS.md`](AGENTS.md) | Always | Priorities, non-negotiables, workflow, rule and skill indexes, operating conditions, definition of done (about 115 lines) |
| Rules | [`.agents/rules/`](.agents/rules/) | Always (4) or when relevant (4) | Principles, clean code, verification, security, dependencies, error handling, testing, Git workflow |
| Skills | [`.agents/skills/`](.agents/skills/) | When the task matches | Nine step-by-step procedures with verified templates and references |
| Adapters | `CLAUDE.md`, `GEMINI.md`, `.gemini/settings.json`, `.github/copilot-instructions.md`, `.aider.conf.yml` | Per tool | Make each tool load the same core |
| Mirror | `.claude/skills/` | Generated | Copy of the skills for Claude Code and Cline; never edit by hand |
| Tooling | [`scripts/`](scripts/) | You or CI | Installer, and the sync and validation script |
| Docs | [`docs/`](docs/) | Reference | Architecture, operational manual, anti-hallucination playbook, contributing guide |

### Skills: one per lifecycle phase

| Phase | Skill | Highlights |
| :--- | :--- | :--- |
| Start | [project-bootstrap](.agents/skills/project-bootstrap/SKILL.md) | Toolchains for 7 language families, 32 VS Code extension IDs verified on the Marketplace, `.editorconfig`, `.gitattributes`, pre-commit with secret scanning, README and ADR templates |
| Build | [native-from-scratch](.agents/skills/native-from-scratch/SKILL.md) | Standard-library-first design; runnable Node.js and Python services with tests, lockfile and Dockerfile |
| Change | [change-existing-code](.agents/skills/change-existing-code/SKILL.md) | Characterization tests, small verified steps, upgrades, codemods, strangler fig |
| Test | [test-engineering](.agents/skills/test-engineering/SKILL.md) | Test levels, determinism, property-based, fuzz and mutation testing, tools per language |
| Debug | [systematic-debugging](.agents/skills/systematic-debugging/SKILL.md) | Reproduce, isolate, `git bisect`, debuggers and profilers, performance, incidents |
| Review | [rigorous-code-audit](.agents/skills/rigorous-code-audit/SKILL.md) | Toolchain checks, OWASP Top 10:2025 checklist, verified and severity-ranked findings |
| Secure | [security-hardening](.agents/skills/security-hardening/SKILL.md) | Threat modelling, OWASP ASVS 5.0, secrets, SAST, dependency and container scanning, SBOM |
| Automate | [ci-cd-pipeline](.agents/skills/ci-cd-pipeline/SKILL.md) | GitHub Actions templates pinned to commit SHAs, least privilege, Dependabot with cooldown |
| Ship | [deploy-and-release](.agents/skills/deploy-and-release/SKILL.md) | Production checklist, containers, rollout strategies, zero-downtime migrations, observability, rollback |

## Install into a project

The installer adds only the spec files. It **never overwrites a file that already exists and differs** (it lists those for you to merge), and it never touches your README, LICENSE, CHANGELOG, `.gitignore` or workflows.

```sh
# Preview first: nothing is written
curl -fsSL https://raw.githubusercontent.com/gerrardgs/Projects23/main/scripts/install.sh | bash -s -- --dry-run

# Install into the current directory
curl -fsSL https://raw.githubusercontent.com/gerrardgs/Projects23/main/scripts/install.sh | bash
```

Options: `--ref <tag-or-commit>` to install a fixed version (recommended for reproducibility), `--force` to overwrite differing files, `--source <dir>` to install from a local clone, and a target directory as the last argument. As with any script piped to a shell, read it first: [scripts/install.sh](scripts/install.sh).

Manual alternative: clone this repository and run `bash scripts/install.sh --source /path/to/clone /path/to/your/project`.

After installing:

1. Fill in section 8 ("Project profile") of `AGENTS.md` with your real install, lint, test, build and run commands.
2. If you already had an `AGENTS.md` or `CLAUDE.md`, merge them: `CLAUDE.md` needs the line `@AGENTS.md`, and `AGENTS.md` needs the rules and skills indexes.
3. Run `node scripts/agents-sync.mjs` (Node.js 22+) and commit the result, including `.claude/skills/`.

## Tool compatibility (checked against official docs on 2026-10-14)

| Tool | Reads the core | Rules in `.agents/rules/` | Skills | Source |
| :--- | :--- | :--- | :--- | :--- |
| Claude Code | `CLAUDE.md`, which imports `AGENTS.md` and the always-on rules | Always-on rules imported; others via index | `.claude/skills/` (mirror) | [memory](https://code.claude.com/docs/en/memory), [skills](https://code.claude.com/docs/en/skills) |
| OpenAI Codex | `AGENTS.md` | Via index | `.agents/skills/` | [skills](https://learn.chatgpt.com/docs/build-skills) |
| Gemini CLI | `GEMINI.md` and `AGENTS.md` (via `.gemini/settings.json`) | Via index | `.agents/skills/` | [context files](https://geminicli.com/docs/cli/gemini-md/), [skills](https://geminicli.com/docs/cli/skills/) |
| Google Antigravity | `AGENTS.md`, `GEMINI.md` | Native (`trigger` frontmatter) | `.agents/skills/` | [rules](https://antigravity.google/docs/rules), [skills codelab](https://codelabs.developers.google.com/getting-started-with-antigravity-skills) |
| Cursor | `AGENTS.md` (nested files supported) | Via index | `.agents/skills/` (also reads `.claude/skills/`) | [rules](https://cursor.com/docs/context/rules), [skills](https://cursor.com/docs/context/skills) |
| Windsurf / Devin Desktop | `AGENTS.md` | Via index | `.agents/skills/` | [rules](https://docs.devin.ai/desktop/cascade/memories), [skills](https://docs.devin.ai/desktop/cascade/skills) |
| GitHub Copilot | `.github/copilot-instructions.md`, `AGENTS.md` | Via index | `.agents/skills/` (also `.claude/skills/`) | [instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions), [skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills) |
| Cline | `AGENTS.md` (when no `.clinerules/` exists) | Via index | `.claude/skills/` (mirror) | [rules](https://docs.cline.bot/features/cline-rules/overview), [skills](https://docs.cline.bot/customization/skills.md) |
| Aider | `AGENTS.md` via `.aider.conf.yml` | Via index | Not supported | [conventions](https://aider.chat/docs/usage/conventions.html) |
| Any chat model | Paste `AGENTS.md`, then the rule or skill for the task | Manual | Manual | [operational manual](docs/AGENT-OPERATIONAL-MANUAL.md) |

"Via index" means the tool does not load the folder itself; `AGENTS.md` tells the agent which file to open.

## Quality checks

[`.github/workflows/validate.yml`](.github/workflows/validate.yml) runs on every push and pull request:

- Validator self-tests, then `node scripts/agents-sync.mjs --check --all-markdown`: skill and rule frontmatter (strict YAML), size limits, indexes, mirror drift, broken links.
- A second YAML check with PyYAML, `shellcheck` on the installer, `actionlint` and `zizmor` on the workflows.
- Installer tests: existing files are preserved, and a fresh install validates cleanly.
- Both templates: Node.js 22, 24 and 26 (`npm ci`, type-check, tests, `npm audit`), and Python 3.11 to 3.14 (Ruff, mypy, tests, `pip-audit`).

Run the same checks locally with the commands in [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md).

## Limits

- Rules guide a model; they cannot force it. For hard guarantees, use what the tools enforce: CI checks, branch protection, pre-commit hooks, and agent hooks such as Claude Code's `PreToolUse`.
- Tools that read both `.agents/skills/` and `.claude/skills/` list each skill twice, with identical content. If nobody uses Claude Code or Cline, delete `.claude/skills/` and remove it from `MIRRORS` in the sync script.
- Versions, action SHAs and tool locations are dated. Dependabot updates the pinned actions and images; re-check the rest when tools release major versions.

## Documentation

- [Architecture](docs/ARCHITECTURE.md): the design, the research behind it, and how each tool loads the files.
- [Agent operational manual](docs/AGENT-OPERATIONAL-MANUAL.md): which rule and skill to use for each scenario.
- [Anti-hallucination playbook](docs/ANTI-HALLUCINATION-PLAYBOOK.md): failure modes and how the verification protocol catches them.
- [Contributing](docs/CONTRIBUTING.md): authoring rules for rules, skills and templates.
- [Changelog](CHANGELOG.md).

## License

[MIT](LICENSE) © 2026 Gerrard Sebastian.
