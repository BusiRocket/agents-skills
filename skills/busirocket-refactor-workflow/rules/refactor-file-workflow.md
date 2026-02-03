# @file Refactor Workflow (strict)

## Goal

Use this rule by referencing: `@file`.

## Algorithm

1. **Scan** – Identify responsibilities: UI rendering, state/effects and
   handlers, pure helpers, shared shapes (types), large constant collections.
2. **Decide** – TSX: keep only presentational concerns. State/effects →
   `hooks/<area>/useXxx.ts`. Pure helpers → `utils/<area>/xxx.ts`. All
   interfaces/types → `types/<area>/Xxx.ts`. Large constant arrays/maps →
   `utils/<area>/constants/xxxConstants.ts`. Child components → subfolder under
   parent.
3. **Apply** – Update imports, remove unused imports, ensure no circular
   dependencies.
4. **Run checks** – Run project checks (e.g.
   `yarn type-check && yarn format && yarn lint` or `yarn check:all`); fix all
   errors before proceeding.

## Hard Constraints

- Exactly one exported symbol per file.
- No inline `interface`/`type` declarations in non-type files.
- No helper functions inside components/hooks.
- No large literal arrays/maps in logic files; extract to dedicated constant
  modules.

## Examples

```typescript
// ❌ Incorrect - multiple exports
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = () => {
  /* ... */
}
export const InvoiceHeader = () => {
  /* ... */
} // Not allowed!
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
```

```typescript
// ❌ Incorrect - inline type
// components/invoices/InvoiceCard.tsx
interface Invoice {
  id: string
  amount: number
}

export const InvoiceCard = ({ invoice }: { invoice: Invoice }) => {
  // ...
}
```

```typescript
// ✅ Correct - type in types/
// types/invoices/Invoice.ts
export interface Invoice {
  id: string
  amount: number
}

// components/invoices/InvoiceCard.tsx
import type { Invoice } from "types/invoices/Invoice"
```

## Best Practices

- Strictly enforce one export per file
- Move all types to `types/`
- Extract all helpers to `utils/`
