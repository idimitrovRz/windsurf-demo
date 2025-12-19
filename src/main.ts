import { createPixiApp } from "./engine/app/create-app";
import { GameApp } from "./engine/app/game-app";
import { logger } from "./shared/log";

async function main(): Promise<void> {
  logger.info("Starting slot game");

  const { app, destroy } = await createPixiApp({
    width: 1280,
    height: 720,
    backgroundColor: 0x0f0f1e,
    resolution: window.devicePixelRatio || 1,
  });

  document.body.appendChild(app.canvas);

  const gameApp = new GameApp(app);
  await gameApp.init();

  window.addEventListener("beforeunload", () => {
    gameApp.destroy();
    destroy();
  });
}

main().catch((error) => {
  console.error("Failed to start game:", error);
});
