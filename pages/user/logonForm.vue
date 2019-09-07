<template>
  <div class="logonForm">
    <el-form :model="logonForm" :rules="rules" ref="logonForm" label-width="100px">
      <el-row>
        <el-form-item prop="username">
          <el-input v-model="logonForm.username" placeholder="用户名手机"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item prop="captcha">
            <el-input placeholder="验证码" v-model="logonForm.captcha">
              <el-button @click="sendCaptcha" slot="append">发送验证码</el-button>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item prop="nickname">
            <el-input v-model="logonForm.nickname" placeholder="你的名字" style="width:100%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item prop="password">
            <el-input v-model="logonForm.password" placeholder="密码" style="width:100%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item prop="rePassword">
            <el-input v-model="logonForm.rePassword" placeholder="确认密码" style="width:100%"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-button type="primary" @click.native="submitForm" style="width:100%">注册</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    const checkPassword = (rule, value, callback) => {
      if (value !== this.logonForm.password) {
        callback(new Error("两次密码不一致"));
      }
      callback();
    };
    return {
      logonForm: {
        username: "13611115555",
        password: "123456",
        nickname: "寰宇键",
        captcha: "",
        rePassword: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户手机", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
          //pattern来定义正则验证
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        rePassword: [
          {
            required: true,
            message: "请再次输入密码",
            trigger: "blur"
          },
          //自定义验证规则,validator为键,对应的值为触发函数
          { validator: checkPassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.logonForm.validate(valid => {
        if (valid) {
          let { rePassword, ...res } = this.logonForm;
          // this.$axios.setHeader('Content-Type','application/x-www-form-urlencoded',['post']);
          this.$axios({
            url: "/accounts/register",
            method: "post",
            data: res
          })
            .then(res => {
              this.$message.success("注册成功,正在跳转首页");
              this.$store.commit("user/changeuser", res.data);
              setTimeout(() => {
                this.$router.push("/");
              }, 1000);
            })
            // .catch(err => {
            //   this.$message.error("服务器异常");
            // });
        } else {
          this.$message.error("请填写信息");
        }
      });
    },
    async sendCaptcha() {
      //发送验证码
      if (
        !(
          this.logonForm.username &&
          /^1[3|4|5|7|8]\d{9}$/.test(this.logonForm.username)
        )
      ) {
        this.$message({
          type: "error",
          message: "请输入正确手机号",
          duration: 1000
        });

        return false;
      }
      // this.$axios.setHeader("Content-Type","application/x-www-form-urlencoded",["post"]);
      let res = await this.$axios({
        url: "/captchas",
        method: "post",
        data: { tel: this.logonForm.username }
      });
      console.log(res);
      if (res.status === 200) {
        this.$message.success("成功获得验证码:" + res.data.code);
        this.logonForm.captcha = res.data.code;
      }
    }
  },
  mounted() {
    //   this.$axios.setHeader("Content-Type", "application/x-www-form-urlencoded", [
    //     "post"
    //   ]);
    //   this.$axios({
    //     url: "/captchas",
    //     method: "post",
    //     data: { tel: "13268337814" }
    //   }).then(res => {
    //     console.log(res);
    //   });
  }
};
</script>

<style lang="less" scoped>
.logonForm {
  background-color: white;
  border: 1px solid #fff;
  padding: 20px;
  /deep/.el-form-item__content {
    width: 100%;
    margin-left: 0 !important;
  }
}
</style>