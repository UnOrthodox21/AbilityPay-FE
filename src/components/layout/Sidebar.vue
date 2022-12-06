<template>

<nav v-if="windowWidth > 1200" class="navbar navbar-expand-lg navbar-light mx-0">
      <div class="container-fluid mx-0">
        <div>
          <ul class="navbar-nav w-100">
              <li class="nav-item">
              <router-link class="nav-link" tag="li" active-class="active" aria-current="page" to="/login">Login</router-link>
            </li> 
            <li class="nav-item">
              <router-link class="nav-link" tag="li" active-class="active" to="/register">Register</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>
export default {
    name: "Sidebar",
    mounted() {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth;
      })
    },   
    data() {
      return {
        windowWidth: window.innerWidth,
      }
    },
}
</script>


<style scoped>

    .navbar-light {
        background-color: rgb(240, 240, 240);
    }

    .nav-item {
        font-size: 1.40em;
    }

     .active {
        font-weight: bold;
    }

    @media screen and (min-width:992px) {
      .nav .container-fluid, .navbar-expand-lg .navbar-collapse, .navbar-expand-lg .navbar-nav {
        flex-direction: column;
        align-items: flex-start
      }

      .navbar {
        margin: 0;
        width: 75%;    
        height: 100%;
        align-items: flex-start;  
      }

    }

</style>
