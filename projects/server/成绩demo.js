const fs = require('fs')
//路径写绝对路径
fs.readFile('H:/WebSever/old.txt','utf8',function(err,result) {
    if(err) {
        return console.log('失败',err.message);
    }
         console.log('success',result);
         const arrOld = result.split(' ')
         const arrNew = []
         arrOld.forEach(item=>{
            arrNew.push(item.replace('=',':'))
         })
         //合并数组并得到新字符串
        const newArr =  arrNew.join('\r\n')
        console.log(newArr);
         fs.writeFile('H:/WebSever/成绩.txt',newArr,'utf8',(err)=>{
            if (err) {
                console.log(err);
            } 
        })
})

const path = require('path')
const pathArr = path.join('H:/WebSever','成绩.txt')
fs.appendFile(pathArr,'我是新增的数据','utf8',(err)=>{
    if (err) {
        console.log(err);
    } 
    console.log('sssssss');
})

/* fs.readdir('H:/QianDuan',(err,files)=>{
    if(err){
        return console.log(err);
    }
    console.log(files);
}) */