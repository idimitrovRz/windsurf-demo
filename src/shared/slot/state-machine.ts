import type { SpinAction, SpinStateData } from "../types/slot";
import { assertNever } from "../utils/assert";

export function createInitialState(): SpinStateData {
  return {
    state: "idle",
    result: null,
  };
}

export function spinReducer(
  state: SpinStateData,
  action: SpinAction,
): SpinStateData {
  switch (action.kind) {
    case "START_SPIN":
      if (state.state !== "idle") {
        return state;
      }
      return {
        state: "spinning",
        result: action.result,
      };

    case "COMPLETE_SPIN":
      if (state.state !== "spinning") {
        return state;
      }
      return {
        state: "settled",
        result: state.result,
      };

    case "SETTLE":
      if (state.state !== "settled") {
        return state;
      }
      return {
        state: "idle",
        result: state.result,
      };

    default:
      assertNever(action);
  }
}

export function canSpin(state: SpinStateData): boolean {
  return state.state === "idle";
}

export function isSpinning(state: SpinStateData): boolean {
  return state.state === "spinning";
}

export function isSettled(state: SpinStateData): boolean {
  return state.state === "settled";
}
