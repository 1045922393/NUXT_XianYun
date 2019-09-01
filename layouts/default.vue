<template>
  <div>
    <hwy-header></hwy-header>
    <nuxt />
    <hwy-footer></hwy-footer>
  </div>
</template>

<script>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
export default {
  components:{
    'hwy-header':Header,
    'hwy-footer':Footer
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*{
  margin:0;
  padding:0;
}
a{
  color:inherit;
  text-decoration:none;
}
li{
  list-style: none;
}
em,i{
  font-style:normal;
}
</style>
