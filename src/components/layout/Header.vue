<template>

  <div class="pos-f-t">
    <div class="collapse" id="navbarToggleExternalContent">
      <div class="bg-dark p-4">
        <h4 class="text-white">Collapsed content</h4>
        <span class="text-muted">Toggleable via the navbar brand.</span>
      </div>
    </div>

    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">AbilityPay</router-link>
        <button type="button" class="btn btn-secondary my-2" data-toggle="collapse"
          data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false"
          aria-label="Toggle accessibility settings">
          <span>Accessibility settings</span>
        </button>

        <router-link v-if="windowWidth > 1200" type="button" class="btn btn-danger my-2" @click="logout" to="/login">
          <span>EXIT</span>
        </router-link>

        <div v-if="windowWidth <= 1200">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div v-if="jwt === undefined || jwt === ''" class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav w-100 mx-auto">
              <li class="nav-item">
                <router-link class="nav-link" tag="li" active-class="active" aria-current="page" to="/login">Login
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" tag="li" active-class="active" to="/register">Register</router-link>
              </li>
            </ul>
          </div>

          <div v-else-if="jwt !== undefined && jwt !== '' && this.user.roles !== 'Admin'"
            class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav w-100">
              <li class="nav-item">
                <router-link class="nav-link" tag="li" active-class="active" aria-current="page" to="/" exact>Home
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" tag="li" active-class="active" to="/transactions">Transactions
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



          <div v-else-if="jwt !== undefined && jwt !== '' && this.user.roles === 'Admin'"
            class="collapse navbar-collapse" id="navbarNavDropdown">
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


      </div>
    </nav>
  </div>

</template>


<script>
  export default {
    name: "Header",
    props: ["user", "jwt"],
    mounted() {
      console.log("jwt from navbar: " + this.jwt);
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
  .navbar-brand {
    font-weight: bold;
    font-size: 1.8em;
    padding: 0.2em;
  }

  .navbar-light {
    background-color: rgb(240, 240, 240);
  }

  .nav-item {
    font-size: 1.40em;
  }

  .active {
    font-weight: bold;
  }


  .logout-link {
    font-size: 1.8em;
    font-weight: bolder;
  }

  .btn-secondary {
    background-color: darkred;
  }

  .btn-secondary:hover {
    background-color: rgb(179, 20, 20);
  }



  @media screen and (min-width:992px) {
    .btn-secondary {
      padding-left: 7rem;
      padding-right: 7rem;
      margin-right: 2.5rem;
      font-size: 1.5em;
      font-weight: bold;
      border-color: darkred;
    }

    .btn-danger {
      color: black;
      background-color: white;
      border-color: black;
      border-width: 0.25em;
      font-size: 1.6em;
      font-weight: bolder;
      padding-left: 1em;
      padding-right: 1em;
    }

    .btn-danger:hover {
      color: white;
      background-color: black;
      border-color: black;
      border-width: 0.25em;
      font-size: 1.6em;
      font-weight: bolder;
      padding-left: 1em;
      padding-right: 1em;
    }

  }
</style>