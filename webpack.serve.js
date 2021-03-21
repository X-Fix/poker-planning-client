const path = require('path');
const baseConfig = require('./webpack.config');

module.exports = {
  ...baseConfig,
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    contentBase: './dist',
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'serve'),
    clean: true,
  },
};
