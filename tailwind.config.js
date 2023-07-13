/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      '2xs': '280px',
      'xs': '460px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    colors: {
      'primary': '#348789',
      'secondary': '#001489',
      'secondary-20': '#495abb',
      'secondary-50': '#283dae',
      'gray-50': '#dddfeb',
      'gray-100': '#97909050',
      'gray-200': '#535653',
      'gray-300': '#7c838b',
      'white': '#ffffff',
      'black': '#272b30',
    },
  },
  plugins: [],
}