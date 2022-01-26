/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    hot: true,
    compress: true,
    static: 'dist',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProgressPlugin(),
  ],
});
