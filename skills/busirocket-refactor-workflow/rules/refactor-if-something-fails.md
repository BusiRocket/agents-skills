# If Something Fails

## Goal

Provide guidance for handling check failures after refactoring.

## If Something Fails

- Type errors: fix types first (do not format/lint until types are clean).
- Lint errors: prefer refactoring into smaller files instead of adding ignores.
- Formatting churn: keep diffs small; avoid unrelated reformatting.

## Examples

```typescript
// ❌ Incorrect - adding ignore for lint error
// components/invoices/InvoiceCard.tsx
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const InvoiceCard = (props: any) => {
  // ...
}
```

```typescript
// ✅ Correct - refactor to fix lint error
// types/invoices/InvoiceCardProps.ts
export interface InvoiceCardProps {
  invoice: Invoice
}

// components/invoices/InvoiceCard.tsx
import type { InvoiceCardProps } from "types/invoices/InvoiceCardProps"

export const InvoiceCard = (props: InvoiceCardProps) => {
  // ...
}
```

```typescript
// ❌ Incorrect - formatting unrelated files
// Made refactor changes but also reformatted entire codebase
```

```typescript
// ✅ Correct - keep diffs focused
// Only changed files related to refactor
```

## Common Issues & Fixes

| Issue               | Fix                                       |
| ------------------- | ----------------------------------------- |
| Type error: `any`   | Use `unknown` and narrow with type guards |
| Unused import       | Remove or use the import                  |
| Missing return type | Add explicit return type annotation       |
| Circular dependency | Move shared types to `types/` folder      |
| File too large      | Split into smaller focused files          |

## Best Practices

- Fix type errors first
- Refactor instead of ignoring lint errors
- Keep diffs small and focused
