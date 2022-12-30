<template>
  <nav
    v-if="windowWidth > 1200"
    class="navbar navbar-expand-lg navbar-light mx-0"
    role="Side menu"
  >
    <section class="container-fluid mx-0">
      <article v-if="jwt === undefined || jwt === ''">
        <ul class="navbar-nav w-100">
          <li class="nav-item">
            <router-link
              class="nav-link"
              id="loginNavLink"
              tag="li"
              active-class="active"
              aria-current="page"
              to="/login"
            >
              <span v-if="keyboardNavigationOptimization == 'true'">(1) </span
              >Login</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              id="registerNavLink"
              tag="li"
              active-class="active"
              to="/register"
            >
              <span v-if="keyboardNavigationOptimization == 'true'">(2) </span
              >Register</router-link
            >
          </li>
        </ul>
      </article>

      <article v-else-if="jwt !== undefined && jwt !== '' && this.user.roles !== 'Admin'" class="mx-0 px-0">
        <ul class="navbar-nav w-100">
          <li class="nav-item">
            <router-link class="nav-link" id="homeNavLink" tag="li" active-class="active" aria-current="page" to="/" exact>
              <span v-if="keyboardNavigationOptimization == 'true'">(1) </span>Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" id="bankAccountsNavLink" tag="li" active-class="active" to="/bank-accounts">
              <span v-if="keyboardNavigationOptimization == 'true'">(2) </span
              >Bank Accounts</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" id="transactionsNavLink" tag="li" active-class="active" to="/transactions">
              <span v-if="keyboardNavigationOptimization == 'true'">(3) </span>Transactions</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" id="userSettingsNavLink" tag="li" active-class="active" to="/settings">
              <span v-if="keyboardNavigationOptimization == 'true'">(4) </span>User Settings</router-link>
          </li>
          <li class="nav-item dropdown ml-auto">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
              <span v-if="keyboardNavigationOptimization == 'true'">(5) </span>{{ user.firstName }} {{ user.lastName }}</a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <router-link class="dropdown-item" to="/settings">Settings</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/bank-accounts"
                  >Bank accounts</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" @click="logout" to="/login"
                  >Log out</router-link
                >
              </li>
            </ul>
          </li>
        </ul>
      </article>

      <article
        v-else-if="
          jwt !== undefined && jwt !== '' && this.user.roles === 'Admin'
        "
      >
        <ul class="navbar-nav w-100">
          <li class="nav-item">
            <router-link
              class="nav-link"
              id="homeNavLink"
              tag="li"
              active-class="active"
              aria-current="page"
              to="/"
              exact
            >
              <span v-if="keyboardNavigationOptimization == 'true'">(1) </span
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              id="manageUsersNavLink"
              tag="li"
              active-class="active"
              to="/admin/users"
              exact
            >
              <span v-if="keyboardNavigationOptimization == 'true'">(2) </span
              >Manage Users
            </router-link>
          </li>
          <li class="nav-item dropdown ml-auto">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <span v-if="keyboardNavigationOptimization == 'true'">(3) </span>
              {{ user.firstName }} {{ user.lastName }}</a
            >
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <router-link class="dropdown-item" to="/settings"
                  >Settings</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/bank-accounts"
                  >Bank accounts</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" @click="logout" to="/login"
                  >Log out</router-link
                >
              </li>
            </ul>
          </li>
        </ul>
      </article>
    </section>
  </nav>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["user", "jwt", "keyboardNavigationOptimization"],
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
    window.addEventListener("keydown", this.onKeydown);
  },

  methods: {
    onKeydown(event) {
      if (this.keyboardNavigationOptimization == "true" && event.target.nodeName !== "INPUT") {

        if (this.jwt !== undefined && this.jwt !== "" && this.user.roles !== "Admin") {
          if (event.key === "1") {
            document.getElementById("homeNavLink").focus();
          }
          if (event.key === "2") {
            document.getElementById("bankAccountsNavLink").focus();
          }
          if (event.key === "3") {
            document.getElementById("transactionsNavLink").focus();
          }
          if (event.key === "4") {
            document.getElementById("userSettingsNavLink").focus();
          }
          if (event.key === "5") {
            document.getElementById("navbarDropdownMenuLink").focus();
          }
        }

        if (this.jwt === undefined || this.jwt === "") {
          if (event.key === "1") {
            document.getElementById("loginNavLink").focus();
          }
          if (event.key === "2") {
            document.getElementById("registerNavLink").focus();
          }
        }

        if(this.jwt !== undefined && this.jwt !== '' && this.user.roles === 'Admin') {
          if (event.key === "1") {
            document.getElementById("manageUsersNavLink").focus();
          }
          if (event.key === "2") {
               document.getElementById("navbarDropdownMenuLink").focus();
            }
          } 

      }
    },

    logout(e) {
      e.preventDefault();
      this.$parent.logout();
    },
  },
  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },
};
</script>

<style scoped>
.navbar-light {
  background-color: rgb(240, 240, 240);
}

.nav-item {
  font-size: 1.4em;
}

.active {
  font-weight: bold;
}

@media screen and (min-width: 992px) {
  .nav .container-fluid,
  .navbar-expand-lg .navbar-collapse,
  .navbar-expand-lg .navbar-nav {
    flex-direction: column;
    align-items: flex-start;
  }

  .navbar {
    margin: 0;
    padding: 1%;
    width: 75%;
    height: 100%;
    align-items: flex-start;
  }
}
</style>
