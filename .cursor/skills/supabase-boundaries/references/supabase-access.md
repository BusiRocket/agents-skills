# Supabase Access Rule

## Scope

This rule only applies if/when this repository adds Supabase.

## Guideline

- Isolate Supabase access in dedicated service wrappers (e.g. `services/supabase/*`).
- Do not call Supabase client methods directly from components, hooks, utils, or route handlers.
- Keep wrappers small, focused, and typed.
