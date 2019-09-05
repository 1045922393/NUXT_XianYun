<template>
  <div class="loginForm">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px">
      <el-row>
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名/手机"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="密码" style="width:100%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-button type="primary" @click="submitForm" style="width:100%">登陆</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "13800138000",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名/手机", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$axios({
            url:'/accounts/login',
            method:'post',
            data:this.loginForm
          })
          .then(res=>{
              this.$message.success(res.data.user.nickname+',欢迎回来')
              this.$store.commit('user/changeuser',res.data)
              this.$router.push("/")
          })
          .catch((err)=>{
            console.dir(err)
            this.$message.error(err.response.data.message)
          })
        } else {
           this.$message.error('请填写信息')
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.loginForm {
  background-color: white;
  border: 1px solid #fff;
  padding: 20px;
  /deep/.el-form-item__content{
      width:100%;
      margin-left:0!important;
  }
}
</style>