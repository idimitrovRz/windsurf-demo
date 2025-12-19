import { describe, it, expect } from "vitest";
import { wrap, clamp, lerp, easeOutCubic, easeInOutCubic } from "./math";

describe("math utilities", () => {
  describe("wrap", () => {
    it("should wrap positive values", () => {
      expect(wrap(5, 5)).toBe(0);
      expect(wrap(7, 5)).toBe(2);
      expect(wrap(10, 5)).toBe(0);
    });

    it("should wrap negative values", () => {
      expect(wrap(-1, 5)).toBe(4);
      expect(wrap(-5, 5)).toBe(0);
      expect(wrap(-7, 5)).toBe(3);
    });

    it("should handle values within range", () => {
      expect(wrap(0, 5)).toBe(0);
      expect(wrap(3, 5)).toBe(3);
      expect(wrap(4, 5)).toBe(4);
    });
  });

  describe("clamp", () => {
    it("should clamp values above max", () => {
      expect(clamp(10, 0, 5)).toBe(5);
      expect(clamp(100, 0, 50)).toBe(50);
    });

    it("should clamp values below min", () => {
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(-100, -50, 0)).toBe(-50);
    });

    it("should not clamp values within range", () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(0, 0, 10)).toBe(0);
      expect(clamp(10, 0, 10)).toBe(10);
    });
  });

  describe("lerp", () => {
    it("should interpolate at t=0", () => {
      expect(lerp(0, 10, 0)).toBe(0);
    });

    it("should interpolate at t=1", () => {
      expect(lerp(0, 10, 1)).toBe(10);
    });

    it("should interpolate at t=0.5", () => {
      expect(lerp(0, 10, 0.5)).toBe(5);
    });

    it("should interpolate with negative values", () => {
      expect(lerp(-10, 10, 0.5)).toBe(0);
    });

    it("should extrapolate beyond range", () => {
      expect(lerp(0, 10, 1.5)).toBe(15);
      expect(lerp(0, 10, -0.5)).toBe(-5);
    });
  });

  describe("easeOutCubic", () => {
    it("should return 0 at t=0", () => {
      expect(easeOutCubic(0)).toBe(0);
    });

    it("should return 1 at t=1", () => {
      expect(easeOutCubic(1)).toBe(1);
    });

    it("should ease out (slow at end)", () => {
      const mid = easeOutCubic(0.5);
      expect(mid).toBeGreaterThan(0.5);
      expect(mid).toBeLessThan(1);
    });
  });

  describe("easeInOutCubic", () => {
    it("should return 0 at t=0", () => {
      expect(easeInOutCubic(0)).toBe(0);
    });

    it("should return 1 at t=1", () => {
      expect(easeInOutCubic(1)).toBe(1);
    });

    it("should return 0.5 at t=0.5", () => {
      expect(easeInOutCubic(0.5)).toBe(0.5);
    });

    it("should ease in and out", () => {
      const quarter = easeInOutCubic(0.25);
      const threeQuarter = easeInOutCubic(0.75);

      expect(quarter).toBeLessThan(0.25);
      expect(threeQuarter).toBeGreaterThan(0.75);
    });
  });
});
