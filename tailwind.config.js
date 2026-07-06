/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'hermitage-beige': '#B9A997',
        'hermitage-brown': '#965B4A',
        'hermitage-dark': '#5A573F',
        'hermitage-gold': '#B49567',
        'hermitage-text': '#5A573F',
      },
      fontFamily: {
        'carmen': ['Carmen', 'serif'],
        'munson': ['Munson Roman', 'serif'],
      },
    },
  },
  plugins: [],
}