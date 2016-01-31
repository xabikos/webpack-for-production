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
    filename: 'bundle.min.js'
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
      }
    ]
  },
  plugins: [    
    new HtmlWebpackPlugin({
      template: 'templates/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new ExtractTextPlugin('style.min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new webpack.optimize.CommonsChunkPlugin(
      'vendor',
      '[name].min.js'
    )
  ],
  postcss: function () {
    return [autoprefixer];
  }
};
