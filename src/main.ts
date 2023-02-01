import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { TroisJSVuePlugin } from 'troisjs';

import App from './App.vue'
import router from './router'

import VueScrollTo from "vue-scrollto";



import './assets/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(TroisJSVuePlugin)

app.use(VueScrollTo)
app.mount('#app')
