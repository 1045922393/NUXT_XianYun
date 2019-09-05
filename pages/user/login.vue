<template>
  <div class="login">
    <div class="bgc" style="height:700px;"></div>
    <div class="tab">
      <el-row>
        <el-col v-for="(item,index) in tabArr" :key="index" :span="12">
          <span :class="{active:current===index}" class="togger" @click="current=index">{{item}}</span>
          <!-- <span :class="{active:current===index}" @click="current=index">{{item}}</span> -->
        </el-col>
      </el-row>
      <el-row>
        <login-form v-if="current===0"></login-form>
        <logon-form v-if="current===1"></logon-form>
      </el-row>
    </div>
  </div>
</template>

<script>
import loginForm from "./loginForm.vue";
import logonForm from "./logonForm.vue";
export default {
  data() {
    return {
      tabArr: ["登陆", "注册"],
      current: 0
    };
  },
  components: {
    "login-form": loginForm,
    "logon-form": logonForm
  }
};
</script>

<style lang="less" scoped>
.login {
  position: relative;

  .bgc {
    background: url("http://157.122.54.189:9093/images/bar1.jpg") no-repeat
      center;
  }
  .tab {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    .togger {
      box-sizing: border-box;
      display: block;
      padding: 10px;
      text-align: center;
      background-color: #eee;
      border: 2px solid #eee;
      color: #666;
    }
    .active {
      color: orange;
      font-weight: 700;
      border-color: white;
      background-color: #fff;
      border-top-color: orange;
    }
  }
}
</style>