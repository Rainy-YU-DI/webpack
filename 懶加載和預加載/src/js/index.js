// 引入
console.log('index.js文件被加載了');

//import{mul}from"./test";

//懶加載(某事件才加載):直接在事件內寫入import導入用法
/*預加載prefetch:會在使用之前提前先加載Js文件，(看Network看得出來已先加載)
方法: 在事件內寫入地import內再填入webpackPrefetch:true
*/
document.getElementById('btn').onclick = function() {
  import(/*webpackChunkName:"test",webpackPrefetch:true*/ './test').then(({ mul }) => {
    console.log(mul(1, 4));
  });
};
