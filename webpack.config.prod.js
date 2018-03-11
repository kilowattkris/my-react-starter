import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import WebpackStrip from 'strip-loader';

const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const extractCSS = new ExtractTextPlugin({filename: 'styles.css'});

export default {
  entry: path.resolve(__dirname, 'src/index'),
  target: 'web',
  // output config
  output: {
    path: __dirname + '/dist', // Path of output file
    publicPath: '/',
    filename: 'bundle.js', // Name of output file
  },
  plugins: [
    // Define production build to allow React to strip out unnecessary checks
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // Allows error warnings but does not stop compiling.
    new webpack.NoEmitOnErrorsPlugin(),
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
    new UglifyJsPlugin({
      test: /\.js($|\?)/i
    }),
    extractCSS
  ],
  module: {
    loaders: [
      {
        test: /\.js$/, // All .js files
        loaders: [
          {
            loader: 'babel-loader'
          },
          {
            loader: WebpackStrip.loader('debug', 'console.log')
          }
        ],
        exclude: [nodeModulesPath],
      },
      {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader'},
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
      {test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'},
      {test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[ext]'},
      {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
      {test: /\.(s*)css$/, use: extractCSS.extract({fallback: 'style-loader', use: [
        {
          loader: 'css-loader',
          options: {
            minimize: true
          }
        },
        {
          loader: 'sass-loader'
        },
        {
          loader: 'postcss-loader'
        }
      ]})},
    ],
  },
};
