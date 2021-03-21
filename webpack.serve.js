const path = require('path');
const baseConfig = require('./webpack.config');

module.exports = {
  ...baseConfig,
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    // Only log to browser console if there's an error
    clientLogLevel: 'error',
    // Open in browser once server has started
    open: false,
    // Show an overlay in the browser on compile error
    overlay: true,
    // Show progress details in the terminal
    progress: true,
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'serve'),
    clean: true,
  },
  stats: {
    all: false,
    errors: true,
    timings: true,
    warnings: true,
  },
};
