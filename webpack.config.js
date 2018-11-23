/* eslint-disable prefer-template */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

require('whatwg-fetch')
require('babel-polyfill')

const devMode = process.env.NODE_ENV !== 'production'
const WDS_PORT = 8080

module.exports = {
  mode: process.env.NODE_ENV,
  entry: [
    'babel-polyfill',
    'whatwg-fetch',
    'react-hot-loader/patch',
    './index.jsx',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
    // necessary for HMR to know where to load the hot update chunks
  },
  context: path.resolve(__dirname, 'src'),
  devtool: !devMode ? false : 'source-map',
  devServer: {
    port: WDS_PORT,
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      ENV_ENVIRONMENT: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new SpriteLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.m?(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: !devMode ? false : '[name]__[local]___[hash:base64:5]',
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        include: path.join(__dirname, 'src/common/icons'),
        loaders: [
          'svg-sprite-loader?' + JSON.stringify({
            name: '[name].[hash]',
            prefixize: true,
          }),
          'svgo-loader?' + JSON.stringify({
            plugins: [
              { removeTitle: true },
              { convertPathData: false },
              { removeUselessStrokeAndFill: true },
            ],
          }),
        ],
      },
      {
        test: /\.(jpe?g|gif|png|woff|ttf|wav|mp3)$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    alias: {
      common: path.resolve(__dirname, 'src/common/'),
      components: path.resolve(__dirname, 'src/components/'),
      src: path.resolve(__dirname, 'src/'),
    },
    extensions: ['.js', '.jsx'],
  },
}
