import ReelIcon from './reel-icon';
import * as C from '../constants';

/**
 * The slot machine reel that houses a list of symbols.
 */
export default class SlotReel {
  /**
   * SlotReel
   * @param {Phaser.Game} game
   * @param {Object[]} reelData the list of icons for this reel
   * @param {string} reelData[].key the sprite key
   * @param {number} reelData[].value the icon's value
   * @param {number} centerX
   * @param {number} centerY
   */
  constructor(game, reelData, centerX, centerY) {
    this.state = C.REEL_IDLE;

    this.game = game;
    this.centerX = centerX;
    this.centerY = centerY;

    // full list of symbols that would appear when the reel is spun.
    this.reelData = reelData;

    // the next reel symbol to show when the slot is cycled from bottom to top.
    this.reelIndex = -1;

    // Create object pool of five Symbols in the reel,
    // 3 visible, 1 buffer on top/bottom.
    this.iconPool = [];
    const totalReelHeight = C.REEL_LENGTH * C.ICON_SIZE;
    const startY = this.centerY - (totalReelHeight / 2);
    let currY = startY;

    for (let i = 0; i < C.REEL_LENGTH; i++) {
      const iconData = this.getNextIcon();

      this.iconPool.push(
        new ReelIcon(this.game, iconData.key, this.centerX, currY)
      );

      currY += C.ICON_SIZE;
    }

    // Set bounds where icons will be wrapped.
    this.upperBound = startY;
    this.bottomBound = currY;

    // Add emitter for particle effects
    this.emitter = this.game.add.emitter(this.centerX, this.centerY, 10);
    this.emitter.makeParticles('star');
    this.emitter.particleDrag = new Phaser.Point(50, 50);
    this.emitter.setXSpeed(-300, 300);
    this.emitter.setYSpeed(-300, 300);
    this.emitter.setAlpha(1.0, 0.0, 2000);
    this.emitter.gravity = 800;
    this.emitter.setScale(
      1.0, 0.0,
      1.0, 0.0,
      2000,
      Phaser.Easing.Circular.In
    );
  }

  /**
   * update
   */
  update() {
    /*
    if state is SPINNING
      animate symbol movement downward
      if Symbol is below bottom bound
        wrap Symbol to top
        nextSymbolIndex += 1 (wrap by array length)
        Symbol.Symbol.setSprite()
    if state is STOPPING
      animate easing to center position
      on reach center
        particle: 1-time burst stars
        audio: stop reeling sfx
        Machine.reelStopped()
        set state to IDLE
    if state is IDLE
      do nothing
    */

    switch (this.state) {
      case C.REEL_SPINNING: {
        for (let i = 0; i < C.REEL_LENGTH; i++) {
          const icon = this.iconPool[i];
          const delta = this.game.time.physicsElapsed * C.REEL_SPEED;
          icon.sprite.y += delta;

          this.updateIconWrap(icon);
        }
      }
      break;

      case C.REEL_STOPPING: {

      }
      break;

      default:
      case C.REEL_IDLE: {

      }
      break;
    }
  }

  /**
   * startSpin
   */
  startSpin() {
    this.state = C.REEL_SPINNING;

    this.emitter.start(true, 1000, null, 5);

    // TODO add audio
  }

  /**
   * stopSpin
   */
  stopSpin() {
    /*
    set state to STOPPING
    check Symbol at index 3 (center of reels)
      if position is above center, ease to center pos
      else, ease Symbol at index 2 to center pos
    */
    this.state = C.REEL_STOPPING;

    this.iconTweeningCount = C.REEL_LENGTH;

    // Icons in iconPool are sorted by index, not by Y-position.
    // Sort the iconPool by Y-position so we can snap them
    // to the next position.
    const sortedIconPool = this.iconPool;

    sortedIconPool.sort((a, b) => {
      if (a.sprite.y < b.sprite.y) return -1;
      if (a.sprite.y > b.sprite.y) return 1;
      return 0;
    });

    for (let i = 0; i < C.REEL_LENGTH; i++) {
      const icon = sortedIconPool[i];

      // For each icon that's still visible, tween to
      // the next fixed icon position.
      const nextSnapPosition = this.upperBound + (i * C.ICON_SIZE);

      const tween = this.game.add.tween(icon.sprite);

      tween.onComplete.add(() => {
        this.iconTweeningCount--;

        if (this.iconTweeningCount === 0) {
          this.game.onReelStopped.dispatch(this);
        }
      });

      tween
        .to(
          {y: nextSnapPosition},
          500 + Math.random() * 50,
          Phaser.Easing.Elastic.Out
        )
        .start();
    }

    this.game.onReelStopping.dispatch(this);
  }

  /**
   * Gets next icon in the reelData. If the end of
   * the list is reached, will wrap to the first icon.
   * @return {Object[]} reelData the list of icons for this reel
   * @return {string} reelData[].key the sprite key
   * @return {number} reelData[].value the icon's value
   */
  getNextIcon() {
    this.reelIndex = (this.reelIndex + 1) % this.reelData.length;
    const iconData = this.reelData[this.reelIndex];
    return iconData;
  }

  /**
   * Wraps the icon to the top if the position passes lower bound.
   * @param {*} icon
   */
  updateIconWrap(icon) {
    if (icon.sprite.y > this.bottomBound) {
      icon.sprite.y -= (C.ICON_SIZE * C.REEL_LENGTH);

      const iconData = this.getNextIcon();
      icon.setSprite(iconData.key);
    }
  }
}
