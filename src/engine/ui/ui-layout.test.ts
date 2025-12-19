import { describe, it, expect } from "vitest";
import { calculateUILayout } from "./ui-layout";

describe("ui-layout", () => {
  describe("calculateUILayout", () => {
    it("should calculate positions for standard canvas", () => {
      const layout = calculateUILayout({
        canvasWidth: 1280,
        canvasHeight: 720,
      });

      expect(layout.reelGrid).toBeDefined();
      expect(layout.spinButton).toBeDefined();
      expect(layout.balanceDisplay).toBeDefined();
      expect(layout.betDisplay).toBeDefined();
      expect(layout.winDisplay).toBeDefined();
    });

    it("should center spin button horizontally", () => {
      const layout = calculateUILayout({
        canvasWidth: 1280,
        canvasHeight: 720,
      });

      expect(layout.spinButton.x).toBe(640);
    });

    it("should position displays horizontally spaced", () => {
      const layout = calculateUILayout({
        canvasWidth: 1280,
        canvasHeight: 720,
      });

      expect(layout.balanceDisplay.x).toBeLessThan(layout.betDisplay.x);
      expect(layout.betDisplay.x).toBeLessThan(layout.winDisplay.x);
    });

    it("should handle different canvas sizes", () => {
      const smallLayout = calculateUILayout({
        canvasWidth: 800,
        canvasHeight: 600,
      });

      const largeLayout = calculateUILayout({
        canvasWidth: 1920,
        canvasHeight: 1080,
      });

      expect(smallLayout.spinButton.x).toBeLessThan(largeLayout.spinButton.x);
    });
  });
});
