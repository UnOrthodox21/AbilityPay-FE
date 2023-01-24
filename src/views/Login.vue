<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-4 mx-auto">
        <h1 class="h1 mb-3 fw-normal my-5 text-center">Please Log In</h1>
        <form @submit="authenticate">
          <div class="form-group">
            <label for="usernameInput" class="my-3">
                <span v-if="keyboardNavigationOptimization == 'true'">(3) </span>Username</label>
            <input v-model="this.username" type="text" class="form-control" id="usernameInput" placeholder="Username"
              required>
          </div>
          <div class="form-group mt-5">
            <label for="passwordInput" class="my-3">
               <span v-if="keyboardNavigationOptimization == 'true'">(4) </span>Password</label>
            <input v-model="this.password" type="password" class="form-control" id="passwordInput"
              placeholder="Password" required>
          </div>
          <button type="submit" class="btn btn-login" id="submitButton">
            <span v-if="keyboardNavigationOptimization == 'true'">(5) </span>Submit</button>

             <div class="alert alert-danger mt-5" id="transaction-alert" style="display: none;" role="alert">Authentication failed</div>
        </form>

        
      </div>
    </div>
  </div>

</template>

<script>
 import {useRouter} from "vue-router";
  export default {
    name: "Login",
    props: ["user", "jwt", "keyboardNavigationOptimization"],
    data() {
      return {
        username: '',
        password: '',
        router: useRouter()
      }
    },
    mounted() {
      this.homeIfLoggedIn();
      document.addEventListener("keydown", this.onKeydown);
      document.getElementById('transaction-alert').style.display = "none";
    },
    methods: {
      authenticate(e) {
        e.preventDefault();
        const loginUser = {
          username: this.username,
          password: this.password
        }

        let alert = document.getElementById('transaction-alert');

        let instance = this.$http.create();
        delete instance.defaults.headers.common['Authorization'];

        instance.post(process.env.VUE_APP_API_URL + "/users/authenticate", loginUser)
          .then((response) => {
            if (response.data.jwt !== undefined && response.data.jwt !== '') {
              this.$parent.$parent.login(loginUser.username, response.data.jwt);
            }
          }).catch(err => console.log(err));

          alert.style.display = "block";

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
                document.getElementById("usernameInput").focus();
            }
            if (event.key === "4") {
                event.preventDefault();
                document.getElementById("passwordInput").focus();
            }
            if (event.key === "5") {
                event.preventDefault();
                document.getElementById("submitButton").focus();
            }
      }
    },
   }
  }
</script>

<style scoped>
  label {
    font-size: 1.25em;
  }

  input {
    font-size: 1.15em;
  }
</style>