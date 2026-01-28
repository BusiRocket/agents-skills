# One Type Per File (STRICT)

## Goal

Enforce strict one-type-per-file discipline.

## Rule

- Each file under `types/` exports **exactly one** `interface` (preferred) or
  `type` (unions only).
- File name must match the exported symbol.

## Examples

```typescript
// ✅ Correct - one type per file
// types/invoices/Invoice.ts
export interface Invoice {
  id: string
  amount: number
}
```

```typescript
// ✅ Correct - file name matches symbol
// types/invoices/Invoice.ts
export interface Invoice {
  /* ... */
}

// types/invoices/InvoiceStatus.ts
export type InvoiceStatus = "pending" | "paid" | "cancelled"
```

```typescript
// ❌ Incorrect - multiple types
// types/invoices/Invoice.ts
export interface Invoice {
  /* ... */
}
export interface InvoiceItem {
  /* ... */
} // Not allowed!
```

```typescript
// ❌ Incorrect - file name doesn't match
// types/invoices/InvoiceData.ts
export interface Invoice {
  /* ... */
} // File should be Invoice.ts
```

## Best Practices

- One type per file
- File name matches exported symbol
- Use `interface` for shapes, `type` for unions
