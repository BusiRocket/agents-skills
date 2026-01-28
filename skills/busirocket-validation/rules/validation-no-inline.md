# No Inline Validation

## Goal

Keep validation logic out of components and hooks to maintain separation of
concerns.

## Anti-Pattern: Inline Validation

```typescript
// ❌ Incorrect - inline validation in component
export const UserForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    // Inline validation logic
    if (!email.includes("@")) {
      alert("Invalid email");
      return;
    }
    // ...
  };

  return <form onSubmit={handleSubmit}>...</form>;
};
```

## Correct Pattern: Extract to Utils/Services

```typescript
// ✅ Correct - validation in utils
// utils/validation/isValidEmail.ts
export const isValidEmail = (value: string): boolean => {
  return value.includes("@") && value.includes(".");
};

// components/UserForm.tsx
import { isValidEmail } from "utils/validation/isValidEmail";

export const UserForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!isValidEmail(email)) {
      alert("Invalid email");
      return;
    }
    // ...
  };

  return <form onSubmit={handleSubmit}>...</form>;
};
```

## For Complex Validation: Use Zod

```typescript
// ✅ Correct - Zod schema for complex validation
// types/user/UserSchema.ts
import { z } from "zod"

export const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
})

// services/user/createUser.ts
import { UserSchema } from "types/user/UserSchema"

export const createUser = async (data: unknown) => {
  const result = UserSchema.safeParse(data)
  if (!result.success) {
    return { error: result.error.format() }
  }
  // ...
}
```

## Rules

- No inline validation logic inside components/hooks
- Extract simple checks to `utils/validation/` guards
- Use Zod schemas for complex validation in services
- If validation logic grows, split into dedicated helpers (one function per
  file)
