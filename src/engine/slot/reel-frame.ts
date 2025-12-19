import { Container, Graphics } from "pixi.js";
import {
  REEL_COUNT,
  REEL_SPACING,
  SYMBOL_HEIGHT,
  SYMBOL_WIDTH,
  VISIBLE_SYMBOLS,
} from "../../shared/slot/config";

export class ReelFrame {
  private readonly container: Container;
  private readonly graphics: Graphics;

  constructor() {
    this.container = new Container();
    this.graphics = new Graphics();
    this.createFrame();
    this.container.addChild(this.graphics);
  }

  public getContainer(): Container {
    return this.container;
  }

  public destroy(): void {
    this.graphics.destroy();
    this.container.destroy({ children: true });
  }

  private createFrame(): void {
    const width = REEL_COUNT * SYMBOL_WIDTH + (REEL_COUNT - 1) * REEL_SPACING;
    const height = VISIBLE_SYMBOLS * SYMBOL_HEIGHT;
    const padding = 20;

    this.graphics.rect(
      -padding,
      -padding,
      width + padding * 2,
      height + padding * 2,
    );
    this.graphics.fill({ color: 0x1a1a2e });

    this.graphics.rect(
      -padding + 5,
      -padding + 5,
      width + padding * 2 - 10,
      height + padding * 2 - 10,
    );
    this.graphics.fill({ color: 0x16213e });

    this.graphics.rect(0, 0, width, height);
    this.graphics.stroke({ color: 0xffd700, width: 3 });

    this.graphics.rect(-2, -2, width + 4, height + 4);
    this.graphics.stroke({ color: 0xffed4e, width: 1, alpha: 0.5 });
  }
}
