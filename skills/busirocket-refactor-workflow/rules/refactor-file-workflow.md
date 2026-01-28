# @file Refactor Workflow (strict)

## Goal

Use this rule by referencing: `@file`.

## Hard Constraints

- Exactly one exported symbol per file.
- No inline `interface`/`type` declarations in non-type files.
- No helper functions inside components/hooks.

## Examples

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

```typescript
// ✅ Correct - one export per file
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = () => {
  /* ... */
}

// components/invoices/InvoiceHeader.tsx
export const InvoiceHeader = () => {
  /* ... */
}
```

```typescript
// ❌ Incorrect - inline type
// components/invoices/InvoiceCard.tsx
interface Invoice {
  id: string
  amount: number
}

export const InvoiceCard = ({ invoice }: { invoice: Invoice }) => {
  // ...
}
```

```typescript
// ✅ Correct - type in types/
// types/invoices/Invoice.ts
export interface Invoice {
  id: string
  amount: number
}

// components/invoices/InvoiceCard.tsx
import type { Invoice } from "types/invoices/Invoice"
```

## Best Practices

- Strictly enforce one export per file
- Move all types to `types/`
- Extract all helpers to `utils/`
