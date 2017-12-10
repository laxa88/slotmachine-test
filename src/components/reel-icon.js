/**
 * The reel's individual symbol.
 */
export default class ReelIcon {
  /**
   * ReelIcon
   * @param {Phaser.Game} game
   * @param {string} spriteId
   * @param {number} x
   * @param {number} y
   * @param {string} defaultSpriteKey
   */
  constructor(game, spriteId, x, y, defaultSpriteKey) {
    this.sprite = game.add.sprite(x, y, defaultSpriteKey);
  }

  /**
   * setSprite
   * @param {Phaser.Sprite} sprite
   */
  setSprite(sprite) {
    this.sprite = sprite;
  }
}
