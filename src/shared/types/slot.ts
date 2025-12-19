export type SpinState = "idle" | "spinning" | "settled";

export type SymbolType =
  | "cherry"
  | "lemon"
  | "orange"
  | "plum"
  | "bell"
  | "bar"
  | "seven";

export type ReelConfig = {
  readonly symbolCount: number;
  readonly visibleSymbols: number;
  readonly symbolHeight: number;
};

export type ReelStripConfig = {
  readonly symbols: readonly SymbolType[];
};

export type SpinResult = {
  readonly reelStops: readonly number[];
  readonly winAmount: number;
};

export type SpinStateData = {
  readonly state: SpinState;
  readonly result: SpinResult | null;
};

export type SpinAction =
  | { readonly kind: "START_SPIN"; readonly result: SpinResult }
  | { readonly kind: "COMPLETE_SPIN" }
  | { readonly kind: "SETTLE" };
