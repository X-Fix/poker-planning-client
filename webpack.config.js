const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  title: 'React App',
});

module.exports = {
  entry: './src/index.js',
  plugins: [htmlWebpackPlugin],
};
