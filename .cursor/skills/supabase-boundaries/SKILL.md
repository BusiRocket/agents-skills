---
name: supabase-boundaries
description: Supabase access patterns and service boundaries. Use only when working with Supabase projects. Centralize Supabase access in services/ and never call Supabase directly from components/hooks/utils/route handlers.
disable-model-invocation: true
metadata:
  author: cristiandeluxe
  version: "1.0.0"
---

# Supabase Boundaries

Service boundary patterns for Supabase projects.

## When to Use

Use this skill only when:
- Working in a project that uses Supabase
- Creating or refactoring Supabase access code
- Enforcing service boundaries for database access

## Non-Negotiables (MUST)

- **Never call Supabase directly** from components, hooks, utils, or route handlers.
- **Centralize access** in dedicated Supabase service wrappers (e.g. `services/supabase/*`).
- Keep wrappers small, focused, and typed.
- Never import `@supabase/supabase-js` outside a single Supabase client module (e.g. `lib/supabase.ts`) or your Supabase service wrappers.

## References (progressive disclosure)

- `references/supabase-access.md`
- `references/supabase-services.md`
