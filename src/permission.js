/**
 * 权限配置文件
 */
import { router } from './router'
import store from './store'
import { Message } from 'element-ui'
router.beforeEach(async (to, from, next) => {
  //获取token
  let { userInfo } = store.state
  const { userName } = userInfo
  //有用户信息
  if (userName) {
    //添加路由
    /*if (userName === 'admin') {
      authRouter.forEach((i) => {
        router.matcher.addRoute('home', i)
      })
    } else {
      //router.addRoute([...authRouter])
    }
    console.log(19, router.options)*/

    next()
  }
  //无用户信息
  else {
    //没有权限访问，跳入没有权限页面/或者登陆页面
    // 跳转之前要判断一下是否为需要跳转的界面，不然会进入死循环
    if (to.path === '/login') {
      next()
    } else {
      Message.error('请先登陆！')
      next('/login')
    }
  }
})

router.afterEach(() => {})
