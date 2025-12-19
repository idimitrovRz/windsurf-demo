import { Container, Graphics } from "pixi.js";
import type { Texture } from "pixi.js";
import type { ReelStripConfig, SymbolType } from "../../shared/types/slot";
import { ReelContainer } from "./reel-container";
import {
  REEL_COUNT,
  REEL_SPACING,
  SYMBOL_HEIGHT,
  SYMBOL_WIDTH,
  VISIBLE_SYMBOLS,
} from "../../shared/slot/config";

export class ReelGrid {
  private readonly container: Container;
  private readonly reels: ReelContainer[] = [];
  private readonly mask: Graphics;

  constructor(
    strips: readonly ReelStripConfig[],
    symbolTextures: Record<SymbolType, Texture>,
  ) {
    this.container = new Container();

    for (let i = 0; i < REEL_COUNT; i++) {
      const reel = new ReelContainer(strips[i], symbolTextures);
      const reelContainer = reel.getContainer();

      reelContainer.x = i * (SYMBOL_WIDTH + REEL_SPACING) + SYMBOL_WIDTH / 2;
      reelContainer.y = (VISIBLE_SYMBOLS * SYMBOL_HEIGHT) / 2;

      this.reels.push(reel);
      this.container.addChild(reelContainer);
    }

    this.mask = this.createMask();
    this.container.addChild(this.mask);
    this.container.mask = this.mask;
  }

  public getContainer(): Container {
    return this.container;
  }

  public setReelPosition(reelIndex: number, position: number): void {
    if (reelIndex >= 0 && reelIndex < this.reels.length) {
      this.reels[reelIndex].setPosition(position);
    }
  }

  public getReelPosition(reelIndex: number): number {
    if (reelIndex >= 0 && reelIndex < this.reels.length) {
      return this.reels[reelIndex].getPosition();
    }
    return 0;
  }

  public destroy(): void {
    this.reels.forEach((reel) => reel.destroy());
    this.reels.length = 0;
    this.mask.destroy();
    this.container.destroy({ children: true });
  }

  private createMask(): Graphics {
    const mask = new Graphics();
    const width = REEL_COUNT * SYMBOL_WIDTH + (REEL_COUNT - 1) * REEL_SPACING;
    const height = VISIBLE_SYMBOLS * SYMBOL_HEIGHT;

    mask.rect(0, 0, width, height);
    mask.fill({ color: 0xffffff });

    return mask;
  }
}
