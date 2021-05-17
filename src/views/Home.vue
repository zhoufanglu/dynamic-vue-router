<template>
  <div class="home">
    <el-button @click="layout">退出登陆</el-button>
    登陆用户名：{{ $store.state.userInfo.userName }}
    <div class="main">
      <div class="p-side-bar">
        <el-menu :default-active="$route.path" :router="true">
          <el-menu-item
            :index="menu.path"
            v-for="menu in menuList"
            :key="menu.name"
          >
            <span slot="title">{{ menu.name }}标题</span>
          </el-menu-item>
        </el-menu>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      menuList: []
    }
  },
  created() {
    this.initMenu()
  },
  mounted() {},
  methods: {
    layout() {
      console.log('退出登陆')
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
    initMenu() {
      let routeList = this.$router.getRoutes()
      //查找home的子路由，然后渲染出来
      this.menuList = routeList.filter(
        (i) => i.parent && i.parent.name === 'home'
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .main {
    display: flex;
    align-items: center;
    .p-side-bar {
      border: solid 1px red;
      width: 200px;
    }
  }
}
</style>
