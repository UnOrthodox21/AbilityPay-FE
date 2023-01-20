<template>
  <section v-bind:class="compBodyClasses">
    <Header v-bind:user="user" v-bind:jwt="jwt" />
    <main class="container-fluid" v-bind:class="compFontClasses">
      <section class="row">
        <article class="col-2 px-0">
          <Sidebar v-bind:user="user" v-bind:jwt="jwt" v-bind:keyboardNavigationOptimization="keyboardNavigationOptimization" />
        </article>
        <article class="col-10 content ">
          <router-view v-bind:user="user" v-bind:bankAccounts="bankAccounts" v-bind:jwt="jwt"
            v-bind:transactions="transactions" v-bind:selectedUsersBankAccounts="selectedUsersBankAccounts"
            v-bind:selectedBankAccountsTransactions="selectedBankAccountsTransactions" 
            v-bind:keyboardNavigationOptimization="keyboardNavigationOptimization" 
            v-bind:colorBlindnessOptimization="colorBlindnessOptimization"/>
        </article>
      </section>
    </main>
  </section>
  <Footer />
</template>

<script>
  import Header from "./components/layout/Header.vue"
  import Sidebar from "./components/layout/Sidebar.vue"
  import Footer from "./components/layout/Footer.vue"

 import {useRouter} from "vue-router";
export default {
    name: "app",
    components: {
      Header,
      Sidebar,
      Footer
    },
    data() {
      return {
        user: [],
        bankAccounts: [],
        users: [],
        router: useRouter(),
        jwt: "",
        transactions: [],
        selectedUsersBankAccounts: [],
        selectedBankAccountsTransactions: [],
        fontFamilySegoeUi: true,
        fontFamilyCalibri: false,
        fontFamilyAriel: false,
        fontFamilyTimesNewRoman: false,
        fontFamilyComicSans: false,
        fontSize90: false,
        fontSize95: false,
        fontSize100: true,
        fontSize105: false,
        fontSize110: false,
        fontWeight400: false,
        fontWeight600: true,
        fontWeight800: false,
        colorBlindnessOptimization: "true",
        colorBlindnessOptimizationProtanopia: true,
        colorBlindnessOptimizationDeuteranopia: false,
        colorBlindnessOptimizationTritanopia: false,
        keyboardNavigationOptimization: "true"
      }
    },

    computed: {
      compFontClasses() {
        return {
          fontFamilyCalibri: this.fontFamilyCalibri,
          fontFamilyArial: this.fontFamilyArial,
          fontFamilyTimesNewRoman: this.fontFamilyTimesNewRoman,
          fontFamilySegoeUi: this.fontFamilySegoeUi,
          fontFamilyComicSans: this.fontFamilyComicSans,
          fontSize90: this.fontSize90,
          fontSize95: this.fontSize95,
          fontSize100: this.fontSize100,
          fontSize105: this.fontSize105,
          fontSize110: this.fontSize110,
          fontWeight400: this.fontWeight400,
          fontWeight600: this.fontWeight600,
          fontWeight800: this.fontWeight800
        }
      },
        compBodyClasses() {
          return {
            colorBlindnessOptimizationProtanopia: this.colorBlindnessOptimizationProtanopia,
            colorBlindnessOptimizationDeuteranopia: this.colorBlindnessOptimizationDeuteranopia,
            colorBlindnessOptimizationTritanopia: this.colorBlindnessOptimizationTritanopia
          }
      },      
    },

    created() {
        this.jwt = this.getCookie("Token");
        let jwt = this.jwt;
        this.setupHeaderInterceptor();
       if (jwt !== undefined && jwt.length) {
           this.setUser(jwt);
        }
    },
     methods: {
      setUser(jwt) {
        this.$http.get(process.env.VUE_APP_API_URL + "/users/getUserByJwt/" + jwt)
        .then((response) => { 
          this.user = response.data;
          this.setBankAccounts();
          })
        .catch(err => console.log(err));
      },
      setBankAccounts() {
        this.$http.get(process.env.VUE_APP_API_URL + "/bank-accounts/getByUserId/" + this.user.id)
        .then((response) => { this.bankAccounts = response.data })
        .catch(err => console.log(err));
      },
      setSelectedUsersBankAccounts(userId) {
         this.$http.get(process.env.VUE_APP_API_URL + "/bank-accounts/getByUserId/" + userId)
        .then((response) => { this.selectedUsersBankAccounts = response.data })
        .catch(err => console.log(err));
      },
      setJwt(jwt) {
        let d = new Date();
        d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
        let expires = "expires=" + d.toUTCString();
        document.cookie ="Token=" + jwt + ";" + expires + ";path=/";
        this.jwt = jwt;
      },
      setTransactions(bankAccountNumber) {
          this.$http.get(process.env.VUE_APP_API_URL + "/transactions/find/" + bankAccountNumber)
        .then((response) => { this.transactions = response.data })
        .catch(err => console.log(err));
      },
       setSelectedBankAccountsTransactions(bankAccountNumber) {
          this.$http.get(process.env.VUE_APP_API_URL + "/transactions/find/" + bankAccountNumber)
        .then((response) => { this.selectedBankAccountsTransactions = response.data })
        .catch(err => console.log(err));
      },
      setupHeaderInterceptor() {
        this.$http.defaults.headers.common['Authorization'] = "Bearer " + this.getCookie("Token"); // for all requests
      },
      getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      },
      clearCookie() {
        document.cookie = "Token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      },
        login(username, jwt) {
        // Add a request interceptor
        this.setJwt(jwt);
        this.setupHeaderInterceptor();
        const newUserData = {
            jwt,
            enabled: true
        }
        this.$http.put(process.env.VUE_APP_API_URL + "/users/" + username, newUserData)
        .then(() => {  
            this.setUser(jwt);
            
          if (this.user !== [] && this.bankAccounts !== [] && this.jwt !== undefined && this.jwt.length) {
             this.router.push({ name: 'Home' });
          }
         }).catch(err => console.log(err));
      },
      logout() {
        this.user = [],
        this.bankAccounts = [],
        this.jwt = '';
        this.clearCookie();
        this.router.push({ name: 'Login'});
        
      },
      setFontFamily(fontFamily) {
        if (fontFamily == "segoeUi") { this.fontFamilySegoeUi = true; } else { this.fontFamilySegoeUi = false; }   
        if (fontFamily == "calibri") { this.fontFamilyCalibri = true; } else { this.fontFamilyCalibri = false; }
        if (fontFamily == "arial") { this.fontFamilyArial = true; } else { this.fontFamilyArial = false; }
        if (fontFamily == "timesNewRoman") { this.fontFamilyTimesNewRoman = true; } else { this.fontFamilyTimesNewRoman= false; }
        if (fontFamily == "comicSans") { this.fontFamilyComicSans = true; } else { this.fontFamilyComicSans = false; }
      },

      setFontSize(fontSize) {
        if (fontSize == "90") { this.fontSize90 = true; } else { this.fontSize90 = false; }
        if (fontSize == "95") { this.fontSize95 = true; } else { this.fontSize95 = false; }
        if (fontSize == "100") { this.fontSize100 = true; } else { this.fontSize100 = false; }
        if (fontSize == "105") { this.fontSize105 = true; } else { this.fontSize105 = false; }
        if (fontSize == "110") { this.fontSize110 = true; } else { this.fontSize110 = false; }
      },
      setFontWeight(fontWeight) {
        if (fontWeight == "400") { this.fontWeight400 = true; } else { this.fontWeight400 = false; }
        if (fontWeight == "600") { this.fontWeight600 = true; } else { this.fontWeight600 = false; }
        if (fontWeight == "800") { this.fontWeight800 = true; } else { this.fontWeight800 = false; }
      },
      setColorBlindnessOptimization(colorBlindnessOptimization) { 
        if (colorBlindnessOptimization == "disabled") {
          this.colorBlindnessOptimization = "false";
        } else {
          this.colorBlindnessOptimization = "true";
        }
   
        if (colorBlindnessOptimization == "protanopia") { 
          this.colorBlindnessOptimizationProtanopia = true; 
        } else { 
          this.colorBlindnessOptimizationProtanopia = false; 
        }

        if (colorBlindnessOptimization == "deuterenopia") { 
            this.colorBlindnessOptimizationDeuteranopia = true; 
          } else { 
            this.colorBlindnessOptimizationDeuteranopia = false; 
          }

        if (colorBlindnessOptimization == "tritanopia") { 
            this.colorBlindnessOptimizationTritanopia = true; 
          } else { 
            this.colorBlindnessOptimizationTritanopia = false; 
          }
      },
       setKeyboardNavigationOptimization(keyboardNavigationOptimization) {
        this.keyboardNavigationOptimization = keyboardNavigationOptimization;
      }
    }
  }
</script>

<style>
  html, body {
    min-height: 100%;
    background-color: rgb(240, 240, 240);
    background-size: cover;
  }
  
  .content {
    flex: 1 0 auto;
    margin-bottom: 10rem;
  }

  .footer {
    flex-shrink: 0;
  }

  #app {
    text-align: center;
    color: rgb(248, 248, 248);
    background-image: url("assets/images/background.jpeg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #343a40;
  }

  #nav a {
    font-weight: bold;
    color: #2a2e32;
  }
 
  #nav a.router-link-exact-active {
    color: #42b983;
  }

  .btn-transactions {
    color: rgb(248, 248, 248);
    text-align: center;
    vertical-align: center;
    background-color: rgb(67, 151, 34);
    font-size: 1.3em;
    height: 3.5em;
    width: 40em;
    padding: 1em;
  }

  .btn-transactions:hover {
    background-color: rgb(81, 171, 46);
    color: rgb(248, 248, 248);
  }

  .btn-login {
    color: rgb(250, 250, 250);
    font-size: 1.2em;
    padding: 1em;
    height: 3.5em;
    width: 100%;
    text-align: center;
    vertical-align: bottom;
    margin-top: 3.85em;
    background-color: #414b55;
  }

  .btn-login:hover {
     color: rgb(250, 250, 250);
     background-color: #2a2e32;
  }

   .btn-login:focus {
     color: rgb(250, 250, 250);
     background-color: #2a2e32;
  }

 .fontFamilySegoeUi {
    font-family: 'Segoe UI'
  }

 .fontFamilyCalibri {
    font-family: 'Calibri', sans-serif; 
  }

  .fontFamilyArial {
    font-family: Arial, Helvetica, sans-serif; 
  }

  .fontFamilyTimesNewRoman {
    font-family: 'Times New Roman';
  }

 .fontFamilyComicSans {
    font-family: "Comic Sans MS", "Comic Sans", cursive;
  }

  .fontSize90 {
    font-size: 90%;
  }

  .fontSize95 {
    font-size: 95%;
  }

  .fontSize100 {
    font-size: 100%;
  }

  .fontSize105 {
    font-size: 105%;
  }

  .fontSize110 {
    font-size: 110%;
  }

  .fontWeight400 * {
    font-weight: 400 !important;
  }

  .fontWeight600 * {
    font-weight: 600 !important;
  }

  .fontWeight800 * {
    font-weight: 800 !important;
  }

  .colorBlindnessOptimizationProtanopia {
    background-image: url("assets/images/background.jpeg") !important;
  }

  .colorBlindnessOptimizationDeuteranopia {
      background-image: url("assets/images/background_deuteranopia.jpg") !important;
  }

  .colorBlindnessOptimizationTritanopia {
       background-image: url("assets/images/background_tritanopia.jpg") !important;
  }

  @media screen and (min-width:1200px) {
    .content {
      padding-right: 20rem;
    }
  }
</style>