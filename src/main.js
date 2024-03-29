import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'jquery/src/jquery.js'

import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

import router from './router'

const app = createApp(App).use(router);
app.config.globalProperties.$http = axios;
app.config.globalProperties.$filters = {
    formatCurrency(number) {
        return Intl.NumberFormat('lv-LV', { style: 'currency', currency: 'EUR' }).format(number);
    }
}

app.mount('#app');
