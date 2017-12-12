import * as C from '../constants';

/**
 * The reel's individual symbol.
 */
export default class ReelIcon {
  /**
   * ReelIcon
   * @param {Phaser.Game} game
   * @param {string} spriteKey
   * @param {number} x
   * @param {number} y
   */
  constructor(game, spriteKey, x, y) {
    this.sprite = game.add.sprite(x, y, C.SPR_SHEET);
    this.sprite.frameName = spriteKey;
  }

  /**
   * setSprite
   * @param {Phaser.Sprite} sprite
   */
  setSprite(sprite) {
    this.sprite = sprite;
  }
}
