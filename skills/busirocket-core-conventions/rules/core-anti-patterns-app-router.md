# App Router Anti-Patterns

## Goal

Avoid App Router patterns that reduce maintainability and security.

## App Router Anti-Patterns

- **Fat route handlers** that contain business logic.
- Returning unvalidated input; always validate and return explicit responses.

## Examples

```typescript
// ❌ Incorrect - fat route handler
// app/api/invoices/route.ts
export async function POST(request: Request) {
  const body = await request.json()

  // Business logic should be in services/
  const invoice = {
    id: generateId(),
    amount: calculateTax(body.amount),
    createdAt: new Date(),
  }

  // DB access should be in services/
  await db.invoices.insert(invoice)

  return Response.json({ data: invoice })
}
```

```typescript
// ❌ Incorrect - unvalidated input
// app/api/invoices/route.ts
export async function POST(request: Request) {
  const body = await request.json()
  // No validation - dangerous!
  return Response.json({ data: body })
}
```

```typescript
// ✅ Correct - thin route handler
// app/api/invoices/route.ts
import { createInvoice } from "services/invoices/createInvoice"
import { InvoiceInputSchema } from "types/invoices/InvoiceInputSchema"

export async function POST(request: Request) {
  const body = await request.json()
  const result = InvoiceInputSchema.safeParse(body)

  if (!result.success) {
    return Response.json(
      { error: { code: "VALIDATION_ERROR", message: result.error.message } },
      { status: 400 }
    )
  }

  const serviceResult = await createInvoice(result.data)

  if (!serviceResult.ok) {
    return Response.json({ error: serviceResult.error }, { status: 500 })
  }

  return Response.json({ data: serviceResult.value }, { status: 201 })
}
```

## Best Practices

- Keep route handlers thin: validate, call service, return response
- Always validate input before processing
- Return explicit, typed responses
