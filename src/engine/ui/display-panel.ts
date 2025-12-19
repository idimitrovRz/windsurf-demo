import { Container, Graphics, Text } from "pixi.js";

export class DisplayPanel {
  private readonly container: Container;
  private readonly background: Graphics;
  private readonly labelText: Text;
  private readonly valueText: Text;

  constructor(label: string, initialValue: string) {
    this.container = new Container();
    this.background = new Graphics();

    this.labelText = new Text({
      text: label,
      style: {
        fontFamily: "Arial",
        fontSize: 18,
        fill: 0xaaaaaa,
      },
    });

    this.valueText = new Text({
      text: initialValue,
      style: {
        fontFamily: "Arial",
        fontSize: 28,
        fontWeight: "bold",
        fill: 0xffd700,
      },
    });

    this.labelText.anchor.set(0.5, 0);
    this.valueText.anchor.set(0.5, 0);

    this.labelText.y = 10;
    this.valueText.y = 35;

    this.container.addChild(this.background);
    this.container.addChild(this.labelText);
    this.container.addChild(this.valueText);

    this.updateBackground();
  }

  public getContainer(): Container {
    return this.container;
  }

  public setValue(value: string): void {
    this.valueText.text = value;
  }

  public destroy(): void {
    this.background.destroy();
    this.labelText.destroy();
    this.valueText.destroy();
    this.container.destroy({ children: true });
  }

  private updateBackground(): void {
    const width = 180;
    const height = 80;
    const radius = 8;

    this.background.roundRect(-width / 2, 0, width, height, radius);
    this.background.fill({ color: 0x1a1a2e });

    this.background.roundRect(-width / 2, 0, width, height, radius);
    this.background.stroke({ color: 0x3a3a5e, width: 2 });
  }
}
