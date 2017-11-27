const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SvgStorePlugin = require('external-svg-sprite-loader/lib/SvgStorePlugin');

module.exports = {
  
  entry: {
    bundle: [
      'babel-polyfill',
      path.resolve(__dirname, './src/index.jsx'),
    ],
  },
  output: {
    filename: 'assets/js/[name].js',
    path: path.resolve(__dirname, './dist'),
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
                minimize: true,
              },
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
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
        test: /\.(woff2?)$/i, // load fonts
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/fonts/',
              name(fileUrl) {
                return toCorrectPath(fileUrl, 'fonts');
              },
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,  // load images
        exclude: path.resolve(__dirname, './src/images/icons'),
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/images/',
              name(fileUrl) {
                return toCorrectPath(fileUrl, 'images');
              },
            },
          },
          {
            loader: 'image-webpack-loader',
            query: {
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 4,
              },
              pngquant: {
                quality: '75-90',
                speed: 3,
              },
            },
          },
        ],
      },
      {
        test: /\.(mp3|wav|ogg|webm|mp4|pdf)$/i, // load media
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/media/',
              name(fileUrl) {
                return toCorrectPath(fileUrl, 'media');
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'external-svg-sprite-loader',
        include: path.resolve(__dirname, './src/images/icons'),
        options: {
          name: 'assets/images/svg-sprite.svg',
          svgoOptions: {
            plugins: [
              {removeUselessStrokeAndFill: true},
            ],
          }
        },
      },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new ExtractTextPlugin({
      filename: 'assets/css/main.css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
    }),
    new SvgStorePlugin(),
  ],
};

function toCorrectPath(fileUrl, currentDir) {
  const posixFormat = fileUrl.replace(new RegExp('\\' + path.sep, 'g'), '/');
  const urlPath = posixFormat.split(`src/${currentDir}/`);
  return (urlPath[1] && urlPath[1].length) ? urlPath[1] : '[name].[ext]';
}