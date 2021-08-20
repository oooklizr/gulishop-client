<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!-- <Footer v-show="$route.path !== '/login' && $route.path !== '/register'"></Footer> -->
    <Footer v-show="!$route.meta.isHidden"></Footer>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import Footer from '@/components/Footer'

  export default {
    name: 'App',
    //非路由组件的注册， 必须要注册
    components: {
      Header,
      Footer
    },
    mounted() {
      //这里发请求获取三级分类数据，就只会发一次
      this.$store.dispatch('getCategoryList')
    },

  }
</script>

<style scoped>

</style>