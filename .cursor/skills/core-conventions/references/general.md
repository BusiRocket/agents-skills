# General Engineering Guidelines

## Core Goal

Optimize for agent context by keeping **many small, focused files** and explicit boundaries.

## Agent Defaults

- Prefer small, safe changes over sweeping refactors unless requested.
- When requirements are ambiguous, ask a clarifying question before coding.
- Avoid adding new dependencies unless explicitly approved.
- Keep changes reversible; avoid touching unrelated files.

## Code Style

- English-only code, comments, and identifiers.
- Prefer pure functions and hooks; avoid unnecessary classes.
- Avoid deep nesting; extract early.

## Repo Hygiene

- No index/barrel files.
- One responsibility per file.
- Keep route handlers thin; move logic to `services/`.

## Quality Gate

- Always run the project's standard checks after meaningful changes (e.g. `yarn check:all`).
