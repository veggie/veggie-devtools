const c2k = require('koa-connect')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { resolve } = require('path')
const { DefinePlugin, NamedModulesPlugin } = require('webpack')
const veggie = require('veggie')

const HOST = 'localhost'
const buildDir = {
  chrome: resolve(__dirname, 'dist/chrome')
}

module.exports = {
  mode: 'development',
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
      template: './src/panel-template.html',
      filename: 'panel.html',
      chunks: ['panel']
    }),
    new HtmlWebpackPlugin({
      template: './src/popup-template.html',
      filename: 'popup.html',
      chunks: ['popup']
    }),
    new NamedModulesPlugin(),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  devtool: 'source-map',
  serve: {
    host: HOST,
    hot: false,
    content: [ buildDir.chrome ],
    dev: {
      index: 'panel.html',
      publicPath: '/'
    },
    add (app, middleware) {
      middleware.webpack()
      middleware.content()

      app.use(
        c2k(
          veggie.router({
            dir: 'services/index.js',
            profileDir: 'services/profiles'
          })
        )
      )
    }
  }
}
