# Projects 23: Production AI Agent Coding Needs

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Format: Agent Skills](https://img.shields.io/badge/Format-Agent%20Skills-blue.svg)](https://agentskills.io/specification)
[![Validate](https://github.com/gerrardgs/Projects23/actions/workflows/validate.yml/badge.svg)](https://github.com/gerrardgs/Projects23/actions/workflows/validate.yml)
[![Skills: 24](https://img.shields.io/badge/Skills-24%20Verified-success.svg)](.agents/skills/)
[![Rules: 8](https://img.shields.io/badge/Rules-8%20Core-blueviolet.svg)](.agents/rules/)

A universal, production-ready AI agent coding framework and standard designed to make AI coding models work with the discipline of senior staff software engineers. It eliminates erratic, bloated code and hallucinations by enforcing standard-library-first design, strict verification protocols, and clean architectural boundaries across the entire software development lifecycle and 15 technical domains.

Works out of the box with Google Antigravity, Claude Code, OpenAI Codex, Gemini CLI, Cursor, Windsurf/Devin, GitHub Copilot, Cline, Aider, or any chat model you paste it into.

Every command, version, package name, extension identifier, and template in this repository has been verified against official sources or executed in CI.

---

## Why Projects 23

Most AI coding assistants struggle with long-term code quality: they invent non-existent APIs, introduce unnecessary third-party packages, leave incomplete placeholders, and produce hard-to-maintain code. Projects 23 solves this through three core principles:

1. **Native-First, Zero Bloat**: Always utilize platform standard libraries before adding third-party dependencies. When packages are necessary, select minimal, audited, zero-vulnerability packages.
2. **Anti-Hallucination Protocol**: Strict 5-step verification of all symbols, package names, versions, CLI flags, and environment variables against active environments or official registries.
3. **Complete Lifecycle and Domain Mastery**: 24 modular skills that guide agents through every phase of software development and across complex domains like ML, distributed systems, and real-time AI.

---

## What Is Inside

```text
Projects 23 Architecture
========================

  +-------------------------------------------------------------------------+
  | Core (Always Loaded): AGENTS.md (~137 lines)                            |
  | Priorities, non-negotiables, workflow, indexes, operating conditions    |
  +-------------------------------------------------------------------------+
       |                                                 |
       v (links to)                                      v (links to)
  +-----------------------------------+             +-----------------------------------+
  | Rules (.agents/rules/)            |             | Skills (.agents/skills/)          |
  | 8 normative rules:                |             | 24 on-demand step-by-step guides: |
  | - 4 Always-On (core, clean code,  |             | - 9 Software Lifecycle Skills     |
  |   verification, security)         |             | - 15 Mission-Critical Domains     |
  | - 4 On-Demand (dependencies,      |             |                                   |
  |   errors, testing, git workflow)  |             | + Verified assets, templates, and |
  |                                   |             |   sector reference standards      |
  +-----------------------------------+             +-----------------------------------+
       |                                                 |
       +-----------------------+-------------------------+
                               |
                               v (auto-mirrored to)
  +-------------------------------------------------------------------------+
  | Tool Adapters & Mirrors                                                 |
  | CLAUDE.md, GEMINI.md, .claude/skills/ (auto-sync), Copilot, Aider, etc. |
  +-------------------------------------------------------------------------+
```

| Layer | Location | Loaded | Contents |
| :--- | :--- | :--- | :--- |
| **Core** | [`AGENTS.md`](AGENTS.md) | Always | Priorities, non-negotiables, workflow, rule and skill indexes, operating conditions, definition of done (about 137 lines) |
| **Rules** | [`.agents/rules/`](.agents/rules/) | Always (4) or when relevant (4) | Principles, clean code, verification, security, dependencies, error handling, testing, Git workflow |
| **Skills** | [`.agents/skills/`](.agents/skills/) | When task matches | 24 step-by-step procedures (9 lifecycle, 15 domain) with verified templates and references |
| **Adapters** | `CLAUDE.md`, `GEMINI.md`, `.gemini/settings.json`, `.github/copilot-instructions.md`, `.aider.conf.yml` | Per tool | Standard loaders connecting each tool to the single core |
| **Mirror** | `.claude/skills/` | Generated | Automated copy of skills for Claude Code and Cline; kept in sync via script |
| **Tooling** | [`scripts/`](scripts/) | You or CI | Installer script, test runner, and mirror validator |
| **Documentation** | [`docs/`](docs/) | Reference | Architectural design, operational manual, anti-hallucination playbook, contributing guidelines |

---

## Skills Catalog

### 1. Software Lifecycle Skills (9 Skills)

Procedures covering software from inception to production operation:

| Phase | Skill | Highlights |
| :--- | :--- | :--- |
| **Start** | [project-bootstrap](.agents/skills/project-bootstrap/SKILL.md) | Toolchains for 7 language families, 32 verified VS Code extensions, `.editorconfig`, `.gitattributes`, pre-commit secret scanning, README and ADR templates |
| **Build** | [native-from-scratch](.agents/skills/native-from-scratch/SKILL.md) | Standard-library-first architecture; runnable Node.js (TypeScript) and Python services with unit tests, lockfiles, and container configs |
| **Change** | [change-existing-code](.agents/skills/change-existing-code/SKILL.md) | Characterization tests, small verified steps, dependency upgrades, automated codemods, and strangler fig migrations |
| **Test** | [test-engineering](.agents/skills/test-engineering/SKILL.md) | Test pyramid, determinism, property-based testing, fuzz testing, mutation testing, and language-specific tooling |
| **Debug** | [systematic-debugging](.agents/skills/systematic-debugging/SKILL.md) | Root cause isolation, `git bisect` recipes, profilers, memory leak detection, and production incident response |
| **Review** | [rigorous-code-audit](.agents/skills/rigorous-code-audit/SKILL.md) | Toolchain verification, OWASP Top 10:2025 checklist, and severity-ranked audit findings |
| **Secure** | [security-hardening](.agents/skills/security-hardening/SKILL.md) | Threat modelling, OWASP ASVS 5.0, secret rotation, SAST, dependency audits, container scanning, and SBOM generation |
| **Automate** | [ci-cd-pipeline](.agents/skills/ci-cd-pipeline/SKILL.md) | GitHub Actions workflows pinned to commit SHAs, least-privilege token permissions, and Dependabot with cooldown timers |
| **Ship** | [deploy-and-release](.agents/skills/deploy-and-release/SKILL.md) | Production launch checklists, zero-downtime database migrations, canary/blue-green rollouts, observability, and rollback plans |

### 2. Engineering Domain Skills (15 Skills)

Specialized checklists, design patterns, and runnable reference assets across major disciplines:

| Domain | Skill | Highlights |
| :--- | :--- | :--- |
| **Backend** | [backend-engineering](.agents/skills/backend-engineering/SKILL.md) | REST/GraphQL/gRPC contracts (OpenAPI 3.2.1), RFC 9457 errors, OWASP API Security Top 10, idempotency keys, transactional outbox |
| **Integration** | [api-integration](.agents/skills/api-integration/SKILL.md) | OAuth RFC 9700, signed webhooks, exponential backoff, rate limiting, and 13 sector standards (payments, banking FAPI 2.0, healthcare FHIR, EDI, telecom, IoT) |
| **Web** | [web-frontend-engineering](.agents/skills/web-frontend-engineering/SKILL.md) | WCAG 2.2 AA accessibility, Core Web Vitals targets (LCP <= 2.5s, INP <= 200ms, CLS <= 0.1), modern browser security headers, responsive design |
| **Mobile** | [mobile-engineering](.agents/skills/mobile-engineering/SKILL.md) | Kotlin/Compose, Swift/SwiftUI, Flutter, React Native; OWASP MASVS baseline, biometric auth, offline synchronization, app store checklists |
| **Data Platform** | [data-engineering](.agents/skills/data-engineering/SKILL.md) | Idempotent batch and streaming pipelines, lakehouse architectures (Iceberg/Delta), data contracts, Great Expectations quality gates, data lineage |
| **Analytics** | [data-analysis](.agents/skills/data-analysis/SKILL.md) | Metric definitions, join validation, hypothesis testing, A/B experimentation, Benjamini-Hochberg corrections, reproducible notebooks |
| **Machine Learning** | [machine-learning](.agents/skills/machine-learning/SKILL.md) | Leakage-free split validation, baseline comparisons, scikit-learn verified pipeline, reproducibility seeds, fairness metrics, model cards |
| **GenAI / LLM** | [llm-applications](.agents/skills/llm-applications/SKILL.md) | Structured JSON output schemas, prompt design, deterministic evaluation benchmarks, OWASP LLM Top 10:2025, token budgeting and caching |
| **RAG Systems** | [rag-systems](.agents/skills/rag-systems/SKILL.md) | Context-aware chunking, hybrid keyword plus dense vector search, cross-encoder reranking, retrieval-time access control, faithfulness evals |
| **AI Agents** | [ai-agent-systems](.agents/skills/ai-agent-systems/SKILL.md) | Tool design, Model Context Protocol (MCP) security, principle of least privilege, human approval gates, execution sandboxes, OWASP Agentic Top 10 |
| **Computer Vision** | [computer-vision](.agents/skills/computer-vision/SKILL.md) | Dataset labelling hygiene, scene-level stratification, mAP/IoU metrics, model optimization (ONNX, TensorRT, OpenVINO, Core ML, LiteRT), video feeds |
| **Real-time Serving** | [ml-inference-serving](.agents/skills/ml-inference-serving/SKILL.md) | High-throughput low-latency inference engines (vLLM, SGLang, Triton, KServe), dynamic batching, AWQ/FP8 quantization, training-serving parity |
| **Cloud / SRE** | [cloud-infrastructure](.agents/skills/cloud-infrastructure/SKILL.md) | Declarative IaC, immutable infra, zero-trust IAM, Kubernetes production readiness (v1.35 to v1.37), SLO/SLI alerting, disaster recovery, FinOps |
| **Quality Assurance** | [quality-assurance](.agents/skills/quality-assurance/SKILL.md) | Risk-based testing strategies, contract tests (Pact), distributed load testing, automated a11y sweeps, DAST security scans, release readiness |
| **IT Operations** | [it-operations](.agents/skills/it-operations/SKILL.md) | Identity management, SSO with MFA, SCIM lifecycle provisioning, zero-trust endpoint hygiene, automated patch baselines, email security (SPF/DKIM/DMARC) |

Additional technical domains without a dedicated skill (such as embedded systems, smart contracts, robotics, and high-performance computing) are mapped in [.agents/domain-coverage.md](.agents/domain-coverage.md).

---

## Quickstart & Installation

Projects 23 can be installed into any existing repository or new project in seconds. The installer only copies spec files and **never overwrites files that already exist and differ**.

### One-Line Install

```sh
# 1. Preview changes safely (dry run)
curl -fsSL https://raw.githubusercontent.com/gerrardgs/Projects23/main/scripts/install.sh | bash -s -- --dry-run

# 2. Install into current project
curl -fsSL https://raw.githubusercontent.com/gerrardgs/Projects23/main/scripts/install.sh | bash
```

### Manual Installation

Alternatively, clone this repository and install locally:

```sh
git clone https://github.com/gerrardgs/Projects23.git
bash Projects23/scripts/install.sh --source Projects23 /path/to/your/project
```

### Configuration Steps After Installation

1. **Fill in Section 8 of `AGENTS.md`**: Fill in your project's runtime versions and build/test commands under "Project profile".
2. **Sync and Validate**: Run `node scripts/agents-sync.mjs` (Node.js 22+) to generate `.claude/skills/` mirrors and confirm all links and metadata are valid.
3. **Commit**: Add and commit the installed files into your repository.

---

## Tool Compatibility Matrix

Projects 23 conforms to the open [Agent Skills specification](https://agentskills.io/specification) and is compatible with every major AI agent tool:

| AI Tool | Core Rules Loaded | Rules in `.agents/rules/` | Skills System | Reference Documentation |
| :--- | :--- | :--- | :--- | :--- |
| **Google Antigravity** | `AGENTS.md`, `GEMINI.md` | Native (`trigger` frontmatter) | `.agents/skills/` | [Antigravity Docs](https://antigravity.google/docs/rules) |
| **Claude Code** | `CLAUDE.md` (imports `AGENTS.md`) | Always-on rules imported; others via index | `.claude/skills/` (mirror) | [Claude Code Memory](https://code.claude.com/docs/en/memory) |
| **OpenAI Codex / ChatGPT** | `AGENTS.md` | Referenced via index | `.agents/skills/` | [Codex Skills](https://learn.chatgpt.com/docs/build-skills) |
| **Gemini CLI** | `GEMINI.md`, `AGENTS.md` | Referenced via index | `.agents/skills/` | [Gemini CLI Context](https://geminicli.com/docs/cli/gemini-md/) |
| **Cursor** | `AGENTS.md` (nested rules supported) | Referenced via index | `.agents/skills/` | [Cursor Context Rules](https://cursor.com/docs/context/rules) |
| **Windsurf / Devin** | `AGENTS.md` | Referenced via index | `.agents/skills/` | [Cascade Memories](https://docs.devin.ai/desktop/cascade/memories) |
| **GitHub Copilot** | `.github/copilot-instructions.md`, `AGENTS.md` | Referenced via index | `.agents/skills/` | [Copilot Custom Instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions) |
| **Cline** | `AGENTS.md` | Referenced via index | `.claude/skills/` (mirror) | [Cline Rules](https://docs.cline.bot/features/cline-rules/overview) |
| **Aider** | `AGENTS.md` (via `.aider.conf.yml`) | Referenced via index | Not supported | [Aider Conventions](https://aider.chat/docs/usage/conventions.html) |
| **Any Chat LLM** | Paste `AGENTS.md` + matching skill | Manual prompt injection | Manual | [Operational Manual](docs/AGENT-OPERATIONAL-MANUAL.md) |

---

## Continuous Quality & Automated Verification

Every commit and pull request to Projects 23 is automatically validated through [.github/workflows/validate.yml](.github/workflows/validate.yml):

- **Validator Self-Tests & Spec Checks**: Full frontmatter syntax parsing, size budget verification, link validity across all Markdown files, and mirror drift detection.
- **Workflow & Shell Security Audits**: ShellCheck for shell scripts, Actionlint for workflow syntax, and offline Zizmor security audits for GitHub Actions workflows.
- **Runnable Service Templates**:
  - Node.js HTTP service: tested across Node.js 22, 24, and 26 (`npm ci`, type-checking, test execution, high-severity npm audit).
  - Python HTTP service: tested across Python 3.11, 3.12, 3.13, and 3.14 (Ruff formatting, Ruff linter, strict MyPy, test execution, strict pip-audit).
- **Domain Template Test Suites**:
  - Machine Learning baseline: tested on Python 3.11 and 3.14 (leakage-free cross-validation and prediction pipeline).
  - API Integration kit: tested on Python 3.11 and 3.14 (resilient HTTP client, backoff policies, signature verification).

---

## Documentation

Detailed architectural and procedural documentation is available in `docs/`:

- [Architecture Guide](docs/ARCHITECTURE.md): Design rationale, context budget calculations, and model cognitive constraints.
- [Domain Coverage Matrix](.agents/domain-coverage.md): Detailed mappings of technical roles and specialized sectors to skills.
- [Agent Operational Manual](docs/AGENT-OPERATIONAL-MANUAL.md): Step-by-step mapping of common engineering scenarios to specific rules and skills.
- [Anti-Hallucination Playbook](docs/ANTI-HALLUCINATION-PLAYBOOK.md): Common AI hallucination failure modes and how the verification protocol catches them.
- [Contributing Guidelines](docs/CONTRIBUTING.md): Quality checklist for authoring new rules, skills, and runnable templates.
- [Changelog](CHANGELOG.md): History of updates, additions, and verified enhancements.

---

## License

[MIT](LICENSE) © 2026 Gerrard Sebastian.
