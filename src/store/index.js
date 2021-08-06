import Vue from 'vue'
import Vuex from 'vuex'
import { authRouter, resetRouter, router } from '../router'

import { filterAsyncRouter } from '@/util'
//页面刷新不丢失插件
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      userName: '',
      password: '',
      token: '',
      routerList: []
    }
  },
  mutations: {
    SET_USER_INFO(state, val) {
      state.userInfo = val
    },
    ADD_ROUTE(state) {
      let routerList = JSON.parse(JSON.stringify(state.userInfo.routerList))
      //console.log(26, router.getRoutes().length)
      //路由未添加之前是4个,我们判断是否添加过，没添加过就添加
      if (router.getRoutes().length === 4) {
        routerList = filterAsyncRouter(routerList)
        console.log('路由添加前', router.getRoutes())
        routerList.forEach((i) => {
          //在home父路由内添加子路由
          router.addRoute('home', i)
        })
        console.log('路由添加后', router.getRoutes())
      }
    }
  },
  actions: {
    //登陆
    login({ commit }, userInfo) {
      const { userName, password } = userInfo
      return new Promise((resolve) => {
        //模拟登陆，获取用户信息， 权限路由列表
        //假设返回的有token, 路由列表(根据不同用户返回不同)
        /**********************模拟后端传过来的路由列表----S***********************/
        let routerList = []
        if (userName === 'admin') {
          routerList = authRouter
        } else if (userName === 'commonUser') {
          routerList = [authRouter[0]]
        }
        /**********************模拟后端传过来的路由列表----E***********************/
        let token = 'testToken'
        console.log(56, routerList)
        //把用户信息存入vuex
        commit('SET_USER_INFO', {
          userName,
          password,
          token,
          routerList
        })
        console.log('login over')
        //添加路由
        commit('ADD_ROUTE')
        resolve()
      })
    },
    //注销
    logout({ commit, state }) {
      return new Promise((resolve) => {
        console.log(state.userInfo.token, '注销了')
        commit('SET_USER_INFO', {
          userName: '',
          password: '',
          token: '',
          routerList: []
        })
        //重置路由
        resetRouter()
        resolve()
      })
    },
    //添加路由
    addRoute({ commit }) {
      commit('ADD_ROUTE')
    }
  },
  modules: {},
  plugins: [createPersistedState()]
})
