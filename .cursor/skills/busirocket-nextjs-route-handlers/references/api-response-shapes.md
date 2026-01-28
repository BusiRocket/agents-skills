# API Response Shapes

## Goal

Keep API responses predictable, typed, and easy to consume.

## Standard JSON Shapes

Prefer one of these:

- **Success**:
  - `Response.json({ data })`
- **Error**:
  - `Response.json({ error: { code, message } }, { status })`

## Status Codes

- `200`: OK
- `201`: Created
- `204`: No content (no JSON body)
- `400`: Validation / bad request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not found
- `409`: Conflict
- `500`: Unexpected server error

## Rules

- Never return unvalidated request input.
- Do not throw for expected errors; return `{ error }` with an explicit status.
- Keep mapping minimal inside the route handler; do it in `services/` when possible.
