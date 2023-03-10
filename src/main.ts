import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vue3StarRatings from "vue3-star-ratings";
import './assets/main.css'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component("vue3starRatings",vue3StarRatings)
app.mount('#app')
