# Test initial template for slot machine (a.k.a. Wheel of Fortune)

This is a Phaser JS project for a coding assessment task.

Required features:

- Render 5 circular wheels
- A button for starting/stopping the wheels

Optional features:

- Any additional effect to make the wheel spinning look "fast"
- Easing for wheel's start/stop spinning animation
- Align the wheels in a 5x3 grid when they stop
- Zoom out when the wheels start spinning
- Zoom in when the wheels stop spinning
- Add audio (button click, wheel spin)
- Make the game responsive (fits/stretches to various screen sizes)

# Getting started

- [Developer setup](./docs/dev-guide.md)
- [Component overview](./docs/components.md)

# Credits

- [Buttons: Kenney's UI Pack](https://opengameart.org/content/ui-pack)
- [Responsive design: "How to make PhaserJS game responsive" thread](http://www.html5gamedevs.com/topic/19253-how-to-make-a-phaser-game-responsive/)
- [Icons: 8-bit social icon pack](https://www.icondeposit.com/theicondeposit:29) by Neorelic
- [Particle: 8-bit star image](https://github.com/photonstorm/phaser/blob/master/v2/resources/tutorials/02%20Making%20your%20first%20game/assets/star.png) from PhaserJS tutorial assets folder
- BGM, SFX: my voice

# Known issues

- Tests are not included. Briefly tried to run tests but hit some setup issues involving Phaser (since we used CDN source), and jest requires additional NPM libraries such as `canvas` which I am not familiar with yet.
- Currently, button can only start reel spinning, but there is no way to manually stop spinning. Had to decide between this or zooming the screen for the visual effects; went with the latter.