# Toolchains by language

Every VS Code extension ID below was checked against the Visual Studio Marketplace API on 2026-10-14. Package names were checked against their registries. Prefer the tools a project already uses. For a new project, the first option in each cell is a sensible default.

## Editor extensions for every project

| Extension ID | Purpose |
| :--- | :--- |
| `EditorConfig.EditorConfig` | Apply `.editorconfig` settings |
| `usernamehw.errorlens` | Show diagnostics inline |
| `streetsidesoftware.code-spell-checker` | Spelling in code and docs |
| `eamodio.gitlens` | Git history and blame |
| `github.vscode-pull-request-github` | GitHub pull requests and issues |
| `github.vscode-github-actions` | Workflow editing and validation |
| `redhat.vscode-yaml` | YAML validation with schemas |
| `davidanson.vscode-markdownlint` | Markdown linting |
| `timonwong.shellcheck` | Shell script linting (needs `shellcheck`) |
| `ms-azuretools.vscode-containers` | Dockerfiles, images and containers (Container Tools) |
| `ms-vscode-remote.remote-containers` | Dev Containers |
| `sonarsource.sonarlint-vscode` | SonarQube for IDE: bug and security analysis |
| `humao.rest-client` | Send HTTP requests from `.http` files |

## TypeScript / JavaScript

| Need | Tools |
| :--- | :--- |
| Runtime and version | Node.js (pin with `.nvmrc` and `engines`); version managers: nvm, fnm, Volta, mise |
| Package manager | npm (`npm ci` in CI), pnpm, Yarn, or Bun; commit the lockfile |
| Format and lint | Prettier + ESLint with `typescript-eslint`, or Biome (`@biomejs/biome`) for both |
| Types | `typescript` with `strict: true`; `tsc --noEmit` in CI |
| Tests | `node --test`, Vitest, or Jest; Playwright for browsers |
| Unused code and dependencies | `knip` |
| Security | `npm audit`, OSV-Scanner, `eslint-plugin-security` |
| VS Code | `dbaeumer.vscode-eslint`, `esbenp.prettier-vscode` or `biomejs.biome`, `vitest.explorer`, `ms-playwright.playwright` |

## Python

| Need | Tools |
| :--- | :--- |
| Runtime and version | CPython; `uv python install`, pyenv or mise; `requires-python` in `pyproject.toml` |
| Project and packages | `uv` (lockfile `uv.lock`), or pip with `venv` and hashed requirements; PEP 735 dependency groups for dev tools |
| Format and lint | Ruff (`ruff format`, `ruff check`) |
| Types | mypy (`strict = true`) or Pyright |
| Tests | pytest (or `unittest`), `pytest-cov`, Hypothesis |
| Security | `pip-audit`, Bandit |
| VS Code | `ms-python.python`, `ms-python.vscode-pylance`, `ms-python.debugpy`, `charliermarsh.ruff`, `ms-python.mypy-type-checker`, `tamasfe.even-better-toml` |

## Go

| Need | Tools |
| :--- | :--- |
| Runtime and version | `go` and `toolchain` lines in `go.mod` |
| Format | `gofmt`, `goimports` |
| Lint | `go vet`, `staticcheck`, or `golangci-lint` |
| Tests | `go test -race ./...`, native fuzzing |
| Security | `govulncheck ./...`, `gosec` |
| Debugger | Delve (`dlv`) |
| VS Code | `golang.go` |

## Rust

| Need | Tools |
| :--- | :--- |
| Runtime and version | rustup with `rust-toolchain.toml` |
| Format and lint | `cargo fmt`, `cargo clippy -- -D warnings` |
| Tests | `cargo test` or `cargo nextest run`, `proptest`, `insta` |
| Security | `cargo audit`, `cargo deny check` |
| VS Code | `rust-lang.rust-analyzer`, `vadimcn.vscode-lldb`, `tamasfe.even-better-toml` |

## Java / Kotlin

| Need | Tools |
| :--- | :--- |
| Runtime and version | A current LTS JDK; SDKMAN or mise; Gradle or Maven toolchains |
| Build | Gradle (wrapper `./gradlew`) or Maven (wrapper `./mvnw`) |
| Format and lint | Spotless with google-java-format, ktlint (Kotlin), Checkstyle, Error Prone, SpotBugs |
| Tests | JUnit Jupiter, AssertJ, Mockito, Testcontainers, JaCoCo, PIT |
| Security | OWASP Dependency-Check, OSV-Scanner |
| VS Code | `vscjava.vscode-java-pack` |

## C# / .NET

| Need | Tools |
| :--- | :--- |
| Runtime and version | A current LTS .NET SDK pinned in `global.json` |
| Format and analysis | `dotnet format`; Roslyn analyzers with `<TreatWarningsAsErrors>true</TreatWarningsAsErrors>` and `<Nullable>enable</Nullable>` |
| Tests | `dotnet test` with xUnit, NUnit or MSTest; coverlet for coverage |
| Security | `dotnet list package --vulnerable --include-transitive` |
| VS Code | `ms-dotnettools.csdevkit` |

## C / C++

| Need | Tools |
| :--- | :--- |
| Build and dependencies | CMake with presets; vcpkg or Conan |
| Format and lint | `clang-format`, `clang-tidy` |
| Runtime checks | AddressSanitizer and UndefinedBehaviorSanitizer (`-fsanitize=address,undefined`) in test builds |
| Tests | GoogleTest or Catch2, run with `ctest` |
| VS Code | `llvm-vs-code-extensions.vscode-clangd` or `ms-vscode.cpptools`, `vadimcn.vscode-lldb` |

## PHP

| Need | Tools |
| :--- | :--- |
| Packages | Composer (commit `composer.lock`); `composer audit` for known vulnerabilities |
| Format and lint | PHP-CS-Fixer; static analysis with PHPStan or Psalm |
| Tests | PHPUnit |
| VS Code | `bmewburn.vscode-intelephense-client`, `xdebug.php-debug` |

## Ruby

| Need | Tools |
| :--- | :--- |
| Packages | Bundler (commit `Gemfile.lock`); `bundler-audit` for known vulnerabilities |
| Format and lint | RuboCop |
| Tests | RSpec or Minitest |
| Security (Rails) | Brakeman |
| VS Code | `Shopify.ruby-lsp` |

## Swift and Dart / Flutter

| Need | Tools |
| :--- | :--- |
| Swift | Swift Package Manager, swift-format, SwiftLint, Swift Testing and XCTest; VS Code `swiftlang.swift-vscode` (Xcode for app development) |
| Dart / Flutter | `dart format`, `dart analyze` (or `flutter analyze`), `dart test` / `flutter test`; VS Code `Dart-Code.dart-code`, `Dart-Code.flutter` |
| Mobile specifics | See the [mobile-engineering](../../mobile-engineering/SKILL.md) skill |

## SQL, notebooks and data

| Need | Tools |
| :--- | :--- |
| SQL lint and format | SQLFluff |
| Notebooks | JupyterLab or marimo; `nbstripout` before committing; `nbqa` to run linters on notebooks |
| VS Code | `ms-toolsai.jupyter`, `ms-toolsai.datawrangler`, `mtxr.sqltools`, `ms-ossdata.vscode-pgsql`, `mechatroner.rainbow-csv` |

## Shell and PowerShell scripts

| Need | Tools |
| :--- | :--- |
| Bash / POSIX shell | Start scripts with `set -euo pipefail` (Bash), quote every variable, lint with ShellCheck, format with `shfmt`, test with bats-core |
| PowerShell | PSScriptAnalyzer for linting, Pester for tests; VS Code `ms-vscode.powershell` |

## Infrastructure as code

Terraform or OpenTofu (`fmt`, `validate`, `tflint`), Kubernetes manifests, Helm and Kustomize: see the [cloud-infrastructure](../../cloud-infrastructure/SKILL.md) skill and its tooling reference.
