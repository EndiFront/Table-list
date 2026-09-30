import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import NewTable from '@/components/NewTable.vue'
import Home from '@/components/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/newtable',
    name: 'NewTable',
    component: NewTable
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
