# Style & Imports — Readability and Consistency

## General style
- `const` by default; `let` only when reassignment is necessary.
- Always use curly braces for control flow.
- Prefer template literals over concatenation.
- Prefer object spread over `Object.assign`.

## Imports
- Keep imports at top of file.
- Group order:
  1) external libraries
  2) internal absolute imports (e.g. `src/...` if configured)
  3) relative imports
  4) type-only imports (may be grouped with others but use `import type`)
- Add blank lines between groups.
- Sort named imports alphabetically.
- Avoid duplicate imports.
- Avoid circular dependencies; refactor boundaries if one appears.

## File hygiene
- Keep files focused.
- Avoid “god modules.”
- Extract reusable logic into `src/shared/` only after it is used in more than one place.

## Console/logging
- Direct `console.*` only in debugging. Prefer `src/shared/log.ts` wrapper for production toggling.
