# Hooks Best Practices

## One Hook Per File (STRICT)

- Exactly one exported hook per file: `hooks/<area>/useXxx.ts`.
- No extra exports.

## No Helpers Inside Hooks (STRICT)

- Hooks contain only state/effects/memos and call helpers imported from `utils/`.
- Any helper must be its own file (one exported function per file).

## No Types Inside Hooks (STRICT)

- Do not define `interface`/`type` in hook files.
- Hook params/return types live in `types/<area>/...` (one type per file).

## Stable API

- Return the minimal meaningful shape.
- Prefer stable references for handlers/derived values (`useCallback`, `useMemo`).

## Side Effects

- Fetch/subscribe in `useEffect` with cleanup.
- Avoid implicit dependencies; keep dependency arrays correct.
