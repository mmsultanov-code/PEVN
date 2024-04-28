import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/theme-style.scss'
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_URL || 'http://localhost:7000/api';

createApp(App).use(router).mount('#app')
