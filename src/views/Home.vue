<template>
  <HomeBanner v-bind:user="user" v-bind:jwt="jwt" />
  <HomeMenu v-bind:user="user" v-bind:bankAccounts="bankAccounts" v-bind:jwt="jwt" 
   v-bind:colorBlindnessOptimization="colorBlindnessOptimization"
   v-bind:keyboardNavigationOptimization="keyboardNavigationOptimization" />
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
    props: ["user", "bankAccounts", "jwt", "colorBlindnessOptimization", "keyboardNavigationOptimization"]
  }
</script>

<style scoped>
</style>