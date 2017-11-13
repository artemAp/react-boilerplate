const path = require('path');
// const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  watch: true,
  watchOptions: {
    aggregateTimeout: 1000,
    ignored: /node_modules/,
  },
  entry: {
    'css/main.css': './src/styles/main.scss',
    'js/bundle.js': './src/index.jsx',
  },
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                // minimize: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],

        }),
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'react', 'stage-3'],
            plugins: [
              'transform-runtime',
              'transform-decorators-legacy',
            ],
          },
        }, 'eslint-loader',
        ],
      },
      {
        test: /\.(woff2?)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/public/',
              outputPath: 'fonts/',
              name: '[name].[ext]',
              // useRelativePath: true,
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/public/',
              outputPath: 'images/',
              name: '[name].[ext]',
              // useRelativePath: true,
            },
          }, {
            loader: 'image-webpack-loader',
            options: {
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '80-90',
                speed: 4,
              },
              mozjpeg: {
                progressive: true,
                quality: 80,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name]'),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: {
        baseDir: '',
      },
    }),
  ],
};
