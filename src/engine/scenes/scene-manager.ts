import type { Container, Ticker } from "pixi.js";
import type { Scene } from "./scene";
import { logger } from "../../shared/log";

export class SceneManager {
  private currentScene: Scene | null = null;
  private readonly rootContainer: Container;
  private readonly ticker: Ticker;

  constructor(rootContainer: Container, ticker: Ticker) {
    this.rootContainer = rootContainer;
    this.ticker = ticker;
    this.ticker.add(this.onTick, this);
  }

  public setScene(scene: Scene): void {
    if (this.currentScene) {
      logger.info("Destroying previous scene");
      this.currentScene.destroy();
      this.rootContainer.removeChildren();
    }

    logger.info("Mounting new scene");
    this.currentScene = scene;
    this.currentScene.mount(this.rootContainer);
  }

  public destroy(): void {
    this.ticker.remove(this.onTick, this);

    if (this.currentScene) {
      this.currentScene.destroy();
      this.currentScene = null;
    }
  }

  private onTick = (ticker: Ticker): void => {
    if (this.currentScene) {
      this.currentScene.update(ticker.deltaMS / 1000);
    }
  };
}
