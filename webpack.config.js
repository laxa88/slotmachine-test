const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './app.js',
  output: {
    filename: './build/bundle.js',
  },
  plugins: [
    new UglifyJSPlugin(),
  ],
};
