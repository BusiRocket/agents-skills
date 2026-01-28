# Zod Schemas (Complex Validation)

## Goal

Use Zod for complex validation schemas, especially for API responses and
external data.

## When to Use Zod

- Validating API responses
- Validating external data at boundaries
- Complex nested structures
- When you need detailed error messages

## Pattern: Use `.safeParse()`

Always use `.safeParse()` for API responses to handle errors gracefully:

```typescript
// ✅ Correct
import { InvoiceSchema } from "types/invoices/InvoiceSchema"

const result = InvoiceSchema.safeParse(data)
if (!result.success) {
  // Handle validation errors
  return { error: result.error.format() }
}
return { data: result.data }
```

```typescript
// ❌ Incorrect - throws on invalid data
const invoice = InvoiceSchema.parse(data) // Can throw
```

## Schema Definition

Define schemas alongside types:

```typescript
// types/invoices/InvoiceSchema.ts
import { z } from "zod"

export const InvoiceSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
  amount: z.number().positive(),
  createdAt: z.string().datetime(),
  status: z.enum(["pending", "paid", "cancelled"]),
})
```

## Best Practices

- Use `.safeParse()` instead of `.parse()` to avoid throwing
- Define schemas in `types/<area>/` directories
- Use descriptive schema names ending in `Schema`
- Prefer `z.infer` for TypeScript types (see `validation-zod-types.md`)
