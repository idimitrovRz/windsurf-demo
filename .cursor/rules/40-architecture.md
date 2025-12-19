# Architecture — Boundaries and Ownership

## Required module boundaries
- `src/engine/*` : Pixi runtime, scenes, asset loading, rendering lifecycle
- `src/ui/*` : React UI and view models
- `src/shared/*` : shared types/utilities that do not depend on React or Pixi

## Hard rules
- UI (React) must not directly manipulate Pixi display objects.
- Engine must not import React.
- Shared must not import engine or ui (shared is dependency-free).

## Data flow
- React holds user-facing settings state.
- Engine consumes settings via typed contracts (e.g., `SettingsModel`) and applies them to scenes.
- Avoid “push updates every frame” from React; prefer event-based updates.

## Lifecycle ownership
Every resource must have a clear owner:
- who creates it
- who updates it
- who destroys it

Scene/module patterns (preferred)
- `mount(container)`
- `update(dt)`
- `destroy()`

## Anti-patterns
- Global singletons without explicit initialization/teardown
- Side effects at import time (especially engine init)
- Creating additional tickers/RAF loops without a single coordinator
