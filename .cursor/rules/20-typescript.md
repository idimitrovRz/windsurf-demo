# TypeScript — Strictness, Patterns, and Guardrails

## Compiler expectations
Assume strict mode and strict flags are enabled.

## Rules
- Never use `any`. Use `unknown` + type guards.
- Prefer `type` for unions and function shapes; use `interface` for object contracts that may be extended.
- Avoid enums. Use union literals:
  - `type Quality = 'low' | 'medium' | 'high'`
- Explicit types for:
  - exported functions/classes
  - module boundaries (engine↔ui↔shared)
  - public methods
- Prefer `readonly` for immutable data.
- Use `as const` for constants and discriminators.

## Discriminated unions + exhaustiveness
- Use a discriminator field (e.g. `kind`) and exhaustiveness checks:
  - `assertNever(x: never): never`

## Nullability
- Use `strictNullChecks` discipline:
  - Optional chaining for optional fields (`?.`)
  - Nullish coalescing for defaults (`??`)
- Avoid boolean traps:
  - Don’t use `value || default` when `0` / `''` are valid.

## Type assertions
- Allowed only for:
  - narrowing after an internal invariant is proven
  - bridging library types where runtime guarantees exist
- Not allowed for:
  - network responses
  - user inputs
  - URL params
  - storage values
Use runtime validation (Zod) when external data is involved.

## Error handling types
- Prefer `Result`-style types or typed errors.
- Do not throw strings.
- Avoid silent catches. Handle and/or rethrow with context.

## Naming
- Use descriptive names; avoid single-letter names except indices.
- Prefix unused params/vars with `_` (e.g. `_evt`).
