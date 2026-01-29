# Code Style

## Goal

Maintain consistent, readable code across the codebase.

## Style Rules

- English-only code, comments, and identifiers.
- Adhere to SOLID principles (Single Responsibility, Open/Closed, Liskov
  Substitution, Interface Segregation, Dependency Inversion).
- Prefer pure functions and hooks; avoid unnecessary classes.
- Avoid deep nesting; extract early.

## Examples

```typescript
// ✅ Correct - English identifiers, pure function
export const calculateTotal = (items: Item[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0)
}
```

```typescript
// ❌ Incorrect - non-English, class when function would suffice
export class Calculadora {
  calcularTotal(items: Item[]): number {
    // ...
  }
}
```

## Best Practices

- Use English for all code, comments, and identifiers
- Prefer functional programming patterns
- Extract nested logic into separate functions early
