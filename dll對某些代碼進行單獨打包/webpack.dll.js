/*
使用dll技術，對某些庫(第三方庫:jquery、react、vue..)進行單獨打包
  當你運行webpack時，默認查找webpack.config.js配置文件
  需求:需要運行webpack.dll.js文件(將webpack指令改成運行webpack.dll.js)
  -->下指令webpack --config webpack.dll.js  */

const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    //jquery-->最終打包生成的[name]
    //["jquery"]-->要打包的庫是jquery
    jquery: ['jquery'],
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dll'),
    library: '[name]_[hash]', //打包的庫裡面向外暴露出去的內容是什麼名字
  },
  plugins: [
    //打包生成一個mainfest.json-->提供和jquery映射(方便以後查看哪些已經被打包過了)
    new webpack.DllPlugin({
      name: '[name]_[hash]', //映射庫暴露的內容名稱
      path: resolve(__dirname, 'dll/manifest.json'), //輸出的文件路徑,
    }),
  ],
  mode: 'production',
};
