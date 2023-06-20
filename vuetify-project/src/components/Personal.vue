<template>


    <v-main > 
       <!-- 查询用户信息功能 -->
        <div>
             <v-responsive
                     class="mx-auto"
                     max-width="344"
                   >
                     <v-text-field
                       label="Your Username"
                       hide-details="auto"
                       v-model="user"
                       append-icon = 'mdi-magnify'
                       @click:append= "getInfo()"
                    ></v-text-field>
            </v-responsive>
             
             <h3>ID:{{ message.msg.id }}</h3>
             <h3>Username:{{ message.msg.username }}</h3>
             <h3>Password:{{ message.msg.password }}</h3>
        </div>

      
       <!-- 修改用户信息功能 --> 
       <div>
             <v-responsive
                     class="mx-auto"
                     max-width="344"
                   >
                   <h3>用户修改ID功能</h3>
                     <v-text-field
                       label="输入完成后点击右侧按钮修改你的ID"
                       hide-details="auto"
                       append-icon = 'mdi-wrench'
                       @click:append= "updateUserInfo()"
                    ></v-text-field>
                   
                    <v-text-field
                     label="要修改的用户的username"
                     v-model="username"
                     
                     hide-details="auto"
                   ></v-text-field>

                   <v-text-field label="输入newId"
                   v-model="newId"
                   ></v-text-field>
                  <h3>用户修改密码功能</h3>
                  <v-text-field
                     label="要修改的用户的username"
                     v-model="username"
                    
                     hide-details="auto"
                   ></v-text-field>

                   <v-text-field label="输入旧密码"
                   v-model="oldPwd"
                   ></v-text-field>

                   <v-text-field
                       label="点击右侧按钮修改密码"
                       v-model="password"
                       append-icon = 'mdi-wrench'
                       @click:append= "updatePassword()"
                    ></v-text-field>
            </v-responsive>
                 
        </div>
      

      
       
     </v-main>


</template>

<script  setup>

import axios from 'axios';
import {reactive,ref} from 'vue'
import {useStore} from '@/store.ts'
import { storeToRefs } from 'pinia'
const store = useStore()
const { token } = storeToRefs(store)

let password = ref(null)
let oldPwd = ref(null)
let newId = ref(null)
let username = ref(null)
let message = reactive({
 msg:{
  id: '',
  username: '',
  password: '',
 }
})
let user = ref(null)

// 查改功能需要用户登录自己的账号，后台传给用户该账号token，只能查改该账号的信息
function getInfo() {
  axios.get('http://127.0.0.1:3001/my/userinfo',{
    // get请求传参用params  服务端对应req.query接收
    headers: {'Authorization': store.token}, 
      params:{
        username:user.value
      }
  })
  .then(response => {
    console.log('Response:', response.data);
   
    message.msg = response.data.data
  })
  .catch(error => {
        console.error('Error:', error);

    })
}

function updateUserInfo() {
  axios({
     method:'post',
     url:'http://127.0.0.1:3001/my/userinfo',
    headers: {'Authorization': store.token},   
    data: 
     { username: username.value,
       id: newId.value,} 
       /*{ 
        username: 'whq',
        password: '1234567898787',
       },  */
    // withCredentials: false ,
  })
  .then(response => {
    console.log('Response:', response.data);
    alert(response.data.message)
    //console.log(store.token)
  })
  .catch(error => {
        console.error('Error:', error);
    })
}

function updatePassword() {
  axios({
     method:'post',
     url:'http://127.0.0.1:3001/my/updatepwd',
    headers: {'Authorization': store.token},   
    data: 
     { username: username.value,
       oldPwd:oldPwd.value,
       newPwd: password.value,} 
  
  })
  .then(response => {
    console.log('Response:', response.data);
    console.log(store.token)
   if(response.data.status == 0) {
    alert('修改密码成功')
   }
   })
  .catch(error => {
        console.error('Error:', error);
        alert('修改密码失败，请查看控制台报错信息')
        // alert('请拨打13031606816向管理员申请重置账号密码')
       // router.push('/login')
    })
}



</script>

<style scoped>
h3 {
  text-align: center;
}
</style>