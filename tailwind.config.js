/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      responsive : '400px',
    },
    extend: {
      fontFamily: {
        'welcome': "'Chakra Petch', sans-serif"
      }
    },
  },
  plugins: [],
}

