# Post Creating and Refactoring Checks

## Golden Path

Run this after every meaningful change:

- Project standard checks (e.g. `yarn check:all`).

## If something fails

- Type errors: fix types first (do not format/lint until types are clean).
- Lint errors: prefer refactoring into smaller files instead of adding ignores.
- Formatting churn: keep diffs small; avoid unrelated reformatting.

## When to Split (fast heuristics)

Split the file immediately if any is true:

- More than one exported symbol.
- More than one responsibility (UI + state + helpers).
- Any helper function exists inside a component/hook.
- Inline `type`/`interface` exists outside `types/`.
- File > ~80 lines and still growing.
