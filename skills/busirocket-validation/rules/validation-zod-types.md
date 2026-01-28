# Inferring Types from Zod Schemas

## Goal

Avoid duplicating type definitions by inferring TypeScript types from Zod
schemas.

## Pattern: Use `z.infer`

Always infer types from Zod schemas rather than defining them separately:

```typescript
// ✅ Correct - infer type from schema
import { z } from "zod"

export const InvoiceSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
  createdAt: z.string().datetime(),
})

export type Invoice = z.infer<typeof InvoiceSchema>
```

```typescript
// ❌ Incorrect - duplicating type definition
export const InvoiceSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
})

export interface Invoice {
  id: string
  name: string
} // Duplicates schema definition
```

## Usage

Import and use the inferred type:

```typescript
import { InvoiceSchema, type Invoice } from "types/invoices/InvoiceSchema"

const result = InvoiceSchema.safeParse(data)
if (result.success) {
  const invoice: Invoice = result.data // Type-safe
}
```

## Best Practices

- Always use `z.infer<typeof Schema>` for types
- Export both schema and type from the same file
- Avoid manually defining types that match Zod schemas
