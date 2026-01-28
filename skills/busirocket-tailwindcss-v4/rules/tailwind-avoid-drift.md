# Avoid Style Drift

## Goal

Prevent style drift by keeping custom CSS minimal and using consistent tokens.

## Avoid Drift

- Avoid large custom CSS files; keep custom CSS truly global (resets, tokens).
- Avoid heavy use of arbitrary values unless necessary; prefer consistent
  tokens.

## Examples

```css
/* ✅ Correct - global CSS for resets and tokens */
/* app/globals.css */
@import "tailwindcss";

:root {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

```typescript
// ✅ Correct - use Tailwind tokens
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = () => {
  return (
    <div className="bg-blue-500 text-white p-4">
      {/* Using Tailwind tokens */}
    </div>
  );
};
```

```typescript
// ⚠️ Warning - arbitrary values
// components/invoices/InvoiceCard.tsx
export const InvoiceCard = () => {
  return (
    <div className="bg-[#3b82f6] text-[#ffffff] p-[16px]">
      {/* Too many arbitrary values */}
    </div>
  );
};
```

```css
/* ❌ Incorrect - large custom CSS file */
/* app/components.css */
.invoice-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  /* ... 100+ more lines */
}
```

## Best Practices

- Keep custom CSS minimal and global
- Use Tailwind tokens instead of arbitrary values
- Prefer utilities over custom CSS
