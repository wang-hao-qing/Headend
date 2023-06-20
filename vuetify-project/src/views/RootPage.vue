<template>
    <!-- 修改用户密码功能 -->
    <div>
      <h3>修改用户密码</h3>
        <v-responsive class="mx-auto" max-width="344">
            <v-text-field label="输入你要操作的用户名" 
            v-model="username" 
            >  </v-text-field>

            <v-text-field label="输入旧密码" 
            v-model="oldPwd" 
            ></v-text-field>

            <v-text-field label="输入新密码并点击右侧按钮修改密码" 
            v-model="password" 
            append-icon='mdi-wrench'
            @click:append="updatePassword()">
            </v-text-field>

        </v-responsive>
    </div>
    
     <!-- 查询用户信息功能 -->
     <div>
      <h3>查询用户信息</h3>
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

     <!-- 删除用户功能 -->
     <div>
      
      <h3>删除用户</h3>
             <v-responsive
                     class="mx-auto"
                     max-width="344"
                   >
                     <v-text-field
                       label="Your Username"
                       hide-details="auto"
                       v-model="user"
                       append-icon='mdi-wrench'
            @click:append="deleteInfo()"
                    ></v-text-field>
            </v-responsive>
             
            
     </div>
</template>




<script  setup>
import axios from 'axios';
import { reactive, ref } from 'vue'
let message = reactive({
 msg:{
  id: '',
  username: '',
  password: '',
 }
})
let password = ref(null)
let oldPwd = ref(null)
let user = ref(null)
let username = ref(null)


function getInfo() {
  axios.get('http://127.0.0.1:3001/api/rootget',{
    // get请求传参用params  服务端对应req.query接收  post请求传参用data，req.body接收
    // headers: {'Authorization': store.token}, 
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

function updatePassword() {
    axios({
        method: 'post',
        url: 'http://127.0.0.1:3001/my/updatepwd',
       // headers: { 'Authorization': store.token },
        data:
        {
            username: username.value,
            oldPwd:oldPwd.value,
            newPwd: password.value,
        }

    })
        .then(response => {
            console.log('Response:', response.data);
            //console.log(store.token)
        })
        .catch(error => {
            console.error('Error:', error); 
        })
}

function deleteInfo() {
  axios.post('http://127.0.0.1:3001/api/rootdelete',{
      data:{
        username:user.value
      }
  })
  .then(response => {
    console.log('Response:', response.data);
   
  })
  .catch(error => {
        console.error('Error:', error);

    })
}


</script>

<style scoped>
h3 {
  text-align: center;
}
</style>