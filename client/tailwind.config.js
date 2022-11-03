/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        app_dark: {
          DEFAULT: '#030303',
          brighter: '#272728',
        },
        app_border: {
          DEFAULT: '#343536',
        },
        app_banner: {
          DEFAULT: '#E34363'
        }
      }
    },
  },
  plugins: [],
}
