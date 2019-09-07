<template>
  <div class="contain">
    <el-carousel :interval="5000" arrow="always" height="700px">
      <el-carousel-item v-for="(item,index) in carouselArr" :key="index">
        <!-- url需要拼接$axios.defaults.baseURL+item.url -->
        <div :style="'height:700px;background:url('+$axios.defaults.baseURL+item.url+')'"></div>
      </el-carousel-item>
    </el-carousel>

    <!-- <div class="tab">
      <el-input placeholder="请输入内容">
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </div>-->
    <!-- 遮罩 -->
    <div class="mask" :style="`opacity: ${ mask }`"></div>
    <!-- 搜索框 -->
    <div class="banner-content">
      <div class="search-bar">
        <!-- tab栏 -->
        <el-row type="flex" class="search-tab">
          <!-- 动态的class，当然的索引和循环的索引相等时候就加上active -->
          <span
            v-for="(val,index) in tabArr"
            :key="index"
            @click="handleClick(index)"
            :class="{active:current===index}"
          >
            <i>{{ val.title }}</i>
          </span>
        </el-row>

        <!-- 输入框 -->
        <el-row type="flex" align="middle" class="search-input">
          <input @focus="mask = 0.6" @blur="mask = 0" :placeholder="tabArr[current].tips" />
          <i class="el-icon-search"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mask: 0,
      show:false,
      current: 0,
      carouselArr: [],
      tabArr: [
        {
          title: "攻略",
          tips: "搜索城市"
        },
        {
          title: "酒店",
          tips: "请输入城市搜索酒店"
        },
        {
          title: "机票",
          tips: ""
        }
      ]
    };
  },
  methods: {
    handleClick(index) {
      if (index === 2) {
        this.$router.push("/air");
      }
      this.current = index;
    }
  },
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      // console.log(res.data.data);
      this.carouselArr = res.data.data;
    });
  }
};
</script>

<style lang="less">
.contain {
  min-width: 1000px;
  position: relative;
  .mask{
    z-index:7;
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:rgba(0, 0, 0, 1);
    transition:all 1s;
  }
  .banner-content {
    z-index: 9;
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 45%;
    margin-left: -500px;
    border-top: 1px transparent solid;
    .search-bar {
      width: 552px;
      margin: 0 auto;
    }
    .search-tab {
      .active {
        i {
          color: #333;
        }
        &::after {
          background: #eee;
        }
      }
      span {
        width: 82px;
        height: 36px;
        display: block;
        position: relative;
        margin-right: 8px;
        cursor: pointer;
        i {
          position: absolute;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }
        &:after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          border: 1px rgba(255, 255, 255, 0.2) solid;
          border-bottom: none;
          transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
          transform-origin: bottom left;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 1px 2px 0 0;
          box-sizing: border-box;
        }
      }
    }
    .search-input {
      width: 550px;
      height: 46px;
      background: #fff;
      border-radius: 0 4px 4px 4px;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      border-top: none;
      box-sizing: unset;
      input {
        flex: 1;
        height: 20px;
        padding: 13px 15px;
        outline: none;
        border: 0;
        font-size: 16px;
      }
      .el-icon-search {
        cursor: pointer;
        font-size: 22px;
        padding: 0 10px;
        font-weight: bold;
      }
    }
  }
  // .el-carousel__item h3 {
  //   color: #475669;
  //   font-size: 18px;
  //   opacity: 0;
  //   line-height: 300px;
  //   margin: 0;
  //   // height: 700px;
  // }
  // .el-carousel__item {
  //   height: 700px;
  // &:nth-child(3) {
  //   background: url(http://157.122.54.189:9095/assets/images/th03.jfif) center
  //     center no-repeat;
  // }
  // &:nth-child(4) {
  //   background: url("http://157.122.54.189:9095/assets/images/th04.jfif")
  //     center center no-repeat;
  // }

  // &:nth-child(5) {
  //   background: url("http://157.122.54.189:9095/assets/images/th01.jfif")
  //     center center no-repeat;
  // }

  // &:nth-child(6) {
  //   background: url("http://157.122.54.189:9095/assets/images/th02.jfif")
  //     center center no-repeat;
  // }
  // }
  // .el-carousel {
  //   height: 700px;
  // }
  // .el-carousel__item:nth-child(1) {
  //   background: url(http://157.122.54.189:9095/assets/images/th01.jfif) center
  //     center no-repeat;
  // }
  // .el-carousel__item:nth-child(2) {
  //   background: url(http://157.122.54.189:9095/assets/images/th02.jfif) center
  //     center no-repeat;
  // }

  // .el-carousel__item:nth-child(7) {
  //   background: url("http://157.122.54.189:9095/assets/images/th03.jfif") center
  //     center no-repeat;
  // }
  // .el-carousel__item:nth-child(8) {
  //   background: url("http://157.122.54.189:9095/assets/images/th04.jfif") center
  //     center no-repeat;
  // }
  // .tab {
  //   position: absolute;
  //   height: 60px;
  //   width: 400px;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  //   z-index: 10;
  //   i {
  //     font-weight: 700;
  //     color: black;
  //     font-size: 24px;
  //   }
  // }
}
</style>