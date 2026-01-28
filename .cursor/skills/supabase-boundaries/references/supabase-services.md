# Supabase Services Usage

## Rule

This rule only applies if/when this repository adds Supabase.

- Route handlers, hooks, utils, and components must NOT call Supabase directly.
- Centralize reads/writes in `services/supabase/` modules.
- Never import `@supabase/supabase-js` outside `lib/supabase.ts` or `services/supabase/*`.
