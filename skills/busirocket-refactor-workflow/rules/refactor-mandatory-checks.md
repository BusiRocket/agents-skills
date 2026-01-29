# Mandatory Checks After Refactor

## Goal

Ensure code quality after refactoring.

## Mandatory Checks

- After every edit, run project checks (e.g. `yarn check:all` or
  `yarn type-check && yarn format && yarn lint`).
- Fix all warnings and errors before proceeding.

## Examples

```bash
# ✅ Correct - run checks after refactor
yarn check:all
# or
yarn type-check && yarn format && yarn lint
```

```bash
# ❌ Incorrect - skipping checks
# Refactored code but didn't run checks
```

## Best Practices

- Always run project checks after refactoring
- Fix any issues before committing
- Use checks as quality gate
