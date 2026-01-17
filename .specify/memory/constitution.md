# MarketSite Constitution
<!-- Example: Spec Constitution, TaskFlow Constitution, etc. -->

## Core Principles

### I. Dynamic App
<!-- Example: I. Library-First -->
Build as a dynamic web application with a backend for data, authentication, and server-side logic.
<!-- Example: Every feature starts as a standalone library; Libraries must be self-contained, independently testable, documented; Clear purpose required - no organizational-only libraries -->

### II. Full-Stack Allowed
<!-- Example: II. CLI Interface -->
The app may use a build step and server runtime as needed for the full-stack architecture.
<!-- Example: Every library exposes functionality via CLI; Text in/out protocol: stdin/args → stdout, errors → stderr; Support JSON + human-readable formats -->

### III. Accessibility Basics
<!-- Example: III. Test-First (NON-NEGOTIABLE) -->
Provide semantic HTML, keyboard navigation, and visible focus states.
<!-- Example: TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced -->

### IV. Performance Basics
<!-- Example: IV. Integration Testing -->
Keep assets lightweight; avoid unnecessary libraries and large images. Ensure reasonable API response times.
<!-- Example: Focus areas requiring integration tests: New library contract tests, Contract changes, Inter-service communication, Shared schemas -->

### V. Simplicity
<!-- Example: V. Observability, VI. Versioning & Breaking Changes, VII. Simplicity -->
Prefer simple, readable code and minimal dependencies.
<!-- Example: Text I/O ensures debuggability; Structured logging required; Or: MAJOR.MINOR.BUILD format; Or: Start simple, YAGNI principles -->

## Technology Constraints
<!-- Example: Additional Constraints, Security Requirements, Performance Standards, etc. -->

JavaScript/Node.js backend with PostgreSQL for persistence. Frontend can use plain HTML/CSS/JS. Third-party text/images must comply with source licenses and include visible attribution; store source URL and license metadata per asset.
<!-- Example: Technology stack requirements, compliance standards, deployment policies, etc. -->

## Quality Gates
<!-- Example: Development Workflow, Review Process, Quality Gates, etc. -->

Pages must render correctly in modern evergreen browsers, be responsive on mobile, pass basic auth/authorization checks, and include required attribution for third-party content.
<!-- Example: Code review requirements, testing gates, deployment approval process, etc. -->

## Governance
<!-- Example: Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->

All changes must adhere to these principles. Amendments require updating this document with rationale.
<!-- Example: All PRs/reviews must verify compliance; Complexity must be justified; Use [GUIDANCE_FILE] for runtime development guidance -->

**Version**: 1.0.0 | **Ratified**: 2026-01-16 | **Last Amended**: 2026-01-16
<!-- Example: Version: 2.1.1 | Ratified: 2025-06-13 | Last Amended: 2025-07-16 -->
