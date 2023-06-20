// router 模块只放客户端请求和处理函数之间的映射关系
const express = require('express')
const router = express.Router()
const userHandler = require('../router_handler/user')

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')


router.post('/reguser', expressJoi(reg_login_schema),userHandler.regUser)
router.post('/login',expressJoi(reg_login_schema),userHandler.login)
router.get('/rootget',userHandler.rootGet)
router.post('/rootdelete',userHandler.rootDelete)
module.exports = router