# Overview — Project Context & Non-Negotiables

## Project context
- Runtime: browser
- Stack: React + TypeScript + Vite
- Rendering: PixiJS v8
- UI: @pixi/ui (Pixi-side UI), React (DOM-side UI)
- Animations: motion; GSAP may be added
- Spine: @esotericsoftware/spine-pixi-v8

## Non-negotiables
- Do not use `any`. Use `unknown` + narrowing.
- Do not use `as` type assertions for untrusted/external data. Use runtime validation (Zod) when applicable.
- Do not perform large refactors unless explicitly requested.
- Preserve public APIs unless asked to introduce breaking changes.
- Prioritize: correctness, determinism, performance, readability, testability.

## Output expectations for every task
1) Restate the goal in 1–2 lines.
2) Provide a short plan (3–7 steps).
3) Implement minimal diffs; avoid unrelated changes.
4) Add tests aligned with the change.
5) Provide verification steps (commands + what to check).

## When uncertain
- Ask for the smallest missing detail that blocks progress.
- Otherwise choose the simplest approach consistent with these rules and document assumptions.
