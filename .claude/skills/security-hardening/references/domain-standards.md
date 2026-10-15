# Security standards by domain

Which standard to use as the checklist for each kind of system. Versions and names checked against the official pages on 2026-10-15.

| Domain | Primary reference | Where it is applied in this spec |
| :--- | :--- | :--- |
| Web applications | [OWASP Top 10:2025](https://top10.owasp.org/2025), [OWASP ASVS 5.0](https://owasp.org/www-project-application-security-verification-standard/) | [rigorous-code-audit](../../rigorous-code-audit/SKILL.md), [web-frontend-engineering](../../web-frontend-engineering/SKILL.md) |
| APIs | [OWASP API Security Top 10 2023](https://api-security.owasp.org/editions/2023/en/0x11-t10) | [backend-engineering](../../backend-engineering/SKILL.md) |
| Mobile apps | [OWASP MASVS](https://mas.owasp.org/MASVS/) (8 control groups) with the MASTG for testing | [mobile-engineering](../../mobile-engineering/SKILL.md) |
| LLM applications | [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/llm-top-10/) | [llm-applications](../../llm-applications/SKILL.md), [rag-systems](../../rag-systems/SKILL.md) |
| AI agents | [OWASP Top 10 for Agentic Applications for 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/); [MCP security best practices](https://modelcontextprotocol.io/specification/2026-07-28/basic/security_best_practices) | [ai-agent-systems](../../ai-agent-systems/SKILL.md) |
| AI risk management | NIST AI RMF ([NIST AI 100-1](https://www.nist.gov/itl/ai-risk-management-framework), January 2023) and its Generative AI Profile (NIST AI 600-1, July 2024) | [machine-learning](../../machine-learning/SKILL.md), [llm-applications](../../llm-applications/SKILL.md) |
| Software supply chain | [SLSA](https://slsa.dev/spec/) (version 1.2), SBOMs (CycloneDX or SPDX), signed artefacts (Sigstore) | [ci-cd-pipeline](../../ci-cd-pipeline/SKILL.md) |
| Cloud and Kubernetes | Provider well-architected security pillars, CIS Benchmarks, Kubernetes Pod Security Standards | [cloud-infrastructure](../../cloud-infrastructure/SKILL.md) |
| Errors and edge cases | OWASP A10:2025 Mishandling of Exceptional Conditions | [05-error-handling](../../../rules/05-error-handling.md) |
| API integrations and OAuth | RFC 9700 (OAuth 2.0 security BCP, 2025); FAPI 2.0 Security Profile (Final, February 2025) for high-security APIs such as banking | [api-integration](../../api-integration/SKILL.md) and its [sector standards](../../api-integration/references/sector-standards.md) |
| Payments | PCI DSS v4.0.1 | [api-integration sector standards](../../api-integration/references/sector-standards.md) |
| Organization-wide IT security | CIS Critical Security Controls v8.1, NIST CSF 2.0, ISO/IEC 27001 | [it-operations](../../it-operations/SKILL.md) |

## Regulation and privacy (pointers, not legal advice)

Whether a law applies depends on the jurisdiction, the data and the use case: involve the organization's legal or compliance owners. Common ones engineers meet:

- Personal data: the EU GDPR (Regulation (EU) 2016/679) and similar national laws: lawful basis, data minimization, retention limits, data-subject rights (access, deletion), breach notification, privacy by design.
- AI systems: the EU AI Act (Regulation (EU) 2024/1689), with obligations that depend on the system's risk category.
- Payments: PCI DSS for systems that store, process or transmit card data; prefer a payment provider's hosted fields or tokenization to keep card data out of scope.
- Health, finance and public-sector data often carry sector-specific rules.

Engineering defaults that help under all of them: collect less, encrypt everywhere, restrict and log access, define retention and deletion, and keep an inventory of where personal data lives.
