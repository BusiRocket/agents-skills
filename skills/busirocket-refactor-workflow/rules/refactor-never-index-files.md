# Never Use Index Files

## Goal

Avoid barrel/index files that hide dependencies.

## Rule

- Import from concrete modules only.
- Never use index/barrel files.

## Examples

```typescript
// ❌ Incorrect - barrel file
// components/invoices/index.ts
export { InvoiceCard } from "./InvoiceCard"
export { InvoiceHeader } from "./InvoiceHeader"
export { InvoiceFooter } from "./InvoiceFooter"

// components/invoices/InvoiceList.tsx
import { InvoiceCard, InvoiceHeader, InvoiceFooter } from "./index"
```

```typescript
// ✅ Correct - direct imports
// components/invoices/InvoiceList.tsx
import { InvoiceCard } from "./InvoiceCard"
import { InvoiceHeader } from "./InvoiceHeader"
import { InvoiceFooter } from "./InvoiceFooter"
```

## Best Practices

- Always import from concrete modules
- Never create barrel/index files
- Keep dependencies explicit
