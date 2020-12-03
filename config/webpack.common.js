const paths = require('./paths');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: paths.src + '/index.js',
  },
  output: {
    path: paths.build,
    filename: 'js/[name].min.bundle.js',
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public, to: 'assets',
          globOptions: {
            ignore: [
              paths.public + '/robots.txt', 
              paths.public + '/sitemap.xml', 
              paths.public + '/favicon.ico',
              paths.public + '/express.js',
              paths.public + '/index.html',
            ],
          },
        },
        {
          from: paths.public + '/robots.txt', to: 'robots.txt'
        },
        {
          from: paths.public + '/sitemap.xml', to: 'sitemap.xml'
        },
        {
          from: 'src/components/additional-scripts', to: 'js/additional-scripts'
        }
      ],
    }),

    new HtmlWebpackPlugin({
      favicon: paths.public + '/favicon.ico',
      template: paths.public + '/index.html',
      filename: 'index.html',
    }),
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
            options: { sourceMap: true, importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
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
      {
        test: /\.(pdf)$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]'
        }
      },
    ],
  },
}