---
name: security-hardening
description: Threat-model a feature, review and harden code and configuration against OWASP Top 10:2025 and OWASP ASVS 5.0, and set up secret scanning, static analysis, dependency and container scanning, and SBOM generation. Use when building authentication, authorization, payments, file uploads or anything handling personal data, before a release, after a security finding, or when asked to make code or infrastructure secure.
license: MIT
metadata:
  version: "1.0.0"
---

# Security Hardening

The always-on baseline is [06-security](../../rules/06-security.md). This skill adds the procedure. Scanner commands are in [references/tools.md](references/tools.md); the standard to use for each kind of system (web, API, mobile, LLM, agents, cloud, supply chain) and regulation pointers are in [references/domain-standards.md](references/domain-standards.md).

## 1. Threat-model before building

For any feature that touches authentication, money, personal data, file handling, external callbacks or administration, write a short threat model:

1. **Assets**: what must be protected (accounts, personal data, money, secrets, availability).
2. **Entry points and trust boundaries**: where untrusted data enters (HTTP, queues, files, webhooks, third-party APIs, LLM output).
3. **Threats per boundary**, using STRIDE as a prompt: **S**poofing, **T**ampering, **R**epudiation, **I**nformation disclosure, **D**enial of service, **E**levation of privilege.
4. **Mitigations** for each threat, each linked to a requirement or a test.

## 2. Pick a verification level

[OWASP ASVS 5.0](https://owasp.org/www-project-application-security-verification-standard/) defines three levels. Use Level 1 as the minimum for any internet-facing application, Level 2 for applications handling sensitive data or business transactions, and Level 3 for the most critical systems. Use the ASVS requirements as the review checklist for the chosen level.

## 3. Harden the application

| Area | Minimum |
| :--- | :--- |
| Authentication | Maintained library or identity provider; Argon2id, scrypt or bcrypt for passwords; rate limiting and lockout on login; MFA available for privileged accounts |
| Sessions and tokens | Short-lived access tokens; revocable refresh tokens; cookies `Secure; HttpOnly; SameSite=Lax` (or `Strict`); rotate the session ID on login |
| Authorization | Central, deny-by-default checks on every request and object; tests for "user A cannot read user B's data" |
| Input | Schema validation with size limits at every boundary; parameterized queries; no shell string building |
| Output | Context-aware encoding; JSON APIs set `Content-Type: application/json` |
| HTTP headers | `Strict-Transport-Security`, `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and `frame-ancestors` in CSP (or `X-Frame-Options`) |
| CORS | Explicit allow-list of origins; never reflect arbitrary origins together with credentials |
| Rate limits | Per user and per IP on authentication, expensive and enumerable endpoints |
| Errors and logs | Generic error responses; security events logged (login, permission denied, admin actions) without secrets |
| Files | Size and type limits, stored outside the web root, random names, served with `Content-Disposition` |

### Applications that use LLMs
Apply the [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/llm-top-10/): treat model output as untrusted input; keep secrets and authorization decisions out of prompts; give tools the least privilege; require human approval for high-impact actions; mark external content clearly as data.

## 4. Secure the supply chain and pipeline

- Lockfiles committed; reproducible installs in CI; automated dependency updates (Dependabot or Renovate).
- Secret scanning in pre-commit hooks and in CI (gitleaks).
- Dependency vulnerability audit in CI (ecosystem tool or OSV-Scanner); fail on high and critical findings with a documented exception process.
- Static analysis (Semgrep, CodeQL, Bandit, gosec) on every pull request.
- CI hardening per [ci-cd-pipeline](../ci-cd-pipeline/SKILL.md): read-only default permissions, actions pinned to commit SHAs, no secrets exposed to untrusted pull requests.
- Containers: minimal base images, non-root user, image scanning (Trivy or OSV-Scanner), an SBOM per release (Syft or Trivy, in CycloneDX or SPDX format).

## 5. Secrets management

- Development: `.env` files that are git-ignored, with a committed `.env.example`.
- CI: the platform's encrypted secrets, scoped to the environments that need them; prefer OIDC federation to long-lived cloud keys.
- Production: a secret manager (cloud provider secret manager, HashiCorp Vault, or Kubernetes Secrets with encryption at rest), rotated regularly.
- Leaked secret: revoke and rotate immediately, then remove it from history, and check access logs for misuse.

## 6. Public exposure audit

Run before a repository becomes public, before a release, and after any incident. Rule [06-security](../../rules/06-security.md) section 8 lists where data leaks; this is the procedure:

1. **Repository and history**: `gitleaks git --log-opts="--all" --redact .` scans every commit on every branch; `gitleaks dir --redact .` scans the working tree. Search tracked files for personal data, internal hostnames and local paths (`git grep -n -I -E "<pattern>"`). Check that `.gitignore` covers `.env*`, keys and certificates, credential files, Terraform state and variable files, kubeconfigs, database dumps and backups.
2. **Commit identity**: `git log --all --format="%an <%ae>" | sort -u` shows the email addresses that are public in a public repository. Switch future commits to the platform's private no-reply address; rewriting existing history is irreversible and needs the owner's approval.
3. **Hosting settings** (owner action): secret scanning with push protection, private vulnerability reporting, a `SECURITY.md`, branch protection or rulesets on the default branch, required reviews for workflow changes, and approval before workflows run for first-time contributors from forks.
4. **Build outputs**: list what a package or image will contain before publishing (`npm pack --dry-run`, `docker history` and the image's file list, `python -m build` then inspect the archive); confirm no secrets, `.env` files or real data.
5. **Running systems**: scan public endpoints for exposed `.git`, `.env`, debug and admin paths, directory listings and verbose errors (for example with ZAP against a test environment); confirm that storage and databases are not reachable from the internet; review CORS and authentication on every public route.
6. **Cloud accounts**: enforce public-access blocks at account or organization level (Amazon S3 Block Public Access; Azure Storage `AllowBlobPublicAccess` false, noting that the `$web` static-website container is always public; Google Cloud Storage public access prevention via the `storage.publicAccessPrevention` organization policy constraint), and run the provider's access analysis (for example IAM Access Analyzer for S3).

Report each exposure with what was exposed, since when, to whom, and the remediation (revoke and rotate secrets, make resources private, notify as required).

## 7. Keep security current

No system is impossible to attack: new vulnerabilities are published every day, including in security tools. What can be guaranteed is that known vulnerabilities are found and fixed quickly, and that each layer limits the damage of a failure in another.

1. **Automate updates** for every pinned thing: dependencies, lockfiles, GitHub Actions SHAs, container base-image digests and CI tool pins (Dependabot or Renovate). Pins written inside workflow `run:` commands are not updated by Dependabot: keep them in a requirements or manifest file it can read.
2. **Use a short cooldown** (for example 7 days) for routine updates, so a compromised release has time to be detected and pulled before you adopt it.
3. **Patch actively exploited vulnerabilities first, without waiting for the cooldown.** Check findings against the [CISA Known Exploited Vulnerabilities catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) and use [EPSS](https://www.first.org/epss/) scores to rank the rest. For an emergency update, confirm the fix comes from the official project (release notes, advisory, checksum or signature) before applying it.
4. **Scan on a schedule, not only on change**: a weekly CI run of the dependency audit, secret scan, image scan and static analysis (CodeQL or Semgrep) finds vulnerabilities published after your last commit.
5. **Shrink what can be attacked**: minimal runtime images (distroless or scratch) without shell or package manager, only production dependencies, unused features and ports disabled.
6. **Rebuild images regularly**, even without code changes, to pick up patched base layers, and rescan the result.
7. **Track end of life**: `node scripts/tech-lookup.mjs eol:<product>` for runtimes, databases and operating systems; plan upgrades before support ends.
8. **Practise the response**: know who rotates which secret, how to roll back, and how to notify users; an incident plan that was never exercised will not work under pressure.

## 8. Guardrails for AI agents themselves

Instruction files guide an agent; only the tool's own controls enforce. Use both:

- Give agents least privilege: read-only credentials by default, no production secrets in their environment, sandboxed execution for untrusted code ([ai-agent-systems](../ai-agent-systems/SKILL.md)).
- Turn on the tool's permission prompts for destructive actions, and keep secrets out of the files an agent can read.
- **Claude Code**: [assets/claude-code-guardrails/](assets/claude-code-guardrails/) is a tested `PreToolUse` hook (Node.js, no dependencies) that denies reading or editing `.env` files, private keys, cloud and SSH credentials, Terraform state and registry token files, and blocks force-pushes, recursive deletes of the root or home directory, piping downloads into a shell, `--no-verify` commits and `chmod 777`. To enable it, copy `guard.mjs` to `.claude/hooks/guard.mjs` (keep it executable) and merge `settings.example.json` into `.claude/settings.json`. Hooks change every session in the repository, so this is an owner decision. The deny patterns are a safety net, not a complete sandbox.

## 9. Verify

- Run the scanners in [references/tools.md](references/tools.md) and triage every finding: fix it, or document why it is a false positive.
- Write tests for security requirements: authorization denials, input limits, rejected tokens, rate limits.
- Review the change with the security section of [rigorous-code-audit](../rigorous-code-audit/SKILL.md).

## Report

List each threat or finding with severity, the mitigation applied, the test or scan that verifies it, and any accepted residual risk that needs the user's sign-off.
