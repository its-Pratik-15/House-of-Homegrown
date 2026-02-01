/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // House of Homegrown Brand Colors
        primary: {
          DEFAULT: '#8B5E3C', // Earthy Brown
          50: '#F5F1ED',
          100: '#E8DDD4',
          200: '#D4C4B3',
          300: '#C0AB92',
          400: '#AC9271',
          500: '#8B5E3C',
          600: '#7A5234',
          700: '#69462C',
          800: '#583A24',
          900: '#472E1C',
        },
        secondary: {
          DEFAULT: '#F5F1E8', // Beige/Off-White
          50: '#FEFDFB',
          100: '#F5F1E8',
          200: '#EDE6D5',
          300: '#E5DBC2',
          400: '#DDD0AF',
          500: '#D5C59C',
        },
        accent: {
          DEFAULT: '#6B8E23', // Natural Green
          50: '#F0F4E6',
          100: '#E1E9CD',
          200: '#D2DEB4',
          300: '#C3D39B',
          400: '#B4C882',
          500: '#A5BD69',
          600: '#96B250',
          700: '#87A737',
          800: '#6B8E23',
          900: '#5A7A1E',
        },
        text: {
          primary: '#333333',
          secondary: '#5A4632',
        },
        background: '#FEFDFB',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      height: {
        'screen-80': '80vh',
        'screen-90': '90vh',
      },
    },
  },
  plugins: [],
}