import type { SpinResult, ReelStripConfig, SymbolType } from "./types/slot";

export function createMockSpinResult(
  overrides?: Partial<SpinResult>,
): SpinResult {
  return {
    reelStops: [0, 1, 2, 3, 4],
    winAmount: 0,
    ...overrides,
  };
}

export function createMockReelStrip(symbols?: SymbolType[]): ReelStripConfig {
  return {
    symbols: symbols ?? ["cherry", "lemon", "orange", "plum", "bell"],
  };
}

export function createSeededRandom(seed: number): () => number {
  let current = seed;
  return () => {
    current = (current * 9301 + 49297) % 233280;
    return current / 233280;
  };
}
