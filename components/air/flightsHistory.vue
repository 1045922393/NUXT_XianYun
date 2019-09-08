<template>
  <div class="history">
    <div class="tel">
      <el-row type="flex" jsutify="space-around" align="middle" class="telTop">
        <el-col>
          <div class="iconfont iconweibiaoti-_huabanfuben"></div>
          <span class="descript">航协认证</span>
        </el-col>
        <el-col>
          <div class="iconfont iconbaozheng"></div>
          <span class="descript">出行保证</span>
        </el-col>
        <el-col>
          <div class="iconfont icondianhua"></div>
          <span class="descript">7X24</span>
        </el-col>
      </el-row>
      <el-row class="call">
        <el-col>免费客服电话：4006345678转2</el-col>
      </el-row>
    </div>
    <div class="historys">
        <div class="title">
            <span>历史查询</span>
        </div>
        <div class="list">
            <nuxt-link :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`" class="oneHistory" v-for="(item,index) in historyArr" :key="index">
                <el-row type="flex" justify="space-between" align="center" >
                    <div>
                        <span>{{item.departCity}}</span>-<span>{{item.destCity}}</span>
                        <p>{{item.departDate}}</p>
                    </div>
                    <div>
                          <el-button type="warning" size="mini">选择</el-button>
                    </div>
                </el-row>
            </nuxt-link>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            historyArr:[{

            }]
        }
    },
    mounted(){
        this.historyArr=this.$store.state.postsHistory.history
    }
};
</script>

<style lang="less" scoped>
.history {
  padding-top: 10px;
  .tel {
      border:1px solid #ddd;
    .telTop {
      padding: 10px;
      padding-bottom: 10px;
    }
    .iconfont {
      color: #409eff;
      font-size: 50px;
      text-align: center;
    }
    .descript {
      display: block;
      text-align: center;
    }
    .call{
        height:30px;
        line-height:30px;
        background-color:#f6f6f6;
        padding-left:10px;
    }
  }
  .historys{
      margin-top:20px;
      padding:0 10px;
      border:1px solid #ddd;
      .title{
          font-size:16px;
          height: 32px;
          line-height: 32px;
          border-bottom: 1px solid #ddd;
      }
      .oneHistory{
          font-size:14px;
          padding:5px;
      }
  }
}
</style>