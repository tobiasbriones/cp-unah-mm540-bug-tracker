/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

/*
 * It yields two configurations, say, legacy and module each for differential
 * loading for old browsers and ES Module supporting browsers respectively.
 */

const commonConfig = require('./webpack.config.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { merge } = require('webpack-merge');


const mode = 'production';
const plugins = [
  new ScriptExtHtmlWebpackPlugin(
    {
      module: /\.mjs$/,
      custom: [
        {
          test: /\.js$/,
          attribute: 'nomodule',
          value: ''
        }
      ]
    }
  ),
  new FixStyleOnlyEntriesPlugin(),
  new MiniCssExtractPlugin({ filename: './css/[name].[contentHash].css' }),
  new OptimizeCSSAssetsPlugin({})
];
const cssRules = {
  test: /\.css$/i,
  exclude: /node_modules/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../'
      }
    },
    'css-loader'
  ]
};
const fileRules = {
  test: /\.(png|jpe?g|gif|svg)$/i,
  exclude: /node_modules/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[contentHash].[ext]',
        outputPath: 'img'
      }
    }
  ]
};

const legacyConfig = {
  mode: mode,
  output: {
    filename: './js/[name].bundle.js'
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: 3,
                targets: {
                  esmodules: false
                }
              }
            ]
          ]
        }
      },
      cssRules,
      fileRules
    ]
  }
};

const moduleConfig = {
  mode: mode,
  output: {
    filename: './js/[name].[contentHash].mjs'
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: 3,
                targets: {
                  esmodules: true
                }
              }
            ]
          ]
        }
      },
      cssRules,
      fileRules
    ]
  }
};

module.exports = [
  merge(commonConfig, legacyConfig),
  merge(commonConfig, moduleConfig)
];
