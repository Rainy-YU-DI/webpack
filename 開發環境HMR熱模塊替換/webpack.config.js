/*
HMR:hot module replacement 熱模塊替換/模塊熱替換
  作用:一個模塊發生變化，只會重新打包這一個變過的模塊(而不是重新打包所有模塊)
  極大提升構建速度

  (1)樣式文件:可以直接使用HMR功能:因為style-loader內部實現了(所以在開發時，最好用style-loader，不要提取CSS單獨分離)
  (2)js文件:默認不能使用HMR功能-->需要到index.js內部去寫js代碼，手動添加支持HMR功能的代碼
  注意:HMR功能對js的處理，只能處理非js入口(index.js)以外的其他js文件
  (3)html文件:默認不能使用HMR功能，並且還會導致其他問題:html文件不能熱更新~
  解決不能熱更新問題:修改entry入口,將html文件引入
  (HTML只有一個文件，所以可以熱更新即可)
*/
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['./src/js/index.js', './src/index.html'],
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'bulid'),
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          esModule: false,
          //讓生成的圖片在build資料夾下的imgs資料夾內
          outputPath: 'imgs',
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        exclude: /\.(html|js|css|less|jpg|png|gif)/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          //讓生成的圖片在build資料夾下的media資料夾內
          outputPath: 'media',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      //對輸出的css文件進行重命名，並指定放在CSS文件夾下
      filename: 'css/main.css',
    }),
  ],
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3001,
    open: true,
    //開啟HMR功能
    //當有修改webpack，必須重新webpack
    hot: true,
  },
};
