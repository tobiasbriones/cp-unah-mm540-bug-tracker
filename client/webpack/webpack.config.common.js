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
      template: './src/ui/index.html',
      filename: 'index.html',
      chunks: ['main'],
      favicon: './src/ui/favicon.png'
    }
  ),
  new HtmlWebpackPlugin(
    {
      template: './src/ui/admin/admin.html',
      filename: 'admin.html',
      chunks: ['admin'],
      favicon: './src/ui/favicon.png'
    }
  ),
  new HtmlWebpackPlugin(
    {
      template: './src/ui/dev/developer.html',
      filename: 'developer.html',
      chunks: ['developer'],
      favicon: './src/ui/favicon.png'
    }
  ),
  new HtmlWebpackPlugin(
    {
      template: './src/ui/qa/qa.html',
      filename: 'qa.html',
      chunks: ['qa'],
      favicon: './src/ui/favicon.png'
    }
  ),
  new HtmlWebpackPlugin(
    {
      template: './src/ui/auth/login.html',
      filename: 'login.html',
      chunks: ['login'],
      favicon: './src/ui/favicon.png'
    }
  ),
];

module.exports = {
  entry: {
    main: './src/ui/index.mjs',
    admin: './src/ui/admin/admin.mjs',
    developer: './src/ui/dev/developer.mjs',
    qa: './src/ui/qa/qa.mjs',
    login: './src/ui/auth/login.mjs'
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
