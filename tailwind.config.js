/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: '#1e1b4b',
          amber: '#f59e0b',
          amberDark: '#d97706',
          emerald: '#10b981',
          darkBg: '#0b0f19',
          darkCard: '#151d2e',
          darkBorder: '#232f45',
          cream: '#fcfbf9'
        }
      }
    },
  },
  plugins: [],
}
