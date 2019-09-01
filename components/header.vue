<template>
  <dir>
    <div class="container">
      <div class="header">
        <el-row type="flex" justify="space-between">
          <div class="logo">
            <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
          </div>
          <el-row type="flex" justify="start" class="nav">
            <nuxt-link to="/">首页</nuxt-link>
            <nuxt-link to="/post">旅游攻略</nuxt-link>
            <nuxt-link to="/hotel">酒店</nuxt-link>
            <nuxt-link to="/air">国内机票</nuxt-link>
          </el-row>
          <div class="login">
            <nuxt-link to="/user/login">登陆/注册</nuxt-link>
          </div>
        </el-row>
      </div>
    </div>
  </dir>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.container {
  border: 1px #eee solid;
  box-shadow: 0 2px 2px #ddd;
  .header {
    margin: 0 auto;
    width: 1000px;
    height: 60px;
    .logo {
      padding-top: 9px;
      img {
        height: 42px;
        display: block;
      }
    }
    .nav {
      flex: 1;
      margin: 0 20px;
      line-height: 60px;
      a {
        height:60px;
        box-sizing: border-box;
        padding: 0 20px;
        text-align: center;
        &:hover {
          border-bottom: 5px #409eff solid;
          color:#409eff;
        }
      }
      .nuxt-link-exact-active.nuxt-link-active {
        background-color: #409eff;
        color: #fff;
      }
    }
    .login {
      line-height: 60px;
      a {
        font-size: 14px;
        letter-spacing: 2px;
      }
    }
  }
}
</style>