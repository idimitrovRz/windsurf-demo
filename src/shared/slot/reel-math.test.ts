import { describe, it, expect } from "vitest";
import {
  getSymbolAtPosition,
  getVisibleSymbols,
  calculateStopPosition,
  normalizePosition,
} from "./reel-math";
import type { ReelStripConfig } from "../types/slot";

describe("reel-math", () => {
  const testStrip: ReelStripConfig = {
    symbols: ["cherry", "lemon", "orange", "plum", "bell"],
  };

  describe("getSymbolAtPosition", () => {
    it("should return correct symbol at position", () => {
      expect(getSymbolAtPosition(testStrip, 0)).toBe("cherry");
      expect(getSymbolAtPosition(testStrip, 1)).toBe("lemon");
      expect(getSymbolAtPosition(testStrip, 4)).toBe("bell");
    });

    it("should wrap around at strip end", () => {
      expect(getSymbolAtPosition(testStrip, 5)).toBe("cherry");
      expect(getSymbolAtPosition(testStrip, 6)).toBe("lemon");
      expect(getSymbolAtPosition(testStrip, 10)).toBe("cherry");
    });

    it("should handle negative positions", () => {
      expect(getSymbolAtPosition(testStrip, -1)).toBe("bell");
      expect(getSymbolAtPosition(testStrip, -2)).toBe("plum");
      expect(getSymbolAtPosition(testStrip, -5)).toBe("cherry");
    });

    it("should handle fractional positions", () => {
      expect(getSymbolAtPosition(testStrip, 1.5)).toBe("lemon");
      expect(getSymbolAtPosition(testStrip, 2.9)).toBe("orange");
    });
  });

  describe("getVisibleSymbols", () => {
    it("should return correct number of symbols", () => {
      const symbols = getVisibleSymbols(testStrip, 0, 3);
      expect(symbols).toHaveLength(3);
    });

    it("should return symbols in order", () => {
      const symbols = getVisibleSymbols(testStrip, 0, 3);
      expect(symbols).toEqual(["cherry", "lemon", "orange"]);
    });

    it("should wrap around strip end", () => {
      const symbols = getVisibleSymbols(testStrip, 3, 3);
      expect(symbols).toEqual(["plum", "bell", "cherry"]);
    });

    it("should handle position in middle of strip", () => {
      const symbols = getVisibleSymbols(testStrip, 2, 3);
      expect(symbols).toEqual(["orange", "plum", "bell"]);
    });
  });

  describe("calculateStopPosition", () => {
    it("should return position within strip bounds", () => {
      expect(calculateStopPosition(5, 0)).toBe(0);
      expect(calculateStopPosition(5, 3)).toBe(3);
      expect(calculateStopPosition(5, 4)).toBe(4);
    });

    it("should wrap positions beyond strip length", () => {
      expect(calculateStopPosition(5, 5)).toBe(0);
      expect(calculateStopPosition(5, 7)).toBe(2);
      expect(calculateStopPosition(5, 10)).toBe(0);
    });

    it("should handle negative positions", () => {
      expect(calculateStopPosition(5, -1)).toBe(4);
      expect(calculateStopPosition(5, -5)).toBe(0);
    });
  });

  describe("normalizePosition", () => {
    it("should normalize position within bounds", () => {
      expect(normalizePosition(3, 5)).toBe(3);
      expect(normalizePosition(0, 5)).toBe(0);
    });

    it("should wrap large positions", () => {
      expect(normalizePosition(7, 5)).toBe(2);
      expect(normalizePosition(15, 5)).toBe(0);
    });

    it("should wrap negative positions", () => {
      expect(normalizePosition(-1, 5)).toBe(4);
      expect(normalizePosition(-6, 5)).toBe(4);
    });
  });
});
