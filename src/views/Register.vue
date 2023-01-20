<template>
  <div class="container">
    <div class="row">
      <div class="col-4 mx-auto mt-2">
        <h1 class="h1 fw-normal my-5 text-center">Please Sign Up</h1>
        <form @submit="register">
          <div class="form-group">
            <label for="firstNameInput"><span v-if="keyboardNavigationOptimization == 'true'">(3) </span>First name</label>
            <input v-model="this.firstName" type="text" class="form-control" id="firstNameInput"
              placeholder="First name" required>
          </div>
          <div class="form-group">
            <label for="passwordInput"><span v-if="keyboardNavigationOptimization == 'true'">(4) </span>Last name</label>
            <input v-model="this.lastName" type="text" class="form-control" id="lastNameInput" placeholder="Last name"
              required>
          </div>
          <div class="form-group">
            <label for="emailInput"><span v-if="keyboardNavigationOptimization == 'true'">(5) </span>E-mail</label>
            <input v-model="this.email" type="email" class="form-control" id="emailInput" placeholder="Email" required>
          </div>
          <div class="form-group">
            <label for="usernameInput"><span v-if="keyboardNavigationOptimization == 'true'">(6) </span>Username</label>
            <input v-model="this.username" type="text" class="form-control" id="usernameInput" placeholder="Username"
              required>
          </div>
          <div class="form-group">
            <label for="addressInput"><span v-if="keyboardNavigationOptimization == 'true'">(7) </span>Address</label>
            <input v-model="this.address" type="text" class="form-control" id="addressInput" placeholder="Address"
              required>
          </div>
          <div class="form-group">
            <label for="phoneInput"><span v-if="keyboardNavigationOptimization == 'true'">(8) </span>Phone</label>
            <input v-model="this.phone" type="number" class="form-control" id="phoneInput" placeholder="Phone" required>
          </div>
          <div class="form-group">
            <label for="passwordInput"><span v-if="keyboardNavigationOptimization == 'true'">(0) </span>Password</label>
            <input v-model="this.password" type="password" class="form-control" id="passwordInput"
              placeholder="Password" required>
          </div>
          <button type="submit" class="btn btn-login mt-5" id="submitButton">
            <span v-if="keyboardNavigationOptimization == 'true'">(`) </span>Submit</button>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
  import {
    useRouter
  } from "vue-router";

  export default {
    name: "Register",
    props: ["user", "jwt", "keyboardNavigationOptimization"],
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        address: '',
        phone: '',
        password: '',
        router: useRouter()
      }
    },
    mounted() {
      this.homeIfLoggedIn();
      document.addEventListener("keydown", this.onKeydown);
    },
    methods: {
      register(e) {
        e.preventDefault();

        const newUser = {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
          address: this.address,
          phone: this.phone,
          password: this.password,
          roles: "User",
          enabled: true,
          authorities: null,
          jwt: '',
          image: '',
          accountNonExpired: true,
          credentialsNonExpired: true,
          accountNonLocked: true
        }

        let instance = this.$http.create();
        delete instance.defaults.headers.common['Authorization'];

        instance.post(process.env.VUE_APP_API_URL + "/users/register", newUser)
          .then(() => {
            this.router.push('Login');
          })
          .catch((err) => console.log(err));
      },
      homeIfLoggedIn() {
        if(this.user.jwt !== undefined && this.user.jwt.length && this.user !== []) {
          this.router.push({ name: 'Home' });
        }
      },
      onKeydown(event) {
      if (this.keyboardNavigationOptimization == 'true' && event.target.nodeName !== "INPUT") {
            if (event.key === "3") {
                event.preventDefault();
                document.getElementById("firstNameInput").focus();
            }
            if (event.key === "4") {
                event.preventDefault();
                document.getElementById("lastNameInput").focus();
            }
            if (event.key === "5") {
                event.preventDefault();
                document.getElementById("emailInput").focus();
            }
            if (event.key === "6") {
                event.preventDefault();
                document.getElementById("usernameInput").focus();
            }
            if (event.key === "7") {
                event.preventDefault();
                document.getElementById("addressInput").focus();
            }
            if (event.key === "8") {
                event.preventDefault();
                document.getElementById("phoneInput").focus();
            }
            if (event.key === "0") {
                event.preventDefault();
                document.getElementById("passwordInput").focus();
            }
            if (event.key === "`") {
                event.preventDefault();
                document.getElementById("submitButton").focus();
            }
      }
    },
   }
  }
</script>

<style scoped>


</style>