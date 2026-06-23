/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#EEF2FB',
          100: '#D5DFEE',
          200: '#A8BBD6',
          400: '#5B7AB8',
          600: '#243F85',
          700: '#1A306E',
          800: '#0F2347',
          900: '#091830',
        },
        gold: {
          400: '#E8C16A',
          500: '#D4A843',
          600: '#B8922A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
