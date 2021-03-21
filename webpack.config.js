const HtmlWebpackPlugin = require('html-webpack-plugin');

const babelRule = {
  test: /\.ts(x?)$/,
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
        '@babel/preset-typescript',
      ],
      cacheDirectory: true,
    },
  },
};

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  title: 'React App',
});

module.exports = {
  entry: './src/index.ts',
  resolve: {
    symlinks: false,
  },
  module: {
    rules: [babelRule],
  },
  plugins: [htmlWebpackPlugin],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
};
