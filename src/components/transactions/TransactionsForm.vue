<template>
<div class="container">
  <div class="row">
    <div class="col-12">
    <form @submit="transferFunds">
  <div class="form-group row mt-0 mb-4">
      <label for="recipientNameInput" class="col-2 col-form-label">Recipient name:</label>
    <div class="col-8">
    <input type="text" class="form-control" id="recipientNameInput" v-model="recipientName" name="recipientName" aria-describedby="recipientHelp" placeholder="Enter recipient name" required>
  </div>
  </div>
  <div class="form-group row my-4">
        <label for="recipientAccountInput" class="col-2 col-form-label">Recipient account:</label>
        <div class="col-8">
    <input type="text" class="form-control" id="recipientAccountInput" v-model="recipientBankAccount" name="recipientBankAccount" placeholder="Enter recipient bank account" required>
  </div>
  </div>
     <div class="form-group row my-4">
  <label for="userBankAccountInput" class="col-2 col-form-label">User bank accounts:</label>
      <div class="col-8">
    <select class="form-control" id="userBankAccountInput" v-if="this.bankAccounts[0].number !== undefined" v-model="userBankAccount" name="usertBankAccount" placeholder="Select your bank account" required >
       <option v-bind:key="bankAccount.id" v-for="(bankAccount, index) in bankAccounts" v-bind:value="bankAccount.number" v-bind:selected="index === 0">{{ index + 1 }}. {{ bankAccount.number }}</option>
      </select>
  </div>
  </div>
    <div class="form-group row my-4">
    <label for="transferAmountInput" class="col-2 col-form-label">Transfer amount:</label>
    <div class="col-8">
    <input type="number" step="0.01" min="0" max="99999999" mi class="form-control" id="transferAmountInput" v-model="transferAmount" name="transferAmount" placeholder="Enter transfer amount" required>
  </div>
  </div>
     <div class="form-group row my-4">
    <label for="descriptionInput" class="col-2 col-form-label">Description</label>
    <div class="col-8">
    <input type="text" class="form-control mb-2" id="descriptionInput" v-model="description" name="description" placeholder="Enter description" required>
  </div>
  </div>


  <div class="form-group row mt-5 mb-0">
    <div class="col-12">
  <button type="submit" class="btn btn-transactions" 
  v-class="{ 'btn-transactions-color': colorBlindnessOptimization == 'false' }" 
  id="submitButton">Submit</button>


  <div class="alert mt-5" id="transaction-alert" style="display: none;" role="alert"></div>

    </div>
    </div>

    </form>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name: "TransactionsForm",
    
    created() {
      this.$parent.$parent.$parent.setBankAccounts();
    },

    mounted() {
      this.setUserBankAccount();
    },

      data() {
      return {
        recipientName: '',
        recipientBankAccount: '',
        userBankAccount: '',
        transferAmount: 0,
        description: ''
      }
    },
    props: ["bankAccounts", "colorBlindnessOptimization"],
    methods: {

    setUserBankAccount() {
       if(this.bankAccounts[0].number !== undefined) {
          this.userBankAccount = this.bankAccounts[0].number;
      }
     },

    transferFunds(e) {
        e.preventDefault();
        const newTransfer= {
            accountNumberFrom: this.userBankAccount,
            accountNumberTo: this.recipientBankAccount,
            amount: this.transferAmount,
            description: this.description,
            recipientName: this.recipientName
        }

        let alert = document.getElementById('transaction-alert');

        this.$http.put(process.env.VUE_APP_API_URL + "/bank-accounts/transfer", newTransfer)
        .then((response) => { 
          
          let transactionSuccessful = response.data;
              

        if (transactionSuccessful) {
                this.$parent.$parent.$parent.setBankAccounts(); 
               this.recipientName = '';
               this.recipientBankAccount = '';
               this.transferAmount = 0;
               this.description = '';
              alert.classList.remove("alert-danger");
              alert.classList.add("alert-success");
              alert.innerHTML = "Successfully transfered funds!";
              alert.style.display = "block";
        } else {
          alert.classList.remove("alert-success");
          alert.classList.add("alert-danger");
          alert.innerHTML = "Transfer of funds failed - Insufficient funds!";
          alert.style.display = "block";
        }
        }).catch((err) => {
          alert.classList.remove("alert-success");
          alert.classList.add("alert-danger");
          alert.innerHTML = "Transfer of funds failed! - Invalid recipient.";
          alert.style.display = "block";
          console.log(err);
        })
        },
    }
}
</script>

<style scoped>
    .btn-transactions {
        padding: 1em;
        height: 3.5em;
        width: 25em;
        text-align: center;
        vertical-align: center;
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


    .col-form-label {
      text-align: right;
      padding-right: 0em;
    }
</style>
