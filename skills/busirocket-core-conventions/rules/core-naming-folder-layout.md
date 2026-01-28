# Folder Layout Conventions

## Goal

Establish consistent folder structure across the codebase.

## Folder Layout

- `app/`: routing, layouts, route handlers
- `components/<area>/...`: reusable UI
- `hooks/<area>/useXxx.ts`: one hook per file
- `utils/<area>/xxx.ts`: one pure helper function per file
- `services/<area>/xxx.ts`: one boundary function per file
  (network/DB/integrations)
- `types/<area>/Xxx.ts`: one type/interface per file

## Examples

```
app/
  api/
    invoices/
      route.ts
  invoices/
    page.tsx
components/
  invoices/
    InvoiceCard.tsx
hooks/
  invoices/
    useInvoice.ts
utils/
  invoices/
    formatInvoiceNumber.ts
services/
  invoices/
    createInvoice.ts
types/
  invoices/
    Invoice.ts
```

## Best Practices

- Follow this structure consistently
- Use area folders to group related files
- Keep one thing per file within each folder
