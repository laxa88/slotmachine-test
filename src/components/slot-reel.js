import ReelIcon from './reel-icon';
import * as C from '../constants';

/**
 * The slot machine reel that houses a list of symbols.
 */
export default class SlotReel {
  /**
   * SlotReel
   * @param {Phaser.Game} game
   * @param {Object[]} reelData the list of icons for this reel
   * @param {string} reelData[].key the sprite key
   * @param {number} reelData[].value the icon's value
   * @param {number} centerX
   * @param {number} centerY
   */
  constructor(game, reelData, centerX, centerY) {
    this.state = C.REEL_IDLE;

    this.game = game;
    this.centerX = centerX;
    this.centerY = centerY;

    // full list of symbols that would appear when the reel is spun.
    this.reelData = reelData;

    // the next reel symbol to show when the slot is cycled from bottom to top.
    this.reelIndex = -1;

    // Create object pool of five Symbols in the reel,
    // 3 visible, 1 buffer on top/bottom.
    this.iconPool = [];
    const totalReelHeight = C.REEL_LENGTH * C.ICON_SIZE;
    let currY = this.centerY - (totalReelHeight / 2);

    for (let i = 0; i < C.REEL_LENGTH; i++) {
      const iconData = this.getNextIcon();

      this.iconPool.push(
        new ReelIcon(this.game, iconData.key, this.centerX, currY)
      );

      currY += C.ICON_SIZE;
    }

    // This is the bound where icons will be wrapped to the top.
    this.bottomBound = currY;

    /*
    init 5 Symbol (3 visible, 1 buffer on top/bottom)
      if there are less Symbols than Database, reel will end up showing repeated visible Symbols, and that's okay.
    init position of each Symbol
    init symbolPool with first 7 symbols
    init symbolDatabase to store each Symbol
    init top and bottom position for looping Symbol
    */
  }

  /**
   * update
   */
  update() {
    /*
    if state is SPINNING
      animate symbol movement downward
      if Symbol is below bottom bound
        wrap Symbol to top
        nextSymbolIndex += 1 (wrap by array length)
        Symbol.Symbol.setSprite()
    if state is STOPPING
      animate easing to center position
      on reach center
        particle: 1-time burst stars
        audio: stop reeling sfx
        Machine.reelStopped()
        set state to IDLE
    if state is IDLE
      do nothing
    */

    switch (this.state) {
      case C.REEL_SPINNING: {
        for (let i = 0; i < C.REEL_LENGTH; i++) {
          const icon = this.iconPool[i];
          const delta = this.game.time.physicsElapsed * C.REEL_SPEED;
          icon.sprite.y += delta;

          if (icon.sprite.y > this.bottomBound) {
            icon.sprite.y -= (C.ICON_SIZE * C.REEL_LENGTH);
          }
        }
      }
      break;

      case C.REEL_STOPPING: {

      }
      break;

      default:
      case C.REEL_IDLE: {

      }
      break;
    }
  }

  /**
   * startSpin
   */
  startSpin() {
    /*
    set state to SPINNING
    particle: 1-time burst stars
    event: zoom out to show all reels
    audio: loop reeling sfx
    */
    this.state = C.REEL_SPINNING;
  }

  /**
   * stopSpin
   */
  stopSpin() {
    /*
    set state to STOPPING
    check Symbol at index 3 (center of reels)
      if position is above center, ease to center pos
      else, ease Symbol at index 2 to center pos
    */
  }

  /**
   * Gets next icon in the reelData. If the end of
   * the list is reached, will wrap to the first icon.
   * @return {Object[]} reelData the list of icons for this reel
   * @return {string} reelData[].key the sprite key
   * @return {number} reelData[].value the icon's value
   */
  getNextIcon() {
    this.reelIndex = (this.reelIndex + 1) % this.reelData.length;
    const iconData = this.reelData[this.reelIndex];
    return iconData;
  }
}
