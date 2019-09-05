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
          <div class="login" v-if="!$store.state.user.userInfo.token">
            <nuxt-link to="/user/login">登陆/注册</nuxt-link>
          </div>
          <div class="user" v-else>
            <el-dropdown @command="clickMenuItem">
                <span class="el-dropdown-link">
                  <img
                    :src="`${$axios.defaults.baseURL}${$store.state.user.userInfo.user.defaultAvatar}`"
                    alt
                  />
                  {{$store.state.user.userInfo.user.nickname}}
                  <i
                    class="el-icon-arrow-down el-icon--right"
                  ></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="personUser">个人中心</el-dropdown-item>
                  <el-dropdown-item command="quit">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-row>
      </div>
    </div>
  </dir>
</template>

<script>
export default {
  methods:{
    clickMenuItem(command){
      if(command==='quit'){
        this.$message.success('再见!'+this.$store.state.user.userInfo.user.nickname)
        this.$store.commit('user/clearuser')
      }
    }
  }
};
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
        height: 60px;
        box-sizing: border-box;
        padding: 0 20px;
        text-align: center;
        &:hover {
          border-bottom: 5px #409eff solid;
          color: #409eff;
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
    .user {
      line-height: 60px;
      .el-dropdown-link {
        line-height: 60px;
        cursor: pointer;
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }
      img {
        line-height: 60px;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 1px solid white;
        vertical-align: middle;
      }
      &:hover {
        img {
          border: 1px solid skyblue;
        }
      }
    }
  }
}
</style>