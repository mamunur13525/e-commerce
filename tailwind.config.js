module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: 0,
            transform: 'translate3d(0, 40px, 0)'
          },
          '50%': {
            opacity: 0.3,
          },
          '70%': {
            opacity: 0.5,
            transform: 'translate3d(0, 0px, 0)'
          },
          '100%': {
            opacity: 1,
            transform: 'translate3d(0, 0px, 0)'
          },
        },
      },
      animation: {
        'waving-hand': 'fadeInUp .35s linear',
      },
    },
  },
  plugins: [],
}