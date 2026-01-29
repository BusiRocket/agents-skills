# Tailwind CSS v4 Setup

## Goal

Set up Tailwind CSS v4 correctly.

## Setup (docs-aligned)

- Import Tailwind via a single global CSS entry: `@import 'tailwindcss';`
- Keep that global CSS imported from the root layout.
- Use Tailwind CSS v4 utility classes **without prefix** (no `tw-` or similar).

## Examples

```css
/* ✅ Correct - global CSS entry */
/* app/globals.css */
@import "tailwindcss";
```

```typescript
// ✅ Correct - import from root layout
// app/layout.tsx
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <html>{children}</html>;
}
```

```css
/* ❌ Incorrect - multiple Tailwind imports */
/* app/globals.css */
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
```

## Best Practices

- Use single `@import 'tailwindcss';` entry
- Import global CSS from root layout
- Keep setup simple and centralized
