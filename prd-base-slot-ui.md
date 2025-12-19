# PRD — Base Casino Slot Game UI (PixiJS)

## 1. Purpose & Scope
## Goal
Build a base-only online casino slot game UI using PixiJS (v8) that:
- Looks modern and visually polished
- Has deterministic lifecycle and clean architecture
- Is performant and optimized for web
- Is fully testable according to .cursor/rules/90-testing.md

This is a foundational slot game, not a feature-complete product.

## Explicitly Out of Scope
The following must NOT be implemented:
- Autoplay
- Bonus games
- Free spins
- Gamble/double feature
- Paytable / paylines editor
- Sound settings
- Animations beyond core spin
- Networking / APIs / persistence
- Analytics / telemetry
- Anti-cheat logic
- Multiplayer / social features

If it is not required for a base spin experience, it is excluded.

## 2. Target Platform & Stack
## Platform
- Web (desktop-first)
- Browser runtime

## Tech Stack
- PixiJS ^8.x
- TypeScript (strict)
- Vite
- Optional animation library: motion or GSAP (one per feature)

## Project State
- Initialized via npm create pixi.js@latest
- Default Pixi web template
- Cursor rules (.cursorrules + .cursor/rules/*) already in place

## 3. User Experience (UX)
## Core User Flow
- Player sees slot machine with reels and UI
- Player presses Spin
- Reels animate and stop sequentially
- Win amount updates (even if mocked)
- Player can spin again

## UI Elements (Required)
Element | Description
Reel Grid | 5 reels x 3 rows
Symbols |	Procedural placeholder symbols (no external assets)
Reel Window |	Masked area with subtle frame/glow
Spin Button	| Idle / hover / pressed / disabled
Balance Display |	Static or mock value
Bet Display	| Static or mock value
Win Display	| Updates after spin

## Visual Style
- Modern casino aesthetic
- Depth via gradients, glow, shadows
- Smooth but restrained animation
- Clear visual hierarchy
- High contrast for readability

## 4. Functional Requirements
## Reels
- 5 independent reels
- Symbols scroll vertically
- Symbols reused (no recreation per spin)
- Deterministic stop order (left → right)

## Spin Logic
- Fixed spin duration
- Fixed or seeded stop positions
- No RNG sophistication required
- One active spin at a time
- Spin button disabled during spin

## State Model
- Explicit spin state machine (e.g. Idle → Spinning → Settled)
- No implicit state
- All transitions testable without Pixi

## 5. Technical Architecture
Required Module Boundaries
src/
  engine/
    app/
    scenes/
    slot/
  shared/

## Engine Responsibilities
- Pixi Application lifecycle
- Scene management
- Rendering & animation
- Asset generation/loading
- Ticker coordination

## Slot Logic (Pure)
- Spin state machine / reducer
- Reel math (indexing, wrapping, stop positions)
- Win calculation (can be stubbed)

## Lifecycle Requirements
Every scene/module must:
- Create resources explicitly
- Mount to a parent container
- Update via update(dt)
- Destroy deterministically:
    - stop tickers
    - remove listeners
    - destroy Pixi objects

## 6. Performance Requirements (Non-Negotiable)
- No per-frame object/array allocations
- No texture or sprite recreation during spins
- Reuse containers, sprites, and textures
- Single Pixi ticker
- No nested RAF loops
- Procedural assets cached once
- Explicit cleanup on destroy

Performance comments should be added where non-obvious decisions are made.

## 7. Animation Requirements
- Simple reel spin animation:
    - Scroll + easing
    - Sequential reel stop
- Deterministic duration
- One animation system per feature
- Animations must stop and clean up on destroy
- Optional reduced-motion support (nice-to-have)

## 8. Testing Requirements (per .cursor/rules/90-testing.md)
## Mandatory
- Load and follow .cursor/rules/90-testing.md
- Every requirement in .cursor/rules/90-testing.md must map to:
    - a test file
    - or an explicit justification if not applicable

## Testing Strategy
- Unit tests (Vitest) for:
    - spin state machine
    - reel math
    - sequencing logic
- No pixel-based WebGL tests
- No flaky timing tests
- UI tests only if explicitly required by .cursor/rules/90-testing.md

## Test Qualities
- Deterministic
- Fast
- No reliance on real timers unless mocked

## 9. Deliverables
## Code
- Engine implementation
- Slot scene
- Slot logic modules
- Shared utilities/types

## Tests
- Unit tests mapped to .cursor/rules/90-testing.md

## Documentation
- Inline comments for lifecycle & performance decisions
- Short “How to verify” section in final response

## 10. Acceptance Criteria
The feature is accepted when:
- The slot spins visually and deterministically
- UI is visually polished
- No unnecessary features exist
- Code passes:
    - TypeScript strict checks
    - Linting
    - Tests per .cursor/rules/90-testing.md

- Resources are cleaned up correctly
- Performance constraints are respected