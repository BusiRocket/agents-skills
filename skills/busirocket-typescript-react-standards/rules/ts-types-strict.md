# Types (STRICT)

## Goal

Enforce strict type discipline.

## Rule

- **No inline `interface`/`type` declarations** in components, hooks, utils,
  services, or route handlers.
- Put types in `types/<area>/...` as dedicated files.
- One type per file.

## Examples

```typescript
// ❌ Incorrect - inline type in component
// components/invoices/InvoiceCard.tsx
interface InvoiceCardProps {
  invoice: Invoice
}

export const InvoiceCard = ({ invoice }: InvoiceCardProps) => {
  // ...
}
```

```typescript
// ✅ Correct - type in types/
// types/invoices/InvoiceCardProps.ts
export interface InvoiceCardProps {
  invoice: Invoice
}

// components/invoices/InvoiceCard.tsx
import type { InvoiceCardProps } from "types/invoices/InvoiceCardProps"
```

```typescript
// ❌ Incorrect - inline type in hook
// hooks/invoices/useInvoice.ts
interface UseInvoiceReturn {
  invoice: Invoice | null
  isLoading: boolean
}

export const useInvoice = (): UseInvoiceReturn => {
  // ...
}
```

```typescript
// ✅ Correct - type in types/
// types/invoices/UseInvoiceReturn.ts
export interface UseInvoiceReturn {
  invoice: Invoice | null
  isLoading: boolean
}

// hooks/invoices/useInvoice.ts
import type { UseInvoiceReturn } from "types/invoices/UseInvoiceReturn"
```

## Best Practices

- Never define types inline in non-type files
- Put all types in `types/<area>/`
- One type per file
