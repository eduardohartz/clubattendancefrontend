/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        warningred: '#ff2525',
        'greyscale': {
          100: '#f4f4f4',
          200: '#d9d9d9',
          300: '#b8b8b8',
        },
        'accent': {
          90: '#c796ff',
          100: '#b676ff',
          200: '#9c56ff',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

