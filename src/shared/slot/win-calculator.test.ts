import { describe, it, expect } from "vitest";
import { calculateWin } from "./win-calculator";
import type { SymbolType } from "../types/slot";

describe("calculateWin", () => {
  it("should return 0 for empty grid", () => {
    expect(calculateWin([])).toBe(0);
  });

  it("should return 0 for no matches", () => {
    const symbols: SymbolType[][] = [
      ["cherry", "cherry", "cherry"],
      ["lemon", "lemon", "lemon"],
      ["orange", "orange", "orange"],
      ["plum", "plum", "plum"],
      ["bell", "bell", "bell"],
    ];
    expect(calculateWin(symbols)).toBe(0);
  });

  it("should return 0 for less than 3 matches", () => {
    const symbols: SymbolType[][] = [
      ["cherry", "cherry", "cherry"],
      ["cherry", "cherry", "cherry"],
      ["lemon", "lemon", "lemon"],
      ["orange", "orange", "orange"],
      ["plum", "plum", "plum"],
    ];
    expect(calculateWin(symbols)).toBe(0);
  });

  it("should calculate win for 3 matching cherries", () => {
    const symbols: SymbolType[][] = [
      ["lemon", "cherry", "orange"],
      ["plum", "cherry", "bell"],
      ["bar", "cherry", "seven"],
      ["lemon", "orange", "plum"],
      ["bell", "bar", "seven"],
    ];
    expect(calculateWin(symbols)).toBe(10);
  });

  it("should calculate win for 4 matching symbols", () => {
    const symbols: SymbolType[][] = [
      ["lemon", "bell", "orange"],
      ["plum", "bell", "cherry"],
      ["bar", "bell", "seven"],
      ["lemon", "bell", "plum"],
      ["bell", "bar", "seven"],
    ];
    expect(calculateWin(symbols)).toBe(50);
  });

  it("should calculate win for 5 matching symbols", () => {
    const symbols: SymbolType[][] = [
      ["lemon", "seven", "orange"],
      ["plum", "seven", "cherry"],
      ["bar", "seven", "bell"],
      ["lemon", "seven", "plum"],
      ["bell", "seven", "bar"],
    ];
    expect(calculateWin(symbols)).toBe(500);
  });

  it("should stop counting at first non-match", () => {
    const symbols: SymbolType[][] = [
      ["lemon", "cherry", "orange"],
      ["plum", "cherry", "bell"],
      ["bar", "cherry", "seven"],
      ["lemon", "lemon", "plum"],
      ["bell", "cherry", "bar"],
    ];
    expect(calculateWin(symbols)).toBe(10);
  });

  it("should use middle row for matching", () => {
    const symbols: SymbolType[][] = [
      ["cherry", "bar", "cherry"],
      ["lemon", "bar", "lemon"],
      ["orange", "bar", "orange"],
      ["plum", "plum", "plum"],
      ["bell", "bell", "bell"],
    ];
    expect(calculateWin(symbols)).toBe(50);
  });
});
