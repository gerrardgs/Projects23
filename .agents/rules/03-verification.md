---
trigger: always_on
description: "Anti-hallucination protocol: verify every API, package, version, flag, path and claim against the real environment or official documentation before relying on it."
---

# R-03: Verification and Anti-Hallucination Protocol

Language models produce plausible but wrong details: functions that do not exist, flags from another tool, packages that were never published, outdated APIs. Treat every such detail as **unverified until checked**.

## 1. The protocol (run it before delivering code or commands)

1. **Ground in the workspace.** Read the manifests and lockfiles, and check the runtime version actually in use (`node --version`, `python3 --version`, `go version`, `rustc --version`, `java -version`, `dotnet --version`). Read the code you are about to call or change.
2. **Verify every external symbol.** Check that each function, method, option and type exists *in the installed version*. Use the sources in section 2, not memory.
3. **Check for deprecation.** Prefer the current API. Read the changelog or release notes when crossing a major version.
4. **Run the static checks**: compiler or type checker, then linter.
5. **Run the code**: tests, or a minimal reproduction, and read the actual output.
6. **Label what remains unverified.** If you could not run or check something, say so explicitly in your response.

## 2. Where to verify (most authoritative first)

1. The installed source and type definitions: `node_modules/<pkg>/` (`package.json` → `types`), the virtualenv `site-packages/<pkg>/`, `go doc <pkg>.<Symbol>`, `cargo doc`, IDE "go to definition".
2. Built-in help: `<tool> --help`, `<tool> help <subcommand>`, `man <tool>`, `python3 -m pydoc <module>`.
3. Official documentation and changelog **for the exact version in use**.
4. The package registry: `npm view <pkg> versions`, `pip index versions <pkg>`, `go list -m -versions <module>`, `cargo info <crate>`, Maven Central, NuGet, Packagist. `node scripts/tech-lookup.mjs` queries 12 registries and data sources at once (versions, licence, deprecation, end-of-life dates, security score) and fails on names that do not exist.
5. Secondary sources (blogs, Q&A sites, AI answers): hints only, confirm in 1 to 4.

## 3. Hard rules

- **No phantom packages.** Before adding a dependency, confirm the exact name exists in the official registry and is the intended project: check the publisher, repository link, download history and age. Attackers register names that AI models tend to hallucinate ("slopsquatting") and look-alike names ("typosquatting").
- **No phantom flags or config keys.** Check `--help` or the docs for every flag you recommend for `git`, `docker`, `kubectl`, `npm`, `pip`, compilers, cloud CLIs, and so on. Flags differ between tools and between versions (for example GNU vs BSD `sed -i`).
- **No phantom paths or environment variables.** Confirm files exist before referencing them. Document every required environment variable (for example in `.env.example`) and fail fast with a clear message when one is missing.
- **No invented output.** Never claim tests passed, a build succeeded or a benchmark improved unless you ran it and saw the result. Quote the relevant output.
- **No silent version assumptions.** If code needs a minimum runtime or library version, state it, and check it is compatible with the project's declared version.
- **Cite when stating facts** about external tools, standards or versions that the user will rely on: link the official source.

## 4. Common deprecated patterns and their replacements

| Ecosystem | Avoid | Use instead |
| :--- | :--- | :--- |
| Node.js | `new Buffer(x)` (DEP0005) | `Buffer.from(x)`, `Buffer.alloc(n)` |
| Node.js | `url.parse()` for untrusted input | `new URL(input, base)` (WHATWG URL) |
| Python | `datetime.utcnow()` (deprecated in 3.12) | `datetime.now(timezone.utc)` |
| Python | `asyncio.get_event_loop()` to start a program | `asyncio.run(main())`; inside coroutines `asyncio.get_running_loop()` |
| Go | `io/ioutil` (deprecated since Go 1.16) | functions in `io` and `os` |
| React | `componentWillMount` and other legacy lifecycles | function components and hooks |

Check the runtime's own deprecation list when unsure: Node.js `--throw-deprecation`, Python `-W error::DeprecationWarning`, `go vet`, `cargo clippy`, compiler warnings.

## 5. When verification is impossible

If you lack network access or the tool is not installed, do not guess silently. Say what you could not verify, give the command the user can run to check it, and prefer an approach you *can* verify locally.
