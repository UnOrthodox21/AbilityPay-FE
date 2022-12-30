<template>
<TransactionsBanner/>
<TransactionsForm v-bind:bankAccounts="bankAccounts" v-bind:colorBlindnessOptimization="colorBlindnessOptimization"/>
</template>

<script>
import TransactionsBanner from "../components/transactions/TransactionsBanner.vue";
import TransactionsForm from "../components/transactions/TransactionsForm.vue";

export default {
  name: "Transactions",
  components: {
    TransactionsBanner,
    TransactionsForm
  },
  props: ["user", "bankAccounts", "colorBlindnessOptimization"]
}
</script>

<style scoped>

</style>
