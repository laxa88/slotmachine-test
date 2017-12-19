# Components

- There are 3 main components:
  - `SlotMachine`: The parent component that houses the wheels
  - `SlotReel`: The individual wheels that contain a reel of icons
  - `ReelIcon`: The individual icons that belong to a reel

## SlotMachine

- Has a button that triggers reels' start/stop spin.
- Handles responsiveness (screen resize).
- Controls camera zooming.
- Handles reel stop event from children `SlotReel`s.
- Handles bgm and sfx.

## SlotReel

- Handles reel spinning logic.
- Handles particle emitting logic.
- Fires reel stop event.

## ReelIcon

- Stores the icon sprite
- Allows sprite update
