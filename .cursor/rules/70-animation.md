# Animation — motion and optional GSAP

## Principle
Use one primary animation system per feature. Do not mix motion and GSAP within the same feature unless required.

## motion (preferred for UI)
- Use motion for React UI transitions and microinteractions.
- Respect `prefers-reduced-motion`:
  - reduce intensity/duration or disable non-essential motion.

## GSAP (optional)
- If GSAP is added, wrap it:
  - `src/engine/anim/gsap.ts` (engine)
  - `src/ui/anim/gsap.ts` (UI) if needed, but avoid dual usage.
- Timelines must be created and killed deterministically.
- No lingering tickers/RAF loops. No dangling callbacks.

## Engine animations
- Engine animations must stop on `destroy()`.
- Any timeline/animation handle must be tracked and disposed.

## Accessibility
- Ensure “low motion” mode can be enabled via settings.
- Avoid flashing patterns that may be problematic for photosensitivity.
