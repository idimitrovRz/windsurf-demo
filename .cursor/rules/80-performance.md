# Performance — Web Game Constraints

## Frame loop rules
- No per-frame allocations unless justified.
  - Avoid creating arrays/objects in `update(dt)` loops.
- Prefer reusing objects and object pools for frequently spawned display items.

## Rendering rules
- Reuse sprites, containers, and textures.
- Prefer visibility toggles and state changes over rebuilds.
- Batch updates; avoid deep tree churn per frame.

## Asset loading
- Preload critical assets before gameplay/spins.
- Lazy-load non-critical cosmetics behind an explicit boundary.
- Avoid blocking the main thread during active spins.

## React↔Pixi synchronization
- React should not cause per-frame rerenders.
- Use event-based updates:
  - settings changed → engine applies once
- Use stable references and avoid passing new objects every render.

## Diagnostics
- If adding instrumentation:
  - keep it behind a feature flag
  - do not ship verbose logs by default
