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
   * update
   */
  update() {
    for (let i = 0; i < this.wheels.length; i++) {
      this.wheels[i].update();
    }

    const scale = this.game.camera.scale;
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      scale.add(0.1, 0.1);
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      scale.subtract(0.1, 0.1);
    }
    const centerX = this.game.width / 2;
    const centerY = this.game.height / 2;
    const offsetX = (scale.x - 1.0) * centerX;
    const offsetY = (scale.y - 1.0) * centerY;
    this.game.camera.setPosition(offsetX, offsetY);
    this.game.camera.scale.set(scale.x, scale.y);

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      for (let i = 0; i < this.wheels.length; i++) {
        // this.wheels[i].addRotation(1);
      }
    }
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      for (let i = 0; i < this.wheels.length; i++) {
        // this.wheels[i].addRotation(-1);
      }
    }
  }
}
