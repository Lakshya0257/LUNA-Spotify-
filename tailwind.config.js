/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/assets/**/*.{html,js,tsx}","./src/components/**/*.{html,js,vue}","./src/**/*.{html,js,vue}"],
  theme: {
    extend: {},
  },
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}

