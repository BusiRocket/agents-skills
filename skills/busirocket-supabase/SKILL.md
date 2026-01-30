---
name: busirocket-supabase
description:
  Enforces Supabase access patterns and service boundaries. Use only when
  working with Supabase projects. Centralizes Supabase in a dedicated layer and
  forbids calling Supabase from outside that boundary.
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
- Enforcing a clear boundary between Supabase and the rest of the app

## Non-Negotiables (MUST)

- **Single boundary:** All Supabase access lives in a dedicated layer (service
  wrappers). No direct Supabase calls from outside that layer.
- **Single client:** The Supabase client is created in one module; all Supabase
  usage goes through that client and your service wrappers.
- **Focused wrappers:** Keep wrappers small, focused, and typed.

## Rules

### Supabase Access

- `supabase-access-rule` - Isolate Supabase access in service wrappers
- `supabase-services-usage` - Callers outside the service layer must not use
  Supabase directly

## Related Skills

- `busirocket-core-conventions` - Service boundaries and structure

## How to Use

Read individual rule files for detailed explanations and code examples:

```
rules/supabase-access-rule.md
rules/supabase-services-usage.md
```

Each rule file contains:

- Brief explanation of why it matters
- Code examples (correct and incorrect patterns)
- Additional context and best practices
