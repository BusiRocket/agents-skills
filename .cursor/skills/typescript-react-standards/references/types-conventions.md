# Types Conventions

## One Type Per File (STRICT)

- Each file under `types/` exports **exactly one** `interface` (preferred) or `type` (unions only).
- File name must match the exported symbol.

## Naming Patterns

Prefer explicit names that communicate role:

- `XxxParams` / `XxxInput` for function inputs
- `XxxResult` for service results (success/error)
- `XxxError` for domain error shapes
- `UseXxxParams` / `UseXxxReturn` for hook contracts
- `XxxProps` for component props

## Result Shape (recommended)

For boundaries that can fail (services), prefer a typed result object instead of throwing for expected failures:

- `type XxxResult = { ok: true; value: T } | { ok: false; error: XxxError }`

## Where Types Are Allowed

- Types must live in `types/<area>/...`.
- Do not declare inline types/interfaces in components/hooks/utils/services/route handlers.
