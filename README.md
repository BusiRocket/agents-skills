# Agent Skills

A collection of reusable Agent Skills for TypeScript/React/Next.js/Rust/Tauri
projects. These skills follow the [Agent Skills](https://agentskills.io/) format
and are compatible with Cursor, Claude Code, Codex, GitHub Copilot, Gemini CLI,
and other Agent Skills-compatible tools.

## Skill discovery (autodescubribles)

The repo is self-discoverable so agents and tools can see what skills exist
without cloning and running scripts:

- **[llms.txt](llms.txt)** – Human- and machine-readable index at repo root.
  Lists each skill with name, description, and path to `SKILL.md`. Regenerate
  with `yarn generate:llms-txt` after adding or changing skills.
- **[available_skills.xml](available_skills.xml)** – `<available_skills>` XML
  for
  [injecting into agent system prompts](https://agentskills.io/integrate-skills).
  Regenerate with `yarn to-prompt:file`. For correct `<location>` paths on your
  machine, run `yarn to-prompt` after cloning (or use the installed skill paths
  from `npx skills add`).

Both files are committed so consumers can fetch them from the repo (e.g. raw
GitHub URL) for discovery; the
[Agent Skills specification](https://agentskills.io/specification) describes
discovery, metadata loading, and activation.

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

- `yarn build` - Full pipeline: format, version check, validate, generate
  `llms.txt`, generate `available_skills.xml`. Run before release or when
  preparing the repo.
- `npm run format` - Format all Markdown files with Prettier
- `npm run format:check` - Check Markdown formatting without writing
  (CI-friendly)
- `yarn generate:llms-txt` - Regenerate [llms.txt](llms.txt) from skill
  frontmatter (Node-only). Run after adding or editing skills.
- `yarn to-prompt` - Generate `<available_skills>` XML for all skills (stdout).
  Redirect to a file or pipe as needed. See
  [Integrate skills into your agent](https://agentskills.io/integrate-skills)
  for how to use the output in agent system prompts. Uses the same venv as
  `yarn validate` if present.
- `yarn to-prompt:file` - Generate and write
  [available_skills.xml](available_skills.xml) at repo root (for discovery and
  CI). Uses same venv as `yarn validate`.
- `yarn validate` - Validate all skills with
  [skills-ref](https://github.com/agentskills/agentskills/tree/main/skills-ref)
  (frontmatter, naming). Uses the project venv if present (see below).
- `yarn validate:install` - Create a Python venv at `.venv-validate` and install
  `skills-ref`. Run once; then `yarn validate` and `yarn to-prompt` use it.
  Requires Python 3.11+ on PATH.
- `yarn validate:uninstall` - Remove the `.venv-validate` venv.
- `yarn version:check` - Ensure `package.json` version matches
  `metadata.version` in each skill's SKILL.md frontmatter. Fails if any skill is
  out of sync (used by `yarn build`).

## Skill Structure

Each skill contains:

- `SKILL.md` - Main instructions with frontmatter metadata
- `rules/` - Rule files loaded on demand (progressive disclosure)

## Skill Authoring Best Practices

This repo follows
[Claude skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices).
Checklist for maintainers:

- [ ] Descriptions in third person (e.g. "Applies…", "Enforces…")
- [ ] References one level deep (SKILL.md → rules only; no rule → rule links)
- [ ] Forward slashes in paths (no Windows-style `\`)
- [ ] Table of contents in rule files longer than 100 lines
- [ ] No time-sensitive content (dates, "before/after X version")
- [ ] Consistent terminology (route handler, services/, utils/, types/)

## License

MIT
