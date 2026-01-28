# Anti-Patterns (avoid)

These patterns destroy agent context quality and make refactors risky.

## File Structure

- **Multiple exports per file** (any combination of
  component/hook/function/type).
- **Barrel/index files** (`index.ts`) that hide dependencies.
- **Growing “misc” modules** (`helpers.ts`, `utils.ts`, `types.ts`,
  `constants.ts`).

## Types

- **Inline types** in components/hooks/utils/services/route handlers.
- **One huge type file** that becomes a dumping ground.

## React

- **Fetching/DB calls inside components**.
- **Helpers inside components/hooks** (formatting, parsing, mapping) instead of
  `utils/`.
- Marking a whole subtree `'use client'` just to use one hook; prefer smaller
  client islands.

## App Router / API

- **Fat route handlers** that contain business logic.
- Returning unvalidated input; always validate and return explicit responses.

## Dependencies

- Adding libraries for trivial helpers (date formatting, string utils) without
  explicit approval.

## Vite / Browser Runtime

- **`process` or `process.env`** in frontend code; use `import.meta.env` (Vite)
  for environment variables.
- **Node globals** (`process`, `Buffer`) at runtime in bundles that run in
  browser or webview; they are undefined and will crash.
- Patterns like `typeof process !== 'undefined'` in frontend code—they can
  still ship to the bundle and cause issues.
- **Hardcoded environment values** instead of using `.env` files and
  `import.meta.env`.
