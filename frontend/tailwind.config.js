/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scrollVertical: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        scrollVertical2: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        scrollHorizontal: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        scrollHorizontal2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation : {
        'spin-slow-30': 'spin 30s linear infinite',
        'spin-slow-25': 'spin 25s linear infinite',
        'spin-slow-10': 'spin 10s linear infinite',
        'scroll-vertical-infinite' : 'scrollVertical 30s linear infinite',
        'scroll-vertical-infinite-reverse' : 'scrollVertical2 30s linear infinite',
        'scroll-horizontal-infinite' : 'scrollHorizontal 30s linear infinite',
        'scroll-horizontal-infinite-reverse' : 'scrollHorizontal2 30s linear infinite',
      },
    },
  },
  plugins: [],
}