import { Container, Graphics, Text } from "pixi.js";

type ButtonState = "idle" | "hover" | "pressed" | "disabled";

export class SpinButton {
  private readonly container: Container;
  private readonly background: Graphics;
  private readonly label: Text;
  private state: ButtonState = "idle";
  private clickCallback: (() => void) | null = null;

  constructor() {
    this.container = new Container();
    this.background = new Graphics();
    this.label = new Text({
      text: "SPIN",
      style: {
        fontFamily: "Arial",
        fontSize: 32,
        fontWeight: "bold",
        fill: 0xffffff,
      },
    });

    this.label.anchor.set(0.5);
    this.container.addChild(this.background);
    this.container.addChild(this.label);

    this.setupInteractivity();
    this.updateVisuals();
  }

  public getContainer(): Container {
    return this.container;
  }

  public setEnabled(enabled: boolean): void {
    this.setState(enabled ? "idle" : "disabled");
  }

  public onClick(callback: () => void): void {
    this.clickCallback = callback;
  }

  public destroy(): void {
    this.container.removeAllListeners();
    this.background.destroy();
    this.label.destroy();
    this.container.destroy({ children: true });
  }

  private setState(newState: ButtonState): void {
    if (this.state === newState) {
      return;
    }

    this.state = newState;
    this.updateVisuals();
    this.updateInteractivity();
  }

  private setupInteractivity(): void {
    this.container.eventMode = "static";
    this.container.cursor = "pointer";

    this.container.on("pointerdown", this.onPointerDown);
    this.container.on("pointerup", this.onPointerUp);
    this.container.on("pointerupoutside", this.onPointerUpOutside);
    this.container.on("pointerover", this.onPointerOver);
    this.container.on("pointerout", this.onPointerOut);
  }

  private updateInteractivity(): void {
    if (this.state === "disabled") {
      this.container.eventMode = "none";
      this.container.cursor = "default";
    } else {
      this.container.eventMode = "static";
      this.container.cursor = "pointer";
    }
  }

  private updateVisuals(): void {
    this.background.clear();

    const width = 200;
    const height = 80;
    const radius = 10;

    let fillColor: number;
    let strokeColor: number;
    let labelColor: number;

    switch (this.state) {
      case "idle":
        fillColor = 0x2ecc71;
        strokeColor = 0x27ae60;
        labelColor = 0xffffff;
        break;
      case "hover":
        fillColor = 0x3ae374;
        strokeColor = 0x2ecc71;
        labelColor = 0xffffff;
        break;
      case "pressed":
        fillColor = 0x27ae60;
        strokeColor = 0x229954;
        labelColor = 0xdddddd;
        break;
      case "disabled":
        fillColor = 0x7f8c8d;
        strokeColor = 0x95a5a6;
        labelColor = 0xbdc3c7;
        break;
    }

    this.background.roundRect(-width / 2, -height / 2, width, height, radius);
    this.background.fill({ color: fillColor });

    this.background.roundRect(-width / 2, -height / 2, width, height, radius);
    this.background.stroke({ color: strokeColor, width: 4 });

    this.label.style.fill = labelColor;
  }

  private onPointerDown = (): void => {
    if (this.state !== "disabled") {
      this.setState("pressed");
    }
  };

  private onPointerUp = (): void => {
    if (this.state === "pressed") {
      this.setState("hover");
      if (this.clickCallback) {
        this.clickCallback();
      }
    }
  };

  private onPointerUpOutside = (): void => {
    if (this.state === "pressed") {
      this.setState("idle");
    }
  };

  private onPointerOver = (): void => {
    if (this.state === "idle") {
      this.setState("hover");
    }
  };

  private onPointerOut = (): void => {
    if (this.state === "hover") {
      this.setState("idle");
    }
  };
}
