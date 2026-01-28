# Modal Pattern with Zustand

Modals should consume store state directly:

```tsx
// The modal reads its own visibility from the store
export function JsonModal({ resolvedTheme }: JsonModalProps) {
  const isOpen = useUiStore((state) => state.isJsonModalOpen)
  const closeModal = useUiStore((state) => state.closeJsonModal)
  // ...
}
```

## Guidelines

- Modals should read their visibility state from stores, not receive as props.
- This avoids prop drilling and makes modal state globally accessible.
