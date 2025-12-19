import type { ReelStripConfig, SymbolType } from "../types/slot";
import { wrap } from "../utils/math";

export function getSymbolAtPosition(
  strip: ReelStripConfig,
  position: number,
): SymbolType {
  const index = wrap(Math.floor(position), strip.symbols.length);
  return strip.symbols[index];
}

export function getVisibleSymbols(
  strip: ReelStripConfig,
  position: number,
  count: number,
): SymbolType[] {
  const symbols: SymbolType[] = [];
  for (let i = 0; i < count; i++) {
    symbols.push(getSymbolAtPosition(strip, position + i));
  }
  return symbols;
}

export function calculateStopPosition(
  stripLength: number,
  targetIndex: number,
): number {
  return wrap(targetIndex, stripLength);
}

export function normalizePosition(
  position: number,
  stripLength: number,
): number {
  return wrap(position, stripLength);
}
