import SlotMachine from './components/slot-machine';
import * as C from './constants';

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

    this.slotMachine = null;
  }

  /**
   * For preloading assets.
   */
  preload() {
    /*
    load reel background image
    load slot machine foreground image
    */
    this.game.load.spritesheet(C.SPR_SHEET, 'assets/sprites.png', 32, 32);
  }

  /**
   * For initialising game objects and variables.
   */
  create() {
    this.slotMachine = new SlotMachine(this.game, 5, 10);
  }

  /**
   * Update method.
   */
  update() {
    this.slotMachine.update();
  }
}
