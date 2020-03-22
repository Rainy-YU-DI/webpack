function print() {
  const content = 'hello print111';

  //故意錯誤瀏覽器會顯示原代碼哪裡錯
  console.log(content)();
}

export default print;
