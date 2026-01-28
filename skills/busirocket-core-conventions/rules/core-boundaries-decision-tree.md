# Boundaries Decision Tree

## Goal

Make it obvious where new code belongs so agents can create **many small files**
without guessing.

## Decision Tree

If you are writing...

- **A route or page** -> `app/**` (route components, layouts, route handlers)
- **Reusable UI** -> `components/<area>/...`
- **State/effects + orchestration logic** -> `hooks/<area>/useXxx.ts`
- **Pure logic** (no React, no IO) -> `utils/<area>/xxx.ts`
- **External boundary** (network/DB/auth/storage) -> `services/<area>/xxx.ts`
- **A shared shape** -> `types/<area>/Xxx.ts`

## Examples

```typescript
// ✅ Correct - route handler in app/
// app/api/invoices/route.ts
export async function POST(request: Request) {
  // ...
}
```

```typescript
// ✅ Correct - reusable UI in components/
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = ({ invoice }: InvoiceCardProps) => {
  // ...
}
```

```typescript
// ✅ Correct - state/effects in hooks/
// hooks/invoices/useInvoice.ts
export const useInvoice = (id: string) => {
  // ...
}
```

```typescript
// ✅ Correct - pure logic in utils/
// utils/invoices/formatInvoiceNumber.ts
export const formatInvoiceNumber = (number: number): string => {
  // ...
}
```

```typescript
// ✅ Correct - external boundary in services/
// services/invoices/createInvoice.ts
export const createInvoice = async (data: InvoiceInput) => {
  // ...
}
```

```typescript
// ✅ Correct - shared shape in types/
// types/invoices/Invoice.ts
export interface Invoice {
  id: string
  amount: number
}
```

## Best Practices

- Use this decision tree when creating new files
- Keep boundaries clear and explicit
- One thing per file, placed in the correct location
