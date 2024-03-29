import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component:() => import( '../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component:() => import( '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component:() => import( '../views/Register.vue')
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: () => import('../views/Transactions.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import( '../views/Settings.vue')
  },
  {
    path: '/bank-accounts',
    name: 'BankAccounts',
    component: () => import( '../views/BankAccounts.vue')
  },
  {
    path: '/transactions-history',
    name: 'TransactionsHistory',
    component: () => import( '../views/TransactionsHistory.vue')
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: () => import( '../views/admin/AdminUsers.vue')
  },
  {
    path: '/admin/users/bank-accounts',
    name: 'AdminBankAccounts',
    component: () => import( '../views/admin/AdminBankAccounts.vue')
  },
  {
    path: '/admin/users/bank-accounts/transactions-history',
    name: 'AdminTransactionsHistory',
    component: () => import( '../views/admin/AdminTransactionsHistory.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
