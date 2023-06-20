const express = require('express')
const router = express.Router()
const userinfo_handler = require('../router_handler/userinfo')

// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { update_userinfo_schema } = require('../schema/user')
const { update_password_schema } = require('../schema/user')
const { update_avatar_schema } = require('../schema/user')
//获取用户的基本信息
router.get('/userinfo',userinfo_handler.getUserInfo)
// 更新用户的基本信息
router.post('/userinfo', expressJoi( update_userinfo_schema ), userinfo_handler.updateUserInfo)
//更新用户密码
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)
//更新用户头像
router.post('/update/avatar',expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)


module.exports = router