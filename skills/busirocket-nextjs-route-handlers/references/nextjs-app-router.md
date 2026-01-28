# Next.js (App Router) Rules

## Server vs Client Components

- `app/**/page.tsx` and `app/**/layout.tsx` are **Server Components by
  default**.
- Use **Client Components** only when you need:
  - State and event handlers (`onClick`, `onChange`)
  - Effects (`useEffect`)
  - Browser-only APIs (`window`, `localStorage`, etc.)
- `'use client'` creates a **boundary**: the file and all of its imports become
  part of the client bundle.
  - Keep client islands small to reduce JS shipped to the browser.

## Passing Data

- Props passed from Server -> Client must be **serializable**.

## Protecting Server-only Code

- Avoid importing server-only code (secrets, DB calls) into Client Components.
- If needed later, consider marking modules with `server-only` / `client-only`
  (optional).

## Next Special Files: allowed extra exports

This repository enforces "one export per file" for your own modules, **but
Next.js special files require extra exports**.

Allowed exceptions:

- `app/**/layout.tsx`, `app/**/page.tsx`: `default export` + `metadata` /
  `generateMetadata` / `viewport` (and similar Next file-convention exports).
- `app/api/**/route.ts`: multiple HTTP method exports (GET/POST/...) + route
  config exports.
