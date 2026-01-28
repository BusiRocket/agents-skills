# Next.js TS Hygiene

## Goal

Maintain TypeScript hygiene in Next.js projects.

## Next.js TS Hygiene (docs-aligned)

- Do not edit `next-env.d.ts` (it is generated).
- If you need custom `.d.ts`, create a new file and include it in
  `tsconfig.json`.

## Examples

```typescript
// ❌ Incorrect - editing generated file
// next-env.d.ts (DO NOT EDIT)
/// <reference types="next" />
/// <reference types="next/image-types/global" />
// Don't add custom types here!
```

```typescript
// ✅ Correct - custom declaration file
// types/global.d.ts
declare global {
  interface Window {
    myCustomProperty: string
  }
}

export {}
```

```json
// ✅ Correct - include in tsconfig.json
// tsconfig.json
{
  "compilerOptions": {
    // ...
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "types/global.d.ts"]
}
```

## Best Practices

- Never edit `next-env.d.ts`
- Create custom `.d.ts` files when needed
- Include custom declaration files in `tsconfig.json`
