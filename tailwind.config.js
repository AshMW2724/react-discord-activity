/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/**/*.{ts,tsx}',
    './src/routes/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './**/*.html',
  ],
  theme: {
    extend: {
      screens: {
        'pnp': '325px'
      }
    },
  },
  plugins: [],
}

