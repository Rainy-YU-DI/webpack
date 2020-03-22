const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        //要使用多個loader處理用use
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        //處理圖片資源
        test: /\.(jpg|png|gif)$/,
        //使用一個用loader
        //下載url-loader , file-loader
        loader: 'url-loader',
        options: {
          //圖片大小小於8kb,就會被base64處理
          //優點:減少請求數量(減輕伺服器壓力)
          //缺點:圖片體積會更大(文件請求速度更慢)
          limit: 8 * 1024,
          //問題:因為url-loader默認使用es6模塊化解析，而html-loader引入圖片是commonJS
          //解析後會出問題:[object Module]
          //解決方法:關閉url-loader的es6模塊化，使用commonjs解析
          esModule: false,
          //圖片名太長可以重新命名
          //[hash:10]取圖片的hash的前10位
          //[ext]取文件原來的檔案名
          name: '[hash:10].[ext]',
        },
      },
      {
        test: /\.html$/,
        //處理html文件的img圖片(負責引入img，從而能被url-loader進行處理)
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'development',
};
