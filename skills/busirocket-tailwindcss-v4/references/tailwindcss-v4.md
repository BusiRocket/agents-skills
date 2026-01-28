# Tailwind CSS v4 Best Practices

## Setup (docs-aligned)

- Import Tailwind via a single global CSS entry:
  - `@import 'tailwindcss';`
- Keep that global CSS imported from the root layout.

## Class Strategy

- Prefer Tailwind utilities in `className` for most styling.
- If class strings become hard to read:
  - Extract a small presentational component.
  - Or extract a `components/<area>/...` wrapper rather than inventing large
    custom CSS.

## Avoid Drift

- Avoid large custom CSS files; keep custom CSS truly global (resets, tokens).
- Avoid heavy use of arbitrary values unless necessary; prefer consistent
  tokens.

## Ordering

- CSS order depends on import order. Keep global CSS imports centralized (root
  layout) to avoid surprises.
