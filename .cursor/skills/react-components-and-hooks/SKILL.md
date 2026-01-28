---
name: react-components-and-hooks
description: React component and hook structure rules. Use when writing or refactoring React components, extracting hooks, deciding client vs server components, and enforcing one-component/one-hook per file with no helpers or inline types.
metadata:
  author: cristiandeluxe
  version: "1.0.0"
---

# React Components and Hooks

Reusable patterns for scalable React codebases.

## When to Use

Use this skill when:

- Writing or refactoring `.tsx` components
- Extracting hooks into `hooks/<area>/useXxx.ts`
- Removing helpers from components/hooks into `utils/`
- Removing inline types into `types/`

## Non-Negotiables (MUST)

- Exactly **one exported component per `.tsx` file**.
- Exactly **one exported hook per hook file** (`hooks/<area>/useXxx.ts`).
- **No helper functions inside** components or hooks; extract helpers to `utils/`.
- **No inline types** inside components or hooks; import from `types/`.
- Prefer server-side rendering boundaries wisely (avoid `'use client'` for large subtrees).

## References (progressive disclosure)

- `references/component-patterns.md`
- `references/hooks-best-practices.md`
