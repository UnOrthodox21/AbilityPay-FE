<template>

    <div class="jumbotron jumbotron-fluid bg-none my-4 pb-4">
        <div class="container">

            <div v-if="jwt == undefined || jwt == ''">
                <h1 class="display-3">Welcome to AbilityPay.</h1>
                <p class="lead">Please log in or sign up!</p>
            </div>

            <div v-else-if="jwt !== undefined && jwt !== '' && this.user.roles === 'User'">
                <h1 class="display-3">Hello there, {{user.firstName}} {{user.lastName}}</h1>
                <p class="lead">Thank you for using AbilityPay!</p>
            </div>

            <div v-else-if="jwt !== undefined && jwt !== '' && this.user.roles === 'Admin'">
                <h1 class="display-3">Hello there, {{user.firstName}} {{user.lastName}}</h1>
                <p class="lead">Nice to see you administrating AbilityPay!</p>
            </div>


        </div>
    </div>
</template>

<script>
    export default {
        name: "HomeBanner",
        props: ["user", "jwt"]
    }
</script>

<style scoped>
    .jumbotron {
        background: none;
    }

    .display-3 {
        font-size: 5em;
    }

    .lead {
        font-size: 1.75em;
    }
</style>