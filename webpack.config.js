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
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
      cacheDirectory: true,
    },
  },
};

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  meta: {
    charset: 'UTF-8',
    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
  },
  title: 'React App',
});

module.exports = {
  entry: './src/index.tsx',
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
