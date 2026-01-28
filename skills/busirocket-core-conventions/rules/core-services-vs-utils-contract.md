# Services vs Utils Contract

## Goal

Clearly distinguish between pure logic (utils) and external boundaries
(services).

## utils/ (Pure Logic)

Use `utils/<area>/xxx.ts` when code is:

- Pure (no IO, no DB, no network, no cookies/headers)
- Deterministic (same input -> same output)
- Easy to unit test

**Naming:** verb-noun, focused

- `utils/invoices/formatInvoiceNumber.ts`
- `utils/dates/parseIsoDate.ts`

## services/ (External Boundary)

Use `services/<area>/xxx.ts` when code:

- Talks to network/DB/auth/storage
- Reads cookies/headers or environment
- Enforces domain policies at a boundary

**Naming:** verb-noun, intent-first

- `services/invoices/createInvoice.ts`
- `services/auth/getSession.ts`

## Examples

```typescript
// ✅ Correct - pure logic in utils/
// utils/invoices/formatInvoiceNumber.ts
export const formatInvoiceNumber = (number: number): string => {
  return `INV-${number.toString().padStart(6, "0")}`
}
```

```typescript
// ✅ Correct - external boundary in services/
// services/invoices/createInvoice.ts
export const createInvoice = async (data: InvoiceInput) => {
  const response = await fetch("/api/invoices", {
    method: "POST",
    body: JSON.stringify(data),
  })
  return response.json()
}
```

```typescript
// ❌ Incorrect - IO in utils/
// utils/invoices/createInvoice.ts
export const createInvoice = async (data: InvoiceInput) => {
  // Should be in services/ because it makes network calls
  const response = await fetch("/api/invoices", {
    method: "POST",
    body: JSON.stringify(data),
  })
  return response.json()
}
```

## Best Practices

- Keep utils pure and deterministic
- Put all IO/network/DB access in services
- Use clear naming that communicates intent
