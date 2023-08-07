import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/sass/style.scss'

// import 'vue-select-3/dist/vue-select.css'

createApp(App).use(store).use(router).mount('#app')
