module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        nav: '200px 100px 100px 1fr',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
