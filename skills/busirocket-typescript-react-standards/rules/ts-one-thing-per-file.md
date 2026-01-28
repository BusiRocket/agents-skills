# One Thing Per File (STRICT)

## Goal

Enforce strict one-thing-per-file discipline.

## Rule

- **Exactly one exported symbol per file** for your own modules:
  - `.tsx`: one exported React component.
  - `.ts` (utils/services): one exported function.
  - `.ts` (types): one exported `interface` or `type`.

## Examples

```typescript
// ✅ Correct - one component per file
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = () => {
  /* ... */
}
```

```typescript
// ✅ Correct - one function per file
// utils/invoices/formatAmount.ts
export const formatAmount = (amount: number): string => {
  return `$${amount.toFixed(2)}`
}
```

```typescript
// ✅ Correct - one type per file
// types/invoices/Invoice.ts
export interface Invoice {
  id: string
  amount: number
}
```

```typescript
// ❌ Incorrect - multiple exports
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = () => {
  /* ... */
}
export const InvoiceHeader = () => {
  /* ... */
} // Not allowed!
```

## Best Practices

- Strictly enforce one export per file
- Keep files focused and single-purpose
