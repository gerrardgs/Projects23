---
name: mobile-engineering
description: Build, test, secure and release mobile apps for Android and iOS - native (Kotlin with Jetpack Compose, Swift with SwiftUI) or cross-platform (Flutter, React Native, Expo) - covering architecture, offline behaviour, permissions, performance, accessibility, OWASP MASVS security, and app store release. Use when creating or changing a mobile app, fixing mobile crashes or performance problems, handling device permissions or storage, or preparing a store release.
license: MIT
metadata:
  version: "1.0.0"
---

# Mobile Engineering

Facts checked on 2026-10-15. Store policies change often: confirm current requirements (minimum target SDK, privacy declarations, review guidelines) in the official Google Play and Apple developer documentation before every release.

## 1. Fit the existing app

Identify platform and stack, minimum supported OS versions, architecture pattern (for example MVVM or unidirectional data flow), dependency injection, navigation, networking and persistence libraries, and the build system (Gradle, Xcode, Flutter, Metro/Expo). Follow them.

| Stack | Language and UI | Lint and format | Tests |
| :--- | :--- | :--- | :--- |
| Android native | Kotlin, Jetpack Compose | Android Lint, ktlint, detekt | JUnit, Compose UI tests, Espresso |
| iOS native | Swift, SwiftUI | SwiftLint, swift-format | Swift Testing, XCTest, XCUITest |
| Flutter | Dart | `dart format`, `dart analyze` / `flutter analyze` | `flutter test`, integration tests |
| React Native / Expo | TypeScript | ESLint, Prettier | Jest, React Native Testing Library, end-to-end tools such as Detox or Maestro |

VS Code extension IDs (checked on the Marketplace): `Dart-Code.flutter`, `Dart-Code.dart-code`, `swiftlang.swift-vscode`. Android Studio and Xcode remain the primary IDEs for native work.

## 2. Architecture and behaviour

- Keep business logic out of UI code, in testable classes or functions.
- Design for unreliable networks: timeouts, retries with backoff for idempotent requests, offline caching where users expect it, and clear error and retry states.
- Handle the app lifecycle: process death, backgrounding, configuration changes and state restoration.
- Never block the main thread with I/O or heavy computation.
- Request permissions only when needed, explain why, and handle denial gracefully.

## 3. Security (OWASP MASVS)

Use the [OWASP MASVS](https://mas.owasp.org/MASVS/) control groups as the checklist, and the MASTG for test procedures:

- **MASVS-STORAGE**: secrets and tokens in the Android Keystore or the iOS Keychain, never in plain preferences, logs or backups.
- **MASVS-CRYPTO**: platform cryptography APIs; no hard-coded keys.
- **MASVS-AUTH**: authentication and authorization enforced by the backend; biometrics only to unlock locally stored credentials.
- **MASVS-NETWORK**: TLS only; no disabled certificate validation; certificate pinning only with a rotation plan.
- **MASVS-PLATFORM**: validate deep links and intents; minimal exported components; safe WebView configuration.
- **MASVS-CODE**: up-to-date dependencies; input validation; no debug code in release builds.
- **MASVS-RESILIENCE**: obfuscation and tamper detection where the threat model requires it.
- **MASVS-PRIVACY**: data minimization and accurate store privacy declarations.

API keys shipped in an app are public. Anything secret stays on the server.

## 4. Performance and quality

- Measure startup time, frame rendering (jank), memory and battery with the platform profilers (Android Studio profilers, Xcode Instruments, Flutter DevTools).
- Lists use lazy or recycled rendering; images are sized and cached.
- Accessibility: content descriptions or labels, dynamic type and font scaling, sufficient contrast, touch targets of at least 24 by 24 CSS pixels or the platform's larger guidance, 44 by 44 for primary controls ([anti-slop interfaces reference](../anti-slop/references/interfaces.md)), and tests with TalkBack and VoiceOver.
- Crash and error reporting in release builds, without collecting personal data beyond policy.

## 5. Release

- Version code and version name (Android) or build and marketing version (iOS) incremented on every release.
- Signing keys and store credentials kept in the CI secret store; never in the repository.
- Staged rollouts (Google Play) or phased releases (App Store) with crash-rate monitoring and a halt plan.
- Backward-compatible APIs: old app versions stay in use for a long time, so the backend must support them or force an update deliberately.

## Done when

- [ ] Unit and UI tests pass on the minimum and latest supported OS versions
- [ ] No secrets in the app bundle; MASVS items relevant to the change checked
- [ ] Offline, slow-network, permission-denied and process-death cases handled
- [ ] Accessibility checked with the platform screen reader
- [ ] Store requirements for this release confirmed in the official documentation
