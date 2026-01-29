# Class Strategy

## Goal

Establish strategy for using Tailwind utility classes.

## Class Strategy

- Prefer Tailwind utilities in `className` for most styling.
- Group related classes together for readability.
- If class strings become hard to read or are reused:
  - Extract a small presentational component.
  - Or extract a custom utility class (or `@layer components` rule) when the
    same combination is reused.
  - Prefer `components/<area>/...` wrappers over large custom CSS files.

## Examples

```typescript
// ✅ Correct - Tailwind utilities
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = ({ invoice }: InvoiceCardProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
      <span className="text-lg font-semibold">{invoice.id}</span>
      <span className="text-gray-600">${invoice.amount}</span>
    </div>
  );
};
```

```typescript
// ⚠️ Warning - long class string
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = ({ invoice }: InvoiceCardProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-gray-200 hover:border-gray-300">
      {/* Hard to read */}
    </div>
  );
};
```

```typescript
// ✅ Correct - extract component
// components/invoices/InvoiceCard/InvoiceCard.tsx
export const InvoiceCard = ({ invoice }: InvoiceCardProps) => {
  return (
    <Card>
      <CardHeader>{invoice.id}</CardHeader>
      <CardContent>${invoice.amount}</CardContent>
    </Card>
  );
};

// components/invoices/InvoiceCard/Card.tsx
export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-gray-200 hover:border-gray-300">
      {children}
    </div>
  );
};
```

## Best Practices

- Prefer Tailwind utilities for most styling
- Extract components when class strings become hard to read
- Avoid large custom CSS files
