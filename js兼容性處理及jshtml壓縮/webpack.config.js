const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//設置nodejs環境變量:要在開發時:要設這個(因為不寫的畫默認是生產狀態)
process.env.NODE_ENV = 'development';

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'bulid'),
  },

  module: {
    rules: [
      /*
      js兼容性處理:下載babel-loader  @babel/core
        1.基本js兼容性處理-->下載@babel/preset-env
          問題:只能轉換基本語法(ES6換ES5),如promise高級語法不能轉換
        2.全部js兼容性處理-->下載@babel/polyfill
        引用:在index.js內引入import '@babel/polyfill'即可
          問題:我只要解決部分兼容性問題，但是將所有兼容性代碼全部引入，體積太大
        3.需要做兼容的部分再加載指定代碼-->按需加載 core-js
        (用方法3時，方法2在index.js內引入的/* import '@babel/polyfill'; 要刪除)*/

      {
        test: /\.js$/,
        //第三方也不需要兼容

        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          //預設:指示babel做怎樣的兼容性處理
          presets: [
            [
              '@babel/preset-env',
              {
                //按需加載
                useBuiltIns: 'usage',
                //指定core-js版本
                corejs: {
                  version: 3,
                },
                //指定兼容性做到哪個版本瀏覽器
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17',
                },
              },
            ],
          ],
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      //壓縮html代碼
      minify: {
        //移除空格
        collapseWhitespace: true,
        //移除注釋
        removeComments: true,
      },
    }),
  ],
  //生產模式會自動壓縮js
  mode: 'production',

  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3001,
    open: true,
  },
};
