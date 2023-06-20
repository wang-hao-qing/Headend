 
  <template>
  <v-card
    class="mx-auto"
    max-width="544"
    title="用户注册"
  >
    <v-container>
      <v-text-field
        v-model="username"
        color="primary"
        label="Username"
        variant="underlined"
      ></v-text-field>
     <!--  <v-text-field
        v-model="last"
        color="primary"
        label="Last name"
        variant="underlined"
      ></v-text-field> -->
      
      <v-text-field
        v-model="email"
        color="primary"
        label="Email"
        variant="underlined"
      ></v-text-field>

     <!--  <v-text-field
        v-model="password"
        color="primary"
        label="Password"
        placeholder="Enter your password"
        variant="underlined"
      ></v-text-field> -->

      <v-text-field 
         v-model="password"
         :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
         :rules="[rules.required, rules.min]"
         :type="show1 ? 'text' : 'password'"
         name="input-10-1"
         label="显式输入您的密码"
         hint="At least 8 characters"
         counter
         @click:append="show1 = !show1"
      ></v-text-field>
      <v-text-field
            v-model="password"
            :rules="[rules.required, rules.min]"
            :type="show2 ? 'text' : 'password'"
            name="input-10-2"
            label="隐式输入您的密码"
            hint="At least 8 characters"
            class="input-group--focused"
            @click:append="show2 = !show2"
          >
          <!-- 为了确保在用户点击追加图标时立即触发 click:append 事件，可以将 click 事件绑定到该图标本身上，而不是绑定到整个输入框组件上。 -->
        <template #append>
            <v-icon @click.stop="show2 = !show2"> 
               <div >
                   <i class="mdi mdi-eye-off"></i>
               </div>
            </v-icon>
        </template>
        </v-text-field>


      <v-checkbox
        v-model="terms"
        color="secondary"
        label="我同意网站条款"
      ></v-checkbox>
    </v-container>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="success" @click="register">
        完成注册
        <v-icon icon="mdi-chevron-right" end  ></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>



</template>

    
 <script lang="ts" setup>
import router from '@/router'
import axios from 'axios'
import {reactive,ref} from 'vue'


     const username= ref(null)
     const email= ref(null)
     const password= ref(null)
     const terms= ref(false)

     const show1=true
     const show2=false
     const rules = reactive({
      required: (value: any) => !!value || 'Required.',
      min: (v: string | any[]) => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => (`The email and password you entered don't match`),
    })
    function register():void {
      //router.push('/login')
      axios.post('http://127.0.0.1:3001/api/reguser', {
        username: username.value,
        password: password.value,
    }) 
    .then(response => {
        console.log('Response:', response.data);
       if(response.data.status == 200) {
          router.push('/login')
       }
    })
    .catch(error => {
        console.error('Error:', error);

    })

    }
</script>