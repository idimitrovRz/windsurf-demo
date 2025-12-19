import { easeOutCubic } from "../../shared/utils/math";

export type ReelAnimationConfig = {
  readonly startPosition: number;
  readonly targetPosition: number;
  readonly duration: number;
  readonly spinSpeed: number;
};

export class ReelAnimator {
  private isAnimating = false;
  private elapsedTime = 0;
  private config: ReelAnimationConfig | null = null;
  private currentPosition = 0;
  private onCompleteCallback: (() => void) | null = null;

  public start(config: ReelAnimationConfig, onComplete: () => void): void {
    this.config = config;
    this.currentPosition = config.startPosition;
    this.elapsedTime = 0;
    this.isAnimating = true;
    this.onCompleteCallback = onComplete;
  }

  public update(dt: number): number {
    if (!this.isAnimating || !this.config) {
      return this.currentPosition;
    }

    this.elapsedTime += dt;

    if (this.elapsedTime >= this.config.duration) {
      this.currentPosition = this.config.targetPosition;
      this.isAnimating = false;

      if (this.onCompleteCallback) {
        this.onCompleteCallback();
      }

      return this.currentPosition;
    }

    const progress = this.elapsedTime / this.config.duration;
    const easedProgress = easeOutCubic(progress);

    const totalDistance =
      this.config.targetPosition -
      this.config.startPosition +
      this.config.spinSpeed * this.config.duration;
    const currentDistance = totalDistance * easedProgress;

    this.currentPosition = this.config.startPosition + currentDistance;

    return this.currentPosition;
  }

  public isActive(): boolean {
    return this.isAnimating;
  }

  public stop(): void {
    this.isAnimating = false;
    this.config = null;
    this.onCompleteCallback = null;
  }
}
