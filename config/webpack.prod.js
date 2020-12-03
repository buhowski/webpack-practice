const paths = require('./paths');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const express = require('express');
const path = require('path');
const app = express();
if (process.env.NODE_ENV === "production") {
  app.use(express.static('public'));

  app.get('/*', function(req, res) {
    res.sendFile(path.join('public', 'index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })
}
module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    path: paths.build,
    filename: 'js/[name].min.bundle.js',
    publicPath: '/',
    pathinfo: false,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
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
      new TerserPlugin({
        parallel: true,
      }),
      new CssMinimizerPlugin(),
    ],
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
    }
  },
})