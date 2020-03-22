const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'production';
/*分割文件:
步驟一:
  使用單入口
步驟二:加入
   optimization: {
    splitChunks: {
      chunks: 'all',
    }
  }
步驟三:在index.js內
通過js代碼，讓某個文件被單獨打包成一個chunk
用import動態導入想要分割的js:手動將某個文件打包*/
module.exports = {
  //單入口
  entry: './src/js/index.js',
  //多入口
  /* entry: {
    main: './src/js/index.js',
    test: './src/js/test.js',
  }, */
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
  /*
  1.可以將node_modules中(第3方庫)代碼單獨打包一個chunk最終輸出
  2.自動分析多入口chunk中，有沒有公共的文件。如果有會打包成單獨一個
chunk*/
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  mode: 'production',
};
