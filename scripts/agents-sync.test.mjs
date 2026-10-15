// Run with: node --test "scripts/*.test.mjs"
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseFrontmatter, ruleProblems, skillProblems } from "./agents-sync.mjs";

test("parses scalars, quoted values and folded block scalars", () => {
  const { data, body } = parseFrontmatter(
    ["---", "name: my-skill", 'title: "Quoted: value"', "description: >-", "  first line", "  second line", "---", "# Body"].join("\n"),
  );
  assert.deepEqual(data, { name: "my-skill", title: "Quoted: value", description: "first line second line" });
  assert.equal(body, "# Body");
});

test("parses nested string maps and lists", () => {
  const { data } = parseFrontmatter(
    ["---", "metadata:", '  version: "2.0.0"', "  author: team", "paths:", '  - "src/**/*.ts"', "  - lib/*.ts", "globs: [a.ts, b.ts]", "---", ""].join("\n"),
  );
  assert.deepEqual(data, {
    metadata: { version: "2.0.0", author: "team" },
    paths: ["src/**/*.ts", "lib/*.ts"],
    globs: ["a.ts", "b.ts"],
  });
});

test("returns null data when there is no frontmatter", () => {
  assert.deepEqual(parseFrontmatter("# Just markdown\n"), { data: null, body: "# Just markdown\n" });
});

test("rejects lines it cannot parse instead of guessing", () => {
  assert.throws(() => parseFrontmatter("---\nnot a key value line\n---\n"), /unsupported frontmatter line 1/);
});

test("rejects an unquoted value containing ': ' (invalid YAML)", () => {
  assert.throws(
    () => parseFrontmatter("---\ndescription: Core principles: scope and simplicity\n---\n"),
    /unquoted value contains ": "/,
  );
});

test("accepts the same value when double-quoted, and decodes escapes", () => {
  const { data } = parseFrontmatter('---\ndescription: "Core principles: \\"scope\\" and simplicity"\n---\n');
  assert.equal(data.description, 'Core principles: "scope" and simplicity');
});

test("decodes doubled quotes in single-quoted values", () => {
  const { data } = parseFrontmatter("---\nnote: 'it''s fine: really'\n---\n");
  assert.equal(data.note, "it's fine: really");
});

test("rejects plain values starting with a YAML indicator", () => {
  assert.throws(() => parseFrontmatter("---\nglobs: *.ts\n---\n"), /cannot start with "\*"/);
});

test("rejects duplicate keys", () => {
  assert.throws(() => parseFrontmatter("---\nname: a\nname: b\n---\n"), /duplicate key "name"/);
});

test("skillProblems accepts a valid skill and reports each invalid field", () => {
  assert.deepEqual(skillProblems("my-skill", { name: "my-skill", description: "Does X. Use when Y." }, "# Body"), { errors: [], warnings: [] });
  const { errors } = skillProblems("my-skill", { name: "My_Skill", description: "", metadata: ["x"] }, "");
  assert.deepEqual(errors, [
    "name may contain only lowercase letters, digits and single hyphens, not at the start or end",
    "description is required",
    "metadata must be a map of string keys to string values",
  ]);
  assert.match(skillProblems("a", { name: "b", description: "x" }, "").errors[0], /must match its directory name/);
  assert.equal(skillProblems("a", { name: "a", description: "x" }, "\n".repeat(600)).warnings.length, 1);
});

test("ruleProblems requires a known trigger and the fields that trigger needs", () => {
  assert.deepEqual(ruleProblems({ trigger: "always_on" }, 100), []);
  assert.match(ruleProblems(null, 100)[0], /needs frontmatter "trigger/);
  assert.deepEqual(ruleProblems({ trigger: "model_decision" }, 100), ["model_decision rules need a description"]);
  assert.deepEqual(ruleProblems({ trigger: "glob" }, 100), ["glob rules need globs"]);
  assert.match(ruleProblems({ trigger: "always_on" }, 12_001)[0], /12001 characters/);
});
