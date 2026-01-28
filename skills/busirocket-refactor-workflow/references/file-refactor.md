# @file Refactor Workflow (strict)

Use this rule by referencing: `@file`.

## Hard Constraints

- Exactly one exported symbol per file.
- No inline `interface`/`type` declarations in non-type files.
- No helper functions inside components/hooks.

## Mandatory checks after refactor

- Project standard checks (e.g. `yarn check:all`).
