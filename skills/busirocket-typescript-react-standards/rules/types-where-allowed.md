# Where Types Are Allowed

## Goal

Establish where types can be defined.

## Rule

- Types must live in `types/<area>/...`.
- Do not declare inline types/interfaces in
  components/hooks/utils/services/route handlers.

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
// ❌ Incorrect - inline type in hook
// hooks/invoices/useInvoice.ts
interface UseInvoiceReturn {
  invoice: Invoice | null
}

export const useInvoice = (): UseInvoiceReturn => {
  // ...
}
```

```typescript
// ❌ Incorrect - inline type in service
// services/invoices/createInvoice.ts
interface CreateInvoiceInput {
  amount: number
}

export const createInvoice = async (input: CreateInvoiceInput) => {
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

## Best Practices

- All types must live in `types/`
- Never define types inline in non-type files
- Keep type definitions centralized
