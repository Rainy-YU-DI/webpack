//引入
import '../css/iconfont.css';
import '../css/index.less';
import print from './print.js';

function add(x, y) {
  return x + y;
}
console.log(add(1, 2));
print();

if (module.hot) {
  //一旦module.hot為true,說明開啟了HMR功能
  //方法會監聽print.js文件的變化，一旦發生變化，其他模塊不會重新打包構建，只會執行後面的回調函數
  module.hot.accept('./print.js', function() {
    print();
  });
}
