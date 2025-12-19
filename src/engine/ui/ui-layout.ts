import type { Position } from "../../shared/types/common";
import {
  REEL_COUNT,
  REEL_SPACING,
  SYMBOL_HEIGHT,
  SYMBOL_WIDTH,
  VISIBLE_SYMBOLS,
} from "../../shared/slot/config";

export type UILayoutConfig = {
  readonly canvasWidth: number;
  readonly canvasHeight: number;
};

export type UIPositions = {
  readonly reelGrid: Position;
  readonly spinButton: Position;
  readonly balanceDisplay: Position;
  readonly betDisplay: Position;
  readonly winDisplay: Position;
};

export function calculateUILayout(config: UILayoutConfig): UIPositions {
  const gridWidth = REEL_COUNT * SYMBOL_WIDTH + (REEL_COUNT - 1) * REEL_SPACING;
  const gridHeight = VISIBLE_SYMBOLS * SYMBOL_HEIGHT;
  const framePadding = 20;

  const gridX = (config.canvasWidth - gridWidth - framePadding * 2) / 2;
  const gridY = (config.canvasHeight - gridHeight - framePadding * 2) / 2 - 50;

  const buttonY = gridY + gridHeight + framePadding * 2 + 100;

  return {
    reelGrid: { x: gridX, y: gridY },
    spinButton: { x: config.canvasWidth / 2, y: buttonY },
    balanceDisplay: { x: config.canvasWidth / 2 - 250, y: buttonY + 100 },
    betDisplay: { x: config.canvasWidth / 2, y: buttonY + 100 },
    winDisplay: { x: config.canvasWidth / 2 + 250, y: buttonY + 100 },
  };
}
