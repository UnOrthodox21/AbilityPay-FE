<template>
<button id="createNewBankAccountButton" @click="createNewBankAccount()" class="btn btn-top-menu mr-2"><span v-if="keyboardNavigationOptimization == 'true'">(-) </span>Create a new account</button>
<router-link id="sendMoneyButton" to="/transactions"  class="btn btn-top-menu ml-2"><span v-if="keyboardNavigationOptimization == 'true'">(=) </span>Send money</router-link>

   <table class="table my-5 mx-auto">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Account number</th>
      <th scope="col">Account type</th>
      <th scope="col">Balance</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr v-bind:key="bankAccount.id" v-for="(bankAccount, index) in bankAccounts">
      <td>{{ index + 1 }}</td>
      <td> {{ bankAccount.number }}</td>
      <td>{{ bankAccount.type}}</td>
      <td>{{ $filters.formatCurrency(bankAccount.balance) }}</td>
      <td><button v-if="bankAccount.type === 'Primary'" id="editButton" @click="setSelectedBankAccount(index)" type="button" class="btn mx-2" data-toggle="modal" data-target="#bankAccountEditModal" :class="{ 'btn-outline-info': colorBlindnessOptimization == 'false', 'btn-outline-dark': colorBlindnessOptimization == 'true' }"><span v-if="keyboardNavigationOptimization == 'true'"> (6) </span>Edit </button>
      <button v-if="bankAccount.type === 'Secondary'" @click="setSelectedBankAccount(index)" type="button" class="btn mx-2" data-toggle="modal" data-target="#bankAccountEditModal" :class="{ 'btn-outline-info': colorBlindnessOptimization == 'false', 'btn-outline-dark': colorBlindnessOptimization == 'true' }"> Edit </button>
      <router-link v-if="bankAccount.type === 'Primary'" id="transactionHistoryButton" @click="this.$parent.$parent.$parent.setTransactions(bankAccount.number)" to="/transactions-history" type="button" class="btn mx-2" :class="{ 'btn-outline-success': colorBlindnessOptimization == 'false', 'btn-outline-dark': colorBlindnessOptimization == 'true' }"><span v-if="keyboardNavigationOptimization == 'true'"> (7) </span>Transaction history </router-link>
      <router-link v-if="bankAccount.type === 'Secondary'" @click="this.$parent.$parent.$parent.setTransactions(bankAccount.number)" to="/transactions-history" type="button" class="btn mx-2" :class="{ 'btn-outline-success': colorBlindnessOptimization == 'false', 'btn-outline-dark': colorBlindnessOptimization == 'true' }"> Transaction history </router-link>
      <button v-if="bankAccount.type === 'Secondary'" @click="deleteBankAccount(bankAccount)" type="button" class="btn mx-2" :class="{ 'btn-outline-danger': colorBlindnessOptimization == 'false', 'btn-outline-dark': colorBlindnessOptimization == 'true' }"> Delete </button></td>
    </tr>
  </tbody>

<div class="modal fade" id="bankAccountEditModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalLabel">Edit bank account</h5>
        <button type="button" class="close" id="closeModalButton" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form @submit="editBankAccount">
      <div class="modal-body">
          <div class="form-group">
            <label for="accountNumberInput" class="col-form-label">Account number:</label>
          <input type="text" class="form-control" id="accountNumberInput" v-model="selectedBankAccount.number" required>
          </div>
          <div class="form-group">
            <label for="accountTypeInput" class="col-form-label">Account type:</label>
          <select class="form-control" id="accountTypeInput" v-model="selectedBankAccount.type"  name="accountType" placeholder="Select your accountType" disabled>
            <option value="Primary" v-bind:selected="selectedBankAccount.type == 'Primary'">Primary</option>
            <option value="Secondary" v-bind:selected="selectedBankAccount.type == 'Secondary'">Secondary</option>
         </select>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
      </form>
    </div>
  </div>
</div>


</table>
</template>

<script>
export default {
    name: "BankAccountsTable",
    data() {
      return {
        selectedBankAccount: [],
        selectedBankAccountNumber: ''
      }
    },

    props: ["user","bankAccounts", "keyboardNavigationOptimization", "colorBlindnessOptimization"],
    mounted() {
      document.addEventListener("keydown", this.onKeydown);
    },
    
     methods: {
      deleteBankAccount(bankAccount){
        if (bankAccount.balance === 0) {
    
        if(window.confirm("Are You sure?")) {
          this.$http.delete(process.env.VUE_APP_API_URL + "/bank-accounts/" + bankAccount.number)
          .then(() => this.$parent.$parent.$parent.setBankAccounts())
          .catch(err => console.log(err));
        }

       } else {
         alert("Can't delete an account that holds funds. Please empty the account before deletion.")
       }
      },

      createNewBankAccount() {
          this.$http.post(process.env.VUE_APP_API_URL + "/bank-accounts/createForUser/" + this.user.id)
          .then(() => this.$parent.$parent.$parent.setBankAccounts())
          .catch(err => console.log(err));
      },
      
        editBankAccount(e) {
         e.preventDefault();

        this.$http.put(process.env.VUE_APP_API_URL + "/bank-accounts/" + this.selectedBankAccountNumber, this.selectedBankAccount)
          .then(() => { 
            this.$parent.$parent.$parent.setBankAccounts() ;
            document.getElementById("closeModalButton").click();
          })
          .catch(err => console.log(err));
         },

      setSelectedBankAccount(index) {
        this.selectedBankAccountNumber = this.bankAccounts[index].number;

        this.selectedBankAccount = {
            "id": this.bankAccounts[index].id,
            "number": this.bankAccounts[index].number,
            "type": this.bankAccounts[index].type,
            "balance": this.bankAccounts[index].balance
        }
      },
       onKeydown(event) {
      if (this.keyboardNavigationOptimization == 'true' && event.target.nodeName !== "INPUT") {
            if (event.key === "6") {
                event.preventDefault();
                document.getElementById("editButton").focus();
            }
            if (event.key === "7") {
                event.preventDefault();
                document.getElementById("transactionHistoryButton").focus();
            }
            if (event.key === "-") {
                event.preventDefault();
                document.getElementById("createNewBankAccountButton").focus();
            }
            if (event.key === "=") {
                event.preventDefault();
                document.getElementById("sendMoneyButton").focus();
            }
      }
    },
     }
}
</script>

<style scoped>
    .btn-top-menu{
        color: rgb(250, 250, 248);
        background-color: #414b55;
        font-size: 1.4em;
        padding: 1em;
        height: 4.5em;
        width: 12em;
        padding-top: auto;
        padding-bottom: auto;
        text-align: center;
        vertical-align: center;
    }

    .btn-top-menu:hover {
          background-color: #2a2e32;
    }

    .btn-top-menu:focus {
          background-color: #2a2e32;
    }

    #sendMoneyButton {
      padding-top: 1.45em;
    }

    .table {
        background-color: rgb(240, 240, 240);
        color: black;
        box-shadow: 10px 10px 5px rgb(32, 32, 32);
        font-size: 0,7em;
        font-weight: bold;
    }

</style>
