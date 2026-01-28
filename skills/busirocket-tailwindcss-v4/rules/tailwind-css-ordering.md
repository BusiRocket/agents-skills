# CSS Ordering

## Goal

Understand how CSS order affects styling.

## CSS Ordering Rule

- CSS order depends on import order.
- Keep global CSS imports centralized (root layout) to avoid surprises.

## Examples

```typescript
// ✅ Correct - centralized global CSS
// app/layout.tsx
import "./globals.css"; // Imported first, applies globally

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <html>{children}</html>;
}
```

```typescript
// ❌ Incorrect - scattered CSS imports
// app/invoices/page.tsx
import "./invoices.css"; // Imported here, may conflict with other styles

export default function InvoicesPage() {
  return <div>{/* ... */}</div>;
}
```

```css
/* ✅ Correct - order matters */
/* app/globals.css */
@import "tailwindcss";

/* Custom styles come after Tailwind */
.custom-class {
  /* ... */
}
```

## Best Practices

- Keep global CSS imports centralized in root layout
- Understand that import order affects CSS precedence
- Avoid scattered CSS imports
