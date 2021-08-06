<template>
  <el-form :model="userInfo" class="p-login" style="width: 300px">
    <el-form-item label="角色">
      <el-select v-model="userInfo.userName" placeholder="选择登陆">
        <el-option label="管理员" value="admin"></el-option>
        <el-option label="普通用户" value="commonUser"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="userInfo.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">登陆</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      userInfo: {
        userName: 'admin',
        password: 123
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    onSubmit() {
      this.$store.dispatch('login', this.userInfo).then(() => {
        console.log('登陆跳转')
        this.$router.push({ path: '/home' })
        //this.$router.push('/home')
      })
      //this.$store.dispatch('setUserInfo', this.userInfo)
    }
  }
}
</script>
<style lang="scss" scoped>
.p-login {
  margin: 0 auto;
}
</style>
