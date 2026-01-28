# Naming & Layout Conventions

## Folder layout

- `app/`: routing, layouts, route handlers
- `components/<area>/...`: reusable UI
- `hooks/<area>/useXxx.ts`: one hook per file
- `utils/<area>/xxx.ts`: one pure helper function per file
- `services/<area>/xxx.ts`: one boundary function per file
  (network/DB/integrations)
- `types/<area>/Xxx.ts`: one type/interface per file

## File naming

- Components: PascalCase filenames, folder-namespaced when complex:
  - `components/orders/OrderCard/OrderCard.tsx`
  - `components/orders/OrderCard/Header.tsx`
- Hooks: `useXxx.ts`
- Utils/services: verb-noun, lower camel or lower kebab; pick one and stay
  consistent within a folder.
- Types: PascalCase, match the exported symbol name.

## Exports

- Next.js route components (`app/**/page.tsx`, `layout.tsx`): **default export**
  (required by conventions).
- Reusable components/hooks/utils/services/types: **single export per file**.

## Imports

- No barrel/index files.
- Prefer relative imports within a domain folder; use aliases only when they
  reduce churn.
