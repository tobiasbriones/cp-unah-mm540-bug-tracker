/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const plugins = [
  new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  new HtmlWebpackPlugin(
    {
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['main'],
      favicon: './src/favicon.png'
    }
  ),
  new HtmlWebpackPlugin(
    {
      template: './src/admin.html',
      filename: 'admin.html',
      chunks: ['admin'],
      favicon: './src/favicon.png'
    }
  ),
  new HtmlWebpackPlugin(
    {
      template: './src/developer.html',
      filename: 'developer.html',
      chunks: ['developer'],
      favicon: './src/favicon.png'
    }
  ),
  new HtmlWebpackPlugin(
    {
      template: './src/qa.html',
      filename: 'qa.html',
      chunks: ['qa'],
      favicon: './src/favicon.png'
    }
  ),
];

module.exports = {
  entry: {
    main: './src/js/index.mjs',
    admin: './src/js/admin.mjs',
    developer: './src/js/developer.mjs',
    qa: './src/js/qa.mjs',
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: './'
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.html$/i,
        exclude: /node_modules/,
        use: ['html-loader']
      }
    ]
  }
};
