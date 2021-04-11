/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

const commonConfig = require('./webpack.config.common');
const { merge } = require('webpack-merge');

module.exports = merge(commonConfig, {
  mode: 'development',
  output: {
    filename: './js/[name].mjs'
  },
  devServer: {
    contentBase: './dist',
    compress: true,
    hot: true,
    writeToDisk: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img'
            }
          }
        ]
      }
    ]
  }
});
