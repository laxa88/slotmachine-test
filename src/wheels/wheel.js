import * as C from '../constants';
import * as H from '../helper';

/**
 * Wheel
 */
export default class Wheel {
  /**
   * constructor
   * @param {Phaser.Game} game
   * @param {number} iconCount
   * @param {Phaser.Point} centerPoint
   * @param {number} radius
   * @param {number} scale
   */
  constructor(game, iconCount, centerPoint, radius, scale) {
    this.game = game;
    this.iconCount = iconCount;
    this.centerPoint = centerPoint;
    this.radius = radius;
    this.scale = scale;


    this.state = C.REEL_IDLE;
    this.currRotation = 0;


    // Note: "scale" value above is only used to scale
    // the icons upon initialisation.
    // "icons" group scale inits as 1.0, which we will
    // use to zoom in and out.
    this.icons = this.game.add.group();
    this.icons.centerX = centerPoint.x;
    this.icons.centerY = centerPoint.y;


    const angleDelta = 360 / iconCount;
    let currAngle = 0;

    for (let i = 0; i < iconCount; i++) {
      const spritePos = H.getCircumferencePosition(
        currAngle,
        radius,
        new Phaser.Point()
      );

      const frameIndex = Math.floor(Math.random() * C.ICON_DATA.length);
      const frame = C.ICON_DATA[frameIndex].key;

      const sprite = this.game.add.sprite(
        spritePos.x,
        spritePos.y,
        C.SPR_SHEET,
        frame
      );

      sprite.baseRotationDegrees = currAngle;
      sprite.anchor = new Phaser.Point(0.5, 0.5);
      sprite.scale = new Phaser.Point(this.scale, this.scale);
      sprite.rotation = H.toRadians(currAngle);

      this.icons.add(sprite);

      currAngle += angleDelta;
    }
  }

  /**
   * startSpin
   */
  startSpin() {
    this.state = C.REEL_SPINNING;
  }

  /**
   * updateSpritePosition
   * @param {Phaser.Sprite} sprite
   */
  updateSpritePosition(sprite) {
    const currAngle = sprite.baseRotationDegrees + this.currRotation;

    const spritePos = H.getCircumferencePosition(
      currAngle,
      this.radius,
      new Phaser.Point()
    );

    sprite.position = spritePos;
    sprite.rotation = H.toRadians(currAngle);
  }

  /**
   * update
   */
  update() {
    if (this.state === C.REEL_SPINNING) {
      this.currRotation += C.REEL_SPEED;

      this.icons.forEach((icon) => {
        this.updateSpritePosition(icon);
      });
    }
  }
}
