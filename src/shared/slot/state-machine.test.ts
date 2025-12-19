import { describe, it, expect } from "vitest";
import {
  createInitialState,
  spinReducer,
  canSpin,
  isSpinning,
  isSettled,
} from "./state-machine";
import type { SpinResult } from "../types/slot";

describe("spinReducer", () => {
  const mockResult: SpinResult = {
    reelStops: [0, 1, 2, 3, 4],
    winAmount: 100,
  };

  it("should create initial idle state", () => {
    const state = createInitialState();
    expect(state.state).toBe("idle");
    expect(state.result).toBeNull();
  });

  it("should transition from idle to spinning on START_SPIN", () => {
    const state = createInitialState();
    const newState = spinReducer(state, {
      kind: "START_SPIN",
      result: mockResult,
    });

    expect(newState.state).toBe("spinning");
    expect(newState.result).toEqual(mockResult);
  });

  it("should not start spin if already spinning", () => {
    const state = spinReducer(createInitialState(), {
      kind: "START_SPIN",
      result: mockResult,
    });

    const newState = spinReducer(state, {
      kind: "START_SPIN",
      result: mockResult,
    });

    expect(newState).toEqual(state);
  });

  it("should transition from spinning to settled on COMPLETE_SPIN", () => {
    const state = spinReducer(createInitialState(), {
      kind: "START_SPIN",
      result: mockResult,
    });

    const newState = spinReducer(state, { kind: "COMPLETE_SPIN" });

    expect(newState.state).toBe("settled");
    expect(newState.result).toEqual(mockResult);
  });

  it("should not complete spin if not spinning", () => {
    const state = createInitialState();
    const newState = spinReducer(state, { kind: "COMPLETE_SPIN" });

    expect(newState).toEqual(state);
  });

  it("should transition from settled to idle on SETTLE", () => {
    let state = createInitialState();
    state = spinReducer(state, { kind: "START_SPIN", result: mockResult });
    state = spinReducer(state, { kind: "COMPLETE_SPIN" });

    const newState = spinReducer(state, { kind: "SETTLE" });

    expect(newState.state).toBe("idle");
    expect(newState.result).toEqual(mockResult);
  });

  it("should not settle if not in settled state", () => {
    const state = createInitialState();
    const newState = spinReducer(state, { kind: "SETTLE" });

    expect(newState).toEqual(state);
  });

  it("should maintain immutability", () => {
    const state = createInitialState();
    const newState = spinReducer(state, {
      kind: "START_SPIN",
      result: mockResult,
    });

    expect(state.state).toBe("idle");
    expect(newState.state).toBe("spinning");
  });
});

describe("state helpers", () => {
  const mockResult: SpinResult = {
    reelStops: [0, 1, 2, 3, 4],
    winAmount: 100,
  };

  it("canSpin should return true only when idle", () => {
    let state = createInitialState();
    expect(canSpin(state)).toBe(true);

    state = spinReducer(state, { kind: "START_SPIN", result: mockResult });
    expect(canSpin(state)).toBe(false);

    state = spinReducer(state, { kind: "COMPLETE_SPIN" });
    expect(canSpin(state)).toBe(false);

    state = spinReducer(state, { kind: "SETTLE" });
    expect(canSpin(state)).toBe(true);
  });

  it("isSpinning should return true only when spinning", () => {
    let state = createInitialState();
    expect(isSpinning(state)).toBe(false);

    state = spinReducer(state, { kind: "START_SPIN", result: mockResult });
    expect(isSpinning(state)).toBe(true);

    state = spinReducer(state, { kind: "COMPLETE_SPIN" });
    expect(isSpinning(state)).toBe(false);
  });

  it("isSettled should return true only when settled", () => {
    let state = createInitialState();
    expect(isSettled(state)).toBe(false);

    state = spinReducer(state, { kind: "START_SPIN", result: mockResult });
    expect(isSettled(state)).toBe(false);

    state = spinReducer(state, { kind: "COMPLETE_SPIN" });
    expect(isSettled(state)).toBe(true);

    state = spinReducer(state, { kind: "SETTLE" });
    expect(isSettled(state)).toBe(false);
  });
});
