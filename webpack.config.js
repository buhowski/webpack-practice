const currentTask = process.env.npm_lifecycle_event;
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const config = {
  mode: 'development',
  devtool: 'eval-cheap-source-map',

  entry: './src/index.js',

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
			},
			{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|additional-scripts)/,
      },
			{
        test: /\.(png|jpe?g|gif|svg)$/i,
        exclude: /assets/,
        loader: 'file-loader',
        options: {
          name: 'assets/images/[name].[ext]'
        }
      },
			{
        test: /\.(eot|ttf|woff|woff2|svg)$/i,
        exclude: /views/,
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name].[ext]'
        }
      },
			{
        test: /\.(pdf|txt)$/i,
        use: 'raw-loader',
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/robots.txt', to: 'robots.txt' },
        { from: 'src/assets/cv.pdf', to: 'assets' },
        { from: 'src/assets/favicon.ico', to: 'assets' },
        { from: 'src/components/additional-scripts', to: 'js/additional-scripts' },
        { from: 'src/assets/images', to: 'assets/images' },
      ],
    }),
  ],
  
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 7777,
    open: true,
    hot: true,
    stats: 'errors-warnings',
    overlay: true
  }
}

if (currentTask === 'build') {
  config.mode = 'production',
  config.module.rules[0].use[0] = MiniCssExtractPlugin.loader,
  config.plugins.push(
    new MiniCssExtractPlugin({filename: 'styles/main.[hash].css'}), 
    new CleanWebpackPlugin()
  )
}

module.exports = config