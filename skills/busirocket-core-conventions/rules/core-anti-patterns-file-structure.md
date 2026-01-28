# File Structure Anti-Patterns

## Goal

Avoid patterns that destroy agent context quality and make refactors risky.

## File Structure Anti-Patterns

- **Multiple exports per file** (any combination of
  component/hook/function/type).
- **Barrel/index files** (`index.ts`) that hide dependencies.
- **Growing "misc" modules** (`helpers.ts`, `utils.ts`, `types.ts`,
  `constants.ts`).

## Examples

```typescript
// ❌ Incorrect - multiple exports
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = () => {
  /* ... */
}
export const InvoiceHeader = () => {
  /* ... */
}
export const InvoiceFooter = () => {
  /* ... */
}
```

```typescript
// ❌ Incorrect - barrel file
// components/invoices/index.ts
export { InvoiceCard } from "./InvoiceCard"
export { InvoiceHeader } from "./InvoiceHeader"
export { InvoiceFooter } from "./InvoiceFooter"
```

```typescript
// ❌ Incorrect - misc module
// utils/helpers.ts
export const formatDate = () => {
  /* ... */
}
export const formatCurrency = () => {
  /* ... */
}
export const formatPhone = () => {
  /* ... */
}
export const validateEmail = () => {
  /* ... */
}
```

```typescript
// ✅ Correct - one export per file
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = () => {
  /* ... */
}

// components/invoices/InvoiceHeader.tsx
export const InvoiceHeader = () => {
  /* ... */
}

// components/invoices/InvoiceFooter.tsx
export const InvoiceFooter = () => {
  /* ... */
}
```

```typescript
// ✅ Correct - focused modules
// utils/dates/formatDate.ts
export const formatDate = () => {
  /* ... */
}

// utils/currency/formatCurrency.ts
export const formatCurrency = () => {
  /* ... */
}
```

## Best Practices

- One export per file
- No barrel/index files
- Split misc modules into focused files
