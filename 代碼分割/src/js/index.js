// 引入

import $ from 'jquery';
var jQuery = $;
jQuery('body').css('background', 'green');

function add(x, y) {
  return x + y;
}
// eslint-disable-next-line
console.log(add(1, 5));

/*通過js代碼，讓某個文件被單獨打包成一個chunk
用import動態導入想要分割的js:手動將某個文件打包*/
//可以設定打包出來的名字
import(/*webpackChunkName:"test"*/ './test')
  .then(({ mul }) => {
    console.log(mul(1, 4));
  })
  .catch(() => {
    console.log('失敗');
  });
