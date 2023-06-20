const db = require('../db/index')
const bcrypt = require('bcryptjs')
const getUserInfo = (req, res) => {
    // 注意：为了防止用户的密码泄露，需要排除 password 字段
    console.log("get:",req.query)
    const sql = `select id, username, password from users where username=?`
    //这里的req是根据解析出来的token得到的对应的数据库中的数据
    //console.log(req.auth.username)
    db.query(sql, req.query.username, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
        if (results.length !== 1) return res.cc('获取用户信息失败！')
        // 3. 将用户信息响应给客户端
        res.send({
            status: 0,
            message: '获取用户基本信息成功！',
            data: results[0],
        })
    })
}
const updateUserInfo = (req, res) => {
    //console.log(req.query);
    console.log("update:",req.body);
    const sql = `update users set ? where username=?`
    // console.log(req.auth); //用户输入的指定修改值   解析token后用户输入值被放在req.auth里
    
    db.query(sql, [req.body, req.body.username], (err, results) => {
        //console.log(results);
        res.send({
            status: 0,
            message: 'update用户信息成功！',
            data: results,
        })
       // res.setHeader('Access-Control-Allow-Credentials', true);
    })
}

const updatePassword = (req, res) => {
    console.log(req.body)
    // 定义根据 username 查询用户数据的 SQL 语句
    const sql = `select * from users where username=?`
    // 执行 SQL 语句查询用户是否存在
    db.query(sql, req.body.username, (err, results) => {
        //console.log(req.body.username) 
        //token解析出来的东西在req.auth   使用joi规定用户新输入的东西在req.body
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 检查指定 username 的用户是否存在
        if (results.length !== 1) return res.cc('用户不存在！')

        // TODO：判断提交的旧密码是否正确
        // 判断提交的旧密码是否正确,数据库中密码有的明文存储有的密文存储
        //console.log(results[0])
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        //1console.log(req.body.oldPwd,results[0].password)
        if (!compareResult && req.body.oldPwd !== results[0].password) return res.cc('原密码错误！')
        //更新密码到数据库
        const sql = `update users set password=? where username=?`
        // 对新密码进行 bcrypt 加密处理
        const newPwd = bcrypt.hashSync(req.body.newPwd, 2)
        db.query(sql, [newPwd, req.body.username], (err, results) => {
            // SQL 语句执行失败
            if (err) return res.cc(err)
            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('更新密码失败！')
            // 更新密码成功
            res.cc('更新密码成功！', 0)
        })
    })

}

const updateAvatar = (req, res) => {
    const sql = 'update users set user_pic=? where username=?'
    db.query(sql, [req.body.avatar, req.body.username], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('更新头像失败！')

        // 更新用户头像成功
        return res.cc('更新头像成功！', 0)
    })
}
module.exports = {
    getUserInfo,
    updateUserInfo,
    updatePassword,
    updateAvatar
}