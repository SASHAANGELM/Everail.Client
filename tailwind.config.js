const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.ts',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        amber: colors.amber,
        yellow: colors.yellow
      },
      rotate: {
        '-30': '-30deg',
        '-20': '-20deg',
        '20': '20deg',
        '30': '30deg',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
