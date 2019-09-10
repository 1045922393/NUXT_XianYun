<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <order-main :airInfo="airInfo"></order-main>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <order-aside :dataAir="airInfo"></order-aside>
      </div>
    </el-row>
  </div>
</template>

<script>
import orderMain from "@/components/air/orderMain";
import orderAside from "@/components/air/orderAside";
export default {
  
  data() {
    return {
      airInfo: {
         seat_infos:{}
      }
    };
  },
  components: {
    "order-main":orderMain,
    "order-aside":orderAside
  },
  mounted() {
    let { id, seat_xid } = this.$route.query;
    this.$axios({
      url: `/airs/${Number(id)}`,
      params: {
        seat_xid
      }
    }).then(res => {
      this.airInfo = res.data;
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>