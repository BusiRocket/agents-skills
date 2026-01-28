# Zustand State Management Patterns

## When to Use Zustand

- Modal visibility states (settings, json, text, export menu)
- Global UI state (extraction progress, bulk processing)
- Shared data (selected invoice, toolbar config)
- Cross-component communication

## Store Organization

- One store per domain: `uiStore`, `workspaceStore`, `statusLogStore`, etc.
- Keep stores focused; split when they grow too large
- Use selectors to minimize re-renders:
  `useStore((state) => state.specificValue)`
- Actions should be defined in the store, not in components
