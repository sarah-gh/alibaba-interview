import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import './assets/sass/style.scss'

// import {InlineSvgPlugin} from 'vue-inline-svg';
// Vue.use(InlineSvgPlugin);

// or as a component
import InlineSvg from 'vue-inline-svg'

library.add(fas)
library.add(fab)
library.add(far)
dom.watch()

const app = createApp(App)
app.component('inline-svg', InlineSvg)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(store).use(router).mount('#app')
