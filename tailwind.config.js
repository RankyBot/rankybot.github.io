/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1c5f23',
        secondary: '#daab18',
        lightGreen: '#729e7e',
        background: '#1f1f20',
        buttonGray: 'gray',
      },
      fontFamily: {
        sans: ['Poppins', ...fontFamily.sans],
      },
      backgroundImage: {
        'ranky-texture': "url('/public/textures/noise.png')",
      },
      keyframes: {
        'glow-out': {
          '0%': { boxShadow: '0 0 0px rgba(255, 215, 0, 0)' },
          '50%': { boxShadow: '0 0 10px 4px rgba(255, 215, 0, 0.6)' },
          '100%': { boxShadow: '0 0 0px rgba(255, 215, 0, 0)' },
        },
      },
      animation: {
        'glow-hover': 'glow-out 1.2s ease-in-out',
      },
      textShadow: {
        sm: '1px 1px 2px rgba(255, 255, 255, 0.5)',
        DEFAULT: '2px 2px 4px rgba(255, 255, 255, 0.7)',
        lg: '3px 3px 6px rgba(255, 255, 255, 0.9)',
      },
    },
  },
  plugins: [],
};
