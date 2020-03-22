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
    hot: true,
  },
  //如果建構代碼出錯可以通過source-map追蹤顯示出原代碼錯誤
  devtool: 'eval-source-map',
};

/*
source-map:一種提供構建代碼追蹤到原代碼的技術(如果構建代碼出錯了,通過映射可以追蹤到是原代碼哪一行錯誤)

[inline-|hidden|eval][nosources-][cheap-[module-]]source-map

會分別在
1.外部:build額外生成built.js.map
2.內部:直接內崁入進built.js

source-map:外部
  錯誤代碼準確訊息 和 原代碼錯誤位置
(外部)
cheap-source-map:外部
  錯誤代碼準確信息 和  原代碼錯誤位置(只能精確地顯示某行)
cheap-module-source-map:外部
  錯誤代碼準確信息 和  原代碼錯誤位置,module會將loader的source map加入
hidden-source-map:外部
  錯誤代碼錯誤原因，但是沒有錯誤位置
  不能追蹤原代碼錯誤，只能提示到建構代碼的錯誤位置
nosources-source-map:外部
  錯誤代碼訊息，但是沒有任何原代碼訊息
(內部)
eval-source-map:內聯
  每一個文件都生成對應的source-map,都有標示錯誤代碼準確信息 和  原代碼錯誤位置
inline-source-map:內聯
  指生成一個內聯source-map
  錯誤代碼準確信息 和  原代碼錯誤位置
  
  開發環境:推薦使用速度快(內聯建構速度快優先)
  eval-source-map
  生產環境:推薦使用體積小的(外聯)
  source-map/cheap-module-source-map
  若想要代碼隱藏:
  nosources-source-map/hidden-source-map

*/
