const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  watch: true,
  watchOptions: {
    aggregateTimeout: 1000,
    ignored: /node_modules/,
  },
  entry: {
    'js/bundle': [
      'babel-polyfill',
      'react-hot-loader/patch',
      path.resolve(__dirname, './src/index.jsx'),
    ],
    'css/main.css': './src/styles/main.scss',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './public'),
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
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      {
        test: /\.(woff2?)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts/',
              name: '[name].[ext]',
              useRelativePath: true,
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
              outputPath: 'images/',
              name: '[name].[ext]',
              useRelativePath: true,
            },
          },
          // {
          //   loader: 'image-webpack-loader',
          //   options: {
          //     gifsicle: {
          //       interlaced: false,
          //     },
          //     optipng: {
          //       optimizationLevel: 7,
          //     },
          //     pngquant: {
          //       quality: '80-90',
          //       speed: 4,
          //     },
          //     mozjpeg: {
          //       progressive: true,
          //       quality: 80,
          //     },
          //     webp: {
          //       quality: 75,
          //     },
          //   },
          // },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, '/'),
    compress: true,
    port: 8080,
    hot: true,
    open: true
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    
    new ExtractTextPlugin('[name]'),
    
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
    }),
    // new BrowserSyncPlugin({
    //   host: 'localhost',
    //   port: 3000,
    //   server: {
    //     baseDir: '',
    //   },
    // }),
  ],
};
