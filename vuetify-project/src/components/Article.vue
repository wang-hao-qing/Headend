<!-- "http://127.0.0.1:3001/public/Tab.vue" -->
<template>
    <div>
    <h1>Tab.vue 文件内容：</h1>
    <button @click="article()">点我发axios</button>
    <pre>{{ fileContent }}</pre>
  </div>
</template>

<script setup>
import axios from 'axios';
import {onMounted,ref} from 'vue'


 let fileContent = ref(null)

function article(){
    axios.get('http://127.0.0.1:3001/public/Tab.vue')
      .then(response => {
        fileContent = response.data;
      })
      .catch(error => {
        console.error(error);
      });
}
    
   


</script>