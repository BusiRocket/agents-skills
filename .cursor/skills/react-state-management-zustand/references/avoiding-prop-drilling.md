# Avoiding Prop Drilling

Instead of passing callbacks through multiple components:

```tsx
// BAD: Prop drilling
<Parent onOpenModal={setIsOpen}>
  <Child onOpenModal={onOpenModal} />
</Parent>

// GOOD: Store access
const openModal = useUiStore((state) => state.openModal)
```

## Pattern

- Use Zustand stores for shared state instead of prop drilling.
- Access store actions directly in components that need them.
- Avoid passing callbacks through 3+ component levels.
