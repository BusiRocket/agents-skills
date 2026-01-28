# Boundaries Hard Rules

## Goal

Enforce strict boundaries to maintain code quality and agent context.

## Hard Rules

- **One exported symbol per file** (component / hook / function / type).
- **No inline types** outside `types/`.
- **No helpers inside components/hooks**; helpers go to `utils/`.
- **Route handlers must be thin**: validate input, call a `services/` function,
  return a response.

## Examples

```typescript
// ✅ Correct - one export per file
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = ({ invoice }: InvoiceCardProps) => {
  // ...
}
```

```typescript
// ❌ Incorrect - multiple exports
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = ({ invoice }: InvoiceCardProps) => {
  // ...
}

export const InvoiceHeader = ({ invoice }: InvoiceHeaderProps) => {
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
// ✅ Correct - helper in utils/
// utils/invoices/formatInvoiceNumber.ts
export const formatInvoiceNumber = (number: number): string => {
  return `INV-${number}`
}

// components/invoices/InvoiceCard.tsx
import { formatInvoiceNumber } from "utils/invoices/formatInvoiceNumber"
```

```typescript
// ❌ Incorrect - helper in component
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = ({ invoice }: InvoiceCardProps) => {
  const formatInvoiceNumber = (number: number): string => {
    return `INV-${number}`
  }
  // ...
}
```

## Best Practices

- Strictly enforce one export per file
- Never define types outside `types/`
- Extract all helpers to `utils/`
- Keep route handlers minimal
