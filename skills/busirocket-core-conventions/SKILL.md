---
name: busirocket-core-conventions
description:
  General engineering conventions optimized for AI agents. Use when creating or
  refactoring codebases and you need strict file discipline, clear module
  boundaries, naming/layout rules, and anti-pattern avoidance.
metadata:
  author: cristiandeluxe
  version: "1.0.0"
---

# Core Conventions

Reusable, project-agnostic conventions designed to keep codebases scalable and
easy for AI agents to navigate.

## When to Use

Use this skill when:

- Starting a new feature and deciding where code should live
- Refactoring to improve maintainability
- Enforcing “one-thing-per-file” discipline
- Establishing naming/layout conventions and boundary rules

## Non-Negotiables (MUST)

- Keep **many small, focused files** with explicit boundaries.
- **One exported symbol per file** for your own modules
  (component/hook/function/type).
- **No barrel/index files** (e.g. `index.ts`) that hide dependencies.
- **No inline types** outside `types/`.
- **No helper functions inside components or hooks**; extract to `utils/`.
- Avoid adding new dependencies for trivial helpers unless explicitly approved.

## Placement / Boundaries

- Route/pages: `app/**`
- Reusable UI: `components/<area>/...`
- Orchestration (state/effects): `hooks/<area>/useXxx.ts`
- Pure logic: `utils/<area>/xxx.ts`
- External boundaries (network/DB/auth/storage): `services/<area>/xxx.ts`
- Shared shapes: `types/<area>/Xxx.ts`

## References (progressive disclosure)

- `references/general.md`
- `references/boundaries-and-placement.md`
- `references/naming-and-layout.md`
- `references/services-vs-utils.md`
- `references/anti-patterns.md`
