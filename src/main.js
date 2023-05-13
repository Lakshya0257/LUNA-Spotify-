import { createApp } from 'vue';

import { createPinia } from 'pinia';
import SpotifyPlugin from '../spotify/play_track/player';

import App from './App.vue';
import router from './router';

import './assets/basic.css';
import './assets/body.css';

const app = createApp(App);


app.use(createPinia());
app.use(router);
app.use(SpotifyPlugin);

app.mount('#app');
