/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#282828',
          DEFAULT: '#282828', //500
          on: '#434343', //50
          dark: {
            DEFAULT: '#c8c8c8', //300
            on: '#383838', //800
          },
        },
        secondary: {
          50: '#fef5ee',
          100: '#fce9d8',
          200: '#f8cfb0',
          300: '#f3ad7e',
          400: '#ec814b',
          500: '#e86027',
          600: '#d2461c',
          700: '#b4361a',
          800: '#902c1c',
          900: '#74271a',
          DEFAULT: '#d2461c', //500
          on: '#fef5ee', //50
          dark: {
            DEFAULT: '#f3ad7e', //300
            on: '#902c1c', //800
          },
        },
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
