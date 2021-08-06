import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main'
import Todos from '../views/Todos'

Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: "/:id",
        component: Todos,        
        name: "Todos",
        props: true
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
