@AGENTS.md

## Claude Code notes

- The import above loads the shared rules from `AGENTS.md`. Keep shared guidance there, not here, so every tool stays consistent.
- Claude Code does not auto-load `.agents/rules/`. Read the matching rule file from the index in `AGENTS.md` before doing that kind of work.
- Skills are mirrored from `.agents/skills/` into `.claude/skills/` by `node scripts/agents-sync.mjs`. Edit `.agents/skills/` only, then re-run the sync.
- To enforce a rule deterministically (for example, blocking edits to `.env` files), use a Claude Code hook in `.claude/settings.json`. Instructions in this file guide behaviour but do not enforce it.
