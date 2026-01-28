# Types Naming Patterns

## Goal

Establish consistent naming patterns for types.

## Naming Patterns

Prefer explicit names that communicate role:

- `XxxParams` / `XxxInput` for function inputs
- `XxxResult` for service results (success/error)
- `XxxError` for domain error shapes
- `UseXxxParams` / `UseXxxReturn` for hook contracts
- `XxxProps` for component props

## Examples

```typescript
// ✅ Correct - function input
// types/invoices/CreateInvoiceInput.ts
export interface CreateInvoiceInput {
  amount: number
  customerId: string
}
```

```typescript
// ✅ Correct - service result
// types/invoices/CreateInvoiceResult.ts
export type CreateInvoiceResult =
  | { ok: true; value: Invoice }
  | { ok: false; error: CreateInvoiceError }
```

```typescript
// ✅ Correct - domain error
// types/invoices/CreateInvoiceError.ts
export interface CreateInvoiceError {
  code: "VALIDATION_ERROR" | "CUSTOMER_NOT_FOUND"
  message: string
}
```

```typescript
// ✅ Correct - hook contract
// types/invoices/UseInvoiceParams.ts
export interface UseInvoiceParams {
  id: string
}

// types/invoices/UseInvoiceReturn.ts
export interface UseInvoiceReturn {
  invoice: Invoice | null
  isLoading: boolean
}
```

```typescript
// ✅ Correct - component props
// types/invoices/InvoiceCardProps.ts
export interface InvoiceCardProps {
  invoice: Invoice
  onSelect?: (id: string) => void
}
```

## Best Practices

- Use explicit naming patterns
- Communicate role through name
- Be consistent across codebase
