# Refactoring Goals

## Goal

Establish goals for refactoring TypeScript/React code.

## Goals

- Many small files, each with a single responsibility.
- Enforce one exported symbol per file.
- Move all types to `types/` (one type per file).
- Move all helpers to `utils/` (one function per file).

## Examples

```typescript
// ✅ Correct - many small files
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = () => {
  /* ... */
}

// components/invoices/InvoiceHeader.tsx
export const InvoiceHeader = () => {
  /* ... */
}

// types/invoices/Invoice.ts
export interface Invoice {
  /* ... */
}

// utils/invoices/formatAmount.ts
export const formatAmount = () => {
  /* ... */
}
```

```typescript
// ❌ Incorrect - one large file
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = () => {
  /* ... */
}
export const InvoiceHeader = () => {
  /* ... */
}

interface Invoice {
  /* ... */
}

const formatAmount = () => {
  /* ... */
}
```

## Best Practices

- Split files into many small, focused files
- One export per file
- Separate types and helpers
