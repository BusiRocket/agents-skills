# React Anti-Patterns

## Contents

- [Goal](#goal)
- [Rules](#rules)
- [Examples](#examples)
- [Best Practices](#best-practices)

## Goal

Avoid React patterns that reduce maintainability and performance.

## Rules

- **Fetching/DB calls inside components**.
- **Helpers inside components/hooks** (formatting, parsing, mapping) instead of
  `utils/`.
- Marking a whole subtree `'use client'` just to use one hook; prefer smaller
  client islands.

## Examples

```typescript
// ❌ Incorrect - fetching in component
// components/invoices/InvoiceList.tsx
export const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetch("/api/invoices")
      .then(res => res.json())
      .then(data => setInvoices(data));
  }, []);

  return <div>{/* ... */}</div>;
}
```

```typescript
// ❌ Incorrect - helper in component
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = ({ invoice }: InvoiceCardProps) => {
  const formatInvoiceNumber = (number: number): string => {
    return `INV-${number}`;
  };

  return <div>{formatInvoiceNumber(invoice.number)}</div>;
}
```

```typescript
// ❌ Incorrect - whole subtree client
// app/invoices/page.tsx
'use client'

export default function InvoicesPage() {
  // Only one hook needs client, but whole page is client
  const [isOpen, setIsOpen] = useState(false);
  return <div>{/* ... */}</div>;
}
```

```typescript
// ✅ Correct - fetching in hook/service
// hooks/invoices/useInvoices.ts
export const useInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    getInvoices().then(setInvoices);
  }, []);
  return invoices;
};

// components/invoices/InvoiceList.tsx
export const InvoiceList = () => {
  const invoices = useInvoices();
  return <div>{/* ... */}</div>;
}
```

```typescript
// ✅ Correct - helper in utils/
// utils/invoices/formatInvoiceNumber.ts
export const formatInvoiceNumber = (number: number): string => {
  return `INV-${number}`
}

// components/invoices/InvoiceCard.tsx
import { formatInvoiceNumber } from "utils/invoices/formatInvoiceNumber"
```

```typescript
// ✅ Correct - small client island
// components/invoices/InvoiceModal.tsx
'use client'

export const InvoiceModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return <div>{/* ... */}</div>;
}

// app/invoices/page.tsx (server component)
import { InvoiceModal } from "components/invoices/InvoiceModal";

export default function InvoicesPage() {
  return (
    <div>
      {/* Server component content */}
      <InvoiceModal />
    </div>
  );
}
```

## Best Practices

- Move fetching/DB calls to hooks or services
- Extract helpers to `utils/`
- Keep client islands small and focused
