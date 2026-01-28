# Supabase Services Usage

## Goal

Centralize Supabase access in service modules.

## Rule

This rule only applies if/when this repository adds Supabase.

- Route handlers, hooks, utils, and components must NOT call Supabase directly.
- Centralize reads/writes in dedicated Supabase service modules (e.g.
  `services/supabase/`).
- Never import `@supabase/supabase-js` outside a single Supabase client module
  (e.g. `lib/supabase.ts`) or your Supabase service wrappers.

## Examples

```typescript
// ✅ Correct - Supabase client in lib/
// lib/supabase.ts
import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

```typescript
// ✅ Correct - service wrapper uses client
// services/supabase/getInvoice.ts
import { supabase } from "lib/supabase"

export const getInvoice = async (id: string) => {
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", id)
    .single()

  if (error) throw error
  return data
}
```

```typescript
// ❌ Incorrect - Supabase import in component
// components/invoices/InvoiceCard.tsx
import { createClient } from "@supabase/supabase-js" // Not allowed!

export const InvoiceCard = () => {
  // ...
}
```

```typescript
// ❌ Incorrect - Supabase import in route handler
// app/api/invoices/route.ts
import { createClient } from "@supabase/supabase-js" // Not allowed!

export async function GET() {
  // ...
}
```

```typescript
// ✅ Correct - use service wrapper
// app/api/invoices/route.ts
import { getInvoice } from "services/supabase/getInvoice"

export async function GET(request: Request) {
  const invoice = await getInvoice(id)
  return Response.json({ data: invoice })
}
```

## Best Practices

- Centralize Supabase access in `services/supabase/`
- Never import `@supabase/supabase-js` outside client module or service wrappers
- Keep service wrappers focused and typed
