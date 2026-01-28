# Export Conventions

## Goal

Establish consistent export patterns across the codebase.

## Export Rules

- Next.js route components (`app/**/page.tsx`, `layout.tsx`): **default export**
  (required by conventions).
- Reusable components/hooks/utils/services/types: **single export per file**.

## Examples

```typescript
// ✅ Correct - Next.js page default export
// app/invoices/page.tsx
export default function InvoicesPage() {
  return <div>Invoices</div>;
}

export const metadata = {
  title: "Invoices",
};
```

```typescript
// ✅ Correct - reusable component named export
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = ({ invoice }: InvoiceCardProps) => {
  return <div>{invoice.id}</div>;
};
```

```typescript
// ✅ Correct - hook named export
// hooks/invoices/useInvoice.ts
export const useInvoice = (id: string) => {
  // ...
}
```

```typescript
// ✅ Correct - utility function named export
// utils/invoices/formatInvoiceNumber.ts
export const formatInvoiceNumber = (number: number): string => {
  return `INV-${number}`
}
```

```typescript
// ✅ Correct - type named export
// types/invoices/Invoice.ts
export interface Invoice {
  id: string
  amount: number
}
```

## Best Practices

- Use default exports only for Next.js special files
- Use named exports for all reusable code
- One export per file (except Next.js exceptions)
