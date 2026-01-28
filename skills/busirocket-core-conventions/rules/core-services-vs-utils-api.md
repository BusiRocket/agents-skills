# Services vs Utils API Guidance

## Goal

Establish consistent API patterns for services and utils.

## Utils API

**API:** single exported function; throw only for programmer errors; return
explicit values.

## Services API Guidance

- Return domain data or typed result objects; avoid returning framework
  primitives from deep services.
- Prefer explicit error shapes over throwing for expected failures.

## Examples

```typescript
// ✅ Correct - utils API
// utils/invoices/formatInvoiceNumber.ts
export const formatInvoiceNumber = (number: number): string => {
  if (number < 0) {
    throw new Error("Invoice number must be positive") // Programmer error
  }
  return `INV-${number.toString().padStart(6, "0")}`
}
```

```typescript
// ✅ Correct - services API with result object
// services/invoices/createInvoice.ts
export const createInvoice = async (
  data: InvoiceInput
): Promise<InvoiceResult> => {
  try {
    const invoice = await db.invoices.create(data)
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
// ❌ Incorrect - service returning framework primitive
// services/invoices/createInvoice.ts
export const createInvoice = async (data: InvoiceInput) => {
  // Should return domain data, not Response object
  return fetch("/api/invoices", {
    method: "POST",
    body: JSON.stringify(data),
  })
}
```

```typescript
// ❌ Incorrect - throwing for expected failure
// services/invoices/createInvoice.ts
export const createInvoice = async (data: InvoiceInput): Promise<Invoice> => {
  const invoice = await db.invoices.create(data)
  if (!invoice) {
    throw new Error("Failed to create invoice") // Should return result object
  }
  return invoice
}
```

## Best Practices

- Utils: throw only for programmer errors
- Services: return result objects for expected failures
- Return domain data, not framework primitives
