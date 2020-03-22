const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'production';

module.exports = {
  entry: './src/js/index.js',
  output: {
    //[name]:取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'bulid'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  mode: 'production',
};
