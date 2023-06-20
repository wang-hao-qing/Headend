<template>
     <!-- 应用栏 -->
   <v-toolbar color="#B388FF">
    
    <!-- 头像 点击跳转到个人简介 -->
   <v-list style="background-color: #B388FF">
       <v-list-item
        prepend-avatar="http://127.0.0.1:3001/public/image/avatar.jpg"
        href = "https://github.com/wang-hao-qing" 
        title="HaoQ Wang"
        subtitle="whq3102662827@sina.com"
       ></v-list-item>
     </v-list>

   
   <v-spacer></v-spacer>
   <!-- 查询图标-->
   <v-btn icon>
     <v-icon>mdi-magnify</v-icon>
   </v-btn>
   <!-- 其他选项图标 -->
   <v-app-bar-nav-icon></v-app-bar-nav-icon>

  <!-- 用户功能分类  动态，文章，收藏，关注等 -->
   <template v-slot:extension>

     <v-tabs v-model="tab" align-tabs="title">
      <!-- 待修改，暂未开放 -->
       <v-tab v-for="item in items" :key="item" :value="item">
         {{ item }}
       </v-tab>
       <!-- 文章分类模块 -->
       <v-tab  title="文章分类" >
       </v-tab>
      <!-- 个人功能模块 -->
      <!-- <router-link   to="/person">个人信息</router-link>  -->
     
     </v-tabs>
   </template>
 </v-toolbar>
      
</template>

<script lang="ts" setup>


const tab = null
const items = [
  '文章', '收藏', '点赞', '关注',
]


</script>

<style scoped>
</style>