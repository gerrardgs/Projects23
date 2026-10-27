#!/usr/bin/env node
// Fails when a commit credits an AI agent: an AI author or committer identity, an AI co-author or sign-off
// trailer, or a "Generated with <AI tool>" line. GitHub lists co-authors as contributors, so one such trailer is
// enough to show an AI agent next to the human author (rule 08 section 2). Mentions of AI tools in the subject or
// body are not attribution and are not flagged; neither are Dependabot and other non-AI bots, nor human
// co-authors. Adapted from Projects24's check (v1.11.0); a human named Devin is not mistaken for Devin AI here.
//
// Usage (Node.js 22+, no dependencies, run inside a Git repository):
//   node scripts/check-authorship.mjs                 every commit reachable from HEAD
//   node scripts/check-authorship.mjs origin/main..   only the commits a branch adds
// Exit code 0 when no commit credits an AI agent, 1 when one does, 2 when Git cannot be read.

import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// Names, products and bot accounts of AI coding agents; whole words, any letter case.
const AI_NAME =
  /\b(claude|anthropic|openai|chatgpt|gpt-?\d|codex|copilot|gemini|google-labs-jules|jules\[bot\]|cursor ?agent|cursoragent|devin[ -]ai|devin-ai-integration|windsurf|codeium|aider|amazon q|codewhisperer|tabnine|sweep-ai|openhands|all-hands|lovable|bolt\.new|v0\[bot\])\b/i;
// Email domains that AI agents use for their commits and trailers.
const AI_EMAIL_DOMAIN = /@(anthropic\.com|openai\.com|cursor\.com|devin\.ai|all-hands\.dev|aider\.chat|codeium\.com|windsurf\.com)>?$/i;
const TRAILER = /^(co-authored-by|signed-off-by|assisted-by|generated-by|helped-by|reviewed-by)\s*:\s*(.+)$/i;
const GENERATED_LINE = /^\W*(generated|created|written|made)\s+(with|by|using)\b(.*)$/i;

/** True when a name, an identity "Name <email>" or a tool mention points at an AI agent. Pure. */
export function isAi(text) {
  return AI_NAME.test(text) || AI_EMAIL_DOMAIN.test(text.trim());
}

function messageProblems(message) {
  const problems = [];
  for (const raw of message.split("\n")) {
    const line = raw.trim();
    const trailer = TRAILER.exec(line);
    if (trailer && isAi(trailer[2])) problems.push(`AI ${trailer[1].toLowerCase()} trailer: ${line}`);
    const generated = GENERATED_LINE.exec(line);
    if (generated && isAi(generated[3])) problems.push(`AI attribution line: ${line}`);
  }
  return problems;
}

/** Problems in one commit { hash, name, email, committerName, committerEmail, message }. Pure. */
export function findAiAttribution(commit) {
  const problems = [];
  const author = `${commit.name} <${commit.email}>`;
  const committer = `${commit.committerName} <${commit.committerEmail}>`;
  if (isAi(author)) problems.push(`author is an AI agent: ${author}`);
  if (isAi(committer)) problems.push(`committer is an AI agent: ${committer}`);
  return [...problems, ...messageProblems(commit.message)];
}

/** Parses `git log --format=%H%x1f%an%x1f%ae%x1f%cn%x1f%ce%x1f%B%x1e` output. Pure. */
export function parseLog(output) {
  return output
    .split("\x1e")
    .map((record) => record.replace(/^\n/, ""))
    .filter(Boolean)
    .map((record) => {
      const [hash, name, email, committerName, committerEmail, message] = record.split("\x1f");
      return { hash, name, email, committerName, committerEmail, message };
    });
}

function readCommits(range) {
  const format = "--format=%H%x1f%an%x1f%ae%x1f%cn%x1f%ce%x1f%B%x1e";
  const options = { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, stdio: ["ignore", "pipe", "pipe"] };
  return parseLog(execFileSync("git", ["log", format, range], options));
}

function main() {
  const range = process.argv[2] ?? "HEAD";
  let commits;
  try {
    commits = readCommits(range);
  } catch (error) {
    const reason = String(error.stderr ?? error.message).trim().split("\n")[0];
    console.error(`check-authorship: cannot read the Git history for "${range}": ${reason}`);
    process.exitCode = 2;
    return;
  }
  let failures = 0;
  for (const commit of commits) {
    for (const problem of findAiAttribution(commit)) {
      failures += 1;
      console.error(`error: ${commit.hash.slice(0, 7)} ${problem}`);
    }
  }
  console.log(`${commits.length} commit(s) checked, ${failures} AI attribution(s) found`);
  if (failures > 0) {
    console.error(
      "Commits must carry only the human author. With the owner's approval, amend the message to drop the line " +
        "(the tree stays identical) and push with --force-with-lease (rule 08 sections 2 and 3).",
    );
    process.exitCode = 1;
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  process.stdout.on("error", (error) => {
    if (error.code !== "EPIPE") throw error;
    process.exit(process.exitCode ?? 0);
  });
  main();
}
