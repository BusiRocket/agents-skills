# React Component Patterns

## One Component Per File (STRICT)

- Exactly one exported component per `.tsx` file.
- No helper functions inside component files; extract to `utils/`.
- No inline types; import from `types/`.

## Client vs Server (App Router)

- Prefer Server Components by default.
- Add `'use client'` only when needed (state/effects/event handlers).

## Folder Namespacing

For complex components with children:

- `components/<area>/Parent/Parent.tsx`
- `components/<area>/Parent/Header.tsx`
- `components/<area>/Parent/Footer.tsx`

Avoid repeating the parent name in child filenames.
