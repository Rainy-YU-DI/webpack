const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//設置nodejs環境變量:決定package.json中browserslist裡面的配置-->要設成開發模式時:要設這個(因為不寫默認是生產模式)
process.env.NODE_ENV = 'development';

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'bulid'),
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            //修改postcss-loader的配置
            options: {
              ident: 'postcss',
              plugins: () => [
                //postcss的插件
                require('postcss-preset-env')(),
              ],
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

          /*css兼容性處理:postcss --> 下載postcss-loader postcss-preset-env */
          /*postcss-preset-env:幫postcss找到package.json中browserslist裡面的配置，通過配置加載指定的css兼容性樣式*/
          /*
          "browserslist":{
            //開發環境 -->需設置node環境變量:process.env.NODE_ENV=development
            "development":[
              "last 1 chrome version",
              "last 1 firefox version",
              "last 1 safari version"
            ],
            //默認為生產環境
            "production":[
              ">0.2%",
              "not dead",
              "not op_mini all"
            ]
    }
          */
          //使用loader的默認配置
          //"postcss-loader",
          {
            loader: 'postcss-loader',
            //修改postcss-loader的配置
            options: {
              ident: 'postcss',
              plugins: () => [
                //postcss的插件
                require('postcss-preset-env')(),
              ],
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
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
