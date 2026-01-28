# Recommended Guard Helpers

## Goal

Common guard helpers that should be available in `utils/validation/`.

## Standard Guards

### `isRecord.ts`

Check if value is a plain object (Record):

```typescript
// utils/validation/isRecord.ts
export const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}
```

### `isNonEmptyString.ts`

Check if value is a non-empty string:

```typescript
// utils/validation/isNonEmptyString.ts
export const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === "string" && value.trim().length > 0
}
```

### `coerceNumber.ts`

Safely coerce value to number:

```typescript
// utils/validation/coerceNumber.ts
export const coerceNumber = (value: unknown): number | null => {
  if (typeof value === "number" && !isNaN(value)) {
    return value
  }
  if (typeof value === "string") {
    const parsed = Number(value)
    return isNaN(parsed) ? null : parsed
  }
  return null
}
```

## Usage Pattern

```typescript
import { isRecord } from "utils/validation/isRecord"
import { isNonEmptyString } from "utils/validation/isNonEmptyString"

const value: unknown = getInput()

if (isRecord(value) && isNonEmptyString(value.name)) {
  // value is Record<string, unknown>
  // value.name is string
  console.log(value.name.toUpperCase())
}
```

## When to Create New Guards

Create new guard helpers when:

- You need the same type check in multiple places
- The check is non-trivial (more than a simple `typeof`)
- You want type narrowing (use type predicates)

Keep guards simple and focused on one type check.
