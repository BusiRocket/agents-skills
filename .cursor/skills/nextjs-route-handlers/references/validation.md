# Validation Strategy (no new dependencies)

## Goal

Validate inputs consistently without adding validation libraries.

## Where validation lives

- **Route handlers**: validate request shape at the boundary.
- **Services**: validate invariants when enforcing domain policies.
- **Utils**: keep small coercion/guard helpers under `utils/validation/`.

## Patterns

- Prefer `unknown` inputs at boundaries + explicit narrowing.
- Use tiny guard/coercion helpers instead of casting.

## Recommended helpers (examples)

- `utils/validation/isRecord.ts` -> `value is Record<string, unknown>`
- `utils/validation/coerceFirstString.ts` -> `unknown -> string | null`
- `utils/validation/coerceNumber.ts` -> `unknown -> number | null`

## Rules

- No inline types or helpers inside route handlers.
- If validation logic grows, split into dedicated helpers (one function per file).
