import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import login from '../views/login'
import nullPage from '../views/404'

Vue.use(VueRouter)
//模拟权限路由
export const authRouter = [
  {
    path: '/allSeePage',
    name: '所有人可见',
    component: 'allSeePage'
  },
  {
    path: '/adminPage',
    name: '管理员可见',
    component: 'adminPage'
  }
]

//初始的路由，所有人可见
export const constantRoutes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: []
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/404',
    name: '404',
    component: nullPage
  }
  // 404 page must be placed at the end !!!
  //{ path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

export const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
