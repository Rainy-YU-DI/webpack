const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'production',
  //不想被打包的庫名
  //忽略庫後一定要記得用CDN在html手動引入此庫，頁面才會正常顯示
  externals: {
    //忽略庫名--npm包名
    jquery: 'jQuery',
  },
};
