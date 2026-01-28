# Refactoring TypeScript/React Code (strict)

## Goals

- Many small files, each with a single responsibility.
- Enforce one exported symbol per file.
- Move all types to `types/` (one type per file).
- Move all helpers to `utils/` (one function per file).

## Decision Rules

- If a file contains multiple responsibilities, split immediately.
- If a hook/component contains helpers, extract them.
- If a file declares types inline, move them to `types/`.

## Never Use Index Files

- Import from concrete modules only.

## Post-Refactor Checks (MANDATORY)

- Project standard checks (e.g. `yarn check:all`).
