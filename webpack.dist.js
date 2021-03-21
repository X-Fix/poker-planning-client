const path = require('path');
const baseConfig = require('./webpack.config');

module.exports = {
  ...baseConfig,
  mode: 'production',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  stats: {
    all: false,
    assets: true,
    builtAt: true,
    errors: true,
    excludeModules: true,
    timings: true,
    warnings: true,
  },
};
