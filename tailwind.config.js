export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
        '100': '#F2F2F2',
        '200': '#d9d9d9',
        '300': '#808080',
        '400': '#333333',
        '500': '#262626',
        '600': '#1a1a1a',
        '700': '#0D0D0D',
        },
        
        'purple': '#8284fa',
        'purple-dark': '#5e60ce',
        'blue': '#4ea8de',
        'blue-dark': '#1e6f9f',
        
      }
    },
  },
  plugins: [],
}
