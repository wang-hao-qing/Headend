<template>
    <v-sheet class="bg-deep-purple pa-12" rounded>
        <v-card class="mx-auto px-6 py-8" max-width="344">
            <v-form v-model="Form" @submit.prevent="onSubmit">

                <v-text-field v-model="email" :readonly="loading" :rules="[required]" class="mb-2" clearable
                    label="Username"></v-text-field>
                <v-text-field v-model="password" :readonly="loading" :rules="[required]" clearable label="Password"
                    placeholder="Enter your password"></v-text-field>
                <v-text-field v-model="Code" :readonly="loading" :rules="[required]" clearable label="Seccode"
                    placeholder="Enter seccode"></v-text-field>  

                  验证码：  <button class="checkCode" @click="createCode()">{{ checkCode}}</button>  
                <br>

                <v-btn :disabled="!Form" :loading="loading" block color="success" size="large" type="submit"
                    variant="elevated" @click=goHome()>
                    登录
                </v-btn>
                
                <v-btn     size="small" 
                    variant="elevated" @click=goRegister>
                    点我注册
                </v-btn>

                <v-btn     size="small" 
                    variant="elevated" @click=reset() >
                    忘记密码
                </v-btn>
            </v-form>

           
         
        </v-card>
    </v-sheet>
  
  <!-- <el-form ref="form" :model="form" :rules="rules" class="form">
  <el-form-item
        prop="seccode"
        class="inputbar"
      >
        <el-input
          class="log-input"
          v-model="form.seccode"
          placeholder="验证码"
          prefix-icon="icon-login_auth"
         
        >
        </el-input>
       
      </el-form-item>

     

      <span class="checkCode" @click="createCode">{{ checkCode}}</span>
    </el-form> -->
</template>
  
<script lang="ts" setup>
import router from '@/router';
import axios from 'axios';
import {ref,onMounted,reactive} from 'vue'
import {useStore} from '@/store.ts'
import { storeToRefs } from 'pinia'
const store = useStore()
let { token } = storeToRefs(store)

const Form = ref(false)
const email = ref(null)
const password = ref(null)
const loading = ref(false)

//验证码功能
let checkCode = ref('')
let Code = ref(null)
let form = reactive({
    seccode: ''
})
const  rules =  reactive({
        seccode: [{ required: true, message: "请输验证码", trigger: "blur" }]
      }) 

onMounted(()=>{
    createCode();
    console.log(checkCode)
})

function onSubmit(this: { Form: any; email: null; password: null; loading: boolean; onSubmit: () => void; required: (v: any) => true | "Field is required" }) {
    if (!this.Form) return

    this.loading = true

    setTimeout(() => (this.loading = false), 2000)
}

function required(v: any) {
    return !!v || 'Field is required'
}
function goRegister():void {
    router.push('/register')
}
function goHome(this:any):void {
  //router.push('/')
  //登录时使用axios向服务器发请求，对比库中是否有此用户
 if(Code.value == checkCode.value) {
    
  axios.post('http://127.0.0.1:3001/api/login', {
        username: email.value,
        password: password.value,
    })
 .then(response => {
        console.log('Response:', response.data);
        store.token = response.data.token
        
       if(response.data.status == 200) {
          router.push('/')
       }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('登陆失败，请检查用户名和密码是否正确！')
    })
 }else {
    alert('验证码错误')
 }
  
} 
function reset() {
    alert('请拨打13031606816向管理员申请重置账号密码')
}
function createCode(this: any) {
    
		let code = ref("");
		const codeLength = 4; //验证码的长度  
		const random: Array<number | string> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; //随机数  

		for(let i = 0; i < codeLength; i++) { //循环操作  
			let index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）  
			code.value += random[index].toString(); //根据索引取得随机数加到code上  
		}
		checkCode = code; //把code值赋给验证码  
	}



</script>