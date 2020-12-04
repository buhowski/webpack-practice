const paths = require('./paths');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals');

const buildConfig = merge(common, {
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

const serverConfig = {
  mode: "production",
  entry: './src/components/server.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: paths.build,
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: paths.src,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    }),
  ]
}

module.exports = [buildConfig, serverConfig]