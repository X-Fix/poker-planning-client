const HtmlWebpackPlugin = require('html-webpack-plugin');

const babelRule = {
  test: /\.js$/,
  include: /src/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'auto',
            targets: 'defaults',
          },
        ],
      ],
      cacheDirectory: true,
    },
  },
};

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  title: 'React App',
});

module.exports = {
  entry: './src/index.js',
  resolve: {
    symlinks: false,
  },
  module: {
    rules: [babelRule],
  },
  plugins: [htmlWebpackPlugin],
};
