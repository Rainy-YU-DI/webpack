/*
index.js weckpack的入口文件
1.運行指令:
開發環境:webpack ./src/index.js -o ./build/built.js --mode=development
生產環境: webpack ./src/index.js -o ./build/built.js --mode=production
2.結論:
(1)webpack能處理js/json資源,不能處理css/img 等其他資源
(2)將ES6的模塊化編譯成瀏覽器可是別的模塊化
(3)生產環境比開發環境多一個壓縮JS代碼
*/
function add(x, y) {
  return x + y;
}
console.log(add(1, 2));
