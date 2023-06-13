/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
    },
    colors: {
      'primary': '#348789',
      'secondary': '#001489',
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