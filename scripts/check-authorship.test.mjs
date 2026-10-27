// Run with: node --test "scripts/*.test.mjs"   (no Git access: the pure functions are tested directly)
import { test } from "node:test";
import assert from "node:assert/strict";
import { findAiAttribution, isAi, parseLog } from "./check-authorship.mjs";

const human = {
  hash: "0".repeat(40),
  name: "Ana Owner",
  email: "owner@example.com",
  committerName: "Ana Owner",
  committerEmail: "owner@example.com",
};
const commit = (message, overrides = {}) => ({ ...human, message, ...overrides });

test("accepts the human author, including messages that name AI tools as a topic", () => {
  assert.deepEqual(findAiAttribution(commit("feat: add Claude Design and Copilot guidance\n\nCovers Gemini too.")), []);
});

test("does not flag Dependabot or GitHub's own identities", () => {
  const bot = { name: "dependabot[bot]", email: "49699333+dependabot[bot]@users.noreply.github.com" };
  const message = "build(deps): bump x";
  assert.deepEqual(findAiAttribution(commit(message, { ...bot, committerName: "GitHub", committerEmail: "noreply@github.com" })), []);
});

test("flags AI co-author and sign-off trailers in any letter case", () => {
  for (const trailer of [
    "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
    "co-authored-by: Copilot <copilot@users.noreply.github.com>",
    "Signed-off-by: Devin AI <devin-ai-integration[bot]@users.noreply.github.com>",
    "Co-authored-by: Someone <bot@openai.com>",
  ]) {
    assert.equal(findAiAttribution(commit(`fix: x\n\n${trailer}`)).length, 1, trailer);
  }
});

test("keeps human co-authors, including people whose names resemble a tool", () => {
  assert.deepEqual(findAiAttribution(commit("fix: x\n\nCo-authored-by: Ana Putri <ana@example.com>")), []);
  assert.deepEqual(findAiAttribution(commit("fix: x\n\nCo-authored-by: Devin Lee <devin@example.com>")), []);
  assert.equal(isAi("Devin Lee <devin@example.com>"), false);
});

test("flags generated-with lines and ignores unrelated generators", () => {
  assert.equal(findAiAttribution(commit("docs: y\n\n🤖 Generated with [Claude Code](https://claude.com/claude-code)")).length, 1);
  assert.equal(findAiAttribution(commit("docs: y\n\nCreated using ChatGPT")).length, 1);
  assert.deepEqual(findAiAttribution(commit("docs: y\n\nGenerated with the docs-kit templates")), []);
});

test("flags an AI author or committer identity", () => {
  assert.equal(findAiAttribution(commit("x", { name: "Cursor Agent", email: "cursoragent@cursor.com" })).length, 1);
  assert.equal(findAiAttribution(commit("x", { committerName: "claude", committerEmail: "noreply@anthropic.com" })).length, 1);
});

test("parses git log records whose messages contain newlines", () => {
  const record = (hash, message) => [hash, "Ana Owner", "owner@example.com", "Ana Owner", "owner@example.com", message].join("\x1f");
  const output = `${record("a".repeat(40), "feat: one\n\nbody line\n")}\x1e\n${record("b".repeat(40), "fix: two\n")}\x1e\n`;
  const commits = parseLog(output);
  assert.deepEqual(commits.map((entry) => entry.hash[0]), ["a", "b"]);
  assert.equal(commits[0].message, "feat: one\n\nbody line\n");
});
