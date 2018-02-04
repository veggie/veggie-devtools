const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const veggie = require('veggie')
const { DefinePlugin, NamedModulesPlugin } = require('webpack')

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
    new NamedModulesPlugin(),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  devtool: 'source-map',
  devServer: {
    index: 'panel.html',
    host: HOST,
    contentBase: [ buildDir.chrome ],
    publicPath: '/',
    before (app) {
      app.use(veggie.router({
        dir: 'services/index.js',
        profileDir: 'services/profiles'
      }))
    }
  },
}
