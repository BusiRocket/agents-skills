# services/ vs utils/ (contracts)

## utils/ (pure logic)

Use `utils/<area>/xxx.ts` when code is:

- Pure (no IO, no DB, no network, no cookies/headers)
- Deterministic (same input -> same output)
- Easy to unit test

**Naming:** verb-noun, focused

- `utils/invoices/formatInvoiceNumber.ts`
- `utils/dates/parseIsoDate.ts`

**API:** single exported function; throw only for programmer errors; return
explicit values.

## services/ (external boundary)

Use `services/<area>/xxx.ts` when code:

- Talks to network/DB/auth/storage
- Reads cookies/headers or environment
- Enforces domain policies at a boundary

**Naming:** verb-noun, intent-first

- `services/invoices/createInvoice.ts`
- `services/auth/getSession.ts`

**API guidance:**

- Return domain data or typed result objects; avoid returning framework
  primitives from deep services.
- Prefer explicit error shapes over throwing for expected failures.

## app route handlers

- Must be **thin**: validate input, call a service, return a response.
- No business logic; no data mapping beyond request/response translation.
