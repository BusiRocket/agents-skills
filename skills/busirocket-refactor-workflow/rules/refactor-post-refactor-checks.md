# Post-Refactor Checks (MANDATORY)

## Goal

Ensure code quality after refactoring.

## Post-Refactor Checks (MANDATORY)

- Run project checks after every edit (e.g. `yarn check:all` or
  `yarn type-check && yarn format && yarn lint`).
- Fix all warnings and errors before proceeding; iterate until clean.

## Checklist After Refactoring

- [ ] All type errors resolved
- [ ] All lint errors resolved
- [ ] No unused imports
- [ ] No circular dependencies
- [ ] File size under 120 lines (ideally 30–80)
- [ ] One function/type/hook/component per file
- [ ] Types moved to `types/<area>/`
- [ ] No index/barrel files created

## Examples

```bash
# ✅ Correct - run checks after refactor
yarn check:all
# or
yarn type-check && yarn format && yarn lint
```

```bash
# ❌ Incorrect - skipping checks
# Refactored but didn't verify quality
```

## Best Practices

- Always run checks after refactoring
- Fix issues before committing
- Use checks as mandatory quality gate
