# Route Handlers (App Router)

## Placement & Conflicts

- Route handlers live in `app/**/route.ts`.
- You **cannot** have `route.ts` and `page.tsx` in the same route segment.

## Thin Handler Rule (STRICT)

Route handlers must be thin:

- Parse/validate request input
- Call a `services/<area>/...` function
- Return an explicit response

No business logic, no DB/network access directly in the handler.

## HTTP Methods

- Supported: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`.

## Caching Model (docs-aligned)

- Route handlers are **not cached by default**.
- Only `GET` can opt into caching.

## Cache Components Note

- If Cache Components is enabled later:
  - `GET` handlers follow the same model as UI routes.
  - `use cache` **cannot** be used directly inside a Route Handler body; extract it to a helper function.
