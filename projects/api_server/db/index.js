const mysql = require('mysql')

//创建数据库连接对象
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    database:'mybase1',
})
module.exports = db