/* import '@babel/polyfill'; */
const add = (x, y) => {
  return x + y;
};

const promise = new Promise(resolve => {
  setTimeout(() => {
    console.log('222');
    resolve();
  }, 1000);
});
console.log(promise);
console.log(add(2, 5));
