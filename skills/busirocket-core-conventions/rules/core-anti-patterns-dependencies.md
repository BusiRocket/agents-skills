# Dependency Anti-Patterns

## Goal

Avoid adding unnecessary dependencies that increase bundle size and maintenance
burden.

## Dependency Anti-Pattern

- Adding libraries for trivial helpers (date formatting, string utils) without
  explicit approval.

## Examples

```typescript
// ❌ Incorrect - library for trivial helper
// package.json
{
  "dependencies": {
    "date-fns": "^2.30.0" // Just for formatDate
  }
}

// utils/dates/formatDate.ts
import { format } from "date-fns";
export const formatDate = (date: Date) => format(date, "yyyy-MM-dd");
```

```typescript
// ✅ Correct - simple native implementation
// utils/dates/formatDate.ts
export const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0]
}
```

```typescript
// ❌ Incorrect - library for string utils
// package.json
{
  "dependencies": {
    "lodash": "^4.17.21" // Just for string utilities
  }
}

// utils/strings/capitalize.ts
import { capitalize } from "lodash";
export { capitalize };
```

```typescript
// ✅ Correct - simple native implementation
// utils/strings/capitalize.ts
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
```

## Best Practices

- Prefer native implementations for trivial helpers
- Get explicit approval before adding dependencies
- Consider bundle size impact
