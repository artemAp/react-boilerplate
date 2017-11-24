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
    bundle: [
      'babel-polyfill',
      'react-hot-loader/patch',
      path.resolve(__dirname, './src/index.jsx'),
    ],
  },
  output: {
    filename: 'assets/js/[name].js',
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
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
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
          
        })),
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
        test: /\.(gif|png|jpe?g|svg|woff2?|mp3|wav|ogg|webm|mp4|pdf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/',
              name(fileUrl) {
                return toCorrectPath(fileUrl);
              },
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, '/'),
    compress: true,
    port: 3000,
    hot: true,
    open: true,
    overlay: {
      warnings: false,
      errors: false
    },
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  
    new ExtractTextPlugin({
      filename: 'assets/css/main.css',
    }),
    
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
    }),
  ],
};

function toCorrectPath(fileUrl) {
  const posixFormat = fileUrl.replace(new RegExp('\\' + path.sep, 'g'), '/');
  const urlPath = posixFormat.split(`src/`);
  return (urlPath[1] && urlPath[1].length) ? `${urlPath[1]}?[hash]` : '[name].[ext]?[hash]';
}