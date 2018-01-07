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
    this.icons = [];
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
        spritePos.x - C.ICON_SIZE/2,
        spritePos.y - C.ICON_SIZE/2,
        C.SPR_SHEET,
        frame
      );

      this.icons.push(sprite);
      currAngle += angleDelta;
    }
  }

  /**
   * update
   */
  update() {

  }
}
