# Workflow — How to Work With This Repo

## Default implementation flow
PRD/requirements → task breakdown → types & contracts → core logic → integration → tests → docs → verify.

## Patch discipline
- Prefer multiple small patches over one large patch.
- Keep each patch scoped to one feature or fix.
- Avoid drive-by formatting changes unless required.

## Definition of Done (DoD)
- Types: strict TS, no `any`.
- Lint: passes.
- Tests: added/updated; not flaky.
- Lifecycle: resources are created/owned/destroyed deterministically.
- Performance: no per-frame allocations unless justified and documented.

## Standard verification commands
Use the repo scripts. If missing, add them.
- `npm run typecheck`
- `npm run lint`
- `npm run test`
- `npm run dev`

## Communication format for agent responses
- Goal
- Plan
- Files changed (bulleted)
- Notes on lifecycle/performance
- Tests added
- How to verify
