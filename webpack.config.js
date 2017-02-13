const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT = path.resolve(__dirname);
const APP = path.join(ROOT, 'app');
const DIST = path.join(ROOT, 'dist');

const extractCSS = new ExtractTextPlugin('css/vendor.css');
const extractSCSS = new ExtractTextPlugin('css/[name].css');

const config = {
  context: APP,
  entry: {
    app: path.join(APP, 'index.js'),
  },
  output: {
    path: DIST,
    publicPath: '/',
    filename: 'js/app.js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: extractCSS.extract([
          'css-loader', 'postcss-loader'
        ]),
      },
      {
        test: /\.scss$/,
        loaders: extractSCSS.extract([
          'css-loader', 'postcss-loader', 'sass-loader'
        ]),
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loaders: ['file-loader?name=[path][name].[ext]&context=./app'],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader?name=[path][name].[ext]&context=./app',
      },
    ],
  },
  plugins: [
    extractCSS,
    extractSCSS,
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      {
        from: 'slides.md',
      },
      {
        from: 'index.html',
      },
      {
        from: 'img',
        to: 'img',
      },
      {
        context: path.join(ROOT, 'node_modules'),
        from: 'reveal.js/lib/js/classList.js',
        to: 'js/vendor/reveal.js/',
      },
      {
        context: path.join(ROOT, 'node_modules'),
        from: 'reveal.js/plugin/markdown/marked.js',
        to: 'js/vendor/reveal.js/',
      },
      {
        context: path.join(ROOT, 'node_modules'),
        from: 'reveal.js/plugin/markdown/markdown.js',
        to: 'js/vendor/reveal.js/',
      },
      {
        context: path.join(ROOT, 'node_modules'),
        from: 'reveal.js/plugin/highlight/highlight.js',
        to: 'js/vendor/reveal.js/',
      },
    ]),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        devtool: 'eval-source-map',
        sassLoader: {
          includePaths: [path.join(ROOT, 'node_modules/reveal.js/css/theme')],
        },
        postcss: [
          autoprefixer({ browsers: ['last 2 versions'] }),
        ],
      },
    }),
  ],
  devServer: {
    contentBase: APP,
    watchContentBase: true,
    hot: true,
    port: 8000,
  },
};

module.exports = config;
