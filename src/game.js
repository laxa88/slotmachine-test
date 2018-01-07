// import SlotMachine from './slots/slot-machine';
import WheelMachine from './wheels/machine';
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
      C.MACHINE_BASE_W,
      C.MACHINE_BASE_H,
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
    this.machine = null;
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

    // TODO load slot machine foreground image
    this.game.load.image(C.SPR_FG, 'assets/fg.png');

    // Load audio files
    this.game.load.audio(C.BGM_DEFAULT, 'assets/bgm-ogg.ogg');
    this.game.load.audio(C.SFX_DING, 'assets/ding-ogg.ogg');
    this.game.load.audio(C.SFX_KACHING, 'assets/kaching-ogg.ogg');
    this.game.load.audio(C.SFX_REEL_SPIN, 'assets/reel-spin-ogg.ogg');
    this.game.load.audio(C.SFX_THUMP, 'assets/thump-ogg.ogg');
  }

  /**
   * For initialising game objects and variables.
   */
  create() {
    // this.machine = new SlotMachine(this.game, 5, 10);
    this.machine = new WheelMachine(this.game, C.WHEEL_COUNT, C.ICON_COUNT);
  }

  /**
   * Update method.
   */
  update() {
    this.machine.update();
  }
}
