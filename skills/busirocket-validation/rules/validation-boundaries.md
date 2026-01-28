# Validation Boundaries

## Goal

Make it clear where validation code belongs in the codebase structure.

## Where Validation Lives

- **Services**: validate API responses (or external data) with Zod schemas.
- **Utils**: keep small coercion/guard helpers under `utils/validation/`.
- **Types**: Zod schemas can live alongside types in `types/<area>/`.

## Examples

### Services (API/External Data)

```typescript
// services/invoices/getInvoice.ts
import { InvoiceSchema } from "types/invoices/InvoiceSchema"

export const getInvoice = async (id: string) => {
  const response = await fetch(`/api/invoices/${id}`)
  const data = await response.json()

  const result = InvoiceSchema.safeParse(data)
  if (!result.success) {
    throw new Error("Invalid invoice data")
  }

  return result.data
}
```

### Utils (Simple Guards)

```typescript
// utils/validation/isNonEmptyString.ts
export const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === "string" && value.trim().length > 0
}
```

### Types (Zod Schemas)

```typescript
// types/invoices/InvoiceSchema.ts
import { z } from "zod"

export const InvoiceSchema = z.object({
  id: z.string().uuid(),
  amount: z.number().positive(),
  createdAt: z.string().datetime(),
})

export type Invoice = z.infer<typeof InvoiceSchema>
```

## Rules

- Services handle external data validation with Zod
- Utils contain pure guard functions (one per file)
- Types can include Zod schemas alongside TypeScript types
