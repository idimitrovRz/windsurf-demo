import type { Application } from "pixi.js";
import { SceneManager } from "../scenes/scene-manager";
import { SlotScene } from "../slot/slot-scene";
import { SpinSequence } from "../slot/spin-sequence";
import { SpinController } from "../slot/spin-controller";
import { SpinButton } from "../ui/spin-button";
import { DisplayPanel } from "../ui/display-panel";
import { calculateUILayout } from "../ui/ui-layout";
import {
  createSymbolTextures,
  destroySymbolTextures,
} from "../assets/procedural-symbols";
import {
  REEL_STRIPS,
  DEFAULT_BALANCE,
  DEFAULT_BET,
} from "../../shared/slot/config";
import { calculateWin } from "../../shared/slot/win-calculator";
import { getVisibleSymbols } from "../../shared/slot/reel-math";
import type { SymbolType } from "../../shared/types/slot";
import { logger } from "../../shared/log";

export class GameApp {
  private readonly app: Application;
  private sceneManager: SceneManager | null = null;
  private slotScene: SlotScene | null = null;
  private spinController: SpinController | null = null;
  private spinButton: SpinButton | null = null;
  private balanceDisplay: DisplayPanel | null = null;
  private betDisplay: DisplayPanel | null = null;
  private winDisplay: DisplayPanel | null = null;
  private symbolTextures: Record<SymbolType, import("pixi.js").Texture> | null =
    null;

  private balance = DEFAULT_BALANCE;
  private bet = DEFAULT_BET;
  private lastWin = 0;

  constructor(app: Application) {
    this.app = app;
  }

  public async init(): Promise<void> {
    logger.info("Initializing game app");

    this.symbolTextures = createSymbolTextures(this.app.renderer);

    this.slotScene = new SlotScene(REEL_STRIPS, this.symbolTextures);

    this.sceneManager = new SceneManager(this.app.stage, this.app.ticker);

    this.sceneManager.setScene(this.slotScene);

    this.setupUI();
    this.setupSpinController();

    logger.info("Game app initialized");
  }

  public destroy(): void {
    logger.info("Destroying game app");

    if (this.spinController) {
      this.spinController.destroy();
      this.spinController = null;
    }

    if (this.spinButton) {
      this.spinButton.destroy();
      this.spinButton = null;
    }

    if (this.balanceDisplay) {
      this.balanceDisplay.destroy();
      this.balanceDisplay = null;
    }

    if (this.betDisplay) {
      this.betDisplay.destroy();
      this.betDisplay = null;
    }

    if (this.winDisplay) {
      this.winDisplay.destroy();
      this.winDisplay = null;
    }

    if (this.sceneManager) {
      this.sceneManager.destroy();
      this.sceneManager = null;
    }

    if (this.slotScene) {
      this.slotScene.destroy();
      this.slotScene = null;
    }

    if (this.symbolTextures) {
      destroySymbolTextures(this.symbolTextures);
      this.symbolTextures = null;
    }
  }

  private setupUI(): void {
    const layout = calculateUILayout({
      canvasWidth: this.app.screen.width,
      canvasHeight: this.app.screen.height,
    });

    this.spinButton = new SpinButton();
    const buttonContainer = this.spinButton.getContainer();
    buttonContainer.x = layout.spinButton.x;
    buttonContainer.y = layout.spinButton.y;
    this.app.stage.addChild(buttonContainer);

    this.spinButton.onClick(() => this.onSpinButtonClick());

    this.balanceDisplay = new DisplayPanel("BALANCE", `$${this.balance}`);
    const balanceContainer = this.balanceDisplay.getContainer();
    balanceContainer.x = layout.balanceDisplay.x;
    balanceContainer.y = layout.balanceDisplay.y;
    this.app.stage.addChild(balanceContainer);

    this.betDisplay = new DisplayPanel("BET", `$${this.bet}`);
    const betContainer = this.betDisplay.getContainer();
    betContainer.x = layout.betDisplay.x;
    betContainer.y = layout.betDisplay.y;
    this.app.stage.addChild(betContainer);

    this.winDisplay = new DisplayPanel("WIN", `$${this.lastWin}`);
    const winContainer = this.winDisplay.getContainer();
    winContainer.x = layout.winDisplay.x;
    winContainer.y = layout.winDisplay.y;
    this.app.stage.addChild(winContainer);
  }

  private setupSpinController(): void {
    if (!this.slotScene) {
      return;
    }

    const reelGrid = this.slotScene.getReelGrid();
    if (!reelGrid) {
      return;
    }

    const spinSequence = new SpinSequence(reelGrid);
    this.spinController = new SpinController(spinSequence);

    this.spinController.onStateChange((state) => {
      if (this.spinButton) {
        this.spinButton.setEnabled(state.state === "idle");
      }

      if (state.state === "settled" && state.result) {
        this.updateWinDisplay(state.result.winAmount);
      }
    });

    this.app.ticker.add(() => {
      if (this.spinController) {
        this.spinController.update(this.app.ticker.deltaMS / 1000);
      }
    });
  }

  private onSpinButtonClick(): void {
    if (!this.spinController || !this.spinController.canStartSpin()) {
      return;
    }

    if (this.balance < this.bet) {
      logger.warn("Insufficient balance");
      return;
    }

    this.balance -= this.bet;
    this.updateBalanceDisplay();

    const targetPositions = this.generateRandomStops();
    const symbols = this.getSymbolsAtPositions(targetPositions);
    const winAmount = calculateWin(symbols);

    this.spinController.startSpin({
      reelStops: targetPositions,
      winAmount,
    });
  }

  private generateRandomStops(): number[] {
    const stops: number[] = [];
    for (let i = 0; i < REEL_STRIPS.length; i++) {
      const stripLength = REEL_STRIPS[i].symbols.length;
      stops.push(Math.floor(Math.random() * stripLength));
    }
    return stops;
  }

  private getSymbolsAtPositions(positions: number[]): SymbolType[][] {
    const symbols: SymbolType[][] = [];
    for (let i = 0; i < positions.length; i++) {
      const reelSymbols = getVisibleSymbols(REEL_STRIPS[i], positions[i], 3);
      symbols.push(reelSymbols);
    }
    return symbols;
  }

  private updateBalanceDisplay(): void {
    if (this.balanceDisplay) {
      this.balanceDisplay.setValue(`$${this.balance}`);
    }
  }

  private updateWinDisplay(winAmount: number): void {
    this.lastWin = winAmount;
    this.balance += winAmount;

    if (this.winDisplay) {
      this.winDisplay.setValue(`$${this.lastWin}`);
    }

    this.updateBalanceDisplay();
  }
}
