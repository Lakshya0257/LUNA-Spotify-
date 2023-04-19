import { createApp} from 'vue'
import { createPinia } from 'pinia'
// import PlayerPlugin from './plugin/PlayerPlugin'

import App from './App.vue'
import router from './router'

import './assets/basic.css'
import './assets/body.css'




const app = createApp(App)
// app.use(PlayerPlugin)
app.use(createPinia())
app.use(router)


app.mount('#app')


