# Next.js Special-file Exceptions

## Goal

Understand allowed exceptions for Next.js special files.

## Exception Rule

Some Next.js files require additional exports by convention. Allowed exceptions:

- `app/**/layout.tsx`, `app/**/page.tsx`: `default export` + `metadata` /
  `generateMetadata` / `viewport` (etc.).
- `app/api/**/route.ts`: multiple HTTP method exports and route config exports.

## Examples

```typescript
// ✅ Correct - Next.js page with metadata
// app/invoices/page.tsx
export const metadata = {
  title: "Invoices",
};

export default function InvoicesPage() {
  return <div>Invoices</div>;
}
```

```typescript
// ✅ Correct - route handler with multiple methods
// app/api/invoices/route.ts
export async function GET() {
  return Response.json({ data: [] })
}

export async function POST(request: Request) {
  return Response.json({ data: {} })
}

export const dynamic = "force-dynamic"
```

```typescript
// ❌ Incorrect - multiple exports in regular component
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = () => {
  /* ... */
}
export const InvoiceHeader = () => {
  /* ... */
} // Not allowed!
```

## Best Practices

- Only use multiple exports in Next.js special files
- Keep regular components/hooks/utils to one export per file
