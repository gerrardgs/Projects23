# Contributing to UCNA-Spec

This guide explains how to author, test, and contribute new rules and skills to the Universal Clean Native Agent Specification.

---

## 1. Authoring Standards

### Rules (`.agents/rules/*.md`)
1. **Frontmatter**: Must include valid YAML frontmatter with a recognized trigger:
   ```markdown
   ---
   trigger: always_on | model_decision | glob | manual
   description: When this rule activates (required for model_decision)
   ---
   ```
2. **Character Limit**: Keep rule files at or under **12,000 characters** (Windsurf workspace limit).
3. **Always-On Budget**: Keep `always_on` rules lean. Total always-on context (including `AGENTS.md`) must remain well under the 20,000-token threshold.

### Skills (`.agents/skills/<name>/SKILL.md`)
1. **Directory Naming**: Must match the skill `name` declared in frontmatter.
2. **Frontmatter Constraints** (Agent Skills Specification):
   - `name`: 1-64 characters, lowercase alphanumeric and single hyphens (`^[a-z0-9]+(-[a-z0-9]+)*$`).
   - `description`: 1-1024 characters, clear activation criteria.
   - `compatibility`: Optional, string up to 500 characters.
3. **Body Length**: Keep `SKILL.md` body under **500 lines**. Move templates, assets, and extended references into subfolders (`assets/`, `references/`).
4. **Runnable Templates**: Whenever providing example architectures, include tested code assets that run natively without dependency errors.

---

## 2. Link Rules

- **Zero Machine-Specific Links**: Never use `file:///` URLs. They break on other developers' machines, CI runners, and GitHub.
- **Relative Links Only**: All links between markdown files must be valid relative paths (e.g., `../rules/01-core-principles.md`).
- The sync script validates every markdown link across the repository and fails if any link is broken.

---

## 3. Verification Workflow

Before committing any change:

1. **Run Script Unit Tests**:
   ```sh
   node --test "scripts/*.test.mjs"
   ```
2. **Sync Mirrors & Run Static Validation**:
   ```sh
   node scripts/agents-sync.mjs
   ```
3. **Run CI Check Mode**:
   ```sh
   node scripts/agents-sync.mjs --check
   ```
4. **Official Agent Skills Validator Check** (Optional):
   ```sh
   pip install skills-ref
   agentskills validate .agents/skills/native-from-scratch
   agentskills validate .agents/skills/rigorous-code-audit
   ```
