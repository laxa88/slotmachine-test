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
    this.game = new Phaser.Game(
      window.innerWidth,
      window.innerHeight,
      Phaser.AUTO,
      'game',
      {
        preload: this.preload,
        create: this.create,
        update: this.update,
      }
    );

    // Arbitrarily disable antialias for the retro feel
    this.game.antialias = false;

    // declare the variable here, to be initialised in create()
    this.slotMachine = null;
  }

  /**
   * For preloading assets.
   */
  preload() {
    this.game.load.atlas(
      C.SPR_SHEET,
      'assets/sprites.png',
      'assets/sprites.js',
      Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
    );

    // TODO load reel background image
    // TODO load slot machine foreground image

    // For particle effects
    this.game.load.image('star', 'assets/star.png');

    // Load audio files
    this.game.load.audio('bgm', 'assets/bgm-ogg.ogg');
    this.game.load.audio('ding', 'assets/ding-ogg.ogg');
    this.game.load.audio('kaching', 'assets/kaching-ogg.ogg');
    this.game.load.audio('reel-spin', 'assets/reel-spin-ogg.ogg');
    this.game.load.audio('thump', 'assets/thump-ogg.ogg');
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
