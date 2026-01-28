# Post-Refactor Checks (MANDATORY)

## Goal

Ensure code quality after refactoring.

## Post-Refactor Checks (MANDATORY)

- Project standard checks (e.g. `yarn check:all`).

## Examples

```bash
# ✅ Correct - run checks after refactor
yarn check:all
```

```bash
# ❌ Incorrect - skipping checks
# Refactored but didn't verify quality
```

## Best Practices

- Always run checks after refactoring
- Fix issues before committing
- Use checks as mandatory quality gate
