// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Default',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        //  当路径匹配成功 Home将被渲染到Default.vue的<router-view> 内
        //英文解释 ：route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
       
         path: '',
        name: 'Home',
        component: () => import( /* webpackChunkName: "home" */  '@/views/Home.vue'),
      },
    ],
  }, 
  {
    path: '/root',
    name: 'RootDefault',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
         path: '',
        name: 'RootPage',
        component: () => import('@/views/RootPage.vue'),
      },
    ],
  }, 


  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/person',
    name: 'Personal',
    component: () => import('@/components/Personal.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
