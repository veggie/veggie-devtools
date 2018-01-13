const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const veggie = require('veggie')
const { NamedModulesPlugin } = require('webpack')

const HOST = 'localhost'
const PORT = 8000
const buildDir = {
  chrome: path.resolve(__dirname, 'dist/chrome')
}
const nodeModules = path.resolve(__dirname, 'node_modules')

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: buildDir.chrome,
    publicPath: '/',
    filename: 'panel.js'
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.css/, use: ['style-loader', 'postcss-loader'] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/panel-template.html',
      filename: 'panel.html'
    }),
    new NamedModulesPlugin
  ],
  devtool: 'source-map',
  devServer: {
    index: 'panel.html',
    host: HOST,
    port: PORT,
    contentBase: [ buildDir.chrome ],
    publicPath: '/',
    before (app) {
      app.use(veggie.router({
        dir: 'test/services.js',
        profileDir: 'test/profiles',
        repl: false
      }))
    }
  },
}
