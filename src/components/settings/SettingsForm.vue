<template>
<div class="container-fluid mt-0">
    <div class="row">
        <div class="col-12">
  <form v-on:submit="submitChanges"> 
  <div class="form-group"  style="width:300px;margin:auto;">
    <label for="emailInput"><span v-if="keyboardNavigationOptimization == 'true'">(6) </span>Email address </label>
    <input type="email" class="form-control" v-model="email" id="emailInput" minlength="9" maxlength="30" required>
  </div>

   <div class="form-group my-5" style="width:300px;margin:auto;">
    <label for="nameInput"><span v-if="keyboardNavigationOptimization == 'true'">(7) </span>First name:</label>
    <input type="text" class="form-control" v-model="firstName" id="nameInput" minlength="2" maxlength="20" required>
  </div>

  <div class="form-group my-5" style="width:300px;margin:auto;">
    <label for="surnameInput"><span v-if="keyboardNavigationOptimization == 'true'">(8) </span>Last name:</label>
    <input type="text" class="form-control" v-model="lastName" id="surnameInput" minlength="2" maxlength="20" required>
  </div>

  <div class="form-group my-5" style="width:300px;margin:auto;">
    <label for="phoneInput"><span v-if="keyboardNavigationOptimization == 'true'">(-) </span>Phone number:</label>
    <input type="number" class="form-control" v-model="phone" id="phoneInput" minlength="8"  maxlength="20" required>
  </div>

  <div class="form-group my-5" style="width:300px;margin:auto;">
    <label for="addressInput"><span v-if="keyboardNavigationOptimization == 'true'">(=) </span>Address:</label>
    <input type="text" class="form-control" v-model="address" id="addressInput" minlength="8" maxlength="40" required>
  </div>

  <div class="form-group my-5" style="width:300px;margin:auto;">
    <label for="passwordInput"><span v-if="keyboardNavigationOptimization == 'true'">([) </span>New password:</label>
    <input type="password" class="form-control" v-model="passwordFirst" id="passwordInput" minlength="8" maxlength="40" >
  </div>

 <div class="form-group my-5" style="width:300px;margin:auto;">
    <label for="passwordInputTwo"><span v-if="keyboardNavigationOptimization == 'true'">(]) </span>Repeat new password:</label>
    <input type="password" class="form-control" v-model="passwordSecond"  id="passwordInputTwo" minlength="8" maxlength="40" >
  </div>

   <div class="form-group my-5" style="width:300px;margin:auto;">
    <label for="imageInput"><span v-if="keyboardNavigationOptimization == 'true'">(\) </span>User image:</label>
    <input type="file" class="form-control" id="imageInput" accept="image/png, image/jpeg">
  </div>

   <button @click="submitChanges()" id="submitButton" class="btn btn-login mt-4" type="submit">
    <span v-if="keyboardNavigationOptimization == 'true'">(`) </span>Submit form</button>
</form>
        </div>
    </div>
 </div>


</template>

<script>
import {useRouter} from "vue-router";
export default {
    name: "Settings Form",
    data() {
      return {
          router: useRouter(),
          email: this.user.email,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          phone: this.user.phone,
          address: this.user.address,
          image: this.user.image,
          enabled: this.user.enabled,
          passwordFirst: '',
          passwordSecond: ''
      }
    },
    created() {
      this.$parent.$parent.$parent.setUser(this.user.jwt);
    },
    props: ["user", "keyboardNavigationOptimization"],
    mounted() {
      document.addEventListener("keydown", this.onKeydown);
    },
    methods: {
        submitChanges(e) {

            e.preventDefault();
            
            if(this.passwordFirst === this.passwordSecond) {

            if (window.confirm("Are you sure?")) {
            const newUserData = {
            email : this.email,
            firstName : this.firstName,
            lastName : this.lastName,
            phone : this.phone,
            address : this.address,
            password : this.passwordFirst,
            image: this.image,
            enabled: this.enabled
            }


            if (this.passwordFirst === "") {
                newUserData.password = this.user.password;
            }
          
            this.$http.put(process.env.VUE_APP_API_URL + "/users/" + this.user.username , newUserData)
            .then(() => {
                 this.$parent.$parent.$parent.setUser(this.user.jwt);
                 this.router.push({ name: 'Home'});
            }).catch(err => console.log(err));

            }
        
      

    } else {
      alert("Passwords don't match!!");
    }

  },
   onKeydown(event) {
      if (this.keyboardNavigationOptimization == 'true' && event.target.nodeName !== "INPUT") {
            if (event.key === "6") {
                event.preventDefault();
                document.getElementById("emailInput").focus();
            }
            if (event.key === "7") {
                event.preventDefault();
                document.getElementById("nameInput").focus();
            }
            if (event.key === "8") {
                event.preventDefault();
                document.getElementById("surnameInput").focus();
            }
            if (event.key === "-") {
                event.preventDefault();
                document.getElementById("phoneInput").focus();
            }
            if (event.key === "=") {
                event.preventDefault();
                document.getElementById("addressInput").focus();
            }
            if (event.key === "[") {
                event.preventDefault();
                document.getElementById("passwordInput").focus();
            }
            if (event.key === "]") {
                event.preventDefault();
                document.getElementById("passwordInputTwo").focus();
            }
            if (event.keyCode === 220) {
                event.preventDefault();
                document.getElementById("imageInput").focus();
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
    label {
        font-size: 1.1em;
        margin-bottom: 0;
    }

    .btn-login {
      font-size: 1.2em;
      padding: 1em;
      height: 3.5em;
      width: 15%;
      text-align: center;
      vertical-align: bottom;
    }
</style> 