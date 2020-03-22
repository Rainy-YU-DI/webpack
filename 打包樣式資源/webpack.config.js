/*
webpack.config.js :webpack的配置文件
作用:指示webpack幹哪些活 (當你運行webpack指令時，會加載裡面的配置)

所有構建工具都是基於nodejs平台運行的~模塊化默認採用commonjs*/

//resolve用來拚接絕對路徑的方法:引入nodeJS絕對路徑的核心模塊
const { resolve } = require('path');

module.exports = {
  //webpack配置
  //入口起點
  entry: './src/index.js',
  //輸出
  output: {
    //輸出文件名
    filename: 'built.js',
    //輸出路徑
    //__dirname 為nodejs的變量,代表當前根目錄的絕對路徑
    //__dirname後面+build
    path: resolve(__dirname, 'build'),
  },
  //loader的配置
  module: {
    rules: [
      //詳細loader配置
      //不同文件類型必須配置不同loader處理
      {
        //匹配哪些文件:使用正則表達式去匹配結尾為.css文件
        test: /\.css$/,
        //使用哪些loader進行處理
        use: [
          //user數組中loader執行順序:從右到左，從下到上(先css-loader再style-loader)
          //創建style標籤，將js中的樣式資源插入進行，添加到head中生效
          'style-loader',
          //將css文件變成commonjs模塊加載js中，裡面內容是樣式字符串
          'css-loader',
        ],
      },
      {
        test: /\.less$/,

        use: [
          //將less文件編譯成css文件
          //需要下載less和less-loader
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
  //plugins的配置
  plugins: [],
  //模式
  mode: 'development',
};
