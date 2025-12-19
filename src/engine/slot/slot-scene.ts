import { Container } from "pixi.js";
import type { Texture } from "pixi.js";
import type { Scene } from "../scenes/scene";
import type { ReelStripConfig, SymbolType } from "../../shared/types/slot";
import { ReelGrid } from "./reel-grid";
import { ReelFrame } from "./reel-frame";

export class SlotScene implements Scene {
  private container: Container | null = null;
  private reelGrid: ReelGrid | null = null;
  private reelFrame: ReelFrame | null = null;

  constructor(
    private readonly strips: readonly ReelStripConfig[],
    private readonly symbolTextures: Record<SymbolType, Texture>,
  ) {}

  public mount(parentContainer: Container): void {
    this.container = new Container();

    this.reelFrame = new ReelFrame();
    this.reelGrid = new ReelGrid(this.strips, this.symbolTextures);

    const frameContainer = this.reelFrame.getContainer();
    const gridContainer = this.reelGrid.getContainer();

    this.container.addChild(frameContainer);
    this.container.addChild(gridContainer);

    this.container.x = 100;
    this.container.y = 100;

    parentContainer.addChild(this.container);
  }

  public update(_dt: number): void {}

  public getReelGrid(): ReelGrid | null {
    return this.reelGrid;
  }

  public destroy(): void {
    if (this.reelGrid) {
      this.reelGrid.destroy();
      this.reelGrid = null;
    }

    if (this.reelFrame) {
      this.reelFrame.destroy();
      this.reelFrame = null;
    }

    if (this.container) {
      this.container.destroy({ children: true });
      this.container = null;
    }
  }
}
