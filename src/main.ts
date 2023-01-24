import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { TroisJSVuePlugin } from 'troisjs';

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(TroisJSVuePlugin)
app.mount('#app')
