import SlotReel from './slot-reel';
import * as C from '../constants';

/**
 * The slot machine that houses a list of reels.
 */
export default class SlotMachine {
  /**
   * SlotMachine
   * @param {Phaser.Game} game
   * @param {number} reelCount number of reels in this slot machine
   * @param {number} reelLength number of icons per reel
   */
  constructor(game, reelCount, reelLength) {
    this.game = game;
    this.reelCount = reelCount;
    this.reelLength = reelLength;

    this.reels = [];
    for (let i = 0; i < this.reelCount; i++) {
      const icons = [];

      for (let j = 0; j < this.reelLength; j++) {
        const dataIndex = Math.floor(Math.random() * C.ICON_DATA.length);
        icons.push(C.ICON_DATA[dataIndex]);
      }

      this.reels.push(
        new SlotReel(icons)
      );
    }

    this.foreground = this.game.add.image(0, 0, 'slotmachine-foreground');
  }

  /**
   * update
   */
  update() {
    for (let i = 0; i < this.reelCount; i++) {
      this.reels[i].update();
    }
  }

  /**
   * startSpin
   */
  startSpin() {
    /*
    for each reel
      reel.startSpin()
      audio: lever pull
    */
  }

  /**
   * reelStopped
   */
  reelStopped() {
    /*
    zoom in toward center, based on % of reels, e.g.
      1/3 reel stopped = 10% zoom
      2/3 reel stopped = 20% zoom
      3/3 reel stopped = 30% zoom
    shake screen lol
    */
  }

  /**
   * onScreenResize
   */
  onScreenResize() {
    /*
    get screen ratio
    compare against intended resolution ()
    */
  }
}
