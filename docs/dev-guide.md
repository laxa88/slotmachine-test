# Developer setup

- Clone the project from [the repo](https://github.com/laxa88/slotmachine-test) to your local machine
- Navigate to the folder on your local machine and run `npm install` to download dependency libraries as specified in the `package.json`.
- To start the server with hot-loading, run `webpack-dev-server`.
  - If the command is not found, you can:
    - run `npm install -g webpack-dev-server` to install the command on a global scope, then re-run `webpack-dev-server`
    - run the localled installed library via `./node_modules/webpack-dev-server/bin/webpack-dev-server.js`
- Navigate to `http://localhost:8080` (default) to run the game.

## Entry point

- The project code begins from `app.js`.
- The game object is initialised and run from `src/game.js`.

## PhaserJS auto-completion/intellisense for Visual Studio Code

- Current build uses PhaserJS from a CDN source, so intellisense mapping needs to come from somewhere else.
- [Refer here](http://www.html5gamedevs.com/topic/27418-visual-studio-code-intellisense-for-phaserjs/) for steps for enabling intellisense in Visual Studio Code.

# Requisites

## Tools and versions

The following setup was used to create and run this project:

- NodeJS: 6.11.3
- NPM: 3.10.10
- Visual Studio Code: 1.18.1
  - ESLint 1.4.3
- Phaser JS: 2.6.2

## NPM libraries used

- `eslint`: enforces standardised coding style
- `eslint-config-google`: use google's eslint rules as default config
- `uglifyjs-webpack-plugin`: for minifying the code during webpack
- `webpack`: used to pack all resources into a single bundle output
- `webpack-dev-server`: runs webpack with hot-loading