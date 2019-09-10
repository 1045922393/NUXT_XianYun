<template>
  <div>
    <div class="post" v-for="(item,index) in flightsData.flights" :key="index">
      <div class="itemShow" @click="item.isShow = !item.isShow">
        <el-row type="flex" justify="space-between">
          <el-col :span="6" class="info">
            <span>{{item.airline_name}} {{item.flight_no}}</span>
          </el-col>
          <el-col :span="12" class="time">
            <el-row>
              <el-col :span="10" class="departTime">
                <span class="detTime">{{item.dep_time}}</span>
                <span class="flightArea">{{item.org_airport_name}}{{item.org_airport_quay}}</span>
              </el-col>
              <el-col :span="4" class="wasteTime">{{item.differTime}}</el-col>
              <el-col :span="10" class="desTime">
                <span class="detTime">{{item.arr_time}}</span>
                <span class="flightArea">{{item.dst_airport_name}}{{item.dst_airport_quay}}</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6" class="price">
            ￥<span class="detPrice">{{item.base_price/2}}</span>起
          </el-col>
        </el-row>
      </div>
      <div class="itemHide" v-show="item.isShow">
        <el-row class="hidePost" v-for="(value,ind) in item.seat_infos" :key="ind">
          <el-col :span="4" class="recommend">低价推荐</el-col>
          <el-col :span="16">
            <el-row class="detailInfo">
              <el-col :span="19" class="company">{{value.name}} | {{value.supplierName}}</el-col>
              <el-col :span="5" class="postPrice">￥{{value.settle_price}}</el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row class="choose">
              <el-button type="warning" size="mini" @click="turnTo(item.id,value.seat_xid)">选定</el-button>
              <span>剩余：{{value.discount}}</span>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    flightsData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      
    };
  },
  methods: {
   turnTo(id,seat_xid){
    //  点击路由跳转
     this.$router.push(`/air/order?id=${id}&seat_xid=${seat_xid}`)
   }
  }
};
</script>

<style lang="less" scoped>
.post {
  border: 1px solid #ddd;
  margin-bottom: 10px;
  .itemShow {
    cursor: pointer;
    padding: 15px;
    .info {
      text-align: center;
      line-height: 53px;
    }
    .time {
      .departTime {
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      .desTime {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .detTime {
        font-size: 24px;
      }
      .flightArea {
        font-size: 12px;
        color: #999;
      }
      .wasteTime {
        font-size: 14px;
        text-align: center;
        height: 53px;
        line-height: 53px;
        color: #999;
        border-bottom: 1px solid #eee;
      }
    }
    .price {
      line-height: 42px;
      text-align: center;
      .detPrice {
        color: orange;
        font-size: 24px;
      }
    }
  }
  .itemHide {
    background-color: #f6f6f6;
    padding: 10px 0;
    .hidePost {
      padding: 5px 0;
    }
    .recommend {
      font-size: 14px;
      line-height: 49px;
      text-align: center;
    }
    .detailInfo {
      line-height: 49px;
      .company {
        font-size: 12px;
      }
      .postPrice {
        font-size: 20px;
        color: orange;
      }
    }
    .choose {
      display: flex;
      flex-direction: column;
      /deep/ .el-button.el-button--warning.el-button--mini {
        width: 74px;
      }
    }
  }
}
</style>