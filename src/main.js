import { createApp } from 'vue';

import { createPinia } from 'pinia';
import SpotifyPlugin from '../spotify/play_track/player';

import App from './App.vue';
import store from './stores/store';
import router from './router';

import './assets/basic.css';
import './assets/body.css';

const app = createApp(App);


app.use(createPinia());
app.use(router);
app.use(store);
app.use(SpotifyPlugin);

app.mount('#app');
