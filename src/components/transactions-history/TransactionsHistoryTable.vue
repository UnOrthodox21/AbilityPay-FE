<template>
   <table class="table my-5 mx-auto">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Type</th>
      <th scope="col">Date</th>
      <th scope="col">Account From</th>
      <th scope="col">Account To</th>
      <th scope="col">Amount</th>
      <th scope="col">Recipient name</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr v-bind:key="transaction.id" v-for="(transaction, index) in transactions">
      <td>{{ index + 1 }}</td>
      <td>{{ transaction.type}}</td>
      <td>{{ transaction.date }}</td>
      <td>{{ transaction.userFrom }}</td>
      <td>{{ transaction.userTo }}</td>
      <td>{{ $filters.formatCurrency(transaction.amount) }}</td>
      <td>{{ transaction.recipientName }}</td>
      <td>{{ transaction.description }}</td>
    </tr>
  </tbody>
</table>

</template>

<script>

export default {
    name: "TransactionsHistoryTable",
    props: ["transactions"],
        
}
</script>

<style scoped>
    .btn-top-menu{
        border-color: rgb(248, 248, 248);
        color: rgb(248, 248, 248);
        font-size: 1.2em;
        padding: 1em;
        height: 3.5em;
        width: 12em;
        text-align: center;
        vertical-align: center;
        margin-bottom: 30px;
        margin-inline: 10px;
    }

    .btn-top-menu:hover {
          background-color: rgba(46, 46, 46, 0.884);
    }

    .table {
        background: rgb(240, 240, 240);
        color: black;
        box-shadow: 10px 10px 5px rgb(32, 32, 32);
        font-size: 0,7em;
        font-weight: bold;
    }
</style>
