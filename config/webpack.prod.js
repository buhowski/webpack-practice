const paths = require('./paths')
const merge = require('webpack-merge');
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    path: paths.build,
    filename: 'js/[name].min.bundle.js',
    publicPath: './',
    pathinfo: false,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].min.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
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
        parallel: true,
      })
    ],
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      cacheGroups: {
        chunks: 'async',
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor_app',
          chunks: 'all',
          minChunks: 2
        }
      }
    },
  },
})