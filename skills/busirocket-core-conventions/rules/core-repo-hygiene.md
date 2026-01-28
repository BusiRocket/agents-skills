# Repository Hygiene

## Goal

Maintain clean, navigable repository structure.

## Hygiene Rules

- No index/barrel files.
- One responsibility per file.
- Keep route handlers thin; move logic to `services/`.

## Quality Gate

Always run the project's standard checks after meaningful changes (e.g.
`yarn check:all`).

## Examples

```typescript
// ✅ Correct - thin route handler
// app/api/invoices/route.ts
export async function POST(request: Request) {
  const data = await request.json()
  const result = await createInvoice(data)
  return Response.json({ data: result })
}
```

```typescript
// ❌ Incorrect - fat route handler with business logic
// app/api/invoices/route.ts
export async function POST(request: Request) {
  const data = await request.json()
  // Business logic should be in services/
  const invoice = {
    id: generateId(),
    amount: calculateTax(data.amount),
    // ...
  }
  await db.invoices.insert(invoice)
  return Response.json({ data: invoice })
}
```

## Best Practices

- Avoid barrel/index files that hide dependencies
- Keep files focused on single responsibility
- Route handlers should only validate, call services, and return responses
