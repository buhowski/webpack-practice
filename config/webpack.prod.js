const paths = require('./paths');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    path: paths.build,
    filename: 'js/[name].script.min.js',
    publicPath: '/',
    pathinfo: false,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
    }),
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        include: paths.src,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true
      })
    ],
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
    }
  },
  performance: {
    hints: false,
    maxEntrypointSize: 2048,
    maxAssetSize: 2048
  }
})