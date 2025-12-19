import { ReelAnimator } from "./reel-animator";
import type { ReelGrid } from "./reel-grid";
import {
  REEL_COUNT,
  REEL_STOP_DELAY_MS,
  SPIN_DURATION_MS,
} from "../../shared/slot/config";

export type SpinSequenceConfig = {
  readonly targetPositions: readonly number[];
};

export class SpinSequence {
  private readonly animators: ReelAnimator[] = [];
  private readonly reelGrid: ReelGrid;
  private isSpinning = false;
  private reelsCompleted = 0;
  private onCompleteCallback: (() => void) | null = null;

  constructor(reelGrid: ReelGrid) {
    this.reelGrid = reelGrid;

    for (let i = 0; i < REEL_COUNT; i++) {
      this.animators.push(new ReelAnimator());
    }
  }

  public start(config: SpinSequenceConfig, onComplete: () => void): void {
    if (this.isSpinning) {
      return;
    }

    this.isSpinning = true;
    this.reelsCompleted = 0;
    this.onCompleteCallback = onComplete;

    for (let i = 0; i < REEL_COUNT; i++) {
      const startPosition = this.reelGrid.getReelPosition(i);
      const delay = i * REEL_STOP_DELAY_MS;

      setTimeout(() => {
        this.animators[i].start(
          {
            startPosition,
            targetPosition: config.targetPositions[i],
            duration: SPIN_DURATION_MS / 1000,
            spinSpeed: 20,
          },
          () => this.onReelComplete(),
        );
      }, delay);
    }
  }

  public update(dt: number): void {
    if (!this.isSpinning) {
      return;
    }

    for (let i = 0; i < REEL_COUNT; i++) {
      const position = this.animators[i].update(dt);
      this.reelGrid.setReelPosition(i, position);
    }
  }

  public isActive(): boolean {
    return this.isSpinning;
  }

  public stop(): void {
    this.isSpinning = false;
    this.animators.forEach((animator) => animator.stop());
    this.onCompleteCallback = null;
  }

  private onReelComplete(): void {
    this.reelsCompleted++;

    if (this.reelsCompleted === REEL_COUNT) {
      this.isSpinning = false;

      if (this.onCompleteCallback) {
        this.onCompleteCallback();
      }
    }
  }
}
