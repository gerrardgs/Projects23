# Changelog

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

