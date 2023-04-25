// player-bus.js

import { reactive } from 'vue';

// Create a reactive object to store the player instance
const playerBus = reactive({
  player: null
});

export default playerBus;
