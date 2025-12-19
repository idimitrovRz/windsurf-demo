import { describe, it, expect } from "vitest";
import { assertNever, assert } from "./assert";

describe("assert utilities", () => {
  describe("assertNever", () => {
    it("should throw error with value", () => {
      const invalidValue = "invalid" as never;
      expect(() => assertNever(invalidValue)).toThrow(
        'Unexpected value: "invalid"',
      );
    });
  });

  describe("assert", () => {
    it("should not throw when condition is true", () => {
      expect(() => assert(true, "Should not throw")).not.toThrow();
    });

    it("should throw when condition is false", () => {
      expect(() => assert(false, "Test failure")).toThrow(
        "Assertion failed: Test failure",
      );
    });

    it("should include message in error", () => {
      expect(() => assert(false, "Custom message")).toThrow("Custom message");
    });
  });
});
