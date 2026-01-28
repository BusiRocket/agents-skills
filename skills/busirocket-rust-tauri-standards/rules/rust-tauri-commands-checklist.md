# Tauri Commands Checklist (MANDATORY)

## Goal

Ensure Tauri commands are properly set up.

## Tauri Commands Checklist (MANDATORY)

When creating a new Tauri command, **all three steps are required**:

1. Create the command file: `src-tauri/src/commands/<command_name>.rs`
2. Register in invoke handler: add to `tauri::generate_handler![]` in
   `src-tauri/src/lib.rs`
3. **Add to permissions**: add command name to `commands.allow` in the Tauri
   permissions allowlist file used by the project (e.g.,
   `src-tauri/permissions/*.toml`)

**CRITICAL**: Without step 3, the command will fail at runtime with "not
allowed. Command not found" error.

## Examples

```rust
// Step 1: Create command file
// src-tauri/src/commands/create_invoice.rs
use crate::models::CreateInvoiceInput;

#[tauri::command]
pub async fn create_invoice(input: CreateInvoiceInput) -> Result<Invoice, String> {
    // ...
}
```

```rust
// Step 2: Register in invoke handler
// src-tauri/src/lib.rs
mod commands;

use commands::create_invoice;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![create_invoice])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

```toml
# Step 3: Add to permissions
# src-tauri/permissions/default.toml
[permissions]
commands = [
    "create_invoice",  # Add command name here
]
```

## Best Practices

- Always complete all three steps
- Verify command works after setup
- Keep permissions file updated
