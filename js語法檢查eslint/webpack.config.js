const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      /*
      語法檢查:下載eslint-loader  eslint
      注意:只檢查自己寫的原代碼，第三方庫是不用檢查的
      設置檢查規則:
            package.json中eslintConfig中設置~
              "eslintConfig":{
                "extends":"airbnb-base"
              }
            //檢查依照規則:airbnb
            airbnb -->下載eslint-config-airbnb-base  eslint-plugin-import  eslint*/
      {
        test: /\.js$/,
        //排除檢查第三方庫
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          //自動修復eslint的錯誤
          fix: true,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true,
  },
};
