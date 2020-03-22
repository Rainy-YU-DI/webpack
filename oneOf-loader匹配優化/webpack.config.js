//生產環境布置:能讓代碼優化上線
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//將CSS從js中提取出來
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//壓縮CSS插件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
//定義nodejs環境變量:決定使用browserlist的哪個環境
process.env.NODE_ENV = 'production';

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js', //讓生成的built在build資料夾下的js資料夾內
    path: resolve(__dirname, 'bulid'), //自動打包成build資料夾
  },

  module: {
    rules: [
      //將重複的JS優先的提取出來
      {
        //檢查JS文件
        //在package.json中eslintConfig-->用airbnb檢查
        test: /\.js$/,
        exclude: /node_modules/,
        //js的eslint-loader優先執行
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          //自動修復檢查的問題
          fix: true,
        },
      },
      {
        //以下優化只讓文件匹配一個loader
        //注意:不能寫入兩個同文件的loader(其中一個要提取到外面)
        oneOf: [
          {
            test: /\.less$/,
            use: [
              MiniCssExtractPlugin.loader,
              //將css加載在script中
              'css-loader',
              //less也要做兼容性處理
              //加在less-loader之前，因為要先等less轉成css
              {
                loader: 'postcss-loader',
                /*對postcss進行配置 */
                //還需要在package.json中定義browserlist
                options: {
                  ident: 'postcss',
                  plugins: () => [require('postcss-preset-env')()],
                },
              },
              //將less轉成css
              'less-loader',
            ],
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
              //css兼容性處理
              {
                loader: 'postcss-loader',
                /*對postcss進行配置 */
                //還需要在package.json中定義browserlist
                options: {
                  ident: 'postcss',
                  plugins: () => [require('postcss-preset-env')()],
                },
              },
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

          {
            //對JS做兼容性處理
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    //使用按需加載
                    useBuiltIns: 'usage',
                    corejs: {
                      version: 3,
                    },
                    targets: {
                      chrome: '60',
                      firefox: '50',
                    },
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      //html壓縮
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({
      //對輸出的css文件進行重命名，並指定放在CSS文件夾下
      filename: 'css/main.css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  //JS自動壓縮
  mode: 'production',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3001,
    open: true,
  },
  devtool: 'source-map',
};
