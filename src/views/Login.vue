<template>
<div class="container mt-5">
  <div class="row">
    <div class="col-4 mx-auto">
    <h1 class="h1 mb-3 fw-normal my-5 text-center">Please Log In</h1>
        <form>
  <div class="form-group">
    <label for="usernameInput" class="my-3">Username</label>
    <input v-model="this.username" type="text" class="form-control" id="usernameInput" placeholder="Username" required>  
    </div>
  <div class="form-group mt-5">
    <label for="passwordInput" class="my-3">Password</label>
    <input v-model="this.password" type="password" class="form-control" id="passwordInput" placeholder="Password" required>
  </div>
  <button type="submit" class="btn btn-login">Submit</button>
</form>
    </div>
  </div>
  </div>

</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            username: '',
            password: ''
        }
    },
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