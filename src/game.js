/**
 * The entry point class for the slot machine game.
 */
export default class Game {
  /**
   * Game
   */
  constructor() {
    // Init a Phaser game and link the lifecycle methods.
    this.game = new Phaser.Game(400, 400, Phaser.AUTO, 'game', {
      preload: this.preload,
      create: this.create,
      update: this.update,
    });
  }

  preload() {
  }

  create() {
  }

  update() {
  }
}
