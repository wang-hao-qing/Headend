/***
 * 这里定义每个路由对应的处理函数 
 *  */

const db = require('../db/index')
const bcrypt = require('bcryptjs')//单向哈希函数加密password，不可逆，忘记密码只能手动重置
const JWT = require('jsonwebtoken')  //用于生成jwt token字符串
// 导入配置文件
const config = require('../config')

const regUser = (req, res) => {
    // res.send('regUser OK')   不要重复用res.send/json/render/redirect/status,会导致重复发HTTP响应头的错误
    //接收用户表单数据
    const userInfo = req.body
    console.log(req.body)
    //判断表单数据是否合法
    if (!userInfo.username || !userInfo.password) {
        //return res.send({ status: 1, message: '用户名或密码不能为空！' })
        return res.cc('用户名或密码不能为空')
    }
    //判断用户名是否被占用了
    const sql = `select * from users where username = ?`
    //安全设置其一
    //SQL查询语句中包含userInfo.username这样的字符串，这可能会导致SQL注入攻击。为了避免这种情况，你应该使用参数化查询。
    db.getConnection((err, connection) => {
        if (err) throw err;
        console.log(req.body)
        //console.log('connected as id ' + connection.threadId);
        // 使用连接进行数据操作
        db.query(sql, [userInfo.username], (err, results, fields) => {
            // 释放连接到连接池中
            connection.release();
            if (err) {
                return res.cc(err)
            }
            if (results.length > 0) {
                return res.cc('用户名被占用，请更换其他用户名！')
            }
            //如果都正常
            //对密码进行加密存储
            userInfo.password = bcrypt.hashSync(userInfo.password, 2)
            //插入数据库新用户
            const sql = 'insert into users set ?'
            db.query(sql, { username: userInfo.username, password: userInfo.password, id: generateUniqueRandomNumber() }, (err, results) => {
                // 执行 SQL 语句失败
                if (err) return res.cc(err)
                // SQL 语句执行成功，但影响多行
                if (results.affectedRows !== 1) {
                    //return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
                    return res.cc('注册用户失败，请稍后再试！')
                }
                // 注册成功
                //res.send({ status: 0, message: '注册成功！' })
                res.cc('注册成功！', 200)
            })
        })
    })

}

const login = (req, res) => {
    const userInfo = req.body
    console.log(req.body)

    const sql = `select * from users where username = ?`
    //根据用户名查询数据库对应数据
    db.query(sql, userInfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('登录失败！')
        //判断用户输入的密码和数据库中的加密后的密码是否相同
        const comparePsd = bcrypt.compareSync(userInfo.password, results[0].password)
       // console.log(userInfo.password, results[0].password,comparePsd)
        if (!comparePsd &&userInfo.password!==results[0].password) return res.cc('密码错误')
        //如果匹配，生成JWT Token字符串

        const token = JWT.sign({ username: userInfo.username }, config.secretKey, { expiresIn: '12h' })
        res.send({
            status: 200,
            message: '登陆成功',
            //方便客户端使用 Token
            token: 'Bearer ' + token
        })

    })
}

const rootGet = (req, res) =>{
    console.log(req.query)
    const sql = `select id, username, password from users where username=?`
    db.query(sql, req.query.username, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if (results.length !== 1) return res.cc('获取用户信息失败！')
        // 3. 将用户信息响应给客户端
        res.send({
            status: 200,
            message: '获取用户基本信息成功！',
            data: results[0],
        })
    })
}
const rootDelete = (req, res) => {
    console.log(req.body)
    const userInfo =  req.body.data
    const sql = `delete from users where username=?`
    db.query(sql, userInfo.username, (err, results) => {
        
        if (err) return res.cc(err)
       
        res.send({
            status: 200,
            message: '删除用户成功',
            data: results[0],
        })
    })
}

const crypto = require('crypto')//生成ID随机数
function generateUniqueRandomNumber() {
    const hash = crypto.createHash('sha256');
    const now = Date.now().toString();
    const randomNumber = Math.random().toString();

    hash.update(now + randomNumber);

    return hash.digest('hex');
}

module.exports = {
    regUser,
    login,
    rootGet,
    rootDelete
}