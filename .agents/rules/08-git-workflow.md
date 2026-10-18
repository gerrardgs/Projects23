---
trigger: model_decision
description: "Apply when committing, branching, writing commit messages or pull requests, versioning, releasing, or editing the changelog."
---

# R-08: Version Control and Release Workflow

## 1. Before you commit

- Commit or push only when the user asks. Create a branch first if you are on the default branch.
- Review the staged diff (`git diff --staged`): no secrets, no `.env` files, no build output, no editor or OS files, no debugging leftovers, no unrelated changes.
- Formatter, linter, type checker and tests pass.
- Never bypass hooks (`--no-verify`) unless the user explicitly asks.

## 2. Commits

- One logical change per commit, small enough to review and revert on its own.
- Use the project's message convention. If none exists, use [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/): `type(scope): summary`, for example `fix(auth): reject expired refresh tokens`. Common types are `feat`, `fix`, `docs`, `refactor`, `test`, `perf`, `build`, `ci`, `chore`. Mark breaking changes with `!` or a `BREAKING CHANGE:` footer.
- The summary uses the imperative mood ("add", not "added"), in about 50 characters. The body explains *why*, and links issues.
- Follow the project's policy on disclosing AI assistance (for example a commit trailer naming the tool). Disclosure helps reviewers and later security audits know where extra scrutiny is useful.

## 3. History safety

- Never force-push to shared branches, rewrite published history, or delete branches and tags without explicit approval.
- Never discard uncommitted or unpushed work (`git reset --hard`, `git checkout -- <path>`, `git restore`, `git clean`, `git stash drop` or `clear`) without explicit approval; it cannot be recovered from history ([09-clean-execution](09-clean-execution.md) section 2).
- Prefer `git revert` to undo a published commit. Use `git push --force-with-lease`, never plain `--force`, when a force-push on your own branch is approved.
- Resolve merge conflicts by understanding both sides. Never accept "ours" or "theirs" wholesale without reading.

## 4. Pull requests

- Title states the change. Description covers: what and why, how it was verified (commands and results), risks, rollback plan, and screenshots for UI changes.
- Keep PRs small and focused. Split refactors from behaviour changes.
- Keep branches short-lived and merge to the default branch often ([trunk-based development](https://trunkbaseddevelopment.com/)); hide unfinished work behind a feature flag instead of a long-lived branch.
- CI must be green before merge. Address every review comment, or reply with reasoning.

## 5. Versions and releases

- Version libraries and public APIs with [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html): MAJOR for breaking changes, MINOR for compatible features, PATCH for compatible fixes.
- Keep a human-readable `CHANGELOG.md` (format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)) with an `Unreleased` section updated in each PR.
- Tag releases (`v1.4.2`), and build release artifacts in CI from the tag, never from a developer machine.

## 6. Repository hygiene

- `.gitignore` covers dependencies, build output, caches, local environment files and secrets.
- Add `.gitattributes` with `* text=auto eol=lf` when contributors use different operating systems.
- Large binaries go in Git LFS or an artifact store, not in regular commits.
