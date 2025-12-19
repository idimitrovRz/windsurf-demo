# Testing — Vitest + React Testing Library

## Test strategy
- Prefer fast, deterministic unit tests.
- Test pure logic outside WebGL whenever possible:
  - reducers, layout math, configuration parsing, state machines.

## Vitest
- Use Vitest for:
  - shared utilities
  - engine logic (non-WebGL)
  - deterministic time via fake timers when needed

## React Testing Library
- Use RTL for React components:
  - interactions (click, keyboard)
  - visible state changes
  - accessibility roles/labels

## Engine tests
- Do not write flaky render-timing tests.
- If Pixi objects must be verified:
  - test structure/intent (e.g., created nodes, state flags) rather than pixels
  - keep Pixi-specific logic behind adapters where possible

## Coverage expectations
- New features must add meaningful tests.
- Do not chase coverage with low-value tests; prioritize critical flows.

## Anti-patterns
- Snapshotting massive trees without asserting behavior
- Timing-sensitive assertions without controlling the clock
