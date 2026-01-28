# When to Split (Fast Heuristics)

## Goal

Provide fast heuristics for when to split files.

## When to Split

Split the file immediately if any is true:

- More than one exported symbol.
- More than one responsibility (UI + state + helpers).
- Any helper function exists inside a component/hook.
- Inline `type`/`interface` exists outside `types/`.
- File > ~80 lines and still growing.

## Examples

```typescript
// ❌ Incorrect - multiple exports
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = () => {
  /* ... */
}
export const InvoiceHeader = () => {
  /* ... */
} // Split!
```

```typescript
// ❌ Incorrect - multiple responsibilities
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = () => {
  // UI logic
  // State management
  // Data fetching
  // Formatting
} // Split!
```

```typescript
// ❌ Incorrect - helper in component
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = () => {
  const formatAmount = () => {
    /* ... */
  } // Extract!
  // ...
}
```

```typescript
// ❌ Incorrect - inline type
// components/invoices/InvoiceCard.tsx
interface Invoice {
  /* ... */
} // Move to types/!
export const InvoiceCard = () => {
  /* ... */
}
```

```typescript
// ⚠️ Warning - file getting large
// components/invoices/InvoiceCard.tsx (85 lines and growing)
// Consider splitting if it continues to grow
```

## Best Practices

- Split immediately when criteria are met
- Don't wait for files to become unmanageable
- Use heuristics as quick decision tools
