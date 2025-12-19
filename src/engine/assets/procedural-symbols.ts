import { Graphics, RenderTexture } from "pixi.js";
import type { Renderer, Texture } from "pixi.js";
import type { SymbolType } from "../../shared/types/slot";
import { SYMBOL_HEIGHT, SYMBOL_WIDTH } from "../../shared/slot/config";

type SymbolTextures = Record<SymbolType, Texture>;

export function createSymbolTextures(renderer: Renderer): SymbolTextures {
  const textures: Partial<SymbolTextures> = {};

  textures.cherry = createCherryTexture(renderer);
  textures.lemon = createLemonTexture(renderer);
  textures.orange = createOrangeTexture(renderer);
  textures.plum = createPlumTexture(renderer);
  textures.bell = createBellTexture(renderer);
  textures.bar = createBarTexture(renderer);
  textures.seven = createSevenTexture(renderer);

  return textures as SymbolTextures;
}

export function destroySymbolTextures(textures: SymbolTextures): void {
  Object.values(textures).forEach((texture) => {
    texture.destroy(true);
  });
}

function createCherryTexture(renderer: Renderer): Texture {
  const graphics = new Graphics();

  graphics.circle(SYMBOL_WIDTH / 2, SYMBOL_HEIGHT / 2, 40);
  graphics.fill({ color: 0xdc143c });

  graphics.circle(SYMBOL_WIDTH / 2, SYMBOL_HEIGHT / 2, 35);
  graphics.fill({ color: 0xff1744 });

  graphics.rect(0, 0, SYMBOL_WIDTH, SYMBOL_HEIGHT);
  graphics.stroke({ color: 0x333333, width: 2 });

  return renderToTexture(graphics, renderer);
}

function createLemonTexture(renderer: Renderer): Texture {
  const graphics = new Graphics();

  graphics.ellipse(SYMBOL_WIDTH / 2, SYMBOL_HEIGHT / 2, 45, 35);
  graphics.fill({ color: 0xffd700 });

  graphics.ellipse(SYMBOL_WIDTH / 2, SYMBOL_HEIGHT / 2, 40, 30);
  graphics.fill({ color: 0xffed4e });

  graphics.rect(0, 0, SYMBOL_WIDTH, SYMBOL_HEIGHT);
  graphics.stroke({ color: 0x333333, width: 2 });

  return renderToTexture(graphics, renderer);
}

function createOrangeTexture(renderer: Renderer): Texture {
  const graphics = new Graphics();

  graphics.circle(SYMBOL_WIDTH / 2, SYMBOL_HEIGHT / 2, 42);
  graphics.fill({ color: 0xff8c00 });

  graphics.circle(SYMBOL_WIDTH / 2, SYMBOL_HEIGHT / 2, 37);
  graphics.fill({ color: 0xffa500 });

  graphics.rect(0, 0, SYMBOL_WIDTH, SYMBOL_HEIGHT);
  graphics.stroke({ color: 0x333333, width: 2 });

  return renderToTexture(graphics, renderer);
}

function createPlumTexture(renderer: Renderer): Texture {
  const graphics = new Graphics();

  graphics.circle(SYMBOL_WIDTH / 2, SYMBOL_HEIGHT / 2, 40);
  graphics.fill({ color: 0x8b008b });

  graphics.circle(SYMBOL_WIDTH / 2, SYMBOL_HEIGHT / 2, 35);
  graphics.fill({ color: 0x9932cc });

  graphics.rect(0, 0, SYMBOL_WIDTH, SYMBOL_HEIGHT);
  graphics.stroke({ color: 0x333333, width: 2 });

  return renderToTexture(graphics, renderer);
}

function createBellTexture(renderer: Renderer): Texture {
  const graphics = new Graphics();

  graphics.moveTo(SYMBOL_WIDTH / 2, SYMBOL_HEIGHT / 2 - 30);
  graphics.lineTo(SYMBOL_WIDTH / 2 - 35, SYMBOL_HEIGHT / 2 + 20);
  graphics.lineTo(SYMBOL_WIDTH / 2 + 35, SYMBOL_HEIGHT / 2 + 20);
  graphics.closePath();
  graphics.fill({ color: 0xffd700 });

  graphics.rect(SYMBOL_WIDTH / 2 - 10, SYMBOL_HEIGHT / 2 + 20, 20, 10);
  graphics.fill({ color: 0xffd700 });

  graphics.rect(0, 0, SYMBOL_WIDTH, SYMBOL_HEIGHT);
  graphics.stroke({ color: 0x333333, width: 2 });

  return renderToTexture(graphics, renderer);
}

function createBarTexture(renderer: Renderer): Texture {
  const graphics = new Graphics();

  graphics.rect(SYMBOL_WIDTH / 2 - 50, SYMBOL_HEIGHT / 2 - 20, 100, 40);
  graphics.fill({ color: 0x4169e1 });

  graphics.rect(SYMBOL_WIDTH / 2 - 45, SYMBOL_HEIGHT / 2 - 15, 90, 30);
  graphics.fill({ color: 0x6495ed });

  graphics.rect(0, 0, SYMBOL_WIDTH, SYMBOL_HEIGHT);
  graphics.stroke({ color: 0x333333, width: 2 });

  return renderToTexture(graphics, renderer);
}

function createSevenTexture(renderer: Renderer): Texture {
  const graphics = new Graphics();

  graphics.rect(SYMBOL_WIDTH / 2 - 30, SYMBOL_HEIGHT / 2 - 35, 60, 15);
  graphics.fill({ color: 0xff0000 });

  graphics.moveTo(SYMBOL_WIDTH / 2 + 30, SYMBOL_HEIGHT / 2 - 35);
  graphics.lineTo(SYMBOL_WIDTH / 2 - 10, SYMBOL_HEIGHT / 2 + 35);
  graphics.lineTo(SYMBOL_WIDTH / 2 + 10, SYMBOL_HEIGHT / 2 + 35);
  graphics.lineTo(SYMBOL_WIDTH / 2 + 50, SYMBOL_HEIGHT / 2 - 35);
  graphics.closePath();
  graphics.fill({ color: 0xff0000 });

  graphics.rect(0, 0, SYMBOL_WIDTH, SYMBOL_HEIGHT);
  graphics.stroke({ color: 0x333333, width: 2 });

  return renderToTexture(graphics, renderer);
}

function renderToTexture(graphics: Graphics, renderer: Renderer): Texture {
  const renderTexture = RenderTexture.create({
    width: SYMBOL_WIDTH,
    height: SYMBOL_HEIGHT,
  });

  renderer.render({ container: graphics, target: renderTexture });
  graphics.destroy();

  return renderTexture;
}
