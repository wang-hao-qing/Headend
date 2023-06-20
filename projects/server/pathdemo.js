//想要实现读取一个index.html的html，script标签内容并存到一个新文件下
const fs = require('fs')
const path = require('path')

//先读取文件
fs.stat('H:\\QianDuan\\Project\\shangpinhui\\public\\index.html',(err,stats)=>{
    if (err) {
        return console.log('无法访问文件', err);
      }
    
      if (!stats.isFile()) {
        return console.log('指定的路径不是文件');
      }
    //如果能执行到这说明是一个文件，可正常读取
      fs.readFile('H:\\QianDuan\\Project\\shangpinhui\\public\\index.html','utf8',function(err,result){
        if(err) {
            return console.log('失败',err.message);
        }
        console.log('success',result);
         //读取成功后调用对应方法拆解标签，存入文件
        resolveScript(result)
    })
   
})

//定义提取regScript内容的方法
function  resolveScript(all){
  const regScript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
    //提取html标签内容为一个数组
  const arr = regScript.exec(all)
  const newJS = arr[0].replace('<script>','').replace('</script>','')
  fs.writeFile(path.join(__dirname, './clock/index.js'),newJS,(err)=>{
    if(err) {
      return console.log('写入失败',err.message);
  }
  console.log('写入成功');
  })
}
