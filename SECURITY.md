# Security Policy

## Reporting a vulnerability

Please report security problems **privately**, never in a public issue, pull request or discussion:

- Use GitHub's private vulnerability reporting: open the repository's **Security** tab and choose **Report a vulnerability** (`https://github.com/gerrardgs/Projects23/security/advisories/new`).

Include what is affected (file, script or template), how to reproduce it, and the impact you expect. Do not include real secrets or personal data in the report; describe them instead.

## Scope

- The installer (`scripts/install.sh`), the sync and validation script (`scripts/agents-sync.mjs`), the lookup script (`scripts/tech-lookup.mjs`) and the CI workflows.
- Runnable templates under `.agents/skills/*/assets/`.
- Guidance in `AGENTS.md`, `.agents/rules/` and `.agents/skills/` that would lead an AI agent to insecure behaviour.

## Supported versions

Fixes are made on the `main` branch and released as new tags. Install a specific tag with `bash scripts/install.sh --ref <tag>`.

## Handling

Reports are acknowledged, investigated, fixed in a private advisory when needed, and disclosed together with the fix. Credit is given unless the reporter prefers otherwise.
