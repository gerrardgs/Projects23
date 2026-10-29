@AGENTS.md
@.agents/rules/01-core-principles.md
@.agents/rules/02-clean-code.md
@.agents/rules/03-verification.md
@.agents/rules/06-security.md
@.agents/rules/09-clean-execution.md

## Claude Code notes

- The imports above load the shared rules from `AGENTS.md` and the always-on rules from `.agents/rules/`. Keep shared guidance there, not here, so every tool stays consistent.
- The on-demand rules (04, 05, 07, 08, 10, 11, 12) are not imported. Read the matching file from the index in `AGENTS.md` before doing that kind of work.
- Skills are mirrored from `.agents/skills/` into `.claude/skills/` by `node scripts/agents-sync.mjs`. Edit `.agents/skills/` only, then re-run the sync.
- Running things: use the Bash tool with the project's scripts, not step-by-step browser or MCP tools. `npm run verify` runs the spec's checks and prints one line per step; `node scripts/run-quiet.mjs -- <command>` does the same for any command. Start servers and watchers with the Bash tool's background option and stop them afterwards ([09-clean-execution](.agents/rules/09-clean-execution.md) section 2).
- To enforce a rule deterministically (for example, blocking edits to `.env` files), use a Claude Code hook in `.claude/settings.json`. Instructions in this file guide behaviour but do not enforce it. A tested hook is ready in `.agents/skills/security-hardening/assets/claude-code-guardrails/` (see that skill, section 8).
