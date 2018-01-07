import * as C from '../constants';
import * as H from '../helper';
import Wheel from './wheel';

/**
 * WheelMachine
 */
export default class WheelMachine {
  /**
   * constructor
   * @param {Phaser.Game} game
   * @param {number} wheelCount
   * @param {number} iconCount
   */
  constructor(game, wheelCount, iconCount) {
    this.game = game;


    this.state = C.MACHINE_IDLE;


    // Init audio
    this.bgm = this.game.add.audio(C.BGM_DEFAULT);
    this.bgm.loop = true;
    this.bgm.play();

    this.sfxDing = this.game.add.audio(C.SFX_DING);
    this.sfxKaching = this.game.add.audio(C.SFX_KACHING);
    this.sfxReelSpin = this.game.add.audio(C.SFX_REEL_SPIN);
    this.sfxThump = this.game.add.audio(C.SFX_THUMP);


    // Create wheels
    this.wheels = [];

    this.centerPoint = new Phaser.Point(
      this.game.width / 2,
      this.game.height / 2
    );

    let currRadius = 64;
    let currScale = 0.5;
    const scaleDelta = 0.2;

    for (let i = 0; i < wheelCount; i++) {
      this.wheels.push(new Wheel(
        this.game,
        iconCount,
        this.centerPoint,
        currRadius,
        currScale
      ));

      currRadius = this.getNextRadius(
        currRadius,
        C.ICON_SIZE,
        currScale,
        currScale + scaleDelta
      );

      currScale += scaleDelta;
    }


    // Quick and dirty responsive settings, referenced from:
    // http://www.html5gamedevs.com/topic/19253-how-to-make-a-phaser-game-responsive/
    this.game.scale.scaleMode = Phaser.ScaleManager.aspectRatio;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.setShowAll();
    this.game.scale.refresh();
    this.game.scale.setResizeCallback(this.onScreenResize, this);


    // Add a button that allows the reels to be spun.
    const buttonX = this.game.width - 64;
    const buttonY = this.game.height - 64;
    this.button = this.game.add.button(
      buttonX,
      buttonY,
      C.SPR_SHEET,
      this.startSpin,
      this,
      C.SPR_BUTTON_UP,
      C.SPR_BUTTON_UP,
      C.SPR_BUTTON_DOWN,
      C.SPR_BUTTON_UP
    );
  }

  /**
   * Calculates the radius for the next icon such that
   * the next icon's scale is proportionate between the
   * previous and next.
   *
   * @param {number} currRadius
   * @param {number} baseSize
   * @param {number} currScale
   * @param {number} nextScale
   * @return {number}
   */
  getNextRadius(currRadius, baseSize, currScale, nextScale) {
    const currSize = baseSize * currScale;
    const nextSize = baseSize * nextScale;
    return (
      currRadius + (currSize/2) + (nextSize/2)
    );
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
   * startSpin
   */
  startSpin() {
    if (this.state != C.MACHINE_IDLE) {
      return;
    }

    this.game.camera.shake(0.03, 200);
    this.game.camera.flash(0xffffff, 500, true);

    this.sfxDing.play();
    this.sfxReelSpin.loop = true;
    this.sfxReelSpin.play();

    this.wheels.forEach((wheel) => {
      wheel.startSpin();
    });

    this.state = C.MACHINE_SPINNING;

    // Keep track of which wheel to stop next, each
    // time the player clicks the spin button again.
    this.nextWheelStopIndex = 0;

    this.wheelZoom = C.REEL_ZOOM_START;
    this.tweenZoom(
      this.wheelZoom,
      new Phaser.Point(),
      Phaser.Easing.Elastic.Out
    );
  }

  /**
   * Zoom and offset each wheel
   * @param {number} scale
   * @param {Phaser.Point} offset
   * @param {method} ease
   */
  tweenZoom(scale, offset, ease) {
    for (let i = 0; i < this.wheels.length; i++) {
      this.game.add.tween(this.wheels[i].icons)
        .to(
          {centerX: x, centerY: y},
          C.REEL_ZOOM_SPEED,
          ease
        )
        .start();

      this.game.add.tween(this.wheels[i].icons.scale)
        .to(
          {x: scale, y: scale},
          C.REEL_ZOOM_SPEED,
          ease
        )
        .start();
    }
  }

  /**
   * update
   */
  update() {
    for (let i = 0; i < this.wheels.length; i++) {
      this.wheels[i].update();
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      for (let i = 0; i < this.wheels.length; i++) {
        this.wheels[i].icons.scale.add(0.1, 0.1);
      }
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      for (let i = 0; i < this.wheels.length; i++) {
        this.wheels[i].icons.scale.subtract(0.1, 0.1);
      }
    }
  }
}
