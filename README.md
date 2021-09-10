# vue动态路由的实现
* 目前应该使用`addRoute`!!! 而不是`addRoutes`
* 介绍[地址](https://juejin.cn/post/6963211038850449416)

## 项目启动
`npm i`, `npm run serve`

## 坑点
1、在`vue-route:3x`版本内，废弃了`router.addRoutes`,而是使用`router.addRoute`,注意没有`s`  
2、`router.getRoutes`获取的路由层级只有一层！不会出现子路由，子路由会有`parent`属性。  
3、永远不要使用`this.$router.options.routes`来获取路由，因为动态修改路由这里面不会变化，真的是坑啊！！  
4、路由f5刷新后,之前动态添加的路由都会丢失。。      
5、404页面，钩子函数内进行判断就好。 不要写这句 `{ path: '*', redirect: '/404' }`
