const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = (env) => {
  const isProd = env.NODE_ENV === 'production';

  const emotionBabelPlugin = [
    '@emotion',
    {
      sourceMap: !isProd,
      autoLabel: 'always',
      cssPropOptimization: true,
    },
  ];

  const babelRule = {
    test: /\.ts(x?)$/,
    include: /src/,
    use: {
      loader: 'babel-loader',
      options: {
        plugins: [emotionBabelPlugin],
        presets: [
          [
            '@babel/preset-env',
            {
              modules: 'auto',
              targets: 'defaults',
              useBuiltIns: 'usage',
              corejs: '3',
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
      viewport: false,
    },
  });

  const bundleAnalyzerPlugin = new BundleAnalyzerPlugin(
    isProd
      ? {
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: 'bundle-report.html',
        }
      : {
          openAnalyzer: false,
        }
  );

  return {
    mode: env.NODE_ENV,
    devtool: !isProd && 'inline-source-map',
    devServer: isProd
      ? {}
      : {
          // Only log to browser console if there's an error
          clientLogLevel: 'error',
          contentBase: path.join(__dirname, 'public'),
          contentBasePublicPath: '/public',
          historyApiFallback: true,
          // Open in browser once server has started
          open: false,
          // Show an overlay in the browser on compile error
          overlay: true,
          // Show progress details in the terminal
          progress: true,
        },
    entry: './src/index.tsx',
    output: {
      filename: `bundle.${isProd ? '[contenthash]' : ''}.js`,
      path: path.resolve(__dirname, isProd ? 'dist' : 'serve'),
      clean: true,
    },
    resolve: {
      symlinks: false,
    },
    module: {
      rules: [babelRule],
    },
    plugins: [htmlWebpackPlugin, bundleAnalyzerPlugin],
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
    },
    stats: {
      all: false,
      assets: isProd,
      builtAt: isProd,
      errors: true,
      excludeModules: isProd,
      timings: true,
      warnings: true,
    },
  };
};
