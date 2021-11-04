module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0px)' },
        },
      },
      animation: {
        wiggle: 'fadeIn 200ms ease-in-out',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
