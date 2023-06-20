const express = require('express')
const bodyParser = require('body-parser');
const app = express()
// 配置静态资源访问规则
app.use(express.static('public'))
app.listen(3001, () => {
    console.log('api server is running at http://127.0.0.1:3001');
})

//配置cors解决跨域
const cors = require('cors')
const corsOptions = {
  origin: '*',
  credentials: true, // 设置该项解决问题 ,在使用CORS时遇到了无法正确传递Authorization头的问题，则可能是因为浏览器默认情况下不支持将Credentials（凭证）标志设置为true来与跨域请求一起发送。
};
app.use(cors(corsOptions))
//设置静态资源
app.use('/public',express.static('../public'));

//配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))
// 使用body-parser中间件解析请求主体数据中的payload数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//在路由之前，声明一个错误处理中间件简化处理响应失败的代码
app.use(function (req, res, next) {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

// 导入配置文件
const config = require('./config')
const {expressjwt:jwt} = require('express-jwt') //用于还原jwt token为JSON对象
//注册路由前配置解析token的中间件  "/my/userinfo"路径会运行该中间件解析客户端传来的token
 app.use("/my/userinfo",jwt({secret:config.secretKey, algorithms: ['HS256', 'HS384'] }) )

//导入用户登录注册路由模块
const userRouter = require('./router/user')
//将自定义路由器挂载刀/api路径上，添加一个前缀/api
app.use('/api', userRouter)
//导入用户信息路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my',userinfoRouter)
//导入文章分类路由模块
const artCateRouter = require('./router/artCate')
app.use('/my/article',artCateRouter)
