# Helpers (STRICT)

## Goal

Enforce strict helper discipline.

## Rule

- Do not keep helper functions inside components/hooks.
- If a helper is needed, extract it to `utils/<area>/SomeHelper.ts` (one
  function per file).

## Examples

```typescript
// ❌ Incorrect - helper in component
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = ({ invoice }: InvoiceCardProps) => {
  const formatAmount = (amount: number): string => {
    return `$${amount.toFixed(2)}`;
  };

  return <div>{formatAmount(invoice.amount)}</div>;
}
```

```typescript
// ✅ Correct - helper extracted
// utils/invoices/formatAmount.ts
export const formatAmount = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

// components/invoices/InvoiceCard.tsx
import { formatAmount } from "utils/invoices/formatAmount";

export const InvoiceCard = ({ invoice }: InvoiceCardProps) => {
  return <div>{formatAmount(invoice.amount)}</div>;
}
```

```typescript
// ❌ Incorrect - helper in hook
// hooks/invoices/useInvoice.ts
export const useInvoice = (id: string) => {
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

// hooks/invoices/useInvoice.ts
import { formatAmount } from "utils/invoices/formatAmount"
```

## Coercion for dynamic inputs

- For inputs that may be `string | string[] | unknown`, use a coercion helper
  instead of casting (e.g. `coerceFirstString(val: unknown): string | null`).

## Best Practices

- Extract all helpers to `utils/`
- One helper function per file
- Never keep helpers in components/hooks
