# Golden Path for Post-Refactor Checks

## Goal

Establish the golden path for post-refactor quality checks.

## Golden Path

Run this after every meaningful change:

- Project standard checks (e.g. `yarn check:all` or
  `yarn type-check && yarn format && yarn lint`).

## Examples

```bash
# ✅ Correct - follow golden path
# 1. Make refactor changes
# 2. Run checks
yarn check:all
# 3. Fix any issues
# 4. Commit
```

```bash
# ❌ Incorrect - skip checks
# 1. Make refactor changes
# 2. Commit immediately (skipped checks!)
```

## Best Practices

- Always run checks after meaningful changes
- Fix issues before committing
- Make checks part of your workflow
