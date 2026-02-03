# File Size Guidelines

## Goal

Keep files small and maintainable.

## Rule

- New and refactored files should stay under ~120 lines; ideally 30–80 lines.
- Split or extract when a file exceeds these targets.

## File Size Table

| File Type | Target Lines | Max Lines |
| --------- | ------------ | --------- |
| Component | 30–60        | 120       |
| Hook      | 30–60        | 100       |
| Utility   | 20–40        | 80        |
| Type file | 10–30        | 50        |
| Constants | 20–50        | 100       |

## Examples

```typescript
// ⚠️ Warning - component file too large (150 lines)
// Consider splitting into smaller components or extracting hook/utils
```

```typescript
// ✅ Correct - component within target (50 lines)
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = () => {
  // ...
}
```

## Best Practices

- Aim for target line counts; treat max as hard limit
- Extract to new files when approaching max
- Prefer many small files over few large ones
