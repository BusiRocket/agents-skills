# Type Anti-Patterns

## Goal

Avoid type patterns that reduce maintainability and agent context quality.

## Type Anti-Patterns

- **Inline types** in components/hooks/utils/services/route handlers.
- **One huge type file** that becomes a dumping ground.

## Examples

```typescript
// ❌ Incorrect - inline type in component
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
// ❌ Incorrect - huge type file
// types/all.ts
export interface Invoice {
  /* ... */
}
export interface User {
  /* ... */
}
export interface Order {
  /* ... */
}
export interface Product {
  /* ... */
}
// ... 50+ more types
```

```typescript
// ✅ Correct - type in dedicated file
// types/invoices/Invoice.ts
export interface Invoice {
  id: string
  amount: number
}

// components/invoices/InvoiceCard.tsx
import type { Invoice } from "types/invoices/Invoice"
```

```typescript
// ✅ Correct - one type per file
// types/invoices/Invoice.ts
export interface Invoice {
  /* ... */
}

// types/users/User.ts
export interface User {
  /* ... */
}

// types/orders/Order.ts
export interface Order {
  /* ... */
}
```

## Best Practices

- Never define types inline in non-type files
- One type per file in `types/`
- Keep type files focused and small
