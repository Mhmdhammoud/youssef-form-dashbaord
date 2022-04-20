const colors = require('tailwindcss/colors');
module.exports = {
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        teal: colors.teal,
        rose: colors.rose,
      },
    },
  },
  variants: {
    extend: {},
  },
  content: [
    './public/**/*.html',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'columns-1',
    'columns-2',
    'columns-3',
    'columns-4',
    'columns-5',
    'columns-6',
    'columns-7',
    'columns-8',
    'columns-9',
    'columns-10',
    'columns-11',
    'columns-12',
    'grid',
    'grid-cols-2',
    'grid-cols-3',
    'grid-cols-4',
    'grid-cols-5',
    'grid-cols-6',
  ],
  plugins: [require('@tailwindcss/forms')],
};
