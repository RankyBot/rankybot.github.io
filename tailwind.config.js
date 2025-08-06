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
        'ranky-radial': 'radial-gradient(circle, rgba(30,102,37,1) 5%, rgba(31,31,32,1) 100%)',
      },
    },
  },
  plugins: [],
};
