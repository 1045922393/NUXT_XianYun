<template>
  <div class="fights">
    <div class="container">
      <el-row :gutter="10">
        <!-- 左边 -->
        <el-col :span="18">
          <!-- 筛选 -->
          <el-row class="filter" :gutter="10">
            <el-col
              :span="8"
            >单程： {{flightsData.info.departCity}} - {{flightsData.info.destCity}} / {{flightsData.info.departDate}}</el-col>
            <el-col :span="4">
              <el-select
                size="mini"
                v-model="filters.airport"
                placeholder="起飞机场"
                @change="changeAirport"
              >
                <el-option
                  v-for="(item,index) in flightsData.options.airport"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select
                size="mini"
                v-model="filters.flightTimes"
                placeholder="起飞时间"
                @change="changeTiems"
              >
                <el-option
                  v-for="(item,index) in flightsData.options.flightTimes"
                  :key="index"
                  :label="item|fomatTimes"
                  :value="`${item.from},${item.to}`"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select
                size="mini"
                v-model="filters.company"
                placeholder="航空公司"
                @change="changeCompany"
              >
                <el-option
                  v-for="(item,index) in flightsData.options.company"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select size="mini" v-model="filters.size" placeholder="机型" @change="changeSize">
                <el-option
                  v-for="(item,index) in size"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-row>

          <el-row class="filter">
            筛选:
            <el-button size="mini" type="primary" @click="delSearch" round plain>撤销</el-button>
          </el-row>

          <!-- 列表表头 -->
          <div class="listTitle">
            <el-row :gutter="30">
              <el-col :span="6">航空信息</el-col>
              <el-col :span="6">起飞时间</el-col>
              <el-col :span="6">到达时间</el-col>
              <el-col :span="6">价格</el-col>
            </el-row>
          </div>
          <!-- 展示的列表 -->
          <div class="showList">
            <flights-post :flightsData="optionFlights"></flights-post>
            <h2 class="noData" v-if="optionFlights.flights.length===0">暂无航班信息！</h2>
          </div>
          <div class="pagination" v-show="optionFlights.flights.length!==0">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="flightsData.total"
            ></el-pagination>
          </div>
        </el-col>
        <!-- 右边 -->
        <el-col :span="6">
          <flights-history/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import FlightsPost from "@/components/air/flightsPost.vue";
import History from "@/components/air/flightsHistory.vue";
export default {
  data() {
    return {
      filters: {
        airport: "",
        company: "",
        flightTimes: "",
        size: ""
      },
      pageSize: 5,
      currentPage: 1,
      size: [
        { label: "大", value: "L" },
        { label: "中", value: "M" },
        { label: "小", value: "S" }
      ],
      // flightsData是会不断被修改的对象
      flightsData: {
        info: {
          departCity: "",
          departDate: "",
          destCity: ""
        },
        options: {
          airport: [],
          company: [],
          flightTimes: []
        }
      },
      // catchFlightsData是不会被修改的对象
      catchFlightsData: {
        info: {
          departCity: "",
          departDate: "",
          destCity: ""
        },
        options: {
          airport: [],
          company: [],
          flightTimes: []
        }
      },
      // 给展示列表传过去的数组
      optionFlights: {
        //   为什么如果这里不给个flights定义,那边就渲染不出来,是因为数据没有变动吗
        flights: []
      }
    };
  },
  filters: {
    fomatTimes(item) {
      return `${item.from}:00 - ${item.to}:00`;
    }
  },
  watch:{
    // 监听$route
    $route(){
      this.getDataFromServe()
    }
  },
  methods: {
    //撤销操作
    delSearch() {
      // console.log(1);
      this.filters={
        airport: "",
        company: "",
        flightTimes: "",
        size: ""
      }
      //深拷贝,防止缓存被修改
      this.flightsData= {...this.catchFlightsData}
      this.getList();
    },
    // 选择了机型
    changeSize(val) {
      // plane_size: "M"
      this.flightsData.flights = this.catchFlightsData.flights.filter(item => {
        return item.plane_size === val;
      });
      this.flightsData.total = this.flightsData.flights.length;
      this.getList();
    },
    // 选择了公司
    changeCompany(val) {
      // val===选择公司名字
      this.flightsData.flights = this.catchFlightsData.flights.filter(item => {
        return item.airline_name === val;
      });
      this.flightsData.total = this.flightsData.flights.length;
      this.getList();
    },
    // 选择了起飞机场
    changeAirport(val) {
      // console.log(this.catchFlightsData.flights)
      // 筛选全部数据
      this.flightsData.flights = this.catchFlightsData.flights.filter(item => {
        return item.org_airport_name === val;
      });
      this.flightsData.total = this.flightsData.flights.length;
      this.getList();
    },
    // 选择了时间段
    changeTiems(val) {
      let searchArr = val.split(",");
      this.flightsData.flights = this.catchFlightsData.flights.filter(item => {
        let depHour = item.dep_time.split(":")[0];
        return (
          Number(depHour) >= Number(searchArr[0]) &&
          Number(depHour) < Number(searchArr[1])
        );
      });
      this.flightsData.total = this.flightsData.flights.length;
      this.getList();
    },
    //   每页数据数量
    handleSizeChange(val) {
      this.pageSize = val;
      //   console.log(val);
      this.getList();
    },
    //   每页页码
    handleCurrentChange(val) {
      this.currentPage = val;
      //   console.log(val);
      this.getList();
    },
    // 封装渲染列表
    getList() {
      this.optionFlights.flights = this.flightsData.flights.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
      //   console.log(this.optionFlights);
    },
    getDataFromServe(){
      // 根据地址栏参数获取机票列表
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      // console.log(res.data.flights)
      res.data.flights.forEach(val => {
        let arr = val.arr_time.split(":");
        let dep = val.dep_time.split(":");
        // 计算时间
        // 大小判断进行了隐式转换
        if (arr[0] < dep[0]) {
          arr[0] += 24;
        }
        let arrMin = arr[0] * 60 + +arr[1];
        let depMin = dep[0] * 60 + +dep[1];
        let differMin = arrMin - depMin;
        let defferHour = Math.floor(differMin / 60);
        let defferM = differMin % 60;
        val.differTime = defferHour + "时" + defferM + "分";
        val.isShow = false;
      });
      this.flightsData = res.data;
      // 获取缓存
      this.catchFlightsData = { ...this.flightsData };
      // console.log(this.flightsData);
      this.getList();
    });
    }
  },
  components: {
    "flights-post": FlightsPost,
    "flights-history":History
  },
  mounted() {
    this.getDataFromServe()
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  .filter {
    padding: 10px 0;
    font-size: 14px;
  }
  .listTitle {
    margin-top: 10px;
    padding: 0 15px;
    height: 38px;
    line-height: 38px;
    background-color: #f6f6f6;
    color: #666;
    border: 1px solid #ddd;
    text-align: center;
    font-size: 12px;
    margin-bottom: 10px;
  }
  .pagination {
    text-align: center;
  }
  .noData {
    text-align: center;
    color: #999;
    padding: 10px 0;
  }
}
</style>