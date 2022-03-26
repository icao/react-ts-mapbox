module.exports = {
  content: ['./index.html', './src/**/*.{jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        uber: ['UberMove', 'Arial', 'sans-serif'],
        uberText: ['UberMoveText', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'black-large': '0px 30px 60px rgb(0 0 0 / 12%)',
        'blue-next': '0 4px 14px 0 rgb(0 118 255 / 39%)',
        'black-medium': '0 4px 14px 0 rgb(0 0 0 / 10%)',
      },
      colors: {
        'next-blue': '#0070f3',
      },
    },
  },
  plugins: [],
}
