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
        test: /\.css$/,

        use: ['style-loader', 'css-loader'],
      },
      //打包其他資源(除了html/js/css外的資源)
      {
        //排除html/js/css
        exclude: /\.(css|js|html)$/,

        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'development',

  //自動化顯示:開發服務器devServer(自動編譯,自動打開瀏覽器，自動刷新瀏覽器)
  //特點:只會在內存中編譯打包，不會有任何輸出(所以根有沒有dist沒關西)
  //用前要先下載:npm i webpack-dev-server -D
  //啟用:npx webpack-dev-server
  devServer: {
    //項目建構後路徑
    contentBase: resolve(__dirname, 'build'),
    //啟動gzip壓縮
    compress: true,
    //端口號(用localhost:數字)查看
    port: 3000,
    //自動打開瀏覽器
    open: true,
  },
};
