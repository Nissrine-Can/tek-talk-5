const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        app_dark: {
          DEFAULT: '#030303',
          brighter: '#1a1a1a',
          brightest: '#272728',
        },
        app_border: {
          DEFAULT: '#343536',
          darker: '#030303'
        },
        app_banner: {
          DEFAULT: '#E34363'
        },
        app_text: {
          DEFAULT: 'rgb(215, 218, 220)',
          darker: '#818384',
        }
      }
    },
  },
  plugins: [],
})
