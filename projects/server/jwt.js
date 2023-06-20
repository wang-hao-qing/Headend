const express = require('express')
//创建express服务器实例
const app = express()
//导入JWT相关包
const JWT =require('jsonwebtoken')  //用于生成jwt字符串
const jwt = require('express-jwt') //用于还原jwt为JSON对象
const bodyParser = require('body-parser')//用于解析body
// 使用body-parser中间件解析请求body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//设置一个加密解密密钥
const secretKey = 'WHQAKSDMKXCV_12FDSF-——aSAD'
//注册中间件解析token，并指定哪些接口不需要访问权限
//app.use(expressjwt({ secret :secretKey, algorithms: ['HS256', 'HS384']}).unless({path: [/^\/api\//]}) )
app.use(jwt.expressjwt({ secret :secretKey, algorithms: ['HS256'] }));

//服务器收到客户端传来的信息生成JWT字符串
app.post('/api/login',(req,res)=>{
   const userinfo = req.body
   if(userinfo.username !== 'admin' || userinfo.password !== '123456'){
    return res.send({
       status:400,
       massage:'账号或密码错误'
    })
   }

   //如果登陆成功 调用JWT的sign方法生成jwt字符串
   const tokenStr = JWT.sign({username:userinfo.username},secretKey,{expiresIn:'2h'}  )
   res.send({
    status:200,
    message:'登陆成功',
    token: tokenStr
})
})



//配置中间件解析token后，从有权限的接口中使用req.user访问从jwt字符串中解析出来的信息
app.get('/admin/getinfo',(req,res)=>{
    console.log(req.user)
    res.send({
        status:200,
        message:'获取用户信息成功',
        data:req.user
    })
})

//允许跨域资源共享
const cors = require('cors')
app.use(cors())

app.listen(3000, () => {
    console.log('Server started on port 3000');
  });