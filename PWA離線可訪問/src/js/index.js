// 引入
import '../css/index.css';
import { mul } from './test';

function add(x, y) {
  return x + y;
}
// eslint-disable-next-line
console.log(add(1, 5));

// eslint-disable-next-line
console.log(mul(1, 5));

/*
1.eslint不認識window  navigator全局變量
解決:需要修改package.json中eslintConfig配置
"eslintConfig": {
    "env": {
      "browser": true//支持瀏覽器端全局變量
    }
2.打包後service-worker.js代碼必須運行在服務器上
-->法1:用nodejs寫服務器
-->法2:下指令
    npm i serve -g
    serve -s bulid 啟動服務器，將目錄下所有資源暴露出去
3.到產出的http://localhost:5000查看Application /Service Works的source為service-works.js然後在到Network調成offline離線，還是會刷新
*/

// 註冊serviceWorker
// 處理兼容性問題
//會在打包後再bulid生成service-worker.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('sw註冊成功');
      })
      .catch(() => {
        console.log('sw註冊失敗');
      });
  });
}
