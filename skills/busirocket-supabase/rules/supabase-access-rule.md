# Supabase Access Rule

## Goal

Isolate Supabase access in dedicated service wrappers.

## Scope

This rule only applies if/when this repository adds Supabase.

## Guideline

- Isolate Supabase access in dedicated service wrappers (e.g.
  `services/supabase/*`).
- Do not call Supabase client methods directly from components, hooks, utils, or
  route handlers.
- Keep wrappers small, focused, and typed; prefer one file per domain (e.g.
  `leaderboard.ts`, `periods.ts`).

## Examples

```typescript
// ✅ Correct - Supabase access in service wrapper
// services/supabase/getInvoice.ts
import { createClient } from "@supabase/supabase-js"
import { supabaseUrl, supabaseKey } from "lib/supabase"

const supabase = createClient(supabaseUrl, supabaseKey)

export const getInvoice = async (id: string) => {
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
```

```typescript
// ❌ Incorrect - Supabase access in component
// components/invoices/InvoiceCard.tsx
import { createClient } from "@supabase/supabase-js";

export const InvoiceCard = ({ id }: { id: string }) => {
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const supabase = createClient(url, key);
    supabase.from("invoices").select("*").eq("id", id).single()
      .then(({ data }) => setInvoice(data));
  }, [id]);

  return <div>{/* ... */}</div>;
};
```

```typescript
// ✅ Correct - use service wrapper
// components/invoices/InvoiceCard.tsx
import { getInvoice } from "services/supabase/getInvoice";

export const InvoiceCard = ({ id }: { id: string }) => {
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    getInvoice(id).then(setInvoice);
  }, [id]);

  return <div>{/* ... */}</div>;
};
```

## Best Practices

- Keep Supabase access isolated in service wrappers
- Never call Supabase directly from components/hooks/utils/route handlers
- Keep wrappers small, focused, and typed
