const express = require('express')
const router = express.Router()
const artCate_handler = require('../router_handler/artCate')

const expressJoi = require('@escook/express-joi')
const {add_cate_schema} = require('../schema/artCate')
const {delete_cate_schema} = require('../schema/artCate')
// 获取文章分类的列表数据
router.get('/cates', artCate_handler.getArticleCates)
// 新增文章分类的路由
router.post('/addcates',expressJoi(add_cate_schema),artCate_handler.addArticleCates)
//新增删除文章分类的路由
router.get('/deletecates/:id',expressJoi(delete_cate_schema),artCate_handler.deleteCateById)
//get检索资源--- /:id ---params参数只能用于获取 URL 中的路由参数
//也可以用post ---body提交表单参数

// 向外共享路由对象
module.exports = router