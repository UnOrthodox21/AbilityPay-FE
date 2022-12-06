<template>
  <div class="content">
    <Header/>
    <Sidebar/>
    <router-view/>
  </div>
 <Footer/>
</template>

<script>
import Header from "./components/layout/Header.vue"
import Sidebar from "./components/layout/Sidebar.vue"
import Footer from "./components/layout/Footer.vue"
export default {
    name: "app",
    components: {
      Header,
      Sidebar,
      Footer
    },
  }
</script>

<style>
html, body {
  min-height: 100%;
  background-color:  rgb(240, 240, 240);
  background-size: cover;
}
.content {
  flex: 1 0 auto;
  margin-bottom: 10rem;
}
.footer {
  flex-shrink: 0;
}
</style>
