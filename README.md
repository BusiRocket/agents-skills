# Agent Skills

A collection of reusable Agent Skills for TypeScript/React/Next.js/Rust/Tauri
projects. These skills follow the [Agent Skills](https://agentskills.io/) format
and are compatible with Cursor, Claude Code, Codex, GitHub Copilot, Gemini CLI,
and other Agent Skills-compatible tools.

## Available Skills

### Core Skills (Auto-activated)

- **`busirocket-core-conventions`** - General engineering conventions, file
  discipline, boundaries, naming/layout, and anti-patterns
- **`busirocket-typescript-standards`** - TypeScript export discipline, type
  conventions, Next.js special-file exceptions
- **`busirocket-react`** - React component and hook structure rules
  (one-component/one-hook per file) plus Zustand state management
- **`busirocket-nextjs`** - Next.js App Router patterns, thin route handlers,
  validation, response shapes
- **`busirocket-validation`** - Validation strategy (Zod schemas, guard helpers)
  at boundaries
- **`busirocket-refactor-workflow`** - Strict refactoring workflow with quality
  gates
- **`busirocket-tailwindcss-v4`** - Tailwind CSS v4 setup and styling strategy
- **`busirocket-rust`** - Rust language and module standards
  (one-thing-per-file, SQL/prompt separation, boundaries)
- **`busirocket-tauri`** - Tauri-specific layout and commands checklist (desktop
  apps)

### Optional Skills (Manual invocation only)

- **`busirocket-supabase`** - Supabase access patterns and service boundaries
  (use `/busirocket-supabase` when working with Supabase)

## Installation

### Recommended: Using npx skills add

The easiest way to install these skills is using the official installer, which
automatically detects and installs to all compatible agents:

```bash
npx skills add BusiRocket/agents-skills
```

Or use the deprecated (but still working) command:

```bash
npx add-skill BusiRocket/agents-skills
```

The installer will:

- Detect all compatible agents on your system (Cursor, Claude Code, Codex,
  GitHub Copilot, etc.)
- Let you select which skills to install
- Install them globally or per-project
- Create symlinks automatically

## Usage

Skills are automatically activated by agents when relevant tasks are detected.
Optional skills can be invoked manually:

```
/busirocket-supabase
```

Zustand state management patterns are included in **`busirocket-react`**; use
`/busirocket-react` when working with Zustand.

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

- `npm run format` - Format all Markdown files with Prettier
- `npm run format:check` - Check Markdown formatting without writing
  (CI-friendly)

## Skill Structure

Each skill contains:

- `SKILL.md` - Main instructions with frontmatter metadata
- `rules/` - Rule files loaded on demand (progressive disclosure)

## Skill Authoring Best Practices

This repo follows [Claude skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices). Checklist for maintainers:

- [ ] Descriptions in third person (e.g. "Applies…", "Enforces…")
- [ ] References one level deep (SKILL.md → rules only; no rule → rule links)
- [ ] Forward slashes in paths (no Windows-style `\`)
- [ ] Table of contents in rule files longer than 100 lines
- [ ] No time-sensitive content (dates, "before/after X version")
- [ ] Consistent terminology (route handler, services/, utils/, types/)

## License

MIT
