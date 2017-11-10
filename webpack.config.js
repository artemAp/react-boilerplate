const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: "source-map",
  watch: true,
  watchOptions: {
    aggregateTimeout: 1000,
    ignored: /node_modules/
  },
  entry: {
    'css/main.css': './src/styles/main.scss',
    'js/bundle.js': './src/index.js'
  },
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          query: {
            presets: ["es2015", "react", "stage-3"],
            plugins: [
              'transform-runtime',
              'transform-decorators-legacy'
            ],
          }
        }
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name]')
  ]
};
