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
   */
  constructor(game, iconCount, centerPoint, radius) {
    this.game = game;
    this.icons = this.game.add.group();
    this.radius = radius;

    const angleDelta = 360 / iconCount;
    let currAngle = 0;

    for (let i = 0; i < iconCount; i++) {
      console.log(i, currAngle);

      const spritePos = H.getCircumferencePosition(
        currAngle,
        radius,
        centerPoint
      );

      const frameIndex = Math.floor(Math.random() * C.ICON_DATA.length);
      const frame = C.ICON_DATA[frameIndex].key;

      const sprite = this.game.add.sprite(
        spritePos.x,
        spritePos.y,
        C.SPR_SHEET,
        frame
      );

      sprite.anchor = new Phaser.Point(0.5, 0.5);
      sprite.rotation = H.toRadians(currAngle);

      this.icons.add(sprite);

      currAngle += angleDelta;
    }
  }

  /**
   * update
   */
  update() {

  }
}
