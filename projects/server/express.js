const express = require('express')
const app = express()
//配置cors解决跨域
const cors = require('cors')
app.use(cors())

const hostname = '127.0.0.1';
const port = 3000;
app.listen(port, hostname, () => {
    console.log(`Server running on  http://${hostname}:${port}/`);
})

//监听浏览器请求
app.get('/index',(req,res)=>{
    res.end('Hello Express')
})
app.get('/list',(req,res)=>{
    res.end('Hello Im List')
})

//sendFileAPI 能直接读取文件内容返回给浏览器
//res.sendFile(var1, var2, var3)
/**
参数1： 要读取的文件路径 --- 必须绝对路径
参数2： 配置项，可选，一般不用
参数3： 读取完成后的回调函数，该函数中有一个参数 --- 错误对象
*/
/* app.get('/index',(req,res)=>{
    res.sendFile(path.join(__dirname,'../','public','index.html'),(err)=>{
        if (err) {
            console.log(err);
        }
    })
}) */
app.get('/user/:id', (req, res, next) => {
    console.log('ID:', req.params.id)
    next()
  }, (req, res, next) => {
    res.send('User Info')
    //该中间件函数没有调用next，没有传递控制权给下一个中间件函数
  })
  
  // handler for the /user/:id path, which prints the user ID
  app.get('/user/:id', (req, res, next) => {
    res.send(req.params.id)
     next()
  })

 //路径路径路径！！ 相对路径非常容易出错
  app.use('/public',express.static('../public'));
//url地址中以 /public 开头的，都会去 public 目录下读取对应的文件并返回给浏览器
/* const path = require('path')
app.use('/public', express.static(path.join(__dirname, 'public'))) */