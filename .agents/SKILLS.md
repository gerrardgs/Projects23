# Skills index

Every skill in this specification, with when to use it. Tools that support Agent Skills load each skill's name and description automatically and open the body when a task matches; this index is for every other tool and for people. It is kept out of [`AGENTS.md`](../AGENTS.md) so that the always-on context stays small, and `node scripts/agents-sync.mjs --check` fails when a skill is missing here or listed without existing.

## Lifecycle skills (every kind of software)

| Phase | Skill | Use it when |
| :--- | :--- | :--- |
| Specify | [feature-specification](skills/feature-specification/SKILL.md) | Turning a request into goals, acceptance criteria, a plan and ordered tasks before coding |
| Design | [software-architecture](skills/software-architecture/SKILL.md) | System design, quality attributes, architecture styles, distributed-systems trade-offs, resilience patterns, ADRs |
| Start | [project-bootstrap](skills/project-bootstrap/SKILL.md) | Creating a repository: runtime, toolchain, editor extensions, CI, docs |
| Build | [native-from-scratch](skills/native-from-scratch/SKILL.md) | Writing a new service, CLI or module, standard library first |
| Change | [change-existing-code](skills/change-existing-code/SKILL.md) | Modifying, refactoring, upgrading or migrating existing code |
| Test | [test-engineering](skills/test-engineering/SKILL.md) | Adding tests, regression tests, test setup, flaky tests |
| Debug | [systematic-debugging](skills/systematic-debugging/SKILL.md) | Errors, crashes, wrong output, slowness, incidents |
| Review | [rigorous-code-audit](skills/rigorous-code-audit/SKILL.md) | Reviewing a diff, pull request or codebase |
| AI review | [coderabbit-review](skills/coderabbit-review/SKILL.md) | CodeRabbit reviews in the CLI or on pull requests, fixing its comments, `.coderabbit.yaml` |
| Secure | [security-hardening](skills/security-hardening/SKILL.md) | Threat modelling, hardening, security scanning, secrets |
| Secrets | [secret-scanning](skills/secret-scanning/SKILL.md) | gitleaks, TruffleHog, push protection; triaging findings; a leaked secret |
| Inspect artifacts | [reverse-engineering](skills/reverse-engineering/SKILL.md) | Authorized analysis of builds, binaries, APK/IPA, crash dumps; release-build audits; REA |
| Automate | [ci-cd-pipeline](skills/ci-cd-pipeline/SKILL.md) | CI workflows, release automation, Dependabot |
| Ship | [deploy-and-release](skills/deploy-and-release/SKILL.md) | Containers, configuration, migrations, rollout, monitoring, rollback |
| Deliver with agents | [agent-delivery-loop](skills/agent-delivery-loop/SKILL.md) | Work beyond one session: phase loop with planning files (GSD), unattended story loop (Ralph) |
| Isolate | [git-worktrees](skills/git-worktrees/SKILL.md) | One worktree per parallel or unattended task: create, inspect, set up, merge back |
| Prove resilience | [chaos-engineering](skills/chaos-engineering/SKILL.md) | Fault-injection experiments, game days, verifying timeouts, fallbacks, failover and alerts |
| Document | [technical-documentation](skills/technical-documentation/SKILL.md) | READMEs, guides, API and configuration reference, ADRs, changelogs, runbooks |
| Anti-slop | [anti-slop](skills/anti-slop/SKILL.md) | Keeping generic AI patterns out of comments, docs, UI copy and interfaces; no fabricated content; controls that work |
| Clean text | [clean-user-facing-text](skills/clean-user-facing-text/SKILL.md) | Local zero-dependency Unicode hygiene and stylometric rewrite pass for reader-facing prose while preserving voice and facts |
| Provenance | [remove-ai-marks](skills/remove-ai-marks/SKILL.md) | Multi-vendor AI mark removal: invisible Unicode (Layer A), rewrite (Layer B), and C2PA/EXIF/container metadata across files |
| Any tool | [technology-adoption](skills/technology-adoption/SKILL.md) | Any language, framework, library, platform or SaaS, especially one no other skill covers |

## Domain skills (load together with the lifecycle skill for the phase)

| Domain | Skill | Use it when |
| :--- | :--- | :--- |
| Backend | [backend-engineering](skills/backend-engineering/SKILL.md) | APIs (REST, GraphQL, gRPC), databases, queues, caching, jobs |
| Integration | [api-integration](skills/api-integration/SKILL.md) | Third-party APIs in any sector, OAuth, webhooks, retries, EDI, FHIR, payments |
| Web | [web-frontend-engineering](skills/web-frontend-engineering/SKILL.md) | Web UIs: accessibility, Core Web Vitals, browser security |
| Mobile | [mobile-engineering](skills/mobile-engineering/SKILL.md) | Android, iOS, Flutter, React Native apps and store releases |
| Data platform | [data-engineering](skills/data-engineering/SKILL.md) | Batch and streaming pipelines, big data, lakehouse, data quality |
| Analytics | [data-analysis](skills/data-analysis/SKILL.md) | SQL and DataFrame analysis, statistics, experiments, charts |
| ML / DL | [machine-learning](skills/machine-learning/SKILL.md) | Data science, model training and evaluation, MLOps |
| GenAI | [llm-applications](skills/llm-applications/SKILL.md) | LLM features: prompts, structured output, evals, guardrails |
| RAG | [rag-systems](skills/rag-systems/SKILL.md) | Retrieval over documents, vector search, grounded answers |
| Agents | [ai-agent-systems](skills/ai-agent-systems/SKILL.md) | Tool-using agents, MCP servers, multi-agent systems |
| Vision | [computer-vision](skills/computer-vision/SKILL.md) | Images, video, detection, segmentation, OCR, edge vision |
| Real-time AI | [ml-inference-serving](skills/ml-inference-serving/SKILL.md) | Model serving, low latency, streaming, GPUs, edge inference |
| Cloud / SRE | [cloud-infrastructure](skills/cloud-infrastructure/SKILL.md) | IaC, Kubernetes, IAM, networking, SLOs, DR, cost |
| QA | [quality-assurance](skills/quality-assurance/SKILL.md) | Test strategy, load, accessibility, contract, DAST, release readiness |
| IT operations | [it-operations](skills/it-operations/SKILL.md) | Identity and SSO, endpoints, networks, email, backup, ITSM, IT security frameworks |

A task often spans several skills. A bug fix in an API, for example, uses systematic-debugging, backend-engineering, test-engineering, then rigorous-code-audit. [.agents/domain-coverage.md](domain-coverage.md) maps roles and domains to skills, including domains without a dedicated skill; [.agents/engineering-concepts.md](engineering-concepts.md) maps engineering concepts and the SWEBOK knowledge areas to the rules and skills that apply them.
