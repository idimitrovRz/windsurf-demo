import type { SpinStateData, SpinResult } from "../../shared/types/slot";
import {
  createInitialState,
  spinReducer,
  canSpin,
  isSpinning,
} from "../../shared/slot/state-machine";
import type { SpinSequence } from "./spin-sequence";
import { logger } from "../../shared/log";

export class SpinController {
  private state: SpinStateData;
  private readonly spinSequence: SpinSequence;
  private onStateChangeCallback: ((state: SpinStateData) => void) | null = null;

  constructor(spinSequence: SpinSequence) {
    this.state = createInitialState();
    this.spinSequence = spinSequence;
  }

  public getState(): SpinStateData {
    return this.state;
  }

  public canStartSpin(): boolean {
    return canSpin(this.state) && !this.spinSequence.isActive();
  }

  public startSpin(result: SpinResult): void {
    if (!this.canStartSpin()) {
      logger.warn("Cannot start spin - already spinning or invalid state");
      return;
    }

    logger.info("Starting spin", result);
    this.updateState({ kind: "START_SPIN", result });

    this.spinSequence.start({ targetPositions: result.reelStops }, () =>
      this.onSpinComplete(),
    );
  }

  public onStateChange(callback: (state: SpinStateData) => void): void {
    this.onStateChangeCallback = callback;
  }

  public update(dt: number): void {
    if (isSpinning(this.state)) {
      this.spinSequence.update(dt);
    }
  }

  public destroy(): void {
    this.spinSequence.stop();
    this.onStateChangeCallback = null;
  }

  private onSpinComplete(): void {
    logger.info("Spin animation complete");
    this.updateState({ kind: "COMPLETE_SPIN" });

    setTimeout(() => {
      this.updateState({ kind: "SETTLE" });
    }, 500);
  }

  private updateState(action: Parameters<typeof spinReducer>[1]): void {
    this.state = spinReducer(this.state, action);

    if (this.onStateChangeCallback) {
      this.onStateChangeCallback(this.state);
    }
  }
}
