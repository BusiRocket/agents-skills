# Rust + Tauri Standards (strict)

## Goal

Optimize for long-term maintainability with **many small, focused files** and explicit boundaries.

## Language & Style

- English-only code, comments, and identifiers.
- Prefer `struct`/`enum` definitions in dedicated files.
- Use explicit error types or result enums for expected failures.

## One Thing Per File (STRICT)

- **Exactly one exported symbol per file** for your own Rust modules:
  - One public function **or** one public type **or** one public trait per file.
- No helpers inside the same file. Extract helpers to `utils/`-style modules.
- Files should do one thing: data model, boundary call, or pure logic.

## Module Manifests (Exception)

- `mod.rs` files may declare multiple `mod` entries.
- No logic, constants, or functions inside `mod.rs`.

## Module Layout (STRICT)

- `src-tauri/src/` is for Rust code only.
- `src-tauri/src/services/`: external boundaries (IO, DB, network).
- `src-tauri/src/utils/`: pure logic (no IO).
- `src-tauri/src/models/`: domain types (one type per file).
- No "misc" modules like `helpers.rs` or `common.rs`.

## SQL Separation (STRICT)

- **No inline SQL strings** inside `.rs` files.
- Put each query in its own file under your SQL directory (e.g. `src-tauri/sql/<area>/Xxx.sql`).
- Load with `include_str!()` in Rust code.

## Prompt Separation (STRICT)

- **No inline LLM or AI prompts** inside `.rs` files.
- Put each prompt in its own file under your prompts directory (e.g. `src-tauri/prompts/<area>/Xxx.prompt`).
- Load with `include_str!()` in Rust code.

## Boundaries

- Route handlers or command handlers should be thin:
  - Validate input
  - Call a single service function
  - Return explicit results

## Tauri Commands Checklist (MANDATORY)

When creating a new Tauri command, **all three steps are required**:

1. Create the command file: `src-tauri/src/commands/<command_name>.rs`
2. Register in invoke handler: add to `tauri::generate_handler![]` in `src-tauri/src/lib.rs`
3. **Add to permissions**: add command name to `commands.allow` in the Tauri permissions allowlist file used by the project (e.g., `src-tauri/permissions/*.toml`)

**CRITICAL**: Without step 3, the command will fail at runtime with "not allowed. Command not found" error.

## Validation

After meaningful changes, run:
- Project standard checks (e.g. `yarn check:all`).
