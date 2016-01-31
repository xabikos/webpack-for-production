var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');

var pkg = require('./package.json');

var ROOT_PATH = path.resolve(__dirname);

module.exports = {
  entry: {
    app: './index.js',
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    path: path.resolve(ROOT_PATH, 'dist'),
    filename: '[name]-[hash].min.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,        
      },
      {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass'),
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: "url?limit=10000"
      }
    ]
  },
  plugins: [    
    new HtmlWebpackPlugin({
      template: 'templates/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin(
      'vendor',
      '[name]-[hash].min.js'
    ),
    new webpack.DefinePlugin({
      // This affects react lib size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ],
  postcss: function () {
    return [autoprefixer];
  }
};
