import { Application } from "pixi.js";

export type PixiAppConfig = {
  readonly width: number;
  readonly height: number;
  readonly backgroundColor: number;
  readonly resolution: number;
};

export type PixiAppInstance = {
  readonly app: Application;
  readonly destroy: () => void;
};

export async function createPixiApp(
  config: PixiAppConfig,
): Promise<PixiAppInstance> {
  const app = new Application();

  await app.init({
    width: config.width,
    height: config.height,
    backgroundColor: config.backgroundColor,
    resolution: config.resolution,
    autoDensity: true,
  });

  const destroy = (): void => {
    app.destroy(true, {
      children: true,
      texture: true,
      textureSource: true,
    });
  };

  return { app, destroy };
}
