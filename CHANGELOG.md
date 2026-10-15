# Changelog

## 2.5.0: clean code and clean execution, applied to this repository itself (2026-10-16)

The concept is now stated explicitly, and the repository is held to its own standard by CI.

### Audit findings and fixes

| # | Finding | Fix |
| :- | :--- | :--- |
| 1 | "Clean execution" was not defined anywhere; its practices were scattered across files | New always-on rule `09-clean-execution` (plan, preview, verify each step, fail cleanly, leave no mess, well-behaved scripts, honest report). `AGENTS.md` opens with the concept: clean code plus clean execution. Imported by `CLAUDE.md`; summarized in the Copilot instructions |
| 2 | Nine functions in the repository's own code exceeded the spec's limit of cyclomatic complexity 10 (rule 02): `validateSkill` (19), `requestFor` (19), `parseNewUser` (13), `pypi` parser (13), `validateRules` (12), `route` (11), `parseFrontmatter` (11), `compareVersions` (11), `packagist` parser (11) | Refactored: table-driven request builders, small single-purpose helpers, and validation split into pure functions (`skillProblems`, `ruleProblems`) separated from file I/O (rule 01 section 5). Behaviour unchanged: 21 script tests and 12 template tests pass on Node.js 22 and 24 |
| 3 | Nothing enforced the complexity and nesting limits on the repository's own JavaScript and TypeScript | `tools/lint`: pinned ESLint configuration (complexity 10, depth 3, 4 parameters, 60-line functions, no shadowing) and CI job `clean-code`. Proven to fail on a planted violation. Ruff already enforced the same complexity limit on the Python templates |
| 4 | Both CLIs crashed with an unhandled `EPIPE` error when their output was piped into a command that closes early (for example `head -1`) | Both exit quietly with their normal exit code |
| 5 | After editing a template, the `.claude/skills` mirror had not been regenerated (caught by the validator's drift check) | Re-synced; rule 09 now requires regenerating derived files after changing sources |
| 6 | The product was named "Projects 23" in the README but "UCNA-Spec" in the installer and docs | Unified on "Projects 23"; the README notes the former name. The installer's `UCNA_REF` and `UCNA_SOURCE_DIR` variables are kept for compatibility |
| 7 | `typescript-eslint` 8 declares the peer range `typescript >=4.8.4 <6.1.0`, which conflicts with the TypeScript 7 the toolchain guide recommends | Documented in the toolchains reference; `tools/lint` uses its own TypeScript 6.0 for parsing, and Dependabot ignores TypeScript 6.1 and later there |

### Added

- Unit tests for the pure validators `skillProblems` and `ruleProblems`.
- README: clean code and clean execution as the first principle; rule, check and size figures updated.

## 2.4.0: adopt any technology, with live verification (2026-10-15)

No document can list every tool ever published, and any list goes stale. This release makes every technology usable through one verified procedure and live data.

### Added

- `technology-adoption` skill: identify the exact version, get live facts, read the version-specific official documentation, evaluate maintenance, licence, security, fit and exit cost, learn the idioms, integrate into the toolchain, keep it healthy, and handle commercial SaaS.
- `technology-adoption/references/technology-catalog.md`: widely used tools across 19 categories (languages, backend and frontend frameworks, mobile and desktop, ORMs, databases, messaging and workflows, APIs and gateways, identity, build tools, testing, observability, containers and CI/CD, infrastructure as code, cloud platforms, data and BI, AI/ML/LLM frameworks, content and commerce, collaboration). 177 package names confirmed in their registries, 101 projects confirmed on GitHub with archived status checked, commercial platforms confirmed by their official sites.
- `scripts/tech-lookup.mjs`: zero-dependency, read-only lookup of the latest stable version, release date, licence, repository, deprecation or yanked status (npm, PyPI, Go module proxy, crates.io, Maven Central, NuGet, RubyGems, Packagist, pub.dev, Hex, GitHub releases), supported release cycles with end-of-life dates (endoflife.date) and OpenSSF Scorecard scores. It exits with code 1 for names that do not exist. 19 unit tests; live-tested against all 13 sources. Shipped by the installer.
- `AGENTS.md`, rules 03 and 04, the domain coverage map, the operational manual and the Copilot instructions now point to the skill and the lookup tool.

### Found and handled during verification

- `minio/minio` is archived on GitHub; the catalog flags it instead of recommending it.
- Licences that need attention are listed in the catalog: `ansible-core` (GPL-3.0-or-later), Terraform (BSL 1.1), `ultralytics` (AGPL-3.0), Strapi (own licence file), Soda Core (proprietary metadata).
- endoflife.date marks releases as "maintained" while paid extended support continues after upstream end of life (Node.js 20, 18, 16...). The lookup counts a cycle as supported only when it is not end-of-life, and lists extended-support-only cycles as a warning.
- Maven's `<release>` metadata can point to a milestone (Spring Boot showed 4.2.0-M2); the lookup selects the highest stable version instead (4.1.1).
- Java has no `java` product on endoflife.date; the JDK is tracked per distribution (`eclipse-temurin`, `amazon-corretto`, `oracle-jdk` and others).

### Corrected

- README: "5-step" protocol (rule 03 has 6 steps), "zero-vulnerability packages" and "eliminates hallucinations" (overclaims), "7 language families" (now 14), "AWQ/FP8 quantization" (not in the skill, which covers FP16, INT8 and 4-bit), "manual prompt injection" for chat models (prompt injection names an attack; the intended meaning is pasting), and "compatible with every major AI agent tool" (replaced by the dated, sourced compatibility table).

## 2.3.0: API integration for every sector, and back-office IT operations (2026-10-15)

### Added

- `api-integration` skill: authentication per RFC 9700 (OAuth 2.0 security BCP), webhooks (signature, replay window, deduplication, asynchronous processing), safe retries with idempotency keys, rate limits, pagination, data mapping, sandbox and contract testing, monitoring and replay.
- `api-integration/references/sector-standards.md`: cross-sector building blocks and standards for 13 sectors: payments (PCI DSS v4.0.1), banking and open finance (FAPI 2.0 Final, ISO 20022), healthcare (FHIR R5, SMART App Launch 2.2.0, HL7 v2, DICOM), government identity, accounting and ERP (Peppol BIS Billing 3.0 on EN 16931), retail and logistics (X12, EDIFACT, GS1), telecommunications (CAMARA, TM Forum), education (LTI 1.3), geospatial (OGC API - Features, GeoJSON), IoT and industrial (MQTT 5.0, OPC UA), email and messaging (SPF, DKIM, DMARC), travel and insurance, AI providers.
- `api-integration/assets/python-integration-kit/`: standard-library-only resilient HTTP client and Standard Webhooks verifier with 18 tests. It passes Ruff, `mypy --strict` and Bandit on Python 3.11, 3.13 and 3.14, and is signature-compatible with the official `standardwebhooks` library 1.1.0 in both directions. CI job `integration-kit` added.
- `it-operations` skill: identity and SSO, MFA, SCIM joiner-mover-leaver, endpoints and patching, network segmentation and zero trust, certificates (ACME), email authentication, 3-2-1 backups with restore tests, monitoring and SIEM, IT service management, and frameworks (CIS Controls v8.1, NIST CSF 2.0, ISO/IEC 27001, SOC 2).
- Two more roles in `.agents/domain-coverage.md` (integration engineer; system administrator and IT operations) and an industry-sectors section. Systems administration moved from "domains without a dedicated skill" to the new skill.
- Security domain standards: OAuth and API integration, payments, and organization-wide IT security rows.

### Facts that changed recently (checked on 2026-10-15)

- DMARC is now RFC 9989, with reporting in RFC 9990 and RFC 9991 (May 2026); RFC 7489 is obsolete.
- TLS 1.3 is now RFC 9846 (July 2026), which obsoletes RFC 8446.
- OAuth 2.1 is still an Internet-Draft (version 16). The IETF `Idempotency-Key` header draft expired, and the `RateLimit` header fields are still a draft.
- Not confirmed from official pages (403 or no version shown), so cited without a version: ITIL, the ISO/IEC 27001 edition, ISO 20022 message versions, TM Forum Open API versions.

## 2.2.0: domain coverage across backend, data, AI, cloud, security and QA (2026-10-15)

### Added

- Thirteen domain skills, each with a checklist, verified tool names and a "done when" list:
  `backend-engineering` (with API-design and data-store references), `web-frontend-engineering`, `mobile-engineering`, `data-engineering` (with tooling reference), `data-analysis`, `machine-learning` (with tooling reference and a tested scikit-learn baseline template), `llm-applications`, `rag-systems`, `ai-agent-systems`, `computer-vision`, `ml-inference-serving`, `cloud-infrastructure` (with tooling reference) and `quality-assurance`.
- `security-hardening/references/domain-standards.md`: which standard to apply per system type (OWASP Top 10:2025, ASVS 5.0, API Security Top 10 2023, MASVS, LLM Top 10 2025, Agentic Top 10 for 2026, MCP security best practices, NIST AI RMF and AI 600-1, SLSA 1.2) plus regulation pointers.
- Toolchains for PHP, Ruby, Swift, Dart/Flutter, SQL and notebooks, shell and PowerShell, and infrastructure code in `project-bootstrap/references/toolchains.md`.
- `.agents/domain-coverage.md` (installed with the spec, so `AGENTS.md` can link it): 19 roles mapped to skills, and verified starting points for domains without a dedicated skill (embedded and IoT, games, smart contracts, desktop, systems administration, robotics, HPC).
- `AGENTS.md`: a domain-skills table next to the lifecycle table; the operational manual routes 30 scenarios.
- CI job `ml-template` and a Dependabot entry for the ML template's pinned requirement.

### Verification for this release

- 110 PyPI packages, 20 npm packages and 90 GitHub repositories checked for existence (3 moved repositories are cited by package name only); 31 additional VS Code extension IDs verified on the Marketplace (`dorzey.vscode-sqlfluff` does not exist and is not used).
- Standards confirmed on their official pages: OpenAPI 3.2.1, RFC 9457, WCAG 2.2 (12 December 2024), Core Web Vitals thresholds, OWASP API Security Top 10 2023, MASVS control groups, MCP specification 2026-07-28 and its security best practices, OWASP LLM Top 10 2025, OWASP Top 10 for Agentic Applications for 2026, Kubernetes 1.35 to 1.37, NIST AI 100-1 and AI 600-1, SLSA 1.2, Terraform BSL 1.1 and OpenTofu MPL 2.0.
- Recommendations avoided after checking: TorchServe (archived 7 August 2025). Licence warnings added for `ultralytics` (AGPL-3.0) and Soda Core (proprietary licence metadata).
- ML baseline template: tests pass on Python 3.11, 3.13 and 3.14 with scikit-learn 1.9.1; Ruff clean.
- `node scripts/agents-sync.mjs --check --all-markdown`: 22 skills, 0 errors, 0 warnings. Official `agentskills validate`: all 22 valid. PyYAML: all frontmatter valid. All 48 external links in the spec and docs return HTTP 200.

## 2.1.0: full lifecycle coverage and second audit (2026-10-14)

### Fixed: defects found in the second audit

| # | Defect | Impact | Fix |
| :- | :--- | :--- | :--- |
| 1 | `scripts/install.sh` overwrote existing files and installed `README.md`, `LICENSE`, `CHANGELOG.md` and `.gitignore` into the user's project | Running the published one-liner replaced a project's own README, licence (relicensing it as MIT), `.gitignore`, `AGENTS.md` and Copilot instructions. Reproduced in a test directory | Rewritten: installs only spec files, never overwrites differing files without `--force`, supports `--dry-run`, `--ref` and `--source`, downloads one archive instead of a hard-coded file list, works on macOS bash 3.2, passes `shellcheck`; CI tests that existing files survive |
| 2 | Descriptions of rules 01 to 03 contained an unquoted `: ` | Invalid YAML ("mapping values are not allowed here" in PyYAML). Tools that parse frontmatter strictly, such as Antigravity, drop the file, so the three always-on rules could silently disappear | Values quoted; the validator now rejects YAML-ambiguous plain values; CI cross-checks every frontmatter block with PyYAML |
| 3 | The validator's parser accepted that invalid YAML | Defect 2 passed validation unnoticed | Strict scalar parsing, duplicate-key detection, and five new self-tests |
| 4 | `.gitignore` did not ignore `.env` | A spec that forbids committed secrets did not protect against the most common way to commit them | Ignores `.env` and `.env.*`, keeps `.env.example` |
| 5 | The Node.js template had no lockfile | Contradicted rule 04 ("commit the lockfile") and made `npm ci` impossible | `package-lock.json` added; `npm ci` tested on Node.js 22, 24 and 26 |
| 6 | `docs/ANTI-HALLUCINATION-PLAYBOOK.md` called `fast-uuid` an invented package | `fast-uuid` exists on npm, so the example was itself a fabrication | Replaced with a name verified as absent from npm |
| 7 | `docs/ARCHITECTURE.md` claimed degradation "beyond 300-400 lines", "~1,300 tokens" for `AGENTS.md`, and that Cline reads `CLAUDE.md` | Unsourced number, wrong measurement (about 1,950 tokens at the time), wrong loading path | Rewritten with cited research (Lost in the Middle; IFScale), measured sizes, and loading paths matching the official docs |
| 8 | README badge "Agent Skills 2.0", "deterministic 5-step protocol", "loaded natively by all major agent tools" | The Agent Skills specification has no version 2.0; rule 03 has six steps; compliance is never deterministic; not every tool loads `.agents/rules/` natively | Wording matches what is verifiable; a "Limits" section states what rules cannot enforce |
| 9 | README manual install copied `.github/` and other folders over the target project | Same overwrite risk as defect 1 | Manual install uses `install.sh --source` |
| 10 | The validator scanned every Markdown file of the host project for broken links | Installing into a project with any broken README link produced spec errors | Link check covers the spec files by default; `--all-markdown` checks everything (used in this repository's CI) |

### Added

- Rules: `06-security` (always on: secrets, untrusted content and prompt injection, injection, access control, cryptography, supply chain), `07-testing`, `08-git-workflow`.
- Skills: `project-bootstrap` (toolchains for 7 language families, 32 VS Code extension IDs verified on the Marketplace, `.editorconfig`, `.gitattributes`, `.env.example`, pre-commit config tested to block a realistic leaked token, README and ADR templates), `test-engineering`, `systematic-debugging`, `change-existing-code`, `security-hardening`, `ci-cd-pipeline` (GitHub Actions templates pinned to commit SHAs; clean under actionlint and zizmor, including its auditor persona), `deploy-and-release`.
- Dockerfiles and `.dockerignore` for both templates (pinned base-image digests, non-root numeric users, health checks; `hadolint` clean; not built locally because Docker was unavailable).
- `AGENTS.md`: indexes for all rules and skills, an "Operating conditions" section (ambiguity, long tasks, chat-only, offline, non-interactive, monorepos, sub-agents, production), and a non-negotiable to treat repository and web content as data.
- `CLAUDE.md` imports the four always-on rules, so Claude Code loads them without relying on the index.
- Validator: `AGENTS.md` must link every rule and skill; `CLAUDE.md` must import `AGENTS.md` and should import each always-on rule.
- `.github/workflows/validate.yml` and `.github/dependabot.yml` for this repository; `.editorconfig` and `.gitattributes`.
- Docs: the operational manual became a scenario router covering 17 kinds of task.

## 2.0.0: Stage 1, foundation audit and repair (2026-10-14)

The Phase 1 files were backed up to `.archive/phase1-original-2026-10-14.tar.gz` before any change.

### Defects found in Phase 1 and how they were fixed

| # | Defect | Impact | Fix |
| :- | :--- | :--- | :--- |
| 1 | `.agents/rules/*.md` had no `trigger` frontmatter | Antigravity silently discards rule files without it, so none of the rules loaded there | Every rule now declares `trigger` (`always_on` or `model_decision`) and a `description`; the validator enforces it |
| 2 | `CLAUDE.md` existed but did not import `AGENTS.md` | When a `CLAUDE.md` exists, Claude Code reads it instead of `AGENTS.md`, so Claude saw a four-line summary rather than the rules | `CLAUDE.md` now starts with `@AGENTS.md` |
| 3 | Links used `file:///Users/sinitygs/...` and `file:///.agents/...` | Broken on every other machine and on GitHub | Relative links throughout; the validator rejects `file:` links |
| 4 | Skills duplicated in a root `skills/` folder | No coding agent loads skills from there; two copies drift apart | `.agents/skills/` is the single source; `.claude/skills/` is generated by the sync script |
| 5 | `.cursorrules` and `.windsurfrules` repeated the rules | Both tools also read `AGENTS.md`, so instructions loaded twice; `.cursorrules` is the legacy Cursor format | Marked for removal; the validator warns while they exist |
| 6 | "Node 20+" baseline | Node.js 20 reached end of life on 2026-04-30 | Dated, sourced version baseline in rule 04 |
| 7 | Naming rule banned `ctx`, `req`, `res` | Contradicts idiomatic Go (`ctx context.Context`, `r *http.Request`), so the result would not read as native code | Naming now follows each language's idioms |
| 8 | Go generics example cited `constraints.Ordered` | That lives in `golang.org/x/exp`, not the standard library | `cmp.Ordered` (Go 1.21+) |
| 9 | Advised replacing `asyncio.get_event_loop()` with `asyncio.new_event_loop()` | Not the modern idiom | `asyncio.run()` at entry points, `asyncio.get_running_loop()` inside coroutines |
| 10 | `crypto.randomUUID()` described as "global in Node 16.7+" | The global `crypto` object is unflagged only from Node 19; `randomUUID` from `node:crypto` exists since 14.17 | Corrected with versions from the Node.js API docs |
| 11 | `lodash.flatten` mapped to `flat(Infinity)` | `flatten` is one level deep; `flattenDeep` is the infinite one | Both mappings listed correctly |
| 12 | `requestJson<T>` cast `response.json()` to `T` | Unchecked cast that contradicts the no-`any` rule | Removed; rule 05 requires validation at the boundary |
| 13 | `Result.fromThrowable` default used `e as E` and `as unknown as E` | Unsound casts in the type meant to make errors safe | Replaced with a sound `Result` type and a `toError` helper |
| 14 | Example HTTP server read unbounded request bodies and trusted `JSON.parse` output | Memory exhaustion (DoS) risk and unvalidated input | New template enforces a 16 KiB limit, content-type checks and typed validation |
| 15 | Example test imported `./server.js` from TypeScript run without a build step | Fails under Node's built-in type stripping | Template imports `./server.ts`; `tsconfig.json` enables `allowImportingTsExtensions` and `erasableSyntaxOnly` |
| 16 | Audit skill suggested bare `npx tsc` | Without local TypeScript, npx offers the npm package `tsc`, "a deprecated release of the TypeScript compiler" | Uses `npx --no-install tsc` |
| 17 | "Never use TODO / `pass` / `...`" applied literally | `pass` and `...` are legitimate syntax (Protocols, abstract methods, spread) | Rule judges intent; partial work must be stated, not hidden |
| 18 | Result type prescribed for every language | Unidiomatic in Python and most TypeScript; Go and Rust have native models | Rule 05 maps each language to its native error model |

### Added

- `scripts/agents-sync.mjs` with self-tests: syncs `.claude/skills/` and validates skills against the Agent Skills specification, rule triggers, size budgets, relative links and mirror drift.
- `.gemini/settings.json` so Gemini CLI loads `AGENTS.md` together with `GEMINI.md`.
- `.aider.conf.yml` so Aider loads `AGENTS.md`.
- Verified templates in `native-from-scratch/assets/`:
  - Node.js: 12 tests passing on Node 24.9; `tsc --noEmit` clean with TypeScript 7.0.2.
  - Python: 11 tests passing on Python 3.14; `mypy --strict` and Ruff clean, mccabe complexity ≤ 10.
- Rewritten `rigorous-code-audit` skill: commands per ecosystem, a checklist mapped to OWASP Top 10:2025, verification before reporting, and a severity-ranked report format.

### Completed cleanups

- Superseded Phase 1 draft files (`.agents/rules/00-index.md`, `01-core-philosophy.md`, `02-clean-code-invariants.md`, `03-anti-hallucination-verification.md`, `04-native-standard-first.md`, `05-defensive-error-handling.md`, `.cursorrules`, `.windsurfrules`, and root `skills/` mirror) were cleanly removed.
- Validated with `node scripts/agents-sync.mjs --check`: 2 skills checked, 0 errors, 0 warnings.

