# Gemini notes

The shared rules for every AI agent live in `AGENTS.md`. This file holds Gemini-specific notes only.

- **Gemini CLI** loads `AGENTS.md` together with this file because `.gemini/settings.json` sets `context.fileName` to `["AGENTS.md", "GEMINI.md"]`. Skills load from `.agents/skills/`.
- **Antigravity** reads `AGENTS.md`, `GEMINI.md`, the rules in `.agents/rules/` (each has the required `trigger` frontmatter), and the skills in `.agents/skills/`.
- Edit shared guidance in `AGENTS.md` or `.agents/`, never by copying it here.
