<template>
  <div>
    <div>
      <span
        :class="{active:current===index}"
        v-for="(val,index) in [1,2,3]"
        :key="index"
        @click="current=index"
      >{{val}}</span>
    </div>
    <div>
      <ul v-show="current===0">
        <li>11</li>
        <li>12</li>
        <li>13</li>
      </ul>
      <ul v-show="current===1">
        <li>21</li>
        <li>22</li>
        <li>23</li>
      </ul>
      <ul v-show="current===2">
        <li>31</li>
        <li>32</li>
        <li>33</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0
    };
  }
};
</script>

<style lang="less" scoped>
span {
    cursor:pointer;
    margin:20px
}
.active {
  color: red;
}
</style>