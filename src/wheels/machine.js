// import * as C from '../constants';
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

    let currRadius = 32;
    const radiusDelta = 32;

    for (let i = 0; i < wheelCount; i++) {
      this.wheels.push(new Wheel(
        this.game,
        iconCount,
        this.centerPoint,
        currRadius
      ));

      currRadius += radiusDelta;
    }
  }

  /**
   * update
   */
  update() {
    for (let i = 0; i < this.wheels.length; i++) {
      this.wheels[i].update();
    }
  }
}
