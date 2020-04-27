const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin');
const argv = require('yargs').argv;

const vendor = argv.vendor || 'common'

module.exports = {
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([{
        from: path.join(__dirname, 'vendor', vendor),
        to: 'vendor'
      }])
    ]
  }
};