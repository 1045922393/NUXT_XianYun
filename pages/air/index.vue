<template>
  <div class="post">
    <div class="container">
      <el-row class="title">
        <i class="iconfont iconfeiji"></i>国内机票
      </el-row>
      <el-row :gutter="20">
        <el-col :span="9">
          <div class="formOutline">
            <el-row>
              <el-col
                class="tabTouch"
                @click.native="tabChange(index)"
                :class="{active:index===current}"
                :span="12"
                v-for="(item,index) in ['单程','往返']"
                :key="index"
              >
                <span>
                  <i :class="{'iconfont icondancheng':index===0}"></i>
                  <i :class="{'iconfont iconshuangxiang':index===1}"></i>
                  {{item}}
                </span>
              </el-col>
            </el-row>
            <!-- 表单开始 -->
            <div class="goForm">
              <span class="exchanging" @click="exchange">换</span>
              <el-form label-width="80px">
                <el-form-item label="出发城市">
                  <el-autocomplete
                    v-model="form.departCity"
                    :fetch-suggestions="querySearchDepart"
                    placeholder="请输入出发城市"
                    @select="handleSelectDepart"
                  ></el-autocomplete>
                </el-form-item>
                <el-form-item label="到达城市">
                  <el-autocomplete
                    v-model="form.destCity"
                    :fetch-suggestions="querySearchDest"
                    placeholder="请输入目标城市"
                    @select="handleSelectDest"
                  ></el-autocomplete>
                </el-form-item>
                <el-form-item label="出发时间">
                  <el-date-picker
                    v-model="form.departDate"
                    type="date"
                    :placeholder="currentTime"
                    :picker-options="pickerOptions"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label=" ">
                  <el-button @click="searchAir" type="primary">搜索</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
        <el-col :span="15" class="pic">
          <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" alt />
        </el-col>
      </el-row>
      <el-col class="adventage">
        <el-col :span="8" style="border-right:1px solid #ddd">
          <i
            class="iconfont iconweibiaoti-_huabanfuben"
            style="font-size:30px;color: rgb(64, 158, 255);"
          ></i>100%航协认证
        </el-col>
        <el-col :span="8" style="border-right:1px solid #ddd">
          <i class="iconfont iconbaozheng" style="font-size:30px;color: green;"></i>出行保证
        </el-col>
        <el-col :span="8">
          <i class="iconfont icondianhua" style="font-size:30px;color: rgb(64, 158, 255);"></i>7x24小时服务
        </el-col>
      </el-col>
      <el-row
        class="discountTitle"
        style="color:rgb(64, 158, 255);font-size:20px;margin-bottom:20px"
      >
        <i class="iconfont icontejiajipiao" style="font-size:20px" /> 特价机票
      </el-row>
      <el-row class="discountList" type="flex" justify="space-between">
        <el-col v-for="(val,index) in saleArr" :key="index" :span="6" style="flex:1">
          <div class="discountPic">
            <img :src="val.cover" />
            <div class="discript">
              <span class="fl">{{val.departCity}}-{{val.destCity}}</span><span class="fr">￥699</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() <= Date.now();
        }
      },
      currentTime: moment(new Date()).format("YYYY-MM-DD"),
      current: 0,
      departVal: "",
      desttVal: "",
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      },
      saleArr: []
    };
  },
  methods: {
    //搜索出发城市
    async querySearchDepart(search, callback) {
      if (!search) {
        callback([]);
        return false;
      }
      let res = await this.$axios({
        url: "/airs/city",
        methods: "get",
        params: { name: search }
      });
      let resArr = [];
      res.data.data.forEach(item => {
        if (item.name.indexOf("市") !== -1) {
          item.value = item.name.replace("市", "");
          resArr.push(item);
        } else {
          item.value = item.name;
          resArr.push(item);
        }
      });
      //默认选择第一个
      this.form.departCity = resArr[0].value;
      this.form.departCode = resArr[0].sort;
      callback(resArr);
    },
    //选择出发城市
    handleSelectDepart(item) {
      const { value, sort } = item;
      this.form.departCity = value;
      this.form.departCode = sort;
    },
    //搜索目标城市
    async querySearchDest(search, callback) {
      if (!search) {
        callback([]);
        return false;
      }
      let res = await this.$axios({
        url: "/airs/city",
        methods: "get",
        params: { name: search }
      });
      let resArr = [];
      res.data.data.forEach(item => {
        if (item.name.indexOf("市") !== -1) {
          item.value = item.name.replace("市", "");
          resArr.push(item);
        } else {
          item.value = item.name;
          resArr.push(item);
        }
      });
      //默认选择第一项
      this.form.destCity = resArr[0].value;
      this.form.destCode = resArr[0].sort;
      callback(resArr);
    },
    // 点击目标城市
    handleSelectDest(item) {
      const { value, sort } = item;
      this.form.destCity = value;
      this.form.destCode = sort;
    },
    //交换出发目标地址
    exchange() {
      let { departCity, departCode, destCity, destCode } = this.form;
      this.form.departCity = destCity;
      this.form.departCode = destCode;
      this.form.destCity = departCity;
      this.form.destCode = departCode;
    },
    // 搜索机票
    searchAir() {
      let {
        departCity,
        departCode,
        destCity,
        destCode,
        departDate
      } = this.form;
      if (!(departCity && destCity && departDate)) {
        this.$alert("请填写搜索条件", "错误", {
          type: "error"
        });
        return false;
      }
      if (departDate === "Invalid date") {
        this.$alert("请填写搜索条件", "错误", {
          type: "error"
        });
        return false;
      }
      this.form.departDate = moment(this.form.departDate).format("YYYY-MM-DD");
      this.$store.commit("postsHistory/addHistory",this.form)
      this.$router.push({
        path: "/air/flights",
        query: this.form
      });
    },
    //tabChange切换栏
    tabChange(index) {
      console.log(index);
      if (index === 1) {
        this.$alert("暂不支持返程,请使用单程", "告示", {
          type: "warning"
        });
      }
    }
  },
  mounted() {
    this.$axios({
      url: "/airs/sale",
      method: "get"
    }).then(res => {
      this.saleArr = res.data.data;
      console.log(res.data.data);
    });
  }
};
</script>

<style lang="less" scoped>
.fr{
  float:right;
}
.fl{
  float:left;
}
.post {
  .container {
    width: 1000px;
    margin: 0 auto;
    .title {
      margin: 15px 0;
      color: orange;
      font-size: 20px;
      i {
        margin-right: 5px;
        font-size: 25px;
      }
    }
    .formOutline {
      border: 1px solid #eee;
      .tabTouch {
        text-align: center;
        background-color: #eee;
        height: 48px;
        line-height: 48px;
        border-top: 2px solid #eee;
      }
      .active {
        background-color: #fff;
        border-top: 2px solid orange;
      }
      .goForm {
        position: relative;
        padding: 15px 50px 15px 15px;
        .exchanging {
          color: white;
          font-size: 12px;
          position: absolute;
          width: 20px;
          height: 20px;
          background-color: #999;
          line-height: 20px;
          text-align: center;
          right: 20px;
          top: 58px;
          cursor: pointer;
        }
        /deep/input.el-input__inner {
          width: 213px;
        }
        .el-button.el-button--primary {
          width: 213px;
          margin-bottom: 22px;
        }
      }
    }
    .pic {
      width: 620px;
      height: 350px;
    }
    .adventage {
      margin: 10px -5px 10px 0;
      padding: 10px 0;
      border: 1px solid #ddd;
      // height:50px;
      // line-height:50px;
      text-align: center;
      background-color: #f5f5f5;
      i {
        vertical-align: middle;
      }
    }
    .discountList {
      padding: 20px;
      border: 1px solid #999;
      margin-bottom:50px;
      .discountPic {
        position:relative;
        margin-left: 8px;
        border: 1px solid #999;
        width: 225px;
        height: 141px;
        img{
          width:100%;
          height:100%;
        }
        .discript{
          padding:5px 10px;
          box-sizing:border-box;
          width:100%;
          color:white;
          background-color:rgba(0,0,0,.5);
          position:absolute;
          bottom:0;
          left:0;
        }
      }
    }
  }
}
</style>