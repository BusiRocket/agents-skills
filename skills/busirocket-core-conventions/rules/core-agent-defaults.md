# Agent Defaults

## Goal

Optimize agent behavior for safe, predictable code changes.

## Agent Behavior Rules

- Prefer small, safe changes over sweeping refactors unless requested.
- When requirements are ambiguous, ask a clarifying question before coding.
- Avoid adding new dependencies unless explicitly approved.
- Keep changes reversible; avoid touching unrelated files.

## Examples

```typescript
// ✅ Correct - small, focused change
// Extract helper function to utils/
export const formatDate = (date: Date) => {
  return date.toISOString()
}
```

```typescript
// ❌ Incorrect - sweeping refactor without request
// Refactoring entire codebase structure without explicit request
```

## Best Practices

- Make incremental changes
- Ask for clarification when requirements are unclear
- Get approval before adding dependencies
- Keep changes isolated and reversible
