import * as C from '../constants';

/**
 * The slot machine reel that houses a list of symbols.
 */
export default class SlotReel {
  /**
   * SlotReel
   * @param {Object[]} icons
   * @param {string} icons[].key the sprite key
   * @param {number} icons[].value the icon's value
   */
  constructor(icons) {
    this.state = C.REEL_IDLE;

    // object pool for each visible symbol in the reel
    this.imageSlots = [];

    // full list of symbols that would appear when the reel is spun.
    this.reelData = [];

    // the next reel symbol to show when the slot is cycled from bottom to top.
    this.reelIndex = 0;

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
}
