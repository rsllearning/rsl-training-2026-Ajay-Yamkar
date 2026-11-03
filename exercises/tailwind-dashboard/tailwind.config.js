/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { 950: '#172321', 800: '#31423e', 600: '#65746f', 400: '#9ba7a2' },
        brand: { 50: '#eff6f2', 100: '#dcebe2', 500: '#477b62', 600: '#35684f', 700: '#28543f' },
        canvas: '#f7f8f6', line: '#e8ebe7', accent: '#e9a773',
      },
      borderRadius: { card: '1.125rem' },
      boxShadow: { soft: '0 8px 28px -18px rgb(23 35 33 / 22%)' },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
}
