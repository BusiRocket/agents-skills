# Vite/Browser Runtime Anti-Patterns

## Goal

Avoid patterns that cause runtime errors in browser/webview environments.

## Vite/Browser Runtime Anti-Patterns

- **`process` or `process.env`** in frontend code; use `import.meta.env` (Vite)
  for environment variables.
- **Node globals** (`process`, `Buffer`) at runtime in bundles that run in
  browser or webview; they are undefined and will crash.
- Patterns like `typeof process !== 'undefined'` in frontend code—they can still
  ship to the bundle and cause issues.
- **Hardcoded environment values** instead of using `.env` files and
  `import.meta.env`.

## Examples

```typescript
// ❌ Incorrect - process.env in frontend
// components/invoices/InvoiceList.tsx
const API_URL = process.env.API_URL // undefined in browser!
```

```typescript
// ❌ Incorrect - Node globals in frontend
// utils/buffer/encodeBase64.ts
export const encodeBase64 = (str: string): string => {
  return Buffer.from(str).toString("base64") // Buffer undefined in browser!
}
```

```typescript
// ❌ Incorrect - typeof check still ships code
// utils/env/getApiUrl.ts
export const getApiUrl = (): string => {
  if (typeof process !== "undefined") {
    return process.env.API_URL || ""
  }
  return "" // Code still ships, can cause issues
}
```

```typescript
// ❌ Incorrect - hardcoded values
// services/invoices/createInvoice.ts
const API_URL = "https://api.example.com" // Should use env
```

```typescript
// ✅ Correct - import.meta.env (Vite)
// components/invoices/InvoiceList.tsx
const API_URL = import.meta.env.VITE_API_URL
```

```typescript
// ✅ Correct - browser-compatible base64
// utils/buffer/encodeBase64.ts
export const encodeBase64 = (str: string): string => {
  return btoa(str) // Browser native API
}
```

```typescript
// ✅ Correct - env file + import.meta.env
// .env
VITE_API_URL=https://api.example.com

// services/invoices/createInvoice.ts
const API_URL = import.meta.env.VITE_API_URL;
```

## Best Practices

- Use `import.meta.env` for environment variables in Vite
- Avoid Node globals in frontend code
- Use `.env` files instead of hardcoded values
- Test in browser environment to catch runtime errors
