const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//已經用webpack.dll.js生成dll資料夾
//引入webpack插件
const webpack = require('webpack');
//引入add-asset-html-webpack-plugin
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    //告訴webpack哪些庫不參與打包(因為已經被DLL打包過)，同時使用時的名稱也要變
    new webpack.DllReferencePlugin({
      mainfest: resolve(__dirname, 'dll/manifest.json'),
    }),
    //將某個文件打包輸出去，並在html中自動引入該資源
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, 'dll/jquery.js'),
    }),
  ],
  mode: 'production',
};
