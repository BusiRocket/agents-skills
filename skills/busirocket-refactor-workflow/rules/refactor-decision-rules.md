# Decision Rules for Refactoring

## Goal

Provide clear decision rules for when to split files.

## Decision Rules

- If a file contains multiple responsibilities, split immediately.
- If a hook/component contains helpers, extract them.
- If a file declares types inline, move them to `types/`.

## Examples

```typescript
// ❌ Incorrect - multiple responsibilities
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = () => {
  // UI logic
  // State management
  // Data fetching
  // Formatting helpers
}
```

```typescript
// ✅ Correct - split responsibilities
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = () => {
  // UI logic only
}

// hooks/invoices/useInvoice.ts
export const useInvoice = () => {
  // State management
}

// services/invoices/getInvoice.ts
export const getInvoice = () => {
  // Data fetching
}

// utils/invoices/formatAmount.ts
export const formatAmount = () => {
  // Formatting
}
```

```typescript
// ❌ Incorrect - helpers in component
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = () => {
  const formatAmount = (amount: number): string => {
    return `$${amount.toFixed(2)}`
  }
  // ...
}
```

```typescript
// ✅ Correct - helper extracted
// utils/invoices/formatAmount.ts
export const formatAmount = (amount: number): string => {
  return `$${amount.toFixed(2)}`
}

// components/invoices/InvoiceCard.tsx
import { formatAmount } from "utils/invoices/formatAmount"
```

## Props and Data Flow

- Pass full props into components; handle logic inside the component rather than
  passing pre-computed data from the parent.

## Best Practices

- Split files with multiple responsibilities immediately
- Extract helpers from components/hooks
- Move inline types to `types/`
