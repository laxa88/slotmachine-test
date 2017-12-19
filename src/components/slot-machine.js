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

    // Init audio
    this.bgm = this.game.add.audio('bgm');
    this.bgm.loop = true;
    this.bgm.play();

    this.sfxDing = this.game.add.audio('ding');
    this.sfxKaching = this.game.add.audio('kaching');
    this.sfxReelSpin = this.game.add.audio('reel-spin');
    this.sfxThump = this.game.add.audio('thump');

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

    // Add event to listen for reel stoppage
    this.game.onReelStopping = new Phaser.Signal();
    this.game.onReelStopped = new Phaser.Signal();

    this.game.onReelStopping.add(this.onReelStopping, this);
    this.game.onReelStopped.add(this.onReelStopped, this);

    // Quick and dirty responsive settings, referenced from:
    // http://www.html5gamedevs.com/topic/19253-how-to-make-a-phaser-game-responsive/
    this.game.scale.scaleMode = Phaser.ScaleManager.aspectRatio;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.setShowAll();
    this.game.scale.refresh();

    this.game.scale.setResizeCallback(this.onScreenResize, this);
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
    if (this.state != C.MACHINE_IDLE) {
      return;
    }

    this.sfxDing.play();

    this.sfxReelSpin.loop = true;
    this.sfxReelSpin.play();

    let nextStopTime = C.REEL_STOP_DELAY;

    this.reels.forEach((reel) => {
      reel.startSpin();

      this.game.time.events.add(nextStopTime, () => {
        reel.stopSpin();
      });

      nextStopTime += C.REEL_STOP_DELAY;
    });

    this.state = C.MACHINE_SPINNING;
    this.spinningReelCount = this.reels.length;

    // initial zoom in. camera will further zoom in on each
    // reel stop, then finally zoom out to original scale once
    // all reels have stopped.
    this.reelZoom = C.REEL_ZOOM_START;
    this.tweenZoomCamera(this.reelZoom, Phaser.Easing.Elastic.Out);
  }

  /**
   * onReelStopping
   */
  onReelStopping() {
    // For each reel that stops, we zoom in closer to
    // the center, emphasising the result!
    const delta = (C.REEL_ZOOM_END - 1.0) / this.reelCount;
    this.reelZoom += delta;
    this.tweenZoomCamera(this.reelZoom, Phaser.Easing.Elastic.Out);

    this.game.camera.flash(0xffffff, 500, true);

    this.sfxThump.play();
  }

  /**
   * onReelStopped
   */
  onReelStopped() {
    this.spinningReelCount--;

    if (this.spinningReelCount === 0) {
      this.sfxReelSpin.stop();
      this.sfxKaching.play();

      // revert to original zoom once done spinning
      this.tweenZoomCamera(1.0, Phaser.Easing.Exponential.Out);

      // allow respin once animation is complete
      this.game.time.events.add(C.REEL_ZOOM_SPEED, () => {
        this.state = C.MACHINE_IDLE;
      });
    }
  }

  /**
   * onScreenResize
   */
  onScreenResize() {
    // Every time the screen changes size, refresh Phaser's scaling
    this.game.scale.setShowAll();
    this.game.scale.refresh();
  }

  /**
   * tweenZoomCamera
   * @param {number} scale
   * @param {method} ease
   */
  tweenZoomCamera(scale, ease) {
    const centerX = this.game.width / 2;
    const centerY = this.game.height / 2;
    const offsetX = (scale - 1.0) * centerX;
    const offsetY = (scale - 1.0) * centerY;

    this.game.add.tween(this.game.camera)
      .to(
        {x: offsetX, y: offsetY},
        C.REEL_ZOOM_SPEED,
        ease
      )
      .start();

    this.game.add.tween(this.game.camera.scale)
      .to(
        {x: scale, y: scale},
        C.REEL_ZOOM_SPEED,
        ease
      )
      .start();
  }
}
