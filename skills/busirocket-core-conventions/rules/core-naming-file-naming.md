# File Naming Conventions

## Goal

Establish consistent file naming patterns for easy navigation.

## File Naming Rules

- Components: PascalCase filenames, folder-namespaced when complex:
  - `components/orders/OrderCard/OrderCard.tsx`
  - `components/orders/OrderCard/Header.tsx`
- Hooks: `useXxx.ts`
- Utils/services: verb-noun, lower camel or lower kebab; pick one and stay
  consistent within a folder.
- Types: PascalCase, match the exported symbol name.

## Examples

```typescript
// ✅ Correct - component naming
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = () => {
  /* ... */
}

// ✅ Correct - complex component with folder
// components/invoices/InvoiceCard/InvoiceCard.tsx
export const InvoiceCard = () => {
  /* ... */
}

// components/invoices/InvoiceCard/Header.tsx
export const Header = () => {
  /* ... */
}
```

```typescript
// ✅ Correct - hook naming
// hooks/invoices/useInvoice.ts
export const useInvoice = () => {
  /* ... */
}
```

```typescript
// ✅ Correct - utils/services naming (camelCase)
// utils/invoices/formatInvoiceNumber.ts
export const formatInvoiceNumber = () => {
  /* ... */
}

// ✅ Correct - utils/services naming (kebab-case)
// utils/invoices/format-invoice-number.ts
export const formatInvoiceNumber = () => {
  /* ... */
}
```

```typescript
// ✅ Correct - type naming
// types/invoices/Invoice.ts
export interface Invoice {
  // ...
}
```

## Best Practices

- Be consistent within each folder
- Match filename to exported symbol name
- Use PascalCase for components and types
- Use camelCase or kebab-case for utils/services (pick one per folder)
