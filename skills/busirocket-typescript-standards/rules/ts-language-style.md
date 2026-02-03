# Language & Style

## Goal

Establish consistent TypeScript language and style conventions.

## Language & Style Rules

- Use `interface` for exported shapes; use `type` for unions only.
- `const` by default; `let` only when necessary.
- English-only code, comments, and identifiers.
- Keep cognitive complexity per function ≤ 15; extract helpers when in doubt.
- JSDoc on public functions and components (params and returns); keep comments
  focused on "why" and non-obvious invariants.

## Examples

```typescript
// ✅ Correct - interface for exported shape
// types/invoices/Invoice.ts
export interface Invoice {
  id: string
  amount: number
}
```

```typescript
// ✅ Correct - type for union
// types/invoices/InvoiceStatus.ts
export type InvoiceStatus = "pending" | "paid" | "cancelled"
```

```typescript
// ❌ Incorrect - type for exported shape
// types/invoices/Invoice.ts
export type Invoice = {
  id: string
  amount: number
}
```

```typescript
// ✅ Correct - const by default
const invoice = getInvoice(id)
const amount = invoice.amount
```

```typescript
// ✅ Correct - let when necessary
let total = 0
for (const invoice of invoices) {
  total += invoice.amount
}
```

## Best Practices

- Use `interface` for exported shapes
- Use `type` only for unions
- Prefer `const` over `let`
- English-only code, comments, and identifiers
