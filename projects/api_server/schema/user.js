const joi = require('joi')
const username = joi.string().regex(/^[\u4E00-\u9FA5a-zA-Z0-9]+$/).min(1).max(30).required()
const id = joi
.string()
.pattern(/^[\S]{1,12}$/)
.required()
const password = joi
.string()
.pattern(/^[\S]{6,16}$/)
.required()
// dataUri() 指的是如下格式的字符串数据：
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=
const avatar = joi.string().dataUri().required()

//ValidationError: "username" is required
//该错误通常表示在使用 Joi 库验证请求数据时，没有提供必需的 "username" 字段，因为该字段是被定义为必填项的。




  exports.reg_login_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: {
      username,
      password,
    },
  }
  exports.update_userinfo_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: {
      username,
      id,
    },
  }
  exports.update_password_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: {
      // 使用 password 这个规则，验证 req.body.oldPwd 的值
      oldPwd: password,
      // 使用 joi.not(joi.ref('oldPwd')).concat(password) 规则，验证 req.body.newPwd 的值
      // 解读：
      // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
      // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
      // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
      newPwd: joi.not(joi.ref('oldPwd')).concat(password),
      username,
    },
  }
  exports.update_avatar_schema = {
    body: {
      avatar,
      username
    }
  }