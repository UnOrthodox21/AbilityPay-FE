<template>
  <section v-if="this.user.jwt === undefined || this.user.jwt === ''">
    <section class="container" id="home-menu">
      <section class="row">
        <section class="col-6 text-left mt-3 mb-3 pt-2">
          <section class="card">
            <section class="card-body">
              <h2 class="mb-4 login-register-title text-center mt-4 py-1">
                Returning users:
              </h2>

              <section class="row">
                <article class="col-12 text-center">
                  <router-link class="btn btn-login text-center" id="loginButton" to="/login"
                    ><b><span v-if="keyboardNavigationOptimization == 'true'">(3) </span>Login</b></router-link
                  >
                </article>
              </section>
            </section>
          </section>
        </section>

        <section class="col-6 text-left mt-3 mb-3 pt-2">
          <section class="card">
            <section class="card-body">
              <section class="row">
                <article class="col-12 text-center">
                  <h2 class="mb-4 login-register-title text-center mt-4 py-1">
                    New users:
                  </h2>
                </article>
              </section>

              <section class="row">
                <article class="col-12 text-center">
                  <router-link class="btn btn-register" id="registerButton" to="/register"
                    ><b><span v-if="keyboardNavigationOptimization == 'true'">(4) </span>Register</b></router-link
                  >
                </article>
              </section>
            </section>
          </section>
        </section>
      </section>
    </section>
  </section>

  <section v-else>
    <section class="container" id="home-menu">
      <section class="row">
        <section class="col-6 text-left mt-3 mb-3 pt-2">
          <section class="card">
            <section class="card-body">
              <h2
                v-if="this.user.roles === 'User'"
                class="mb-4 home-menu-title"
              >
                User:
              </h2>
              <h2 v-else class="mb-4 home-menu-title">Admin:</h2>
              <ul class="home-menu-details ml-0 pl-0">
                <li><b>Name:</b> {{ user.firstName }} {{ user.lastName }}</li>
                <li><b>Address:</b> {{ user.address }}</li>
                <li><b>Phone:</b> {{ user.phone }}</li>
                <li><b>E-mail:</b> {{ user.email }}</li>
              </ul>

              <section class="row">
                <article class="col-12 text-center">
                  <router-link class="btn btn-users" id="userSettingsButton" to="/settings">
                    <b
                      ><span
                        v-if="
                          keyboardNavigationOptimization == 'true' &&
                            this.user.jwt !== undefined &&
                            this.user.roles !== 'Admin'
                        "
                        >(6)
                      </span>
                      <span
                        v-if="
                          keyboardNavigationOptimization == 'true' &&
                            this.user.jwt !== undefined &&
                            this.user.roles === 'Admin'
                        "
                        >(3)
                      </span>
                      User Settings</b
                    ></router-link
                  >
                </article>
              </section>
            </section>
          </section>
        </section>

        <section class="col-6 text-left mt-3 mb-3 pt-2">
          <section class="card">
            <section class="card-body">
              <section class="row">
                <article class="col-6">
                  <h2 class="mb-4 home-menu-title">Bank Accounts:</h2>
                </article>
                <article class="col-6">
                  <select
                    class="mt-1"
                    name="bankAccounts"
                    v-model="bankAccountIndex"
                  >
                    <option
                      @select="setCurrentBankAccount"
                      v-bind:key="bankAccount.id"
                      v-for="(bankAccount, index) in bankAccounts"
                      v-bind:value="index"
                      v-bind:selected="index === 0"
                      >{{ index + 1 }}. {{ bankAccount.number }}</option
                    >
                  </select>
                </article>
              </section>

              <section class="row">
                <article class="col-12">
                  <ul
                    class="home-menu-details ml-0 pl-0"
                    v-if="bankAccounts[bankAccountIndex] !== undefined"
                  >
                    <li>
                      <b>Number:</b> {{ bankAccounts[bankAccountIndex].number }}
                    </li>
                    <li>
                      <b>Type:</b> {{ bankAccounts[bankAccountIndex].type }}
                    </li>
                    <li>
                      <b>Balance:</b>
                      {{
                        $filters.formatCurrency(
                          bankAccounts[bankAccountIndex].balance
                        )
                      }}
                    </li>
                  </ul>
                </article>
              </section>

              <section class="row">
                <article class="col-12 text-center">
                  <router-link
                    class="btn btn-bankaccounts"
                    id="bankAccountsButton"
                    to="/bank-accounts"
                    ><b>
                      <span
                        v-if="
                          keyboardNavigationOptimization == 'true' &&
                            this.user.jwt !== undefined &&
                            this.user.roles !== 'Admin'
                        "
                        >(7)
                      </span>
                      <span
                        v-if="
                          keyboardNavigationOptimization == 'true' &&
                            this.user.jwt !== undefined &&
                            this.user.roles === 'Admin'
                        "
                        >(4)
                      </span>
                      Bank Accounts</b
                    ></router-link
                  >
                </article>
              </section>
            </section>
          </section>
        </section>
      </section>
      <section class="row">
        <article class="col-12 my-4">
          <router-link
            class="btn btn-transactions mt-auto"
            :class="{ 'btn-transactions-color': colorBlindnessOptimization == 'false' }"
            id="transactionsButton"
            to="/transactions"
            ><b>
              <span
                v-if="
                  keyboardNavigationOptimization == 'true' &&
                    this.user.jwt !== undefined &&
                    this.user.roles !== 'Admin'
                "
                >(8)
              </span>Transactions</b
            ></router-link
          >
        </article>
      </section>

      <section v-if="this.user.roles === 'Admin'" class="row">
        <article class="col-12 my-4">
          <router-link
            class="btn btn-transactions mt-auto"
            :class="{ 'btn-manage-users': colorBlindnessOptimization == 'false' }"
            id="manageUsersButton"
            to="/admin/users"
          >
            <b
              ><span v-if="keyboardNavigationOptimization == 'true'">(5) </span>
              <span
                v-if="
                  keyboardNavigationOptimization == 'true' &&
                    this.user.jwt !== undefined &&
                    this.user.roles === 'Admin'
                "
                >(5)
              </span>
              Manage Users</b
            ></router-link
          >
        </article>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  name: "HomeMenu",
  props: ["user", "bankAccounts", "jwt", "colorBlindnessOptimization", "keyboardNavigationOptimization"],
    data() {
    return {
      bankAccountIndex: 0,
    };
  },
  mounted() {
    document.addEventListener("keydown", this.onKeydown);
  },
  methods: {
    onKeydown(event) {
      if (this.keyboardNavigationOptimization == "true" && event.target.nodeName !== "INPUT") {

        if (this.user.jwt !== undefined && this.jwt !== "" && this.user.roles !== "Admin") {
          if (event.key === "6") {
            document.getElementById("userSettingsButton").focus();
          }
          if (event.key === "7") {
            document.getElementById("bankAccountsButton").focus();
          }
          if (event.key === "8") {
            document.getElementById("transactionsButton").focus();
          }
        }

        if (this.user.jwt === undefined || this.user.jwt === "") {
          if (event.key === "3") {
            document.getElementById("loginButton").focus();
          }
          if (event.key === "4") {
            document.getElementById("registerButton").focus();
          }
        }


          if(this.user.jwt !== undefined && this.user.jwt !== '' && this.user.roles === 'Admin') {
            if (event.key === "3") {
                document.getElementById("userSettingsButton").focus();
            }
            if (event.key === "4") {
                document.getElementById("bankAccountsButton").focus();
            }
            if (event.key === "5") {
                document.getElementById("manageUsersButton").focus();
            }
          } 
      }
    }
  },
}
</script>

<style scoped>
#home-menu {
  border-radius: 15px;
  background: rgb(240, 240, 240);
  color: rgb(55, 55, 55);
  box-shadow: 10px 10px 5px rgb(32, 32, 32);
}

.home-menu-title {
  font-size: 1.75em;
  font-weight: bold;
}

.login-register-title {
  font-size: 3em;
  font-weight: bold;
}

.home-menu-details {
  font-size: 1.5em;
}

.card {
  background: rgb(250, 250, 250);
  position: relative;
  height: 23em;
  box-shadow: 7px 7px 5px rgb(220, 220, 220);
}

select {
  font-size: 1.25em;
  float: right;
}

ul {
  list-style: none;
}

.btn {
  color: rgb(250, 250, 250);
  background-color: #414b55;
  font-size: 1.2em;
  padding: 1em;
  height: 3.5em;
  width: 12em;
  text-align: center;
  vertical-align: bottom;
  box-shadow: 5px 5px 5px rgb(235, 235, 235);
}

.btn:hover {
  background-color: #2a2e32;
}

.btn:focus {
  background-color: #2a2e32;
}

.btn-transactions-color {
  color: rgb(248, 248, 248);
  background-color: rgb(67, 151, 34);
}

  .btn-transactions-color:hover {
    background-color: rgb(81, 171, 46);
    color: rgb(248, 248, 248);
  }

.btn-transactions-color:focus {
    background-color: rgb(81, 171, 46);
    color: rgb(248, 248, 248);
 }

.btn-manage-users {
  background-color: rgb(219, 159, 30);
}

.btn-manage-users:hover {
  background-color: rgb(241, 176, 35);
}

.btn-manage-users:focus {
  background-color: rgb(241, 176, 35);
}

.btn-register {
  margin-top: 2em;
  height: 3.5em;
  width: 11em;
  vertical-align: middle;
  font-size: 2em;
  text-align: center;
  align-items: center;
}

.btn-login {
  margin-top: 2em;
  vertical-align: middle;
  font-size: 2em;
  height: 3.5em;
  width: 11em;
}

.btn-users {
  margin-top: 2em;
}

.btn-bankaccounts {
  margin-top: 3.85em;
}

.btn-transactions {
  font-size: 1.4em;
  height: 3.5em;
  width: 45em;
  padding: 1em;
}
</style>
