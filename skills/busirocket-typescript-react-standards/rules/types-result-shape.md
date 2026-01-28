# Result Shape

## Goal

Establish consistent result shapes for boundaries that can fail.

## Result Shape (recommended)

For boundaries that can fail (services), prefer a typed result object instead of
throwing for expected failures:

- `type XxxResult = { ok: true; value: T } | { ok: false; error: XxxError }`

## Examples

```typescript
// ✅ Correct - result object
// types/invoices/CreateInvoiceResult.ts
export interface CreateInvoiceError {
  code: "VALIDATION_ERROR" | "CUSTOMER_NOT_FOUND"
  message: string
}

export type CreateInvoiceResult =
  | { ok: true; value: Invoice }
  | { ok: false; error: CreateInvoiceError }
```

```typescript
// ✅ Correct - using result object
// services/invoices/createInvoice.ts
import type { CreateInvoiceResult } from "types/invoices/CreateInvoiceResult"

export const createInvoice = async (
  input: CreateInvoiceInput
): Promise<CreateInvoiceResult> => {
  try {
    const invoice = await db.invoices.create(input)
    return { ok: true, value: invoice }
  } catch (error) {
    return {
      ok: false,
      error: { code: "CREATE_FAILED", message: error.message },
    }
  }
}
```

```typescript
// ❌ Incorrect - throwing for expected failure
// services/invoices/createInvoice.ts
export const createInvoice = async (
  input: CreateInvoiceInput
): Promise<Invoice> => {
  const invoice = await db.invoices.create(input)
  if (!invoice) {
    throw new Error("Failed to create invoice") // Should return result object
  }
  return invoice
}
```

## Best Practices

- Use result objects for expected failures
- Avoid throwing for expected errors
- Keep error shapes typed and explicit
