/*
loader:1.下載2.使用(配置loader)
plugins:1.下載2.引入3.使用
*/
const { resolve } = require('path');
//下載完html-webpack-plugin後引入
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      //loader的配置
    ],
  },
  plugins: [
    //html-webpackpack-plugin
    //要先下載:npm i html-webpack-plugin -D
    //使用HtmlWebpackPlugin()
    //功能:會創建一個空的HTML裡面已經自動引入好打包輸出的所有資源(JS/CSS)
    new HtmlWebpackPlugin({
      //複製"./src/index.html"文件，並自動複製進打包出來的index.html內
      template: './src/index.html',
    }),
  ],
  mode: 'development',
};
