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
          blue: '#0084ff',
          hoverBlue: '#006ed6',
          green: '#10b981',
          purple: '#8b5cf6',
          darkBg: '#0f172a',
          darkCard: '#1e293b',
          darkBorder: '#334155'
        }
      }
    },
  },
  plugins: [],
}
