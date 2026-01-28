---
name: typescript-react-standards
description: TypeScript and React standards for maintainable codebases. Use when creating or refactoring TS/TSX to enforce one-thing-per-file, type conventions, and Next.js special-file export exceptions.
metadata:
  author: cristiandeluxe
  version: "1.0.0"
---

# TypeScript + React Standards

Strict, reusable standards for TypeScript/React projects.

## When to Use

Use this skill when:
- Writing or refactoring `.ts` / `.tsx`
- Moving inline types into `types/`
- Enforcing consistent type naming and result shapes
- Working in Next.js where special files allow extra exports

## Non-Negotiables (MUST)

- **One exported symbol per file** for your own modules.
- **No inline `interface`/`type`** in components/hooks/utils/services/route handlers.
- Put shared shapes under `types/<area>/...` (**one type per file**).
- Avoid barrel files (`index.ts`) that hide dependencies.
- After meaningful changes: run the project's standard checks (e.g. `yarn check:all`).

## Next.js Special-file Exceptions

- `app/**/page.tsx`, `app/**/layout.tsx`: allow `default export` + `metadata/generateMetadata/viewport` (etc.).
- `app/api/**/route.ts`: allow multiple HTTP method exports and route config exports.

## References (progressive disclosure)

- `references/typescript-react-standards.md`
- `references/types-conventions.md`
