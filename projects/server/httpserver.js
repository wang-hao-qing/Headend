//创建http服务器并开启
const http = require('http')
const fs = require('fs')
const server = http.createServer((req, res) => {
    // 设置 CORS 头，允许跨域请求
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
    // 处理请求
    if (req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello World!');
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found资源');
    }
  });

const hostname = '127.0.0.1';
const port = 3000;
server.listen(port, hostname, () => {
    console.log(`Server running on  http://${hostname}:${port}/`);
})

//监听服务器request请求并设置回调处理
server.on('request', (req, res) => {
    //end方法将数据返回给浏览器,浏览器显示该字符串
    //res.end(JSON.stringify({message: 'hello world'}))
    res.statusCode = 200;
    const url = req.url
    //不同url返回不同的内容
    //setHeader解决浏览器显示中文乱码问题
    res.setHeader('content-type', 'text/html;charset=utf-8')

    fs.readFile('H:/QianDuan/H5C3JSVue/HTML/pc端开发/品优购/shoping/index.html', (err, result) => {
        if (err) {
            return res.end('not found!')
        }
        res.end(result)
    })

})
//发送http请求
// http.get('')