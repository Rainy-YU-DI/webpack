/*
啟動服務器指令:
法1:npm i nodemon -g
    nodemon server.js
法2:node server.js

訪問服務器地址:
http://localhost:3007
*/

const express = require('express');
const app = express();
app.use(express.static('bulid', { maxAge: 1000 * 3600 }));
app.listen(3007);
