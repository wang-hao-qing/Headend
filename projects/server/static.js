const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'public', req.url)
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain'})
      res.end('Not found')
    } else {
      res.writeHead(200, {'Content-Type': 'text/plain'})
      res.end(data)
    }
  })
})

