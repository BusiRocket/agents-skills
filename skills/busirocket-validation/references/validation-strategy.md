# Validation Strategy (Zod + Guards)

## Goal

Validate inputs consistently using Zod for complex schemas and simple guards
for runtime checks.

## Where validation lives

- **Services**: validate API responses (or external data) with Zod schemas.
- **Utils**: keep small coercion/guard helpers under `utils/validation/`.
- **Types**: Zod schemas can live alongside types in `types/<area>/`.

## Zod Schemas (complex validation)

```typescript
// types/<area>/XxxSchema.ts
import { z } from "zod";

export const XxxSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
  createdAt: z.string().datetime(),
});

export type Xxx = z.infer<typeof XxxSchema>;
```

- Use `.safeParse()` for API responses to handle errors gracefully.
- Prefer `z.infer` for types; avoid duplicating shapes.

## Guard Helpers (simple runtime checks)

```typescript
// utils/validation/isNonEmptyString.ts
export const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === "string" && value.trim().length > 0;
};
```

- One guard per file.
- Use type predicates (`value is T`) where possible.
- Prefer guards over casting.

## Recommended helpers (examples)

- `utils/validation/isRecord.ts` → `value is Record<string, unknown>`
- `utils/validation/isNonEmptyString.ts` → `value is string`
- `utils/validation/coerceNumber.ts` → `unknown → number | null`

## Rules

- No inline types or validation logic inside components/hooks.
- If validation logic grows, split into dedicated helpers (one function per
  file).
