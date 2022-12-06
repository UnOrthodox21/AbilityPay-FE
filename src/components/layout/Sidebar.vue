<template>


  <nav v-if="windowWidth > 1200" class="navbar navbar-expand-lg navbar-light mx-0">
    <div class="container-fluid mx-0">
      <div v-if="jwt === undefined || jwt === ''">
        <ul class="navbar-nav w-100">
          <li class="nav-item">
            <router-link class="nav-link" tag="li" active-class="active" aria-current="page" to="/login">Login
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" tag="li" active-class="active" to="/register">Register</router-link>
          </li>
        </ul>
      </div>

      <div v-else-if="jwt !== undefined && jwt !== '' && this.user.roles !== 'Admin'">
        <ul class="navbar-nav w-100">
          <li class="nav-item">
            <router-link class="nav-link" tag="li" active-class="active" aria-current="page" to="/" exact>Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" tag="li" active-class="active" to="/transactions">Transactions</router-link>
          </li>
          <li class="nav-item dropdown ml-auto">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
              data-toggle="dropdown" aria-expanded="false">{{user.firstName}} {{user.lastName}}</a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <router-link class="dropdown-item" to="/settings">Settings</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/bank-accounts">Bank accounts</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" @click="logout" to="/login">Log out</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>



      <div v-else-if="jwt !== undefined && jwt !== '' && this.user.roles === 'Admin'">
        <ul class="navbar-nav w-100">
          <li class="nav-item">
            <router-link class="nav-link" tag="li" active-class="active" aria-current="page" to="/" exact>Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" tag="li" active-class="active" to="/admin/users" exact>Manage Users
            </router-link>
          </li>
          <li class="nav-item dropdown ml-auto">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
              data-toggle="dropdown" aria-expanded="false">{{user.firstName}} {{user.lastName}}</a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <router-link class="dropdown-item" to="/settings">Settings</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/bank-accounts">Bank accounts</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" @click="logout" to="/login">Log out</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>



    </div>
  </nav>

</template>


<script>
  export default {
    name: "Sidebar",
    props: ["user", "jwt"],
    mounted() {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth;
      })
    },
    methods: {
      logout(e) {
        e.preventDefault();
        this.$parent.logout();
      }
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

    .nav .container-fluid,
    .navbar-expand-lg .navbar-collapse,
    .navbar-expand-lg .navbar-nav {
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