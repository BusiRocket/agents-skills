# Tauri Project Structure

## Goal

Apply Rust module layout and asset paths within a Tauri project.

## Rule

- **Rust code**: `src-tauri/src/` only. Follow `busirocket-rust` layout:
  - `src-tauri/src/services/`: external boundaries (IO, DB, network).
  - `src-tauri/src/utils/`: pure logic (no IO).
  - `src-tauri/src/models/`: domain types (one type per file).
- **SQL**: `src-tauri/sql/<area>/Xxx.sql`. Load with `include_str!()` from `.rs`
  files.
- **Prompts**: `src-tauri/prompts/<area>/Xxx.prompt`. Load with `include_str!()`
  from `.rs` files.
- **Commands**: `src-tauri/src/commands/<command_name>.rs` (one command per
  file).
- No "misc" modules like `helpers.rs` or `common.rs` under `src-tauri/src/`.

## Examples

```rust
// ✅ Correct - service under src-tauri
// src-tauri/src/services/invoices/create_invoice.rs
pub async fn create_invoice(input: CreateInvoiceInput) -> Result<Invoice, InvoiceError> {
    // ...
}
```

```rust
// ✅ Correct - SQL under src-tauri/sql
// src-tauri/sql/invoices/create_invoice.sql
INSERT INTO invoices (id, amount) VALUES ($1, $2);

// src-tauri/src/services/invoices/create_invoice.rs
const CREATE_INVOICE_SQL: &str = include_str!("../../../sql/invoices/create_invoice.sql");
```

```rust
// ✅ Correct - prompt under src-tauri/prompts
// src-tauri/prompts/ai/generate_summary.prompt
Summarize the following text: {text}

// src-tauri/src/services/ai/generate_summary.rs
const GENERATE_SUMMARY_PROMPT: &str = include_str!("../../../prompts/ai/generate_summary.prompt");
```

## Best Practices

- Keep all Rust under `src-tauri/src/` with services, utils, models
- Keep SQL in `src-tauri/sql/`, prompts in `src-tauri/prompts/`
- One command per file in `src-tauri/src/commands/`
