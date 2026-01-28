# Guard Helpers (Simple Runtime Checks)

## Goal

Create small, focused guard functions for simple runtime type checks.

## Pattern: Type Predicates

Use TypeScript type predicates (`value is T`) for type guards:

```typescript
// ✅ Correct - type predicate
export const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === "string" && value.trim().length > 0
}

// Usage
const value: unknown = getUserInput()
if (isNonEmptyString(value)) {
  // value is now typed as string
  console.log(value.toUpperCase())
}
```

```typescript
// ❌ Incorrect - no type narrowing
export const isNonEmptyString = (value: unknown): boolean => {
  return typeof value === "string" && value.trim().length > 0
}

// Usage - value is still unknown
if (isNonEmptyString(value)) {
  console.log(value.toUpperCase()) // ❌ Type error
}
```

## File Structure

One guard per file:

```typescript
// utils/validation/isNonEmptyString.ts
export const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === "string" && value.trim().length > 0
}
```

```typescript
// utils/validation/isRecord.ts
export const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}
```

## Best Practices

- Use type predicates (`value is T`) where possible
- One guard function per file
- Prefer guards over type casting (`as`)
- Keep guards pure (no side effects)
- Place guards in `utils/validation/`
