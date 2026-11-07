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
          bg: '#070a13',
          card: '#101726',
          cardHover: '#141d30',
          border: '#1f2d47',
          borderLight: '#2a3b5c',
          blue: '#2563eb',
          blueHover: '#1d4ed8',
          cyan: '#06b6d4',
          purple: '#7c3aed',
          emerald: '#10b981',
          gold: '#f59e0b',
          rose: '#f43f5e'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 25px -5px rgba(37, 99, 235, 0.35)',
        'glow-purple': '0 0 25px -5px rgba(124, 58, 237, 0.35)',
        'glow-emerald': '0 0 20px -5px rgba(16, 185, 129, 0.35)',
        'glow-gold': '0 0 20px -5px rgba(245, 158, 11, 0.35)',
      }
    },
  },
  plugins: [],
}
