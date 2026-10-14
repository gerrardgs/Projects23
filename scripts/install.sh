#!/usr/bin/env bash
# ==============================================================================
# UCNA-Spec Quick Installer
# Installs Universal Clean Native Agent Specification into the current project.
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/gerrardgs/Projects23/main/scripts/install.sh | bash
# ==============================================================================

set -euo pipefail

REPO_RAW_URL="https://raw.githubusercontent.com/gerrardgs/Projects23/main"
TARGET_DIR="${1:-.}"

echo "=========================================================="
echo "Installing UCNA-Spec (Universal Clean Native Agent Spec)"
echo "Target directory: $(cd "$TARGET_DIR" && pwd)"
echo "=========================================================="

mkdir -p "$TARGET_DIR/.agents/rules"
mkdir -p "$TARGET_DIR/.agents/skills/native-from-scratch/assets/node-http-service"
mkdir -p "$TARGET_DIR/.agents/skills/native-from-scratch/assets/python-http-service"
mkdir -p "$TARGET_DIR/.agents/skills/rigorous-code-audit"
mkdir -p "$TARGET_DIR/.github"
mkdir -p "$TARGET_DIR/.gemini"
mkdir -p "$TARGET_DIR/scripts"

download_file() {
  local remote_path="$1"
  local local_path="$TARGET_DIR/$1"
  echo "  -> Downloading $remote_path"
  curl -fsSL "$REPO_RAW_URL/$remote_path" -o "$local_path"
}

# Core files
download_file "AGENTS.md"
download_file "CLAUDE.md"
download_file "GEMINI.md"
download_file ".aider.conf.yml"
download_file ".github/copilot-instructions.md"
download_file ".gemini/settings.json"

# Rules
download_file ".agents/rules/01-core-principles.md"
download_file ".agents/rules/02-clean-code.md"
download_file ".agents/rules/03-verification.md"
download_file ".agents/rules/04-dependencies.md"
download_file ".agents/rules/05-error-handling.md"

# Skills
download_file ".agents/skills/native-from-scratch/SKILL.md"
download_file ".agents/skills/native-from-scratch/assets/node-http-service/package.json"
download_file ".agents/skills/native-from-scratch/assets/node-http-service/server.ts"
download_file ".agents/skills/native-from-scratch/assets/node-http-service/server.test.ts"
download_file ".agents/skills/native-from-scratch/assets/node-http-service/tsconfig.json"
download_file ".agents/skills/native-from-scratch/assets/python-http-service/app.py"
download_file ".agents/skills/native-from-scratch/assets/python-http-service/pyproject.toml"
download_file ".agents/skills/native-from-scratch/assets/python-http-service/test_app.py"
download_file ".agents/skills/rigorous-code-audit/SKILL.md"

# Scripts
download_file "scripts/agents-sync.mjs"
download_file "scripts/agents-sync.test.mjs"
chmod +x "$TARGET_DIR/scripts/agents-sync.mjs"

# Run sync to generate .claude/skills and validate
if command -v node >/dev/null 2>&1; then
  echo ""
  echo "Running agents-sync to configure tool mirrors..."
  (cd "$TARGET_DIR" && node scripts/agents-sync.mjs)
else
  echo ""
  echo "Note: Node.js 22+ not found. Please run 'node scripts/agents-sync.mjs' once Node is installed."
fi

echo ""
echo "=========================================================="
echo "UCNA-Spec installed successfully!"
echo "Next step: Open your project in Google Antigravity, Claude Code, Cursor, Windsurf, or Copilot."
echo "=========================================================="
