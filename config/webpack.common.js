const paths = require('./paths');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: paths.src + '/index.js',
  output: {
    path: paths.build,
    filename: 'js/[name].min.bundle.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.public + '/index.html',
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|additional-scripts)/,
				use: ['babel-loader']
			},
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i,
        exclude: /assets/,
        loader: 'file-loader',
        options: {
          name: 'assets/images/[name].[ext]'
        }
			},
      {
        test: /\.(eot|ttf|woff(2)?|svg)$/i,
        exclude: /views/,
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name].[ext]'
        }
      },
    ],
  },
  // stats: 'errors-warnings',
}