# Pixi Engine — Conventions (PixiJS v8)

## App creation
- One Pixi `Application` per game instance.
- `Application` creation should be in a dedicated factory (e.g., `createPixiApp`).

## Scene management
- Scenes are responsible for their own containers and children.
- Scenes must support deterministic teardown:
  - remove from parent
  - stop animations/tickers
  - destroy Pixi objects with correct options

## Resource management
- No texture/sprite recreation on repeated actions (e.g., spins). Reuse.
- Explicitly destroy:
  - Containers/Sprites/Graphics where appropriate
  - RenderTextures when no longer needed

## Event handling
- Use Pixi event mode intentionally and remove listeners on destroy.
- No orphaned handlers.

## Timing
- Use the Pixi ticker as the single source of frame updates.
- Do not create nested tickers for subfeatures unless there is a hard justification.
- Prefer injecting `dt` into update functions rather than reading global time.

## Coordinate/layout
- Keep layout math pure and testable where possible (helpers in shared).
- Avoid DOM measurements in the frame loop.

## Interop with @pixi/ui
- Wrap Pixi UI widgets behind small adapters so engine code remains testable.
