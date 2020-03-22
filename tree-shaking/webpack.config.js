//生產環境布置:能讓代碼優化上線
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

/*tree shaking功能:去除無使用到的代碼
  前提:1.必須使用ES6模塊化 2.開啟production環境
  作用:減少代碼體積

  問題:有時因為版本不同會誤刪除CSS/@babel/pojyfill(像這類的雖然在\index.js內引入，但可能不小心被認為沒使用)
  解決:在package.json中配置
    "sideEffects":false所有代碼都沒有副作用(都可以被tree shaking)要寫成-->"sideEffects":["*.css","*.less"]
    這樣.css和.less檔案就不會被誤刪了
 */
process.env.NODE_ENV = 'production';

module.exports = {
  entry: './src/js/index.js',
  output: {
    //contenthash文件資料緩存
    filename: 'js/built[contenthash:10].js',
    path: resolve(__dirname, 'bulid'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        oneOf: [
          {
            test: /\.less$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              {
                loader: 'postcss-loader',

                options: {
                  ident: 'postcss',
                  plugins: () => [require('postcss-preset-env')()],
                },
              },
              'less-loader',
            ],
          },
          {
            test: /\.css$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              {
                loader: 'postcss-loader',
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
              outputPath: 'media',
            },
          },

          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
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

              cacheDirectory: true,
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
      filename: 'css/built[contenthash:10].css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
  ],

  mode: 'production',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3001,
    open: true,
  },
  devtool: 'source-map',
};
