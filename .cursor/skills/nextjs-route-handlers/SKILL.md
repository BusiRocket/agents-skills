---
name: nextjs-route-handlers
description: Next.js App Router route handler patterns. Use when creating or refactoring route.ts files, implementing API endpoints, validating request inputs, and returning standardized JSON responses with proper status codes.
metadata:
  author: cristiandeluxe
  version: "1.0.0"
---

# Next.js Route Handlers

Patterns for thin, maintainable route handlers in Next.js App Router.

## When to Use

Use this skill when:
- Creating or refactoring `app/api/**/route.ts` files
- Implementing API endpoints
- Validating request inputs
- Returning standardized JSON responses
- Deciding server vs client component boundaries

## Non-Negotiables (MUST)

- Route handlers must be **thin**: validate input, call a `services/` function, return a response.
- **No business logic or IO** directly in the handler.
- **Never return unvalidated request input**.
- Use standard JSON response shapes: `{ data }` for success, `{ error: { code, message } }` for errors.
- Use appropriate HTTP status codes (200, 201, 204, 400, 401, 403, 404, 409, 500).

## Server vs Client Components

- `app/**/page.tsx` and `app/**/layout.tsx` are **Server Components by default**.
- Use **Client Components** only when you need: state/event handlers, effects, browser-only APIs.
- `'use client'` creates a boundary; keep client islands small.
- Props from Server -> Client must be **serializable**.

## References (progressive disclosure)

- `references/nextjs-app-router.md`
- `references/route-handlers.md`
- `references/api-response-shapes.md`
- `references/validation.md`
