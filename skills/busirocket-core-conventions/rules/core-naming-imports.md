# Import Conventions

## Goal

Establish consistent import patterns for maintainability.

## Import Rules

- No barrel/index files.
- Prefer relative imports within a domain folder; use aliases only when they
  reduce churn.

## Examples

```typescript
// ✅ Correct - relative import within domain
// components/invoices/InvoiceCard.tsx
import { InvoiceHeader } from "./InvoiceHeader"
import type { Invoice } from "../../types/invoices/Invoice"
```

```typescript
// ✅ Correct - alias when it reduces churn
// components/invoices/InvoiceCard.tsx
import type { Invoice } from "@/types/invoices/Invoice"
import { formatInvoiceNumber } from "@/utils/invoices/formatInvoiceNumber"
```

```typescript
// ❌ Incorrect - barrel file import
// components/invoices/InvoiceCard.tsx
import { InvoiceHeader, InvoiceFooter } from "./index" // Don't use barrel files
```

```typescript
// ❌ Incorrect - barrel file
// components/invoices/index.ts
export { InvoiceCard } from "./InvoiceCard"
export { InvoiceHeader } from "./InvoiceHeader"
```

## Best Practices

- Avoid barrel/index files that hide dependencies
- Use relative imports within the same domain
- Use aliases sparingly, only when they significantly reduce churn
