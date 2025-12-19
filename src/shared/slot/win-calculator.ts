import type { SymbolType } from "../types/slot";

export function calculateWin(symbols: SymbolType[][]): number {
  if (symbols.length === 0 || symbols[0].length === 0) {
    return 0;
  }

  const firstSymbol = symbols[0][1];
  let matchCount = 1;

  for (let reelIndex = 1; reelIndex < symbols.length; reelIndex++) {
    const middleSymbol = symbols[reelIndex][1];
    if (middleSymbol === firstSymbol) {
      matchCount++;
    } else {
      break;
    }
  }

  if (matchCount < 3) {
    return 0;
  }

  return getSymbolPayout(firstSymbol, matchCount);
}

function getSymbolPayout(symbol: SymbolType, count: number): number {
  const payouts: Record<SymbolType, Record<number, number>> = {
    cherry: { 3: 10, 4: 20, 5: 50 },
    lemon: { 3: 10, 4: 20, 5: 50 },
    orange: { 3: 15, 4: 30, 5: 75 },
    plum: { 3: 15, 4: 30, 5: 75 },
    bell: { 3: 25, 4: 50, 5: 125 },
    bar: { 3: 50, 4: 100, 5: 250 },
    seven: { 3: 100, 4: 200, 5: 500 },
  };

  return payouts[symbol][count] ?? 0;
}
