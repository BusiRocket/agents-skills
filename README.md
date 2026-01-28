# Agent Skills

A collection of reusable Agent Skills for TypeScript/React/Next.js/Rust/Tauri projects. These skills follow the [Agent Skills](https://agentskills.io/) format and are compatible with Cursor, Claude Code, Codex, GitHub Copilot, Gemini CLI, and other Agent Skills-compatible tools.

## Available Skills

### Core Skills (Auto-activated)

- **`busirocket-core-conventions`** - General engineering conventions, file discipline, boundaries, naming/layout, and anti-patterns
- **`busirocket-typescript-react-standards`** - TypeScript/React export discipline, type conventions, Next.js special-file exceptions
- **`busirocket-react-components-and-hooks`** - React component and hook structure rules (one-component/one-hook per file)
- **`busirocket-nextjs-route-handlers`** - Next.js App Router patterns, thin route handlers, validation, response shapes
- **`busirocket-refactor-workflow`** - Strict refactoring workflow with quality gates
- **`busirocket-tailwindcss-v4`** - Tailwind CSS v4 setup and styling strategy
- **`busirocket-rust-tauri-standards`** - Rust/Tauri one-thing-per-file, SQL/prompt separation, command checklist

### Optional Skills (Manual invocation only)

- **`busirocket-supabase-boundaries`** - Supabase access patterns and service boundaries (use `/busirocket-supabase-boundaries` when working with Supabase)
- **`busirocket-react-state-management-zustand`** - Zustand state management patterns (use `/busirocket-react-state-management-zustand` when using Zustand)

## Installation

### Using npx skills add (Recommended)

```bash
npx skills add BusiRocket/agent-skills
```

Or use the deprecated (but still working) command:

```bash
npx add-skill BusiRocket/agent-skills
```

### Manual Installation

To use these skills across all projects, copy or symlink the `skills/` directory to:

- `~/.cursor/skills/` (Cursor)
- `~/.claude/skills/` (Claude Desktop/Code)
- `~/.codex/skills/` (Codex)

Example:

```bash
# For Cursor
ln -s /path/to/this/repo/skills ~/.cursor/skills

# For Claude
ln -s /path/to/this/repo/skills ~/.claude/skills
```

Or use the sync script from this repo:

```bash
scripts/sync-global-skills.sh
```

Copy mode (instead of symlink):

```bash
scripts/sync-global-skills.sh --copy
```

## Usage

Skills are automatically activated by agents when relevant tasks are detected. Optional skills can be invoked manually:

```
/busirocket-supabase-boundaries
/busirocket-react-state-management-zustand
```

## Skill Structure

Each skill contains:

- `SKILL.md` - Main instructions with frontmatter metadata
- `references/` - Detailed documentation loaded on demand (progressive disclosure)

## License

MIT
