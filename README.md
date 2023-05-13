# Luna

This template should help get you started developing with Vue 3 in Vite.
A music streaming website built on Vuejs 3 with Spotify Api.
But make sure you have a premium account for the website to be fully running. Free Trial accounts are not included.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

### Create an config.js file in root folder.

Include these variables-
export const REDIRECT_URI = "http://localhost:5173/";
export const CLIENT_ID = "<Your Client Id>";
export const CLIENT_SECRET = "Your Client Secret";

These can be obtained by login with your account and creating and application on spotify- (https://developer.spotify.com/documentation/web-api)
npm install


### Compile and Hot-Reload for Development


npm run dev


### Compile and Minify for Production


npm run build


### Run Unit Tests with [Vitest](https://vitest.dev/)


npm run test:unit

