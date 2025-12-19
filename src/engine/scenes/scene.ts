import type { Container } from "pixi.js";

export interface Scene {
  mount(container: Container): void;
  update(dt: number): void;
  destroy(): void;
}
