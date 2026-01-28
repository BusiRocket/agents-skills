# Mandatory Checks After Refactor

## Goal

Ensure code quality after refactoring.

## Mandatory Checks

- Project standard checks (e.g. `yarn check:all`).

## Examples

```bash
# ✅ Correct - run checks after refactor
yarn check:all
```

```bash
# ❌ Incorrect - skipping checks
# Refactored code but didn't run checks
```

## Best Practices

- Always run project checks after refactoring
- Fix any issues before committing
- Use checks as quality gate
