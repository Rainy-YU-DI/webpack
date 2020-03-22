//開發環境布置:能讓代碼運行
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js', //讓生成的built在build資料夾下的js資料夾內
    path: resolve(__dirname, 'bulid'), //自動打包成build資料夾
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.css$/,
        use: [
          //創建style標籤，將樣式放入
          /* 'style-loader', */
          //這個loader取代style-loader:作用:提取js中css成單獨文件
          MiniCssExtractPlugin.loader,
          //將css文件整合到js文件中
          'css-loader',
        ],
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
  },
};
