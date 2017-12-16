# Developer setup

- Clone the project from repo to your local machine
- Navigate to the folder on your local machine and run `npm install` to download dependency libraries as specified in the `package.json`.
- To start the server with hot-loading, run `webpack-dev-server`.
  - If the command is not found, you can:
    - run `npm install -g webpack-dev-server` to install the command on a global scope, then re-run `webpack-dev-server`
    - run the localled installed library via `./node_modules/webpack-dev-server/bin/webpack-dev-server.js`
- Navigate to `http://localhost:8080` (default) to run the game.

## Entry point

- The project code begins from `app.js`.
- The game object is initialised and run from `src/game.js`.
