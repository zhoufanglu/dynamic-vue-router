import Vue from 'vue'
import Vuex from 'vuex'
import { router, authRouter, resetRouter } from '../router'

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
      state.userInfo = Object.assign(state.userInfo, val)
    }
  },
  actions: {
    //登陆
    login({ commit }, userInfo) {
      console.log(23, authRouter)
      const { userName, password } = userInfo
      return new Promise((resolve) => {
        //模拟登陆，获取用户信息， 权限路由列表
        //假设返回的有token, 路由列表(根据不同用户返回不同)
        //模拟路由列表
        let routerList = []
        if (userName === 'admin') {
          routerList = authRouter
        } else if (userName === 'commonUser') {
          routerList = [authRouter[0]]
        }
        let token = 'testToken'
        //把用户信息存入vuex
        commit('SET_USER_INFO', {
          userName,
          password,
          token
        })
        //添加路由
        console.log('路由添加前', router.getRoutes())
        routerList.forEach((i) => {
          //在home父路由内添加子路由
          router.addRoute('home', i)
        })
        console.log('路由添加后', router.getRoutes())
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
          token: ''
        })
        //重置路由
        resetRouter()
        resolve()
      })
    }
  },
  modules: {}
})
