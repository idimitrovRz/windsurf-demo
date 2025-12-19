import type { ReelStripConfig, SymbolType } from "../types/slot";

export const REEL_COUNT = 5 as const;
export const VISIBLE_SYMBOLS = 3 as const;
export const SYMBOL_HEIGHT = 150 as const;
export const SYMBOL_WIDTH = 150 as const;
export const REEL_SPACING = 10 as const;

export const SPIN_DURATION_MS = 2000 as const;
export const REEL_STOP_DELAY_MS = 150 as const;

export const SYMBOL_TYPES: readonly SymbolType[] = [
  "cherry",
  "lemon",
  "orange",
  "plum",
  "bell",
  "bar",
  "seven",
] as const;

export const REEL_STRIPS: readonly ReelStripConfig[] = [
  {
    symbols: [
      "cherry",
      "lemon",
      "orange",
      "plum",
      "bell",
      "bar",
      "seven",
      "cherry",
      "lemon",
      "orange",
    ],
  },
  {
    symbols: [
      "lemon",
      "orange",
      "plum",
      "bell",
      "bar",
      "seven",
      "cherry",
      "lemon",
      "orange",
      "plum",
    ],
  },
  {
    symbols: [
      "orange",
      "plum",
      "bell",
      "bar",
      "seven",
      "cherry",
      "lemon",
      "orange",
      "plum",
      "bell",
    ],
  },
  {
    symbols: [
      "plum",
      "bell",
      "bar",
      "seven",
      "cherry",
      "lemon",
      "orange",
      "plum",
      "bell",
      "bar",
    ],
  },
  {
    symbols: [
      "bell",
      "bar",
      "seven",
      "cherry",
      "lemon",
      "orange",
      "plum",
      "bell",
      "bar",
      "seven",
    ],
  },
] as const;

export const DEFAULT_BALANCE = 1000 as const;
export const DEFAULT_BET = 10 as const;
