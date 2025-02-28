import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers.common['Content-Type'] = 'application/json'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)

app.mount('#app')
