# Luna

A music streaming desktop application made in tauri rust and vuejs.



But make sure you have a premium account for the website to be fully running. Free Trial accounts are not included.

## Features

Auto Play song

Auto Queue generation

Unlimited song playback

Search any song

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Snapshots

### Homepage
![image](https://github.com/Lakshya0257/LUNA-Spotify-/assets/114349137/d7ec0b4a-9fec-45d6-8ba1-37d4c5db57ef)

### Player

![image](https://github.com/Lakshya0257/LUNA-Spotify-/assets/114349137/54d8272b-e394-4de9-99e2-4a4b386fe27e)


### Search

![image](https://github.com/Lakshya0257/LUNA-Spotify-/assets/114349137/c825da7a-f765-4fe6-9198-f38d5d752ca6)


## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

### Create an config.js file in root folder.

Include these variables-
export const REDIRECT_URI = "http://localhost:5173/";
export const CLIENT_ID = "<Your Client Id>";
export const CLIENT_SECRET = "Your Client Secret";

These can be obtained by login with your account and creating and application on spotify- (https://developer.spotify.com/documentation/web-api).
  
npm install


### Compile and Hot-Reload for Development


npm tauri dev


### Compile and Minify for Production


npm tauri build


### Run Unit Tests with [Vitest](https://vitest.dev/)


npm run test:unit

