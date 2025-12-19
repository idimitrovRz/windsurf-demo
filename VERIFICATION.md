# Verification Guide - Base Slot Game

## Quick Start

```bash
npm install
npm run dev
```

Open your browser to the URL shown (typically `http://localhost:5173`)

---

## Verification Checklist

### ✅ Build & Type Safety
```bash
npm run typecheck  # Should pass with no errors
npm run lint       # Should pass with no errors
npm run test       # Should pass all 59 tests
```

### ✅ Visual Verification

**Expected Behavior:**
1. **Initial State**
   - 5x3 reel grid visible with procedural symbols
   - Decorative frame around reels with golden border
   - Green "SPIN" button below reels
   - Three display panels: BALANCE, BET, WIN
   - Initial balance: $1000, Bet: $10, Win: $0

2. **Spin Interaction**
   - Click SPIN button
   - Button becomes disabled (gray) during spin
   - Reels animate with vertical scrolling
   - Reels stop sequentially (left to right) with ~150ms delay
   - Win amount updates after all reels stop
   - Balance updates (decreases by bet, increases by win)
   - Button re-enables after spin completes

3. **Visual Quality**
   - Modern casino aesthetic
   - Smooth animations with easing
   - Clear visual hierarchy
   - High contrast, readable text
   - No flickering or visual artifacts

### ✅ Performance Verification

**No Per-Frame Allocations:**
- Open browser DevTools → Performance
- Record during spin
- Check memory allocation graph - should be flat during animation
- No spikes in heap size during reel spins

**Single Ticker:**
- Only one Pixi ticker instance running
- Verified in code: `SceneManager` uses app.ticker

**Object Reuse:**
- Symbols are reused, not recreated per spin
- Textures cached at initialization
- Containers and sprites persist across spins

### ✅ Lifecycle Verification

**Deterministic Cleanup:**
```javascript
// In browser console:
// 1. Let game run
// 2. Reload page
// 3. Check console - no errors about orphaned resources
```

**State Machine:**
- Spin only works when state is 'idle'
- Cannot start multiple spins simultaneously
- State transitions: idle → spinning → settled → idle

### ✅ Functional Requirements

**Reels:**
- ✅ 5 independent reels
- ✅ Symbols scroll vertically
- ✅ Deterministic stop order (left → right)
- ✅ 3 visible symbols per reel

**Spin Logic:**
- ✅ Fixed spin duration (~2 seconds)
- ✅ Random stop positions
- ✅ One active spin at a time
- ✅ Button disabled during spin

**Win Calculation:**
- ✅ Checks middle row for matches
- ✅ Requires 3+ consecutive symbols from left
- ✅ Different payouts per symbol type
- ✅ Balance updates correctly

---

## Test Coverage

**Total Tests: 59**

### Unit Tests (Pure Logic)
- ✅ State machine (11 tests)
- ✅ Reel math (14 tests)
- ✅ Win calculator (8 tests)
- ✅ Math utilities (18 tests)
- ✅ Assert utilities (4 tests)
- ✅ UI layout (4 tests)

### Test Execution
```bash
npm run test          # Run all tests once
npm run test:watch    # Run in watch mode
npm run test:ui       # Open Vitest UI
```

---

## Architecture Verification

### Module Boundaries (Strict)
```
✅ src/shared/   - No Pixi, no React dependencies
✅ src/engine/   - Pixi only, no React
✅ No circular dependencies
```

### Lifecycle Pattern
Every component follows:
1. ✅ Create: explicit initialization
2. ✅ Mount: add to parent container
3. ✅ Update: receive dt, update state
4. ✅ Destroy: stop animations, remove listeners, destroy Pixi objects

---

## Known Limitations (By Design)

**Out of Scope (per PRD):**
- ❌ Autoplay
- ❌ Bonus games
- ❌ Free spins
- ❌ Gamble feature
- ❌ Paytable editor
- ❌ Sound settings
- ❌ Advanced animations
- ❌ Networking/persistence
- ❌ Analytics

---

## Troubleshooting

### Issue: Game doesn't start
**Solution:** Check browser console for errors. Ensure all dependencies installed (`npm install`)

### Issue: Symbols not visible
**Solution:** Check that procedural textures are generated. Look for renderer errors in console.

### Issue: Spin button doesn't work
**Solution:** Check state machine is in 'idle' state. Verify balance >= bet amount.

### Issue: Tests fail
**Solution:** Run `npm install` to ensure Vitest is installed. Check Node version (should be 18+).

---

## Performance Metrics

**Expected Performance:**
- 60 FPS during spin animations
- < 100ms initialization time
- < 5MB memory footprint
- No memory leaks across multiple spins

**Verification:**
```bash
# Run dev server
npm run dev

# In browser DevTools:
# 1. Performance tab → Record
# 2. Perform 5-10 spins
# 3. Stop recording
# 4. Check FPS graph (should be steady ~60)
# 5. Check memory (should not grow unbounded)
```

---

## Code Quality Verification

```bash
# Type safety
npm run typecheck    # Strict TypeScript, no 'any'

# Linting
npm run lint         # ESLint + Prettier

# Build
npm run build        # Production build
```

**Expected Results:**
- ✅ Zero TypeScript errors
- ✅ Zero linting errors
- ✅ Clean production build
- ✅ All tests passing

---

## Success Criteria (from PRD)

✅ The slot spins visually and deterministically  
✅ UI is visually polished  
✅ No unnecessary features exist  
✅ TypeScript strict checks pass  
✅ Linting passes  
✅ Tests pass (59/59)  
✅ Resources are cleaned up correctly  
✅ Performance constraints are respected  

**Status: ALL CRITERIA MET ✅**
