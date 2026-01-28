# Agent Skills

A collection of reusable Agent Skills for TypeScript/React/Next.js/Rust/Tauri projects. These skills follow the [Agent Skills](https://agentskills.io/) format and are compatible with Cursor, Claude Code, Codex, GitHub Copilot, Gemini CLI, and other Agent Skills-compatible tools.

## Available Skills

### Core Skills (Auto-activated)

- **`core-conventions`** - General engineering conventions, file discipline, boundaries, naming/layout, and anti-patterns
- **`typescript-react-standards`** - TypeScript/React export discipline, type conventions, Next.js special-file exceptions
- **`react-components-and-hooks`** - React component and hook structure rules (one-component/one-hook per file)
- **`nextjs-route-handlers`** - Next.js App Router patterns, thin route handlers, validation, response shapes
- **`refactor-workflow`** - Strict refactoring workflow with quality gates
- **`tailwindcss-v4`** - Tailwind CSS v4 setup and styling strategy
- **`rust-tauri-standards`** - Rust/Tauri one-thing-per-file, SQL/prompt separation, command checklist

### Optional Skills (Manual invocation only)

- **`supabase-boundaries`** - Supabase access patterns and service boundaries (use `/supabase-boundaries` when working with Supabase)
- **`react-state-management-zustand`** - Zustand state management patterns (use `/react-state-management-zustand` when using Zustand)

## Installation

### Local Project

Skills are automatically detected when placed in `.cursor/skills/` (or `.claude/skills/`, `.codex/skills/`).

### Global Installation

To use these skills across all projects, copy or symlink this directory to:

- `~/.cursor/skills/` (Cursor)
- `~/.claude/skills/` (Claude Desktop/Code)
- `~/.codex/skills/` (Codex)

Example:

```bash
# For Cursor
ln -s /path/to/this/repo/.cursor/skills ~/.cursor/skills

# For Claude
ln -s /path/to/this/repo/.cursor/skills ~/.claude/skills
```

## Usage

Skills are automatically activated by agents when relevant tasks are detected. Optional skills can be invoked manually:

```
/supabase-boundaries
/react-state-management-zustand
```

## Skill Structure

Each skill contains:

- `SKILL.md` - Main instructions with frontmatter metadata
- `references/` - Detailed documentation loaded on demand (progressive disclosure)

## License

MIT
