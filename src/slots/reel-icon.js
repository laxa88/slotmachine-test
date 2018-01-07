import * as C from '../constants';

/**
 * The reel's individual symbol.
 */
export default class ReelIcon {
  /**
   * ReelIcon
   * @param {Phaser.Game} game
   * @param {string} frameName
   * @param {number} x
   * @param {number} y
   */
  constructor(game, frameName, x, y) {
    this.sprite = game.add.sprite(x, y, C.SPR_SHEET);
    this.sprite.frameName = frameName;
  }

  /**
   * setSprite
   * @param {string} frameName
   */
  setSprite(frameName) {
    this.sprite.frameName = frameName;
  }
}
