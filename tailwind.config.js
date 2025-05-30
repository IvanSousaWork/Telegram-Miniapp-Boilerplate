/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tg-bg': 'var(--tg-bg-color)',
        'tg-text': 'var(--tg-text-color)',
        'tg-hint': 'var(--tg-hint-color)',
        'tg-link': 'var(--tg-link-color)',
        'tg-button': 'var(--tg-button-color)',
        'tg-button-text': 'var(--tg-button-text-color)',
        'tg-secondary-bg': 'var(--tg-secondary-bg-color)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}