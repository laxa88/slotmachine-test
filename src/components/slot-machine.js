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
   * @param {number} iconCount number of icons per reel
   */
  constructor(game, reelCount, iconCount) {
    this.game = game;
    this.reelCount = reelCount;
    this.iconCount = iconCount;

    this.state = C.MACHINE_IDLE;

    // Based on reelCount, equally space them out from center.
    const reelX = this.game.width / 2;
    const reelY = this.game.height / 2;
    const totalReelWidth = this.reelCount * C.ICON_SIZE;
    let currCenterX = reelX - (totalReelWidth / 2);
    this.reels = [];
    for (let i = 0; i < this.reelCount; i++) {
      const icons = [];

      for (let j = 0; j < this.iconCount; j++) {
        const dataIndex = Math.floor(Math.random() * C.ICON_DATA.length);
        icons.push(C.ICON_DATA[dataIndex]);
      }

      this.reels.push(
        new SlotReel(this.game, icons, currCenterX, reelY)
      );

      currCenterX += C.ICON_SIZE;
    }

    // Cover the reels with a foreground image to hide the reels' edges.
    this.foreground = this.game.add.image(0, 0, C.SPR_FOREGROUND);

    // Finally, add a button that allows the reels to be spun.
    const buttonX = this.game.width - 32;
    const buttonY = this.game.height - 32;
    this.button = this.game.add.button(buttonX, buttonY, C.SPR_BUTTON);
    this.button.onInputUp.add(this.startSpin, this);
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
