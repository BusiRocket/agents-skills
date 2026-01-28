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

### Recommended: Using npx skills add

The easiest way to install these skills is using the official installer, which automatically detects and installs to all compatible agents:

```bash
npx skills add BusiRocket/agents-skills
```

Or use the deprecated (but still working) command:

```bash
npx add-skill BusiRocket/agents-skills
```

The installer will:

- Detect all compatible agents on your system (Cursor, Claude Code, Codex, GitHub Copilot, etc.)
- Let you select which skills to install
- Install them globally or per-project
- Create symlinks automatically

## Usage

Skills are automatically activated by agents when relevant tasks are detected. Optional skills can be invoked manually:

```
/busirocket-supabase-boundaries
/busirocket-react-state-management-zustand
```

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
npm install
# or
yarn install
```

### Scripts

- `npm run format` - Format all Markdown files
- `npm run format:check` - Check Markdown formatting without writing
- `npm run validate` - Validate all skills (check SKILL.md structure)
- `npm run check` - Run format check and validation (CI-friendly)
- `npm run check:format` - Only check formatting
- `npm run check:validate` - Only validate skills

## Skill Structure

Each skill contains:

- `SKILL.md` - Main instructions with frontmatter metadata
- `references/` - Detailed documentation loaded on demand (progressive disclosure)

## License

MIT
