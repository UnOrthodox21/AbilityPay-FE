<template>
<div class="container">
  <div class="row">
    <div class="col-4 mx-auto mt-2">
     <h1 class="h1 fw-normal my-5 text-center">Please Sign Up</h1>
<form>
  <div class="form-group">
    <label for="firstNameInput">First name</label>
    <input v-model="this.firstName" type="text" class="form-control" id="firstNameInput" placeholder="First name" required>  
    </div>
  <div class="form-group">
    <label for="passwordInput">Last name</label>
    <input v-model="this.lastName" type="text" class="form-control" id="lastNameInput" placeholder="Last name" required>
  </div>
   <div class="form-group">
    <label for="emailInput">E-mail</label>
    <input v-model="this.email" type="email" class="form-control" id="emailInput" placeholder="Email" required>
  </div>
   <div class="form-group">
    <label for="usernameInput">Username</label>
    <input v-model="this.username" type="text" class="form-control" id="usernameInput" placeholder="Username" required>
  </div>
   <div class="form-group">
    <label for="addressInput">Address</label>
    <input v-model="this.address" type="text" class="form-control" id="addressInput" placeholder="Address" required>
  </div>
   <div class="form-group">
    <label for="phoneInput">Phone</label>
    <input v-model="this.phone" type="number" class="form-control" id="phoneInput" placeholder="Phone" required>
  </div>
   <div class="form-group">
    <label for="passwordInput">Password</label>
    <input v-model="this.password" type="password" class="form-control" id="passwordInput" placeholder="Password" required>
  </div>
  <button type="submit" class="btn btn-login mt-5">Submit</button>
</form>
</div>

</div>
</div>
</template>


<script>
import {useRouter} from "vue-router";

export default {
    name: "Register",
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
}
</script>

<style scoped>


</style>