---
name: technical-documentation
description: Write and maintain documentation that people can use - READMEs, tutorials, how-to guides, API and configuration reference, architecture explanations, decision records, changelogs, runbooks, docstrings and code comments - organised with the Diátaxis framework, kept next to the code, reviewed and tested like code. Use when creating or updating any documentation, documenting an API, CLI, library or service, writing a README or migration guide, or when users keep asking the same questions.
license: MIT
metadata:
  version: "1.0.0"
---

# Technical Documentation

Documentation is part of the product. Wrong documentation is worse than none, so it must change in the same pull request as the behaviour it describes.

## 1. Pick the right kind (Diátaxis)

The [Diátaxis](https://diataxis.fr/start-here/) framework separates four needs. Mixing them makes each worse.

| Kind | Serves | Write it as |
| :--- | :--- | :--- |
| Tutorial | Learning: "a lesson, that takes a student by the hand through a learning experience" | One guaranteed path from nothing to a working result; no choices, no digressions |
| How-to guide | A goal: "addresses a real-world goal or problem" | Numbered steps for a competent user; starts from their goal, states prerequisites |
| Reference | Information: "accurate, complete, reliable information, free of distraction and interpretation" | Consistent structure mirroring the code (every option, endpoint, flag, error); generated from source where possible |
| Explanation | Understanding: "context and background", answering "why?" | Discussion of design, trade-offs, history and alternatives |

## 2. The documents most projects need

| Document | Contents |
| :--- | :--- |
| `README.md` | What it is and who it is for, requirements, quick start that works on a fresh machine, common commands, configuration, links to the rest ([template](../project-bootstrap/assets/README.template.md)) |
| API reference | Generated from the contract (OpenAPI, GraphQL schema, `.proto`) or from doc comments; examples for each operation, including errors |
| Configuration reference | Every environment variable and setting: meaning, type, default, required or not, example; kept in sync with `.env.example` |
| Architecture overview | Components, data flows, trust boundaries and the main decisions; diagrams as code (for example Mermaid) so they can be reviewed |
| Decision records | One short record per significant decision ([ADR template](../project-bootstrap/assets/adr-template.md)) |
| `CHANGELOG.md` | User-visible changes per release, grouped as added, changed, deprecated, removed, fixed, security ([Keep a Changelog](https://keepachangelog.com/en/1.1.0/)) |
| Migration guides | For every breaking change: who is affected, what to change, before and after examples |
| Runbooks | Operational procedures for each service ([deploy-and-release](../deploy-and-release/SKILL.md) section 7) |
| `SECURITY.md`, `CONTRIBUTING.md` | How to report vulnerabilities privately; how to set up, test and submit changes |

## 3. Writing rules

- Lead with what the reader needs to do or know; one idea per paragraph; short sentences; active voice; consistent terms.
- Every command and code sample is copy-pasteable and was actually run; state the versions it was tested with.
- Use real-looking but synthetic examples (reserved domains such as `example.com`, documentation IP ranges), never real credentials or personal data.
- Document behaviour and contracts, not implementation details that change often.
- Write for accessibility: descriptive link text, alt text for images, headings in order, no information conveyed only by colour.
- Code comments explain *why*; public APIs get doc comments in the language's format ([02-clean-code](../../rules/02-clean-code.md) section 6).

## 4. Docs as code

- Keep documentation in the repository next to the code, reviewed in the same pull request.
- Check it in CI where practical: broken links, Markdown lint, spelling, and running the code samples or doctests.
- Generate reference material from the source of truth (schemas, type definitions, CLI help) instead of copying it by hand.
- Mark the version a page applies to, and remove or update pages for removed features.

## Done when

- [ ] Each changed behaviour is reflected in the reference, guides and changelog
- [ ] Commands and samples were run and work as written
- [ ] The page has one clear purpose (tutorial, how-to, reference or explanation)
- [ ] Links resolve; no secrets or real personal data in examples
