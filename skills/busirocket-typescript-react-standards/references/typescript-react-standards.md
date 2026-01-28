# TypeScript + React Standards

## Goal

Optimize the codebase for agent context and long-term maintainability by
enforcing **many small, focused files**.

## Language & Style

- Use `interface` for exported shapes; use `type` for unions only.
- `const` by default; `let` only when necessary.
- English-only code, comments, and identifiers.

## One Thing Per File (STRICT)

- **Exactly one exported symbol per file** for your own modules:
  - `.tsx`: one exported React component.
  - `.ts` (utils/services): one exported function.
  - `.ts` (types): one exported `interface` or `type`.

## Next.js Special-file Exceptions

Some Next.js files require additional exports by convention. Allowed exceptions:

- `app/**/layout.tsx`, `app/**/page.tsx`: `default export` + `metadata` /
  `generateMetadata` / `viewport` (etc.).
- `app/api/**/route.ts`: multiple HTTP method exports and route config exports.

## Types (STRICT)

- **No inline `interface`/`type` declarations** in components, hooks, utils,
  services, or route handlers.
- Put types in `types/<area>/...` as dedicated files.
- One type per file.

## Helpers (STRICT)

- Do not keep helper functions inside components/hooks.
- If a helper is needed, extract it to `utils/<area>/SomeHelper.ts` (one
  function per file).

## Next.js TS Hygiene (docs-aligned)

- Do not edit `next-env.d.ts` (it is generated).
- If you need custom `.d.ts`, create a new file and include it in
  `tsconfig.json`.

## Validation

Run:

- Project standard checks (e.g. `yarn check:all`).
