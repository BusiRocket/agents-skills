---
name: busirocket-refactor-workflow
description:
  Strict refactoring workflow for TypeScript/React codebases. Use when
  refactoring files with multiple exports, splitting components/hooks/utils,
  moving inline types to types/, and enforcing post-refactor quality gates.
metadata:
  author: cristiandeluxe
  version: "1.0.0"
---

# Refactor Workflow

Strict, step-by-step refactoring guidance for maintaining code quality.

## When to Use

Use this skill when:

- Refactoring files with multiple exports (use `@file` workflow)
- Splitting components/hooks/utils into smaller files
- Moving inline types to `types/`
- Enforcing post-refactor quality checks

## Non-Negotiables (MUST)

- After any refactor: run the project's standard checks (e.g. `yarn check:all`)
  as a mandatory quality gate.
- If a file has multiple responsibilities, split immediately.
- If a hook/component contains helpers, extract them.
- If a file declares types inline, move them to `types/`.
- Never use index/barrel files; import from concrete modules only.

## @file Refactor Workflow

When referencing `@file` for a one-shot refactor:

- Exactly one exported symbol per file.
- No inline `interface`/`type` declarations in non-type files.
- No helper functions inside components/hooks.

## References (progressive disclosure)

- `references/file-refactor.md`
- `references/refactoring-typescript.md`
- `references/post-refactor-checks.md`
