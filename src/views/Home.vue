<template>
  <HomeBanner/>
  <HomeMenu/>
</template>

<script>
  import HomeBanner from "../components/home/HomeBanner.vue";
  import HomeMenu from "../components/home/HomeMenu.vue"

  export default {
    name: 'Home',
    components: {
      HomeBanner,
      HomeMenu
    },
  }
</script>

<style scoped>
</style>
