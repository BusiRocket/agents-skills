# Supabase Services Usage

## Rule

This rule only applies if/when this repository adds Supabase.

- Route handlers, hooks, utils, and components must NOT call Supabase directly.
- Centralize reads/writes in dedicated Supabase service modules (e.g.
  `services/supabase/`).
- Never import `@supabase/supabase-js` outside a single Supabase client module
  (e.g. `lib/supabase.ts`) or your Supabase service wrappers.
