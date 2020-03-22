//生產環境布置:能讓代碼優化上線
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

process.env.NODE_ENV = 'production';

/*緩存:緩存是在第一次結果出來後暫存(並不會馬上顯示cache)，而是要等到整個頁面有其他文件更新後重新打包，才看的到我剛剛對這樣文件的暫存(因為他這次資料沒被更新，所以顯示緩存延用上一次資料)
babel緩存
  cacheDirectory:true
  -->讓第2次打包構建速度更快
文件資原緩存-->讓代碼上線緩存時更好使用
  (文件緩存後我們在改內容重新打包後，問題:只要在緩存設定時效內，都不會進行更動)
  解決方法:
  在output的filename內加[hash]值(請使用方式3)
  *方式1:
    hash:每次webpack構建時會生成一個唯一的hash值。
  問題:這邊會js與css同時使用一個hash值。如果重新打包，會導致所有緩存失效(指改動一個兩個都會緩存失效)
 * 方式2:
    chunkhash:根據chunk生成的hash值，如果打包來源於同一個chunk，那麼hush值就一樣。
  問題:js和css值還是一樣的，因為css是在js中一起被打包的，生成同一個chunk
  *方式3:(使用此方式)
    contenthash:根據文件內容生成hash值。所以js和css可以分開生成各自的hash值
    
   */

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
                /*對postcss進行配置 */
                //還需要在package.json中定義browserlist
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
              //開啟babel緩存
              //第二次重新建構時會讀取第一次緩存，這樣沒更動的會沿用緩存
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
      //對輸出的css文件進行重命名，並指定放在CSS文件夾下
      //contenthash文件資料緩存
      filename: 'css/built[contenthash:10].css',
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
