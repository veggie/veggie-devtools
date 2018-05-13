const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { resolve } = require('path')
const { DefinePlugin } = require('webpack')

const buildDir = {
  chrome: resolve(__dirname, 'dist/chrome')
}

module.exports = {
  mode: 'production',
  entry: {
    'background': './src/background.js',
    'panel': './src/panel.js',
    'popup': './src/popup.js'
  },
  output: {
    path: buildDir.chrome,
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, use: [ 'babel-loader' ] },
      { test: /\.css$/, use: [ MiniCssExtractPlugin.loader, "css-loader" ]}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/popup-template.html',
      filename: 'popup.html',
      chunks: ['popup']
    }),
    new HtmlWebpackPlugin({
      template: './src/panel-template.html',
      filename: 'panel.html',
      chunks: ['panel']
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
}
