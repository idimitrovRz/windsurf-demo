# Spine (spine-pixi-v8) — Usage and Teardown

## Ownership
- Spine display objects must be created and owned by a scene/module.
- The owner must be responsible for destruction on teardown.

## Lifecycle
- Initialize Spine objects during scene setup, not per-frame.
- Do not recreate skeletons/atlases during repeated animations; reuse.

## Asset strategy
- Load Spine assets via a centralized loader.
- If caching is introduced, it must be explicit and documented (no hidden globals).
- If reference counting is used, it must be deterministic and tested.

## Safety
- Guard against missing animations/skins:
  - fail fast with typed errors or safe fallback
- Avoid brittle stringly-typed animation names:
  - centralize them as `as const` lists or a typed map
