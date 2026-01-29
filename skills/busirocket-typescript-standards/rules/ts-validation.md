# Validation

## Goal

Ensure code quality through validation checks.

## Validation Rule

After meaningful changes: run the project's standard checks (e.g.
`yarn check:all`).

## Examples

```bash
# ✅ Correct - run checks after changes
yarn check:all
```

```bash
# ❌ Incorrect - skip checks
# Made changes but didn't verify quality
```

## Best Practices

- Always run checks after meaningful changes
- Fix issues before committing
- Use checks as quality gate
