const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const HOST = 'localhost'
const buildDir = {
  chrome: path.resolve(__dirname, 'dist/chrome')
}
const nodeModules = path.resolve(__dirname, 'node_modules')

module.exports = {
  entry: {
    'background': './src/background.js',
    'panel': './src/panel/index.js',
    'popup': './src/popup.js'
  },
  output: {
    path: buildDir.chrome,
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.css/, use: ['style-loader', 'postcss-loader'] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/panel/template.html',
      filename: 'panel.html',
      chunks: ['panel']
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyJsPlugin()
  ]
}
