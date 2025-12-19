import { Container, Sprite } from "pixi.js";
import type { Texture } from "pixi.js";
import type { ReelStripConfig, SymbolType } from "../../shared/types/slot";
import { getSymbolAtPosition } from "../../shared/slot/reel-math";
import { SYMBOL_HEIGHT, VISIBLE_SYMBOLS } from "../../shared/slot/config";

export class ReelContainer {
  private readonly container: Container;
  private readonly strip: ReelStripConfig;
  private readonly symbolTextures: Record<SymbolType, Texture>;
  private readonly sprites: Sprite[] = [];
  private position: number = 0;

  constructor(
    strip: ReelStripConfig,
    symbolTextures: Record<SymbolType, Texture>,
  ) {
    this.container = new Container();
    this.strip = strip;
    this.symbolTextures = symbolTextures;
    this.initializeSprites();
  }

  public getContainer(): Container {
    return this.container;
  }

  public setPosition(position: number): void {
    this.position = position;
    this.updateSprites();
  }

  public getPosition(): number {
    return this.position;
  }

  public destroy(): void {
    this.sprites.forEach((sprite) => sprite.destroy());
    this.sprites.length = 0;
    this.container.destroy({ children: true });
  }

  private initializeSprites(): void {
    const spriteCount = VISIBLE_SYMBOLS + 2;

    for (let i = 0; i < spriteCount; i++) {
      const sprite = new Sprite();
      sprite.anchor.set(0.5);
      sprite.y = (i - 1) * SYMBOL_HEIGHT;
      this.sprites.push(sprite);
      this.container.addChild(sprite);
    }
  }

  private updateSprites(): void {
    const basePosition = Math.floor(this.position);
    const offset = this.position - basePosition;

    for (let i = 0; i < this.sprites.length; i++) {
      const symbolPosition = basePosition + i - 1;
      const symbolType = getSymbolAtPosition(this.strip, symbolPosition);
      const sprite = this.sprites[i];

      sprite.texture = this.symbolTextures[symbolType];
      sprite.y = (i - 1) * SYMBOL_HEIGHT + offset * SYMBOL_HEIGHT;
    }
  }
}
